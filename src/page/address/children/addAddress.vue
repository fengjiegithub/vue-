<template>
  <div class="address_page" v-wechat-title="$route.meta.title">
    <div class="form">
      <input type="text" placeholder="收货人姓名(请使用真实姓名)" v-model="input.name" name="name">
      <div class="display-flex phone-wrap">
        <input type="text" placeholder="联系电话" v-model="input.phone" name="phone">
      </div>
      <!-- <v-distpicker :placeholders="placeholders" @selected="onSelected"></v-distpicker> -->
      <div class="distpicker-address-wrapper" v-if="address_id==null">
        <select name id @change="look($event)">
          <option value="--- 省 ---">--- 省 ---</option>
          <option
            v-for="item in province"
            :value="item.region_id"
            :key="item.region_id"
          >{{item.region_name}}</option>
        </select>
        <select name id @change="cityid($event)">
          <option value="--- 市 ---">--- 市 ---</option>
          <option
            v-for="item in city"
            :value="item.region_id"
            :key="item.region_id"
          >{{item.region_name}}</option>
        </select>
        <select name id @change="areaid($event)">
          <option value="--- 区 ---">--- 区 ---</option>
          <option
            v-for="item in area"
            :value="item.region_id"
            :key="item.region_id"
          >{{item.region_name}}</option>
        </select>
      </div>
      <div class="distpicker-address-wrapper" v-else>
        <select name id @change="look($event)">
          <option :value="provincedef.region_id">{{provincedef.region_name}}</option>
          <option
            v-for="item in province"
            :value="item.region_id"
            :key="item.region_id"
          >{{item.region_name}}</option>
        </select>
        <select name id @change="cityid($event)">
          <option :value="citydef.region_id">{{citydef.region_name}}</option>
          <option
            v-for="item in city"
            :value="item.region_id"
            :key="item.region_id"
          >{{item.region_name}}</option>
        </select>
        <select name id @change="areaid($event)">
          <option :value="districtdef.region_id">{{districtdef.region_name}}</option>
          <option
            v-for="item in area"
            :value="item.region_id"
            :key="item.region_id"
          >{{item.region_name}}</option>
        </select>
      </div>
      <input type="text" placeholder="详细地址" v-model="input.address" name="address">
      <input type="text" placeholder="请输入身份证号码" v-model="input.Idcard" name="Idcard">
      <div class="button">
        <button class="al-btn-big" @click="submitForm(input)">保存收货地址</button>
      </div>
    </div>
    <pop-Up v-if="isShow" @closeTip="isShow = false" :tiptitle="tiptitle"></pop-Up>
  </div>
</template>
<script>
// import VDistpicker from 'v-distpicker'
import { setTimeout } from "timers";
import popUp from "../../../components/common/popup";
export default {
  components: {
    popUp
  },
  data() {
    return {
      province: {}, //省
      city: {}, //市
      area: {}, //区
      provinceId: null, //省id
      cityId: null, //市id
      areaId: null, //区id
      provincedef: {}, //修改默认
      citydef: {
        //修改默认
        region_id: "",
        region_name: ""
      },
      districtdef: {
        //修改默认
        region_id: "",
        region_name: ""
      },
      placeholders: {
        province: "--- 省 ---",
        city: "--- 市 ---",
        area: "--- 区 ---"
      },
      input: {
        name: null,
        phone: null,
        address: null,
        Idcard: null
      },
      isShow: false, //弹出遮罩
      tiptitle: null, //提示
      address_id: null //收货地址id
    };
  },
  mounted: function() {
    this.address_id = this.$route.query.address_id; //上级页面传过来的地址id
    this.adet(this.address_id); //获取信息
    this.getress(); //获取省市区
  },
  methods: {
    adet(id) {
      if (id == null) {
      } else {
        var data = {
          address_id: id
        };
        this.$api.appdata.adet(data).then(res => {
          this.input.name = res.data.data.consignee;
          this.input.phone = res.data.data.tel;
          this.input.address = res.data.data.address;
          this.input.Idcard = res.data.data.paperNumber;
          var proid = res.data.data.province;
          var cityId = res.data.data.city;
          var districtId = res.data.data.district;
          //  获取省地址
          var data = {
            region_id: "1"
          };
          this.$api.appdata.getadd(data).then(res => {
            this.provincedef = res.data.data[proid - 2];
            this.provinceId = res.data.data[proid - 2].region_id;
          });
          // 获取市地址
          var data = {
            region_id: proid
          };
          this.$api.appdata.getadd(data).then(res => {
            for (var key in res.data.data) {
              if (cityId == res.data.data[key].region_id) {
                this.citydef.region_id = res.data.data[key].region_id;
                this.cityId = res.data.data[key].region_id;
                this.citydef.region_name = res.data.data[key].region_name;
              }
            }
          });
          // 获取地区地址
          var data = {
            region_id: cityId
          };
          this.$api.appdata.getadd(data).then(res => {
            for (var key in res.data.data) {
              if (districtId == res.data.data[key].region_id) {
                this.districtdef.region_id = res.data.data[key].region_id;
                this.areaId = res.data.data[key].region_id;
                this.districtdef.region_name = res.data.data[key].region_name;
              }
            }
          });
        });
      }
    },
    // 获取省
    getress: function() {
      var data = {
        region_id: "1"
      };
      this.$api.appdata.getadd(data).then(res => {
        this.province = res.data.data;
      });
    },
    //  获取市地址
    look: function(event) {
      this.citydef.region_name = "--- 市 ---";
      this.districtdef.region_name = "---区 ---";
      this.cityId = null;
      this.areaId = null;
      // this.districtdef.region_id="";
      this.provinceId = event.target.value;
      var data = {
        region_id: event.target.value
      };
      this.$api.appdata.getadd(data).then(res => {
        this.city = res.data.data;
      });
    },
    // 获取区县地址
    cityid: function(event) {
      this.districtdef.region_name = "---区 ---";
      this.areaId = null;
      this.cityId = event.target.value;
      var data = {
        region_id: event.target.value
      };
      this.$api.appdata.getadd(data).then(res => {
        this.area = res.data.data;
      });
    },
    areaid: function(event) {
      this.areaId = event.target.value;
    },
    //  onSelected(data) {
    //      this.placeholders.province=data.province.value;
    //      this.placeholders.city=data.city.value;
    //      this.placeholders.area=data.area.value;
    //  },
    submitForm(input) {
      var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(12[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      var idcard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      var that = this;
      if (this.address_id == null) {
        if (input.name == null || input.name == "") {
          this.isShow = true;
          this.tiptitle = "请输入姓名";
        } else if (input.phone == null || input.phone == "") {
          this.isShow = true;
          this.tiptitle = "请输入手机号";
        } else if (!myreg.test(input.phone)) {
          this.isShow = true;
          this.tiptitle = "请输入有效的手机号";
        } else if (this.provinceId == null) {
          this.isShow = true;
          this.tiptitle = "请选择省";
        } else if (this.cityId == null) {
          this.isShow = true;
          this.tiptitle = "请选择市";
        } else if (this.areaId == null) {
          this.isShow = true;
          this.tiptitle = "请选择区";
        } else if (input.address == null || input.address == "") {
          this.isShow = true;
          this.tiptitle = "请输入详细地址";
        } else if (this.input.Idcard == null || input.Idcard == "") {
          this.isShow = true;
          this.tiptitle = "请输入身份证号码";
        } else if (!idcard.test(this.input.Idcard)) {
          this.isShow = true;
          this.tiptitle = "请输入有效的身份证";
        } else {
          var data = {
            consignee: this.input.name,
            address: this.input.address,
            tel: this.input.phone,
            province: this.provinceId,
            city: this.cityId,
            district: this.areaId,
            paperNumber: this.input.Idcard
          };
          this.$api.appdata.address(data).then(res => {
            this.$router.replace({ path: "/addressList" });
            this.$router.go(-1);
          });
        }
      } else {
        if (input.name == null || input.name == "") {
          this.isShow = true;
          this.tiptitle = "请输入姓名";
        } else if (input.phone == null || input.phone == "") {
          this.isShow = true;
          this.tiptitle = "请输入手机号";
        } else if (!myreg.test(input.phone)) {
          this.isShow = true;
          this.tiptitle = "请输入有效的手机号";
        } else if (this.provinceId == "" || this.provinceId == null) {
          this.isShow = true;
          this.tiptitle = "请选择省";
        } else if (this.cityId == null || this.cityId == "") {
          this.isShow = true;
          this.tiptitle = "请选择市";
        } else if (this.areaId == "" || this.areaId == null) {
          this.isShow = true;
          this.tiptitle = "请选择区";
        } else if (input.address == null || input.address == "") {
          this.isShow = true;
          this.tiptitle = "请输入详细地址";
        } else if (this.input.Idcard == null || input.Idcard == "") {
          this.isShow = true;
          this.tiptitle = "请输入身份证号码";
        } else if (!idcard.test(this.input.Idcard)) {
          this.isShow = true;
          this.tiptitle = "请输入有效的身份证";
        } else {
          var data = {
            address_id: this.address_id,
            consignee: this.input.name,
            address: this.input.address,
            tel: this.input.phone,
            province: this.provinceId,
            city: this.cityId,
            district: this.areaId,
            paperNumber: this.input.Idcard
          };
          this.$api.appdata.updateress(data).then(res => {
            this.$router.replace({ path: "/addressList" });
            this.$router.go(-1);
          });
        }
      }
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.address_page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 204;
  overflow-y: auto;
}
.form {
  background: #fff;
  input {
    width: 100%;
    height: 1.6rem;
    border: 0;
    outline: none;
    display: block;
    border-bottom: 1px solid #f4f4f4;
    padding: 0 0.8rem;
    background: #fff;
    font-size: 0.58rem;
    color: #666;
  }
  .button {
    padding: 0.4rem;
    text-align: center;
    margin: 0 auto;
  }
  .al-btn-big {
    padding: 0.4rem 1.8rem;
    font-size: 0.62em;
    background: #d81f06;
    color: #fff;
  }

  // 地图样式
  .distpicker-address-wrapper {
    padding: 0 0.8rem;
    border-bottom: 1px solid #f4f4f4;
  }
  .distpicker-address-wrapper /deep/ select {
    padding: 0 0.2rem;
    font-size: 0.58rem;
    width: 100%;
    max-width: 4.5rem;
    text-align: center;
    border: 0;
    outline: none;
    border: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    text-align: center;
    overflow: hidden;
  }
}
</style>


