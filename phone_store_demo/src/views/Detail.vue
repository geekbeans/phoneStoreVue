<!--购物车结账详情页面-->
<template>
    <div class="goods">
        <van-cell-group class="goods-cell-group">
            <van-cell>
                <van-col span="16">
                    <van-icon name="manager" style="margin-right: 30px;"/>
                    收货人：{{data.buyerName}}
                </van-col>
                <van-col>
                    <van-icon name="phone-circle" style="margin-right: 30px;"/>
                    电话：{{data.tel}}
                </van-col>
                <van-col sapn="21" style="font-size: 13px;">
                    <van-icon name="location" style="margin-right: 30px;"/>
                    收货地址：{{data.address}}
                </van-col>
            </van-cell>
        </van-cell-group>

<!--手机图片信息展示区-->
        <van-card
                :num="data.num"
                :price="data.price"
                :desc="data.specs"
                :title="data.phoneName"
                :thumb="data.icon"
        />

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express">
                <van-col span="21">配送方式</van-col>
                <van-col>快递</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="20">商品金额</van-col>
                <van-col style="color: red">￥{{data.amount-10}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="20">运费</van-col>
                <van-col style="color: red">￥{{data.freight}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-submit-bar :price="data.amount*100" button-text="确认付款" @submit="onSubmit">
            <van-checkbox v-model="checked">全选</van-checkbox>
        </van-submit-bar>

    </div>
</template>

<script>
    import {
        Tag,
        Col,
        Icon,
        Cell,
        Toast,
        CellGroup,
        Swipe,
        SwipeItem,
        GoodsAction,
        GoodsActionIcon,
        GoodsActionButton
    } from 'vant';

    export default {
        components: {
            [Tag.name]: Tag,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [GoodsAction.name]: GoodsAction,
            [GoodsActionIcon.name]: GoodsActionIcon,
            [GoodsActionButton.name]: GoodsActionButton
        },
        created() {
            const _this = this
            let orderId = this.$route.query.orderId
            //先测试订单号是否在detail页面能拿得到alert(orderId)
            axios.get("http://localhost:8181/order/detail/"+orderId).then(function (resp) {
                _this.data = resp.data.data
            })
        },
        data() {
            return {
                data: '',
                checked: false
            };

        },
        methods: {
            onSubmit: function () {
                //确认付款订单按钮事件
                const _this = this
                let orderId = this.$route.query.orderId
                axios.put("http://localhost:8181/order/pay/"+orderId).then(function (resp) {
                        if(resp.data.code == 0){
                            let instance = Toast('支付跳转中...');
                            setTimeout(() => {
                                instance.close();
                                _this.$router.push('/success?orderId=' + _this.data.orderId + "&amount=" + (_this.data.amount))
                            }, 1000) //支付跳转时要将orderId传递
                        }
                })
            }
        }
    };
</script>

<style scoped>

</style>