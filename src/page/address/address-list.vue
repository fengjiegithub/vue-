<template>
  <div v-wechat-title="$route.meta.title">
    <div class="mescroll">
      <ul class="list">
        <li
          class="selected"
          :class="{addactive:index==atab}"
          v-for="(item,index) in addressList"
          :key="index"
        >
          <div class="addinfo display-flex" @click="choose(item.address_id,index)">
            <div class="adder-icon"></div>
            <div class="address">
              <div class="namePhone">
                <span>{{item.consignee}}</span>
                <span class="phone">{{item.tel}}</span>
              </div>
              <div
                class
              >{{item.province_name}} {{item.city_name}} {{item.district_name}}{{item.address}}</div>
            </div>
          </div>
          <div class="display-flex operation">
            <div class="display-flex">
              <router-link
                :to="{path:'/addressList/addAddress',query:{address_id:item.address_id}}"
                class
              >
                <div class="display-flex editor">编辑</div>
              </router-link>
              <div class="display-flex delete" @click="detress(item.address_id)">删除</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <footer class="foot">
      <router-link to="/addressList/addAddress" style="display:block">
        <div class="foot-addr">新建地址</div>
      </router-link>
    </footer>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      addressList: [], //数据
      atab: 0 //切换
    };
  },
  computed: {
    ...mapState(["userInfo", "addindex"])
  },
  created(){
    this.initData();
  },
  mounted: function() {
    this.atab = this.addindex;
  },
  methods: {
    ...mapMutations(["CHOOSE_ADDRESS","OUT_LOGIN"]),
    initData() {
      this.addressList = [];
      if (this.userInfo && this.userInfo.id) {
        this.$api.appdata.addressList().then(res => {
          if (res.data.status.succeed == 0) {
                if (res.data.status.error_code == 100) {
              this.$api.appdata.signout().then(res => {
                if (res.data.status.succeed == 1) {
                  this.OUT_LOGIN();
                }
              });
            }else if(res.data.data=="收货地址为空！"){
              this.addressList
            }
          } else {
            this.addressList = res.data.data;
          }
        });
      }
    },
    detress(id) {
      // if (this.addressList.length <= 1) {
      //   return false;
      // } else {
        var ressid = id;
        MessageBox.confirm("", {
          message: "是否删除地址",
          title: "操作确认",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(action => {
            if (action == "confirm") {
              //确认的回调
              var data = {
                address_id: id
              };
              this.$api.appdata.detress(data).then(res => {
                if (res.data.status.succeed == 1) {
                  this.initData();
                }
              });
            }
          })
          .catch(err => {
            if (err == "cancel") {
              //取消的回调
            }
          });
      // }
    },
    // 选择
    choose(aid, index) {
      this.atab = index;
      this.CHOOSE_ADDRESS({ address: aid, index: this.atab });
      this.$router.go(-1);
    }
  },
  watch: {
    $route(to, from) {
      if (from.path == "/addressList/addAddress") {
        this.initData();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mescroll {
  position: fixed;
  top: 0;
  bottom: 0rem;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  background: #f2f2f2;
}
.list {
  margin: 0.4rem 0.4rem 0 0.4rem;
}
.selected {
  align-items: center;
  padding: 0.4rem;
  border-bottom: 1px solid #d9d9d9;
  overflow: hidden;
  background: #fff;
  margin-bottom: 0.6rem;
  box-sizing: border-box;
}
.addactive {
  border: 0.02667rem solid #333;
}
.selected .adder-icon {
  width: 1rem;
  height: 1rem;
  background: url(../../../static/images/address.png) center 0 no-repeat;
  // background-position: 0.2rem 0.2rem;
  background-size: 0.9rem;
}
.selected .adder-go {
  width: 1rem;
  height: 1rem;
  background: url(../../../static/images/recen.png) center 0 no-repeat;
  background-size: 0.9rem;
}
.operation {
  color: #666;
  padding: 0.4rem 0 0;
  float: right;
  .delete {
    font-size: 0.54rem;
    color: #666;
  }
  .editor {
    font-size: 0.54rem;
    color: #666;
    margin-right: 0.8rem;
  }
}
.address {
  width: 100%;
  font-size: 0.54rem;
  color: #515151;
  padding: 0 0.4rem;
  > div {
    margin-top: 0.4rem;
  }
  .namePhone {
    font-size: 0.62rem;
    span:first-child {
      margin-right: 0.4rem;
    }
    .phone {
      float: right;
    }
  }
}
.foot {
  position: fixed;
  bottom: 0;
  height: 2rem;
  width: 100%;
  .foot-addr {
    text-align: center;
    font-size: 0.63rem;
    color: #fff;
    line-height: 2rem;
    background: #d81f06;
  }
}

.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.3s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>


