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