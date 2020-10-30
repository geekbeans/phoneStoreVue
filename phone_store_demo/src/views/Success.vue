<template>
    <div>
        <van-image
                width="100"
                height="100"
                src="../static/paysuccess.png"
        />
        <van-cell :title="amount+'元'" style="font-size: 20px;"/>
        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express">
                <van-col span="21" style="font-size: 20px;">配送方式</van-col>
                <van-col style="font-size: 20px;">快递</van-col>
            </van-cell>
        </van-cell-group>
        <van-button type="primary" size="large" @click="showInfo">查看订单详情</van-button>
    </div>
</template>

<script>
    export default {
        name: "Success",
        //data()和created()两函数是将orderId订单编号和amount订单金额传到页面绑定显示
        data() {
            return {
                orderId: null,
                amount: null
            }
        },
        created() {
            this.orderId = this.$route.query.orderId
            this.amount = this.$route.query.amount
        },
        methods: {
            showInfo() {
                this.$router.push('/info?orderId=' + this.orderId)
            }
        }
    }
</script>

<style scoped>

</style>