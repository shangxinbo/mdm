/**
 * @copyright MyComm 
 * @author: Karl Ma
 * @Date: 2013/4/1
 */

(function () {

    window.MyCommAgent = function () {
        this.agent_state = MyCommAgent.LOGGED_OUT;
        this.sync_call_cli = new XMLHttpRequest();
    };

    MyCommAgent.prototype.__connect = function () {
        var self = this;
        var ws_host = "ws://" + self.cti_server + "/websocket";
        self.__websocket = new WebSocket(ws_host);
        self.__websocket.onopen = function (evt) { self.__on_ws_open(evt) };
        self.__websocket.onclose = function (evt) { self.__on_ws_close(evt) };
        self.__websocket.onmessage = function (evt) { self.__on_ws_message(evt) };
        self.__websocket.onerror = function (evt) { self.__on_ws_error(evt) };
    };

    MyCommAgent.prototype.login = function (cti_server, agent_id, password, queue, is_leader, org_id, agent_name, work_id, agent_type) {
        if (this.__check_param((typeof cti_server === "string") && cti_server != "", "cti_server must be string and can't be empty") &&
            this.__check_param((typeof agent_id === "string") && agent_id != "", "agent_id must be string and can't be empty") &&
            this.__check_param((typeof password === "string"), "password must be string") &&
            this.__check_param((typeof queue === "string") && queue != "", "queue must be string and can't be empty") &&
            this.__check_param(is_leader == undefined || is_leader === 'true' || is_leader === 'false' || typeof is_leader === 'boolean',
                "is_leader must be boolean") &&
            this.__check_param(org_id == undefined || (typeof org_id === "string"), "org_id must be string") &&
            this.__check_param(agent_name == undefined || typeof agent_name === "string", "agent_name  must be string") &&
            this.__check_param(work_id == undefined || typeof work_id === "string", "work_id  must be string")
        ) {
            this.cti_server = cti_server;
            this.agent_id = agent_id;
            this.agent_password = password;
            this.is_leader = is_leader == undefined ? false : (typeof is_leader === 'boolean') ? is_leader : (is_leader === 'true');
            this.agent_type = agent_type;
            // Create agent queue array
            this.agent_queue = [];
            var queue_a;
            var queue_b;
            queue_a = this.__unique(queue.split(","));
            for (var i = 0; i < queue_a.length; i++) {
                queue_b = queue_a[i].replace(/(^\s*)|(\s*$)/g, "").split(":");
                if (queue_b.length == 1) {
                    this.agent_queue.push({ "name": queue_b[0].replace(/(^\s*)|(\s*$)/g, ""), "level": 1 });
                } else {
                    this.agent_queue.push({ "name": queue_b[0].replace(/(^\s*)|(\s*$)/g, ""), "level": parseInt(queue_b[1].replace(/(^\s*)|(\s*$)/g, "")) });
                }
            }
            this.org_id = (org_id == undefined || org_id == "") ? null : org_id;
            this.work_id = (work_id == undefined || work_id == "") ? null : work_id;
            this.agent_name = (agent_name == undefined || agent_name == "") ? null : agent_name;
            if (this.__websocket && this.__websocket.readyState == WebSocket.OPEN) {
                this.__send({
                    "class": "agent", method: "login",
                    params: {
                        agent_id: this.agent_id, agent_name: this.agent_name, password: this.agent_password,
                        queue: this.agent_queue, is_leader: this.is_leader, org_id: this.org_id, work_id: this.work_id,
                        agent_type: this.agent_type
                    }
                });
            } else {
                this.agent_state = MyCommAgent.LOGINING;
                this.__connect();
            }
        }
    };

    MyCommAgent.prototype.logout = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "logout", params: null });
        }
    };

    MyCommAgent.prototype.set_play_work_id = function (flag) {
        if (this.__check_ws_state() &&
            this.__check_param(!isNaN(parseInt(flag)) && parseInt(flag) >= 0 && parseInt(flag) <= 2,
                "flag must be number and it must between 0 and 2")) {
            flag = (typeof flag === "number") ? flag : parseInt(flag);
            this.__send({ "class": "agent", "method": "set_play_work_id", params: { "play_flag": flag } });
        }
    };

    MyCommAgent.prototype.get_state = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "get_state", params: null });
        }
    };
    MyCommAgent.prototype.get_state2 = function (callback) {
        var url = "http://" + this.cti_server + "/sync_call/agent/get_state?session_id=" + this.session_id;
        var ret = null;
        if (callback == null) {
            ret = this.__cors_get(url, "get_state");
        } else {
            this.__async_cors_get(url, "get_state", callback);
        }
        return ret;
    };

    MyCommAgent.prototype.get_session_attr = function (attr_name) {
        if (this.__check_ws_state() &&
            this.__check_param(typeof attr_name === "string", "attr_name must be string") &&
            this.__check_param(attr_name != "", "attr_name can't be empty")) {
            this.__send({ "class": "agent", "method": "get_session_attr", params: { "attr_name": attr_name } });
        }
    };
    MyCommAgent.prototype.get_session_attr2 = function (attr_name, callback) {
        var ret = null;
        if (this.__check_param(typeof attr_name === "string", "attr_name must be string") &&
            this.__check_param(attr_name != "", "attr_name can't be empty")) {
            var url = "http://" + this.cti_server + "/sync_call/agent/get_session_attr?session_id=" + this.session_id + "&attr_name=" + attr_name;
            if (null == callback) {
                ret = this.__cors_get(url, "get_session_attr");
            } else {
                this.__async_cors_get(url, "get_session_attr", callback);
            }
        }
        return ret;
    };

    MyCommAgent.prototype.waiting = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "waiting", params: null });
        }
    };
    MyCommAgent.prototype.wait_preview = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "wait_preview", params: null });
        }
    };
    MyCommAgent.prototype.idle = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "idle", params: null });
        }
    };

    MyCommAgent.prototype.set_break = function (break_id) {
        if (this.__check_ws_state() &&
            this.__check_param(!isNaN(parseInt(break_id)) && parseInt(break_id) > 0,
                "break_id must be number and greater then zero")) {
            break_id = (typeof break_id === "number") ? break_id : parseInt(break_id);
            this.__send({ "class": "agent", "method": "break", params: { "break_id": parseInt(break_id) } });
        }
    };

    MyCommAgent.prototype.resume = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "resume", params: null });
        }
    };
    MyCommAgent.prototype.dial = function (dest_number, queue, user_data) {
        if (this.__check_ws_state() &&
            this.__check_param(typeof dest_number === "string", "dest_number must be string") &&
            this.__check_param(dest_number != "", "dest_number can't be empty") &&
            this.__check_param(queue == undefined || typeof queue === "string", "queue must be string") &&
            this.__check_param(user_data == undefined || typeof user_data === "string", "user_data must be string")) {
            queue = (queue == undefined || queue == "" ? null : queue);
            user_data = (user_data == undefined || user_data == "" ? null : user_data);
            this.__send({ "class": "agent", "method": "dial", params: { "queue": queue, "dest_number": dest_number, "user_data": user_data } });
        }
    };

    MyCommAgent.prototype.drop = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "drop", params: null });
        }
    };

    MyCommAgent.prototype.drop_agent = function (agent_id) {
        if (this.__check_ws_state() &&
            this.__check_param(agent_id == undefined || typeof agent_id === 'string', "agent_it must be string")) {
            agent_id = (agent_id == undefined) ? "" : agent_id;
            this.__send({ "class": "agent", "method": "drop_agent", params: { "agent_id": agent_id } });
        }
    };


    MyCommAgent.prototype.set_wrap_up_time = function (timeout_secs) {
        if (this.__check_ws_state() &&
            this.__check_param(!isNaN(parseInt(timeout_secs)), "timeout_secs must be a number")) {
            timeout_secs = (typeof timeout_secs === "number") ? timeout_secs : parseInt(timeout_secs);
            this.__send({ "class": "agent", "method": "set_wrap_up_time", params: { "timeout": timeout_secs } });
        }
    };

    MyCommAgent.prototype.transfer = function (dest_number, is_wait) {
        if (this.__check_ws_state() &&
            this.__check_param(typeof dest_number === 'string', 'dest_number must be string') &&
            this.__check_param(dest_number != "", "dest_number can't be empty") &&
            this.__check_param(is_wait === 'true' || is_wait === 'false' || typeof is_wait === 'boolean',
                "is_wait must be 'true' or 'false' or a boolean type value")) {
            if (typeof is_wait === 'string') {
                is_wait = (is_wait === 'true');
            }
            this.__send({ "class": "agent", "method": "transfer", params: { "dest_number": dest_number, "is_wait": is_wait } });
        }
    };

    MyCommAgent.prototype.consult = function (dest_number) {
        if (this.__check_ws_state() &&
            this.__check_param(typeof dest_number === 'string', 'dest_number must be string') &&
            this.__check_param(dest_number != "", "dest_number can't be empty")) {
            this.__send({ "class": "agent", "method": "consult", params: { "dest_number": dest_number } });
        }
    };

    MyCommAgent.prototype.cancel_consult = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "cancel_consult", params: null });
        }
    };

    MyCommAgent.prototype.stop_consult = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "stop_consult", params: null });
        }
    };

    MyCommAgent.prototype.transfer_to_counselor = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "transfer_to_counselor", params: null });
        }
    };

    MyCommAgent.prototype.three_way = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "three_way", params: null });
        }
    };

    MyCommAgent.prototype.stop_three_way = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "stop_three_way", params: null });
        }
    };

    MyCommAgent.prototype.wrap_up = function (later) {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "wrap_up", params: { "later": later } });
        }
    };

    MyCommAgent.prototype.hold = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "hold", params: null });
        }
    };

    MyCommAgent.prototype.unhold = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "unhold", params: null });
        }
    };

    MyCommAgent.prototype.get_queues = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "get_queues", params: null });
        }
    };

    MyCommAgent.prototype.get_agents = function (queue) {
        if (this.__check_ws_state() &&
            this.__check_param(typeof queue === "string", "queue must be string") &&
            this.__check_param(queue != "", "queue can't be empty")) {
            this.__send({ "class": "agent", "method": "get_agents", params: { "queue": queue } });
        }
    };

    MyCommAgent.prototype.get_agent = function (agent_id) {
        if (this.__check_ws_state() &&
            this.__check_param(typeof agent_id === "string", "agent_id must be string") &&
            this.__check_param(agent_id != "", "agent_id can't be empty")) {
            this.__send({ "class": "agent", "method": "get_agent", params: { "agent_id": agent_id } });
        }
    };

    MyCommAgent.prototype.get_all_agents = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "get_all_agents", params: null });
        }
    };

    MyCommAgent.prototype.transfer_to_queue = function (queue) {
        if (this.__check_ws_state() &&
            this.__check_param(typeof queue === "string", "queue must be string") &&
            this.__check_param(queue != "", "queue can't be empty")) {
            this.__send({ "class": "agent", "method": "transfer_to_queue", params: { "queue": queue } });
        }
    };

    MyCommAgent.prototype.call_agent = function (agent_id) {
        if (this.__check_ws_state() &&
            this.__check_param(typeof agent_id === "string", "agent_id must be string") &&
            this.__check_param(agent_id != "", "agent_id can't be empty")) {
            this.__send({ "class": "agent", "method": "call_agent", params: { "agent_id": agent_id } });
        }
    };

    MyCommAgent.prototype.consult_agent = function (agent_id) {
        if (this.__check_ws_state() &&
            this.__check_param(typeof agent_id === "string", "agent_id must be string") &&
            this.__check_param(agent_id != "", "agent_id can't be empty")) {
            this.__send({ "class": "agent", "method": "consult_agent", params: { "agent_id": agent_id } });
        }
    };

    MyCommAgent.prototype.set_appdata = function (key, value) {
        if (this.__check_ws_state() &&
            this.__check_param(typeof key === "string", "key must be string") &&
            this.__check_param(typeof value === "string", "value must be string") &&
            this.__check_param(key != "", "key can't be empty") &&
            this.__check_param(value != "", "value can't be empty")
        ) {
            this.__send({ "class": "agent", "method": "set_appdata", params: { "key": key, "value": value } });
        }
    };

    MyCommAgent.prototype.get_appdata = function (key) {
        if (this.__check_ws_state() &&
            this.__check_param(typeof key === 'string', "key must be string") &&
            this.__check_param(key != "", "key can't be empty")
        ) {
            this.__send({ "class": "agent", "method": "get_appdata", params: { "key": key } });
        }
    };
    MyCommAgent.prototype.get_appdata2 = function (key, callback) {
        var ret = null;
        if (this.__check_param(typeof key === "string", "app key must be string") &&
            this.__check_param(key != "", "app key can't be empty")) {
            var url = "http://" + this.cti_server + "/sync_call/agent/get_appdata?session_id=" + this.session_id + "&key=" + key;
            if (null == callback) {
                ret = this.__cors_get(url, "get_appdata");
            } else {
                this.__async_cors_get(url, "get_appdata", callback);
            }
        }
        return ret;
    };

    MyCommAgent.prototype.eavesdrop = function (agent_id) {
        if (this.__check_ws_state() &&
            this.__check_param((typeof agent_id === 'string'), "agent_id must be string") &&
            this.__check_param(agent_id != "", "agent_id can't be empty")) {
            this.__send({ "class": "agent", "method": "eavesdrop", params: { "agent_id": agent_id } });
        }
    };

    MyCommAgent.prototype.secret_talk = function (agent_id) {
        if (this.__check_ws_state() &&
            this.__check_param((typeof agent_id === 'string'), "agent_id must be string") &&
            this.__check_param(agent_id != "", "agent_id can't be empty")) {
            this.__send({ "class": "agent", "method": "secret_talk", params: { "agent_id": agent_id } });
        }
    };

    MyCommAgent.prototype.insert = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "insert", params: null });
        }
    };

    MyCommAgent.prototype.break_agent = function (agent_id) {
        if (this.__check_ws_state() &&
            this.__check_param((typeof agent_id === 'string'), "agent_id must be string") &&
            this.__check_param(agent_id != "", "agent_id can't be empty")) {
            this.__send({ "class": "agent", "method": "break_agent", params: { "agent_id": agent_id } });
        }
    };

    MyCommAgent.prototype.logout_agent = function (agent_id) {
        if (this.__check_ws_state() &&
            this.__check_param((typeof agent_id === 'string'), "agent_id must be string") &&
            this.__check_param(agent_id != "", "agent_id can't be empty")) {
            this.__send({ "class": "agent", "method": "logout_agent", params: { "agent_id": agent_id } });
        }
    };

    MyCommAgent.prototype.intercept = function (agent_id) {
        if (this.__check_ws_state() &&
            this.__check_param(agent_id == undefined || (typeof agent_id === 'string'), "agent_id must be string")) {
            agent_id = (agent_id == undefined) ? "" : agent_id;
            this.__send({ "class": "agent", "method": "intercept", params: { "agent_id": agent_id } });
        }
    };

    MyCommAgent.prototype.send_im = function (type, subtype, to_id, payload) {
        if (this.__check_ws_state() &&
            this.__check_param(to_id != "", "to_id can't be empty") &&
            this.__check_param(payload != "", "content can't be empty") &&
            this.__check_param(payload.length < 2048, "msg length can't over 2048")) {
            this.__send({ "class": "agent", "method": "send_im", params: { "type": type, "subtype": subtype, "to_id": to_id, "payload": Base64.encode(payload) } });
        }
    };

    MyCommAgent.prototype.wrap_up_im = function (user_id) {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "wrap_up_im", params: { "user_id": user_id } });
        }
    };

    MyCommAgent.prototype.get_im_users = function () {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "get_im_users", params: null });
        }
    };
    MyCommAgent.prototype.confirm_preview = function (accept) {
        if (this.__check_ws_state()) {
            this.__send({ "class": "agent", "method": "confirm_preview", params: { "accept": accept } });
        }
    };
    MyCommAgent.prototype.__on_ws_open = function (evt) {
        if (this.agent_state = MyCommAgent.LOGINING) {
            this.__send({
                "class": "agent", method: "login",
                params: {
                    agent_id: this.agent_id, agent_name: this.agent_name, password: this.agent_password,
                    queue: this.agent_queue, is_leader: this.is_leader, org_id: this.org_id, work_id: this.work_id, agent_type: this.agent_type
                }
            });
        }
    };

    MyCommAgent.prototype.__on_ws_close = function (evt) {
        clearTimeout(this.heartbeat_timer);
        this.agent_state = MyCommAgent.LOGGED_OUT;
        this.__dispatch_event({ type: "error", params: "disconnect" });
    };

    MyCommAgent.prototype.__on_ws_message = function (evt) {
        this.__dispatch_event({ type: "received", params: evt.data });
        var message = JSON.parse(evt.data);
        if ("agent" == message["class"]) {
            if ("login_s" == message["method"]) {
                this.agent_state = MyCommAgent.AVAILABLE;
                var self = this;
                var param = message.params;
                this.session_id = param["session_id"];
                var heartbeat = param["heartbeat"];
                var timeout = heartbeat * 1000 / 3;
                this.heartbeat_timer = setTimeout(function () {
                    self.__send({ "class": "general", method: "heartbeat", params: null });
                    if (MyCommAgent.AVAILABLE == self.agent_state) {
                        self.heartbeat_timer = setTimeout(arguments.callee, timeout);
                    }
                }, timeout);
            } else if ("logout_s" == message["method"]) {
                clearTimeout(this.heartbeat_timer);
                this.agent_state = MyCommAgent.LOGGED_OUT;
            }
            this.__dispatch_event({ type: message["method"], params: message.params });
        } else if ("general" == message["class"]) {
            if ("heartbeat" == message["method"]) {
                this.__dispatch_event({ type: message["method"], params: message.params });
            }
        } else {
            this.__dispatch_event({ type: "error", params: evt.data });
        }
    };

    MyCommAgent.prototype.__on_ws_error = function (evt) {
        this.__dispatch_event({ type: "error", params: evt.data });
    };

    MyCommAgent.prototype.__send = function (data) {
        if (this.__websocket && this.__websocket.readyState == WebSocket.OPEN) {
            var sdata = JSON.stringify(data);
            this.__websocket.send(sdata);
            this.__dispatch_event({ type: "sent", params: sdata });
        } else {
            this.__dispatch_event({ type: "error", params: "no connection" });
        }
    };

    MyCommAgent.prototype.__dispatch_event = function (event) {
        var handler = this["on_" + event.type];
        var event1 = event;
        if (event.type == "recv_im") {
            var payload1 = Base64.decode(event.params.payload);
            event1.params.payload = payload1;
            if (handler) handler.apply(this, [event1]);
        } else
            if (handler) handler.apply(this, [event]);
    };

    MyCommAgent.prototype.__check_param = function (cond, msg) {
        if (!cond) {
            this.__dispatch_event({ type: "error", params: "Param error: " + msg });
            return false;
        }
        return true;
    };

    MyCommAgent.prototype.__check_ws_state = function () {
        if (!this.__websocket || this.__websocket.readyState != WebSocket.OPEN) {
            this.__dispatch_event({ type: "error", params: "Connection must be open" });
            return false;
        }
        return true;
    }

    MyCommAgent.prototype.__cors_get = function (url, action) {
        var result = null;
        try {
            var xhr = new XMLHttpRequest;
            xhr.open('GET', url, false);
            xhr.setRequestHeader("session_id", this.session_id);
            xhr.send(null);
            if (xhr.status == 200) {
                result = JSON.parse(xhr.responseText);
            } else {
                result = {
                    "class": "agent",
                    "method": action + "_f",
                    "err_num": xhr.status,
                    "err_desc": xhr.statusText
                };
            }
        } catch (error) {
            result = {
                "class": "agent",
                "method": action + "_f",
                "err_num": 416,
                "err_desc": "XMLHttpRequest failed!"
            };

        }
        return result;
    }


    MyCommAgent.prototype.__async_cors_get = function (url, action, callback) {
        if ("1"[0]) {//只允许IE8与较新的标准浏览器进入下面逻辑
            if (window.XDomainRequest) {
                var xdr = new XDomainRequest;
                xdr.onload = function () {
                    callback(JSON.parse(xdr.responseText));
                };
                xdr.onerror = function () {
                    callback({
                        "class": "agent",
                        "method": action + "_f",
                        "err_num": xdr.status,
                        "err_desc": xdr.statusText
                    });
                }
                xdr.open("GET", url);
                xdr.send();
            }
            else {
                var xhr = new XMLHttpRequest;
                xhr.open('GET', url, true);
                xhr.onreadystatechange =
                    function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == '200') {
                                callback(JSON.parse(xhr.responseText));
                            } else {
                                callback({
                                    "class": "agent",
                                    "method": action + "_f",
                                    "err_num": xhr.status,
                                    "err_desc": xhr.statusText
                                });
                            }
                        }
                    };
                xhr.send();
            }
        }
    }

    MyCommAgent.prototype.__unique = function (a) {
        var temp = new Array();
        a.sort();
        for (var i = 0; i < a.length; i++) {
            if (a[i] == a[i + 1]) {
                continue;
            }
            temp[temp.length] = a[i];
        }
        return temp;
    };

    MyCommAgent.LOGINING = 1;
    MyCommAgent.AVAILABLE = 2;
    MyCommAgent.LOGED_OUT = 3;
})();

