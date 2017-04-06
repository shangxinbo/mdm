<template>
    <div class="navbox">
        <h1>
            <router-link to="/" title="geo方舟公有云" class="logo">
                <img :src="logo" alt="geo方舟公有云" />
            </router-link>
        </h1>
        <ul>
            <template v-if="type==0">
                <li class="active">
                    <router-link to="/users/list/">
                        <i class="icon icon01"></i>
                        <span>运营管理</span>
                    </router-link>
                </li>
            </template>
            <template v-if="type==1">
                <li :class="{active:path.startsWith('/customer')}">
                    <router-link to="/customer/index">
                        <i class="icon icon04"></i>
                        <span>客户管理</span>
                    </router-link>
                </li>
                <li :class="{active:path.startsWith('/project')}">
                    <router-link to="/project/index">
                        <i class="icon icon01"></i>
                        <span>项目管理</span>
                    </router-link>
                </li>
                <li :class="{active:path.startsWith('/call')}">
                    <router-link to="/call/index">
                        <i class="icon icon02"></i>
                        <span>话务管理</span>
                    </router-link>
                </li>
                <li :class="{active:path.startsWith('/expense')}">
                    <router-link to="/expense/project">
                        <span>
                            <i class="icon icon03"></i>计费管理
                        </span>
                    </router-link>
                    <ul v-show="path.startsWith('/expense')">
                        <li :class="{active:path.startsWith('/expense/project')}">
                            <router-link to="/expense/project">
                                <span>
                                    <i class="icon icon03-1"></i>项目计费</span>
                            </router-link>
                        </li>
                        <li :class="{active:path.startsWith('/expense/seat')}">
                            <router-link to="/expense/seat">
                                <span>
                                    <i class="icon icon03-2"></i>坐席计费</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </template>
            <template v-if="type==2">
                <li class="active">
                    <router-link to="/customer/index">
                        <i class="icon icon04"></i>
                        <span>客户管理</span>
                    </router-link>
                </li>
            </template>
            <template v-if="type==3">
                <li :class="{active:path.startsWith('/project')}">
                    <router-link to="/project/index">
                        <span>
                            <i class="icon icon01"></i>项目管理</span>
                    </router-link>
                </li>
                <li :class="{active:path.startsWith('/call')}">
                    <router-link to="/call/index">
                        <span>
                            <i class="icon icon02"></i>话务管理</span>
                    </router-link>
                </li>
                <li :class="{active:path.startsWith('/expense')}">
                    <a>
                        <span>
                            <i class="icon icon03"></i>计费管理</span>
                    </a>
                    <ul>
                        <li :class="{active:path.startsWith('/expense/project')}">
                            <router-link to="/expense/project">
                                <span>
                                    <i class="icon icon03-1"></i>项目计费</span>
                            </router-link>
                        </li>
                        <li :class="{active:path.startsWith('/expense/seat')}">
                            <router-link to="/expense/seat">
                                <span>
                                    <i class="icon icon03-2"></i>坐席计费</span>
                            </router-link>
                        </li>
                        <li :class="{active:path.startsWith('/expense/balance')}">
                            <router-link to="/expense/balance">
                                <span>
                                    <i class="icon icon03-3"></i>余额管理</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </template>
            <template v-if="type==4">
                <li class="title" :class="{active:path.startsWith('/project')}">
                    <router-link to="/project/index">
                        <span>
                            <i class="icon icon01"></i>我的项目</span>
                    </router-link>
                </li>
                <li class="title" :class="{active:path.startsWith('/call')}">
                    <router-link to="/call/index">
                        <span>
                            <i class="icon icon02"></i>我的话务</span>
                    </router-link>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
    import logo from 'assets/img/logo.png'

    export default {
        data: function () {
            return {
                logo: logo,
                type: 2
            }
        },
        computed: {
            path: function () {
                return this.$route.path
            }
        },
        created: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            this.type = user.type
        }
    }

</script>