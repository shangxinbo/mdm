
export default {
    username: /^[a-zA-Z0-9\u4e00-\u9fa5]{4,10}$/,
    password: {
        patten1: /^[a-zA-Z0-9]{6,18}$/,
        patten2: /[a-z]{1}/,
        patten3: /[A-Z]{1}/,
        patten4: /[0-9]{1}/
    }
}