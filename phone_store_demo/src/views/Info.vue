<!--支付详情页面-->
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
                <van-col style="color: red">￥{{data.amount - 10}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="20">运费</van-col>
                <van-col style="color: red">￥{{data.freight}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="20">合计</van-col>
                <van-col style="color: red">￥{{data.amount}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="20">订单状态</van-col>
                <van-col style="color: red">{{payStatusTrans(data.payStatus)}}</van-col>
            </van-cell>
        </van-cell-group>

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
            //订单详情中传入真实data数据
            const _this = this
            let orderId = this.$route.query.orderId
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
            payStatusTrans(status) {
                if (status == 0) return '您的订单未支付'
                if (status == 1) return '您的订单已支付'
            }
        }
    };
</script>

<style scoped>

</style>