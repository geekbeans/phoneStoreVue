<template>
    <van-address-edit
            :area-list="areaList"
            show-delete
            @save="onSave"
            @delete="onDelete"
    />
</template>
<!--show-delete是否有删除按钮-->
<!-- @save="onSave"点击保存按钮对应方法-->
<!--@delete="onDelete"点击删除按钮对应方法-->
<script>

    import {Toast} from 'vant';
    //引进api中的区域信息赋值为AreaList
    import AreaList from '../api/area';

    export default {
        name: "AddressNew",
        data() {
            return {
                //绑定到新增页面显示卡中
                areaList: AreaList
            };
        },
        methods: {
            onSave(item) {
                //item中还是封装了用户新增的信息
                //console.log(item)
                //将前端订单创建信息写入到后端数据库
                const _this = this
                axios.post("http://localhost:8181/address/createAddress",item).then(function (resp) {
                   if (resp.data.code == 0){
                       let instance = Toast('添加成功');
                       setTimeout(() => {
                           instance.close();
                           _this.$router.push('/addressList')
                       }, 1000) //操作结束后一秒跳到编辑地址页面
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