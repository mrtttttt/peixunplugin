<template>
    <div class="publish">
      <div>
        <x-header :left-options="{backText: ''}" id="x-header">发布</x-header>
      </div>
      <!--基本信息-->
      <group>
        <x-input placeholder="标题 品类品牌型号都是买家喜欢搜索的" v-model="goodsTitle"> </x-input>
        <x-textarea :max="200" placeholder="描述一下宝贝的细节或故事"  :height="150" :rows="8" :cols="30" v-model="goodsInfo"> </x-textarea>
        <!--img开始-->
        <div class="imgUpload">

        </div>
        <input type="hidden" v-model="gphoto" />
        <!--img结束-->
      <!--分类-->
        <x-input title="价格" placeholder="0.0" v-model="price" :min="0" type="number"> </x-input>
        <popup-picker :title="title" :data="list" v-model="value" placeholder="选择分类"> </popup-picker>
        <toast v-model="showTip" type="text" width="13em">{{tipMessage}}</toast>
      </group>
      <div class="publishBox">
        <button type="button" @click="submit" class="publishBtn">确定发布</button>
      </div>
    </div>
</template>

<script>

  import { XTextarea, Group, XInput ,XHeader, PopupPicker, Picker, TransferDom, Actionsheet, XSwitch, Toast ,XButton } from 'vux'
  import XNumber from "vux/src/components/x-number/index";
  import imgUpload from "@/assets/js/imgUpload.js"

  export default {
    name:'publish',
    data:function () {
        return {
          goodsTitle:"",
          goodsInfo:"",
          price:"",
          gphoto:"",
          title: '选择分类',
          list: [[]],
          showPopupPicker: false,
          value:["衣服"],
          show7: false,
          menu7: {
            menu1: '相机',
            menu2: '从相册选择',
          },
          showTip:false,
          tipMessage:"",
          msg: 'Hello World!',
          maxSize: 10240000,
          maxCount: 5,
          filesArr: []
        }
    },
    components: {
      XNumber,
      XTextarea,
      Group,
      XInput,
      XHeader,
      PopupPicker,
      Picker,
      Actionsheet,
      XSwitch,
      Toast,XButton
    },
    directives: {
      TransferDom
    },
    mounted:function () {
      var that=this;
      fetch("/ajax/category/select").then(function (e) {
        return e.json()
      }).then(function (e) {
        for(let i in e){
          that.list[0].push(e[i].cname);
        }
        that.value.splice(0,1,e[0].cname)
      })
      imgUpload.createView(document.querySelector(".imgUpload"))
      document.querySelector(".addInput").addEventListener("change",function () {
        imgUpload.up("/ajax/goods/upload",function (e) {
          that.gphoto+=e+";";

        })
      })
    },
    methods: {
      submit(){

        if(this.goodsTitle==""){
          this.showTip=true;
          this.tipMessage="标题不能为空"
          return ;
        }else if(this.price==""){
          this.showTip=true;
          this.tipMessage="价格不能为空"
          return ;
        }else{
          var that=this;
          this.gphoto=this.gphoto.slice(0,-1);
          fetch("/ajax/goods/add",{
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "gtitle="+that.goodsTitle+"&ginfo="+that.goodsInfo+"&gphoto="+that.gphoto+"&price="+that.price+"&category="+that.value[0]+"&uid="+sessionStorage.getItem("userFront")
          }).then(function (e) {
            return e.text();
          }).then(function (e) {
            if(e=="ok"){
              that.showTip=true;
              that.tipMessage="发布成功，将返回首页";
              setTimeout(function () {
                that.$router.push("/")
              },1200)
            }
          })
        }

      },
      click (key) {
        if(key == "menu1"){
          let evt = new MouseEvent("click");
          this.$refs.camera.dispatchEvent(evt);
        }else if(key == "menu2"){
          let evt = new MouseEvent("click");
          this.$refs.photo.dispatchEvent(evt);
        }
      },

    }
  }
</script>
<style type="less">
.publish .weui-cells{
  margin-top: 0;border: none;padding-bottom: 50px;
font-size: 16px;}
 .publish .vux-x-input{padding: 0 15px;}
 .publish .vux-x-input input{border: none;font-size: 14px;color:#333;padding-left: 0;padding-right: 0;margin-bottom: 0}
 .publish .vux-x-textarea textarea{border: none;font-size: 14px;color:#333;padding:0;margin-bottom: 0}
  .publishBox{
    width: 100%;height: 50px;position: fixed;bottom: 0;left: 0;background: #fff;
  }
 .publishBtn{width: 84%;height: 40px;background: #ff8053;color: #fff;border-radius: 5px;font-size: 16px;
    position: absolute;bottom: 5px;left: 7%;
 }

.picker-buttons {
  margin: 0 15px;
}
  /*图片上传*/
.allImg{
  padding: 0 15px;width: 100%;display: flex;flex-wrap: wrap;justify-content: space-between;
}
/*.allImg input{display:none;}*/

.imgBox{width: 90px;height: 90px;position: relative;margin-right: 6px;margin-bottom: 6px }

/*.addImg{background: #F4F5F9;}*/
/*.addInput{position: absolute;top: 0;left:0;display: block;width: 100%;height: 100%;opacity: 0;z-index: 5}*/
/*.addImg:before,.addImg:after{*/
  /*content: "";display: block;width: 40%;height: 2px;background: #ccc;position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto;*/
/*}*/
/*.addImg:before{transform: rotate(90deg)}*/

  /*.delImg{width: 30px;height: 30px;background: #fff;position: absolute;top: -5px;right: -5px;border-radius: 50%}*/
  /*.delImg:before,.delImg:after{content:'';display:block;width: 50%;height: 2px;background: #fff;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;z-index: 5}*/
  /*.delImg:before{transform: rotate(45deg)}*/
  /*.delImg:after{transform: rotate(-45deg)}*/
  /**/
  /*.delImg div{width: 22px;height: 22px;background: #FF8053;border-radius: 50%;margin: auto;position: absolute;top: 0;left: 0;right:0;bottom: 0;}*/
  /*.imgProcess{width:100%;height:5px;position:absolute;bottom:0;left:0}*/
  /*.imgBar{width:50%;height:5px;background:#67e867}*/

.weui-label{color:#666;}
  .weui-toast__content{color: #fff;}

.weui-uploader__bd {
  margin-bottom: -4px;
  margin-right: -9px;
  overflow: hidden;
}

.weui-uploader__input-box {
  float: left;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 77px;
  height: 77px;
  border: 1px solid #d9d9d9;
}

.weui_uploader_file {
  float: left;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 79px;
  height: 79px;
  background: no-repeat center center;
  background-size: cover;
  list-style: none;
}

.weui-uploader__input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.weui-uploader__input-box:before {
  width: 2px;
  height: 39.5px;
}

.weui-uploader__input-box:after {
  width: 39.5px;
  height: 2px;
}

.weui-uploader__input-box:after,
.weui-uploader__input-box:before {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #d9d9d9;
}


</style>
