 <template>
    <div>
        <!--layout布局-->
        <van-row>
            <van-col span="24">
                <!--嵌套Tab标签页,@click="onClick"事件对应顶部导航栏的切换-->
                <van-tabs v-model:active="active" @click="onClick">
                    <!--index从1开始的注意-->
                    <!--v-for="index in categories.length"遍历 categories中的内容，为卡片中数据显示做准备-->
                    <!--:title="categories[index-1].name"取出标题：魅焰红等名字进行轮换，为卡片中数据显示做准备-->
                    <van-tab v-for="index in categories.length" :title="categories[index-1].name" class="tab">
                        <!--嵌套card商品卡片区 -->
                        <!--在phone数组中遍历出各个属性item进行展示-->
                        <van-card v-for="(item,index) in phones"
                                  :price="item.price"
                                  :desc="item.desc"
                                  :title="item.title"
                                  :thumb="item.thumb"
                        >
                            <!--遍历item中的tag进行展示-->
                            <template #tags>
                                <van-tag plain type="danger" v-for="tag in item.tag" color="#f2826a"
                                         style="margin-left: 5px">{{tag.name}}
                                </van-tag>
                            </template>
                            <template #footer>
                                <van-button round type="info" size="small" @click="buy(index)">购买</van-button>
                            </template>
                        </van-card>

                    </van-tab>
                </van-tabs>
            </van-col>

        </van-row>

        <!--商品规格，通过插槽定制，用于点击购买时，弹出来的详细商品信息卡片-->
        <!--v-model="show"默认展示-->
        <van-sku
                v-model="show"
                :sku="sku"
                :goods="goods"
                :hide-stock="sku.hide_stock"
                @buy-clicked="onBuyClicked"

        >
            <!-- 自定义 sku-header-price -->
            <template #sku-header-price="props">
                <div class="van-sku__goods-price">
      <span class="van-sku__price-symbol">￥</span
      ><span class="van-sku__price-num">{{props.price}}</span>
                </div>
            </template>

            <!-- 自定义 sku actions -->
            <template #sku-actions="props">
                <div class="van-sku-actions">
                    <van-button square size="large" type="warning" @click="onPointClicked">
                        积分兑换
                    </van-button>
                    <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
                    <van-button
                            square
                            size="large"
                            type="danger"
                            @click="props.skuEventBus.$emit('sku:buy')"
                    >
                        买买买
                    </van-button>
                </div>
            </template>
        </van-sku>
    </div>

</template>

<script>
    import {
        Toast,
        PullRefresh,
        Swipe,
        SwipeItem
    } from 'vant';

    export default {
        comments: {
            [PullRefresh.name]: PullRefresh,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem
        },
        //  写进的数据展示内容data()
        data() {
            return {
                categories: '',
                phones: '',
                //自定义将sku的展示关闭
                show: false,
                sku: '',
                goods: ''
            }
        },
        created() {
            //定义全局变量this
            const _this = this
            //前后端数据对接要在create方法里去写
            //在进行前端后端页面交互时需要解决跨域问题，要先写一个配置crosConfig
            axios.get("http://localhost:8181/phone/index").then(function (resp) {
                //定义后的全局变量this就不会成为调用函数里的this
                _this.categories = resp.data.data.categories
                _this.phones = resp.data.data.phones
            })
        },
        //点击切换横向展示栏事件
        //一定要注意的是，定义的方法必须写在methods中
        methods: {
            // onClick(index)点击事件方法用于切换四个导航选项
            onClick(index) {
                //切换极光蓝...等需要在onclick函数中调用
                //对应于后端方法为findByCategoryType
                //alert(index)
                const _this = this
                //this.categories[index].type拿到的是每页商品切换的标号
                axios.get("http://localhost:8181/phone/findByCategoryType/"+this.categories[index].type).then(function (resp) {
                    _this.phones = resp.data.data
                })
            },
            buy(index) {
                //点击购买弹出的小框提示，后端用的是findBySpecsId的方法
                this.show = true
                const _this = this
                //找出phoneId方便对下一步进行拼接
               // 此为点击购买时的phoneId: this.phones[index].id
                //可以通过前端f12查看
                axios.get("http://localhost:8181/phone/findSpecsByPhoneId/"+this.phones[index].id).then(function (resp) {
                    //console.log(resp)
                    //附上数据库中真实数据
                    _this.goods = resp.data.data.goods
                    _this.sku = resp.data.data.sku
                })
            },
            //点击购买按钮跳到付款信息页面
            //item中包含购买时所选择的商品信息，包括数量，规格，型号这些
            onBuyClicked(item) {
                //console.log(item)
                //在store的index.js中有state域
                this.$store.state.specsId = item.selectedSkuComb.s1
                this.$store.state.quantity = item.selectedNum
                //跳到页面
                this.$router.push('/addressList')
            }
        },
    }
</script>