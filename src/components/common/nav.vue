<template>
    <div class="navbox">
        <h1>
            <router-link to="/" title="geo方舟公有云" class="logo">
                <img :src="logo" alt="geo方舟公有云" />
            </router-link>
        </h1>
        <ul>
            <template v-if="type==0">
                <li :class="{active:path.startsWith('/operate/')}">
                    <router-link to="/operate/index">
                        <i class="icon icon01"></i>
                        <span>运营管理</span>
                    </router-link>
                </li>
                <li :class="{active:path.startsWith('/doc/index')}">
                    <router-link to="/doc/index">
                        <i class="icon icon05"></i>
                        <span>操作手册管理</span>
                    </router-link>
                </li>
            </template>
            <template v-if="type==1">
                <li v-if="yunying_role[1]" :class="{active:path.startsWith('/customer')}">
                    <router-link to="/customer/index">
                        <i class="icon icon04"></i>
                        <span>客户管理</span>
                    </router-link>
                </li>
                <li v-if="yunying_role[2]" :class="{active:path.startsWith('/project')}">
                    <router-link to="/project/index">
                        <i class="icon icon01"></i>
                        <span>项目管理</span>
                    </router-link>
                </li>
                <li v-if="yunying_role[3]" :class="{active:path.startsWith('/call')}">
                    <router-link to="/call/index">
                        <i class="icon icon02"></i>
                        <span>话务管理</span>
                    </router-link>
                </li>
                <li v-if="yunying_role[4]" :class="{active:path.startsWith('/expense')}">
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
                    <router-link to="/expense/project?type=customer">
                        <span>
                            <i class="icon icon03"></i>计费管理</span>
                    </router-link>
                    <ul v-show="path.startsWith('/expense')">
                        <li :class="{active:path.startsWith('/expense/project')}">
                            <router-link to="/expense/project?type=customer">
                                <span>
                                    <i class="icon icon03-1"></i>项目计费</span>
                            </router-link>
                        </li>
                        <li :class="{active:path.startsWith('/expense/seat')}">
                            <router-link to="/expense/seat?type=customer">
                                <span>
                                    <i class="icon icon03-2"></i>坐席计费</span>
                            </router-link>
                        </li>
                        <li :class="{active:path.startsWith('/expense/balance')}">
                            <router-link to="/expense/balance?type=in">
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
        data() {
            return {
                logo: logo,
                type: 2
            }
        },
        computed: {
            path() {
                return this.$route.path
            },
            yunying_role() {
                return this.$store.state.yunying_role
            }
        },
        created() {
            let user = JSON.parse(localStorage.getItem('user'))
            this.type = user.type
        }
    }

</script>