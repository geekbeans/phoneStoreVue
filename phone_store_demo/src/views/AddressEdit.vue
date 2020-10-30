<template>
    <van-address-edit
            :area-list="areaList"
            show-delete
            :address-info="addressInfo"
            save-button-text="修改"
            @save="onSave"
            @delete="onDelete"
    />
</template>
<!--save-button-text="修改"将‘保存’按钮文本改为‘修改’按钮文本-->
<!-- :address-info="addressInfo"是修改时原来填充的用户属性传递给修改页面-->
<script>
    import {Toast} from 'vant';
    import AreaList from '../api/area';

    export default {
        name: "AddressEdit",
        created() {
            //再将AdressList中传过来的字符串还原为json格式
            let data = JSON.parse(this.$route.query.item)
            //再将data赋给addressInfo
            this.addressInfo = data
            let index = data.address.indexOf('区')
            if (index < 0) index = data.address.indexOf('县')
            this.addressInfo.addressDetail = data.address.substring(index + 1)

        },
        data() {
            return {
                areaList: AreaList,
                addressInfo: null
            };
        },
        methods: {
            onSave(item) {
                //修改订单中信息并且保存
                //item中还是封装了用户新增的信息
                //先测试前端页面弹出的是否是修改后的数据
                //console.log(item)
                const _this = this
                axios.put("http://localhost:8181/address/updateAddress",item).then(function (resp) {
                    if (resp.data.code == 0){
                        let instance = Toast('添加成功');
                        setTimeout(() => {
                            instance.close();
                            _this.$router.push('/addressList')
                        }, 1000)
                    }
                })
            },
            onDelete() {
                //点击删除按钮则退回上一个页面
                history.go(-1);
            }
        },
    };
</script>

<style scoped>

</style>