<template>
    <div class="page" v-show="total>1">
        <a class="prev" :class="{disabled:current==1}" @click="goPage(current-1)" href="javascript:void(0);">上一页</a>
        <a href="javascript:void(0);" :class="{active:current==1}" @click="goPage(1)">1</a>
        <template v-if="total>7">
            <template v-if="current<=4">
                <a href="javascript:void(0);" :class="{active:current==2}" @click="goPage(2)">2</a>
                <a href="javascript:void(0);" :class="{active:current==3}" @click="goPage(3)">3</a>
                <a href="javascript:void(0);" :class="{active:current==4}" @click="goPage(4)">4</a>
                <a href="javascript:void(0);" :class="{active:current==5}" @click="goPage(5)">5</a>
                <span>...</span>
                <a href="javascript:void(0);" :class="{active:current==total}" @click="goPage(total)">{{total}}</a>
            </template>
            <template v-else>
                <template v-if="current<=(total-4)">
                    <span>…</span>
                    <a href="javascript:void(0);" @click="goPage(current-1)">{{current-1}}</a>
                    <a href="javascript:void(0);" class="active" @click="goPage(current)">{{current}}</a>
                    <a href="javascript:void(0);" @click="goPage(parseInt(current)+1)">{{parseInt(current)+1}}</a>
                    <a href="javascript:void(0);" @click="goPage(parseInt(current)+2)">{{parseInt(current)+2}}</a>
                    <span>…</span>
                    <a href="javascript:void(0);" @click="goPage(total)">{{total}}</a>
                </template>
                <template v-else>
                    <span>…</span>
                    <a href="javascript:void(0);" :class="{active:current==total-4}" @click="goPage(total-4)">{{total-4}}</a>
                    <a href="javascript:void(0);" :class="{active:current==total-3}" @click="goPage(total-3)">{{total-3}}</a>
                    <a href="javascript:void(0);" :class="{active:current==total-2}" @click="goPage(total-2)">{{total-2}}</a>
                    <a href="javascript:void(0);" :class="{active:current==total-1}" @click="goPage(total-1)">{{total-1}}</a>
                    <a href="javascript:void(0);" :class="{active:current==total}" @click="goPage(total)">{{total}}</a>
                </template>
            </template>
        </template>
        <template v-else>
            <a href="javascript:void(0);" @click="goPage(2)" :class="{active:current==2}">2</a>
            <a v-if="total>2" href="javascript:void(0);" :class="{active:current==3}" @click="goPage(3)">3</a>
            <a v-if="total>3" href="javascript:void(0);" :class="{active:current==4}" @click="goPage(4)">4</a>
            <a v-if="total>4" href="javascript:void(0);" :class="{active:current==5}" @click="goPage(5)">5</a>
            <a v-if="total>5" href="javascript:void(0);" :class="{active:current==6}" @click="goPage(6)">6</a>
            <a v-if="total>6" href="javascript:void(0);" :class="{active:current==7}" @click="goPage(7)">7</a>
        </template>
        <a class="next" href="javascript:void(0);" v-show="current<total" @click="goPage(parseInt(current)+1)">下一页</a>
    </div>
</template>
<script>
    import router from 'src/router'
    export default {
        props: ['total', 'current'],
        methods: {
            goPage: function (page) {
                this.$emit('jump',page)
            }
        }
    }
</script>
