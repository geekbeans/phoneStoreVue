<template>
    <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="onselect"
    />
</template>

<script>

    import {Toast} from 'vant';
    export default {
        data() {
            return {
                chosenAddressId: '1',
                list: ''
            };
        },
        created() {
            //在此create方法中写创建订单后跳转到订单信息创建页面
            const _this = this
            axios.get("http://localhost:8181/address/list").then(function (resp) {
                _this.list = resp.data.data
            })
        },
        methods: {
            //新增地址按钮方法
            onAdd() {
                this.$router.push('/addressNew');
            },
            //编辑地址按钮方法
            onEdit(item) {
                //console.log(item)
                //先将item中为json格式的用户信息转换为字符串
                let data = JSON.stringify(item)
                //将字符串数据传给addressEdit页面
                this.$router.push({path: '/addressEdit', query: {item: data}})
            },
            onselect(item) {
                //生成订单
                //console.log(item)
                //先封装对象名，弹出的item中没有specsId和quantity属性，因为他们存在全局变量中
                //位置位于Home页面，所以要对item进行拼装
                const _this = this
                let orderForm = {
                    name: item.name,
                    tel: item.tel,
                    address: item.address,
                    specsId: this.$store.state.specsId,
                    quantity: this.$store.state.quantity
                }
                axios.post("http://localhost:8181/order/createOrder",orderForm).then(function (resp) {
                    //console.log(resp)
                    if (resp.data.code == 0){
                        let instance = Toast('下单成功');
                        setTimeout(() => {
                            instance.close();
                            _this.$router.push('/detail?orderId='+resp.data.data.orderId)
                        }, 1000) //再去detail页面填充下订单的数据,注意要将orderId带过去
                    }
                })
            }
        },
    };
</script>

<style scoped>

</style>