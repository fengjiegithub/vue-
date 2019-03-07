<template>
  <div class="list" v-wechat-title="$route.meta.title">
    <ul class="nav display-flex">
      <li v-for="(demo,index) in label" :class="{active:index == tabType}" :key="index">
        <span @click="changeTab(index,demo.tabtype)">{{demo.text}}</span>
      </li>
    </ul>
    <!-- 菜单数据 -->
    <mescroll-vue
      ref="mescroll0"
      v-show="tabType==0"
      :down="getMescrollDown(0)"
      :up="mescrollUp(0)"
      @init="mescrollInit0"
    >
      <ul class="data-list" id="dataList0">
        <li v-for="(item,index) in tab0.list" :key="index" >
          <!-- <div v-if="item.order_status!='无效'"> -->
          <div class="createtime btn-right display-flex">
            <span>{{item.add_time}}</span>
            <span
              class="order-status"
            >{{item.order_status}} {{item.pay_status}} {{item.shipping_status}}</span>
          </div>
          <div class="pros" v-for="items in item.goods" :key="items.order_sn">
            <router-link :to="{path:'/orderlist/detail',query:{id:item.order_id}}">
              <div class="display-flex">
                <div class="pro-img">
                  <img :src="items.goods_thumb	" alt>
                </div>
                <div class="title">
                  <p class="line-clamp2 name">{{items.goods_name}}</p>
                  <div class="display-flex">
                    <div class="pro-price">￥{{items.goods_price}}</div>
                    <div class="number">X{{items.goods_number}}</div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="real btn-right">
            <div class="display-flex price-num-wrap">
              <div>共{{item.goods_number}}件商品</div>
              <div class="money">应付金额:￥{{item.amount}}</div>
            </div>
          </div>
          <div class="display-flex">
            <div class="right-button">
              <div
                v-if="item.order_status=='未确认'&&item.pay_status=='未付款'&&item.shipping_status=='未发货'"
              >
                <span
                  class="al-btn al-btn-primary-hollow cancel"
                  @click="cancelord(item.order_id)"
                >取消订单</span>
                <span class="al-btn al-btn-primary-hollow al-btn-border-radius" @click="paymon(item.order_id)">立即付款</span>
              </div>
               <div
                v-if="item.order_status=='已确认'&&item.pay_status=='未付款'&&item.shipping_status=='未发货'"
              >
                <span
                  class="al-btn al-btn-primary-hollow cancel"
                  @click="cancelord(item.order_id)"
                >取消订单</span>
                <span class="al-btn al-btn-primary-hollow al-btn-border-radius" @click="paymon(item.order_id)">立即付款</span>
              </div>
               <div
                v-if="item.order_status=='已确认'&&item.pay_status=='已付款'&&item.shipping_status=='未发货'"
              >
               <span class="al-btn al-btn-primary-hollow cancel" @click="after(item.order_id)">申请退款</span>
              </div>
              <div
                v-if="item.order_status=='已确认'&&item.pay_status=='已付款'&&item.shipping_status=='已发货'"
              >
                <span class="al-btn al-btn-primary-hollow cancel">申请退款</span>
                <span class="al-btn al-btn-primary-hollow cancel">查看物流</span>
                <span class="al-btn al-btn-primary-hollow cancel">确认收货</span>
              </div>
              <div
                v-if="item.order_status=='已确认'&&item.pay_status=='已付款'&&item.shipping_status=='配货中'"
              >
                <span class="al-btn al-btn-primary-hollow cancel" @click="after(item.order_id)">申请退款</span>
              </div>
              <div
                v-if="item.order_status=='已取消'&&item.pay_status=='未付款'&&item.shipping_status=='未发货'"
              >
                <!-- <span class="al-btn al-btn-primary-hollow cancel">删除订单</span> -->
              </div>
                <div
                v-if="item.order_status=='退货中'&&item.pay_status=='已付款'&&item.shipping_status=='未发货'"
              >
               <span class="al-btn al-btn-primary-hollow cancel" @click="cancel(item.refund_sn)">撤销售后</span>
               <span class="al-btn al-btn-primary-hollow cancel" @click="detref(item.refund_sn)">退款详情</span>
              </div>
              
            </div>
          </div>
          <!-- </div> -->
        </li>
      </ul>
    </mescroll-vue>

    <mescroll-vue
      ref="mescroll1"
      v-show="tabType==1"
      :down="getMescrollDown(1)"
      :up="mescrollUp(1)"
      @init="mescrollInit1"
    >
      <ul class="data-list" id="dataList1">
        <li v-for="(item,index) in tab1.list" :key="index">
          <div>
            <div class="createtime btn-right display-flex">
              <span>{{item.add_time}}</span>
              <span
                class="order-status"
              >{{item.order_status}} {{item.pay_status}} {{item.shipping_status}}</span>
            </div>
            <div class="pros" v-for="(items,index) in item.goods" :key="index">
              <router-link :to="{path:'/orderlist/detail',query:{id:item.order_id}}">
                <div class="display-flex">
                  <div class="pro-img">
                    <img :src="items.goods_thumb	" alt>
                  </div>
                  <div class="title">
                    <p class="line-clamp2 name">{{items.goods_name}}</p>
                    <div class="display-flex">
                      <div class="pro-price">￥{{items.goods_price}}</div>
                      <div class="number">X{{items.goods_number}}</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="real btn-right">
              <div class="display-flex price-num-wrap">
                <div>共{{item.goods_number}}件商品</div>
                <div class="money">应付金额:￥{{item.amount}}</div>
              </div>
            </div>
            <div class="display-flex">
              <div class="right-button">
                <span
                  class="al-btn al-btn-primary-hollow cancel"
                  @click="cancelord(item.order_id)"
                  v-if="item.order_status=='未确认'||item.order_status=='已确认'"
                >取消订单</span>
                <span
                  class="al-btn al-btn-primary-hollow al-btn-border-radius"
                  v-if="item.pay_status=='未付款'"
                 @click="paymon(item.order_id)">立即付款</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </mescroll-vue>

    <mescroll-vue
      ref="mescroll2"
      v-show="tabType==2"
      :down="getMescrollDown(2)"
      :up="mescrollUp(2)"
      @init="mescrollInit2"
    >
      <ul class="data-list" id="dataList2">
        <li v-for="(item,index) in tab2.list" :key="index">
          <div>
            <div class="createtime btn-right display-flex">
              <span>{{item.add_time}}</span>
              <span
                class="order-status"
              >{{item.order_status}} {{item.pay_status}} {{item.shipping_status}}</span>
            </div>
            <div class="pros" v-for="(items,index) in item.goods" :key="index">
              <router-link :to="{path:'/orderlist/detail',query:{id:item.order_id}}">
                <div class="display-flex">
                  <div class="pro-img">
                    <img :src="items.goods_thumb	" alt>
                  </div>
                  <div class="title">
                    <p class="line-clamp2 name">{{items.goods_name}}</p>
                    <div class="display-flex">
                      <div class="pro-price">￥{{items.goods_price}}</div>
                      <div class="number">X{{items.goods_number}}</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="real btn-right">
              <div class="display-flex price-num-wrap">
                <div>共{{item.goods_number}}件商品</div>
                <div class="money">应付金额:￥{{item.goods_amount}}</div>
              </div>
            </div>
            <div class="display-flex">
              <div class="right-button">
                <span class="al-btn al-btn-primary-hollow cancel" @click="after(item.order_id)">申请退款</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </mescroll-vue>

    <mescroll-vue
      ref="mescroll3"
      v-show="tabType==3"
      :down="getMescrollDown(3)"
      :up="mescrollUp(3)"
      @init="mescrollInit3"
    >
      <ul class="data-list" id="dataList3">
        <li v-for="(item,index) in tab3.list" :key="index">
          <!--  -->
          <div>
            <div class="createtime btn-right display-flex">
              <span>{{item.add_time}}</span>
              <span
                class="order-status"
              >{{item.order_status}} {{item.pay_status}} {{item.shipping_status}}</span>
            </div>
            <div class="pros" v-for="(items,index) in item.goods" :key="index">
              <router-link :to="{path:'/orderlist/detail',query:{id:item.order_id}}">
                <div class="display-flex">
                  <div class="pro-img">
                    <img :src="items.goods_thumb	" alt>
                  </div>
                  <div class="title">
                    <p class="line-clamp2 name">{{items.goods_name}}</p>
                    <div class="display-flex">
                      <div class="pro-price">￥{{items.goods_price}}</div>
                      <div class="number">X{{items.goods_number}}</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="real btn-right">
              <div class="display-flex price-num-wrap">
                <div>共{{item.goods_number}}件商品</div>
                <div class="money">应付金额:￥{{item.goods_amount}}</div>
              </div>
            </div>
            <div class="display-flex">
              <div class="right-button">
                <span class="al-btn al-btn-primary-hollow cancel" @click="after(item.order_id)">申请退款</span>
                <span class="al-btn al-btn-primary-hollow cancel">查看物流</span>
                <span class="al-btn al-btn-primary-hollow cancel">确认收货</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </mescroll-vue>
    <!--退款  -->
    <mescroll-vue
      ref="mescroll4"
      v-show="tabType==4"
      :down="getMescrollDown(4)"
      :up="mescrollUp(4)"
      @init="mescrollInit4"
    >
      <ul class="data-list" id="dataList4">
        <li v-for="(item,index) in tab4.list" :key="index">
          <!--  -->
          <div>
            <div class="createtime btn-right display-flex">
              <span>{{item.add_time}}</span>
              <span
                class="order-status"
              >{{item.order_status}} {{item.pay_status}} {{item.shipping_status}}</span>
            </div>
            <div class="pros" v-for="(items,index) in item.goods" :key="index">
              <router-link :to="{path:'/orderlist/detail',query:{id:item.order_id}}">
                <div class="display-flex">
                  <div class="pro-img">
                    <img :src="items.goods_thumb	" alt>
                  </div>
                  <div class="title">
                    <p class="line-clamp2 name">{{items.goods_name}}</p>
                    <div class="display-flex">
                      <div class="pro-price">￥{{items.goods_price}}</div>
                      <div class="number">X{{items.goods_number}}</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="real btn-right">
              <div class="display-flex price-num-wrap">
                <div>共{{item.goods_number}}件商品</div>
                <div class="money">应付金额:￥{{item.goods_amount}}</div>
              </div>
            </div>
            <div class="display-flex">
              <div class="right-button">
                <span class="al-btn al-btn-primary-hollow cancel" @click="cancel(item.refund_sn)">撤销售后</span>
                <span class="al-btn al-btn-primary-hollow cancel" @click="detref(item.refund_sn)">退款详情</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </mescroll-vue>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    <load-In v-show="loadin"></load-In>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { mapState, mapMutations } from "vuex";
import MescrollVue from "mescroll.js/mescroll.vue";
import loadIn from '../../components/common/loading'
import { watch } from 'fs';
export default {
  components: {
    MescrollVue, // 注册mescroll组件
    loadIn
  },
  data() {
    return {
      //选项卡
      label: [
        { text: "全部", tabtype: "" },
        { text: "待付款", tabtype: "await_pay" },
        { text: "待发货", tabtype: "await_ship" },
        { text: "待收货", tabtype: "shipped" },
        { text: "待退款", tabtype: "apply_refund" }
      ],
      tab0: { mescroll: null, list: [], isListInit: false }, // 全部
      tab1: { mescroll: null, list: [], isListInit: false }, // 待付款
      tab2: { mescroll: null, list: [], isListInit: false }, // 待发货
      tab3: { mescroll: null, list: [], isListInit: false }, // 待收货
      tab4: { mescroll: null, list: [], isListInit: false }, // 待收货
      tabType: 0, // 菜单类型
      tabtype: "", //切换类型
      loadin:false   //加载过渡
    };
  },
   computed: {  
    ...mapState(['userInfo','orderindex'])
  },
  created: function() {
    if(this.$route.query.id>5){
      this.tabType=this.orderindex;
      this.ORDER_INDEX(this.tabType);
    }else{
      this.tabType = parseInt(this.$route.query.id);
      this.ORDER_INDEX(this.tabType);
    }
   
    
  },
  mounted: function() {

  },
  methods: {
    ...mapMutations(["ORDER_INDEX","OUT_LOGIN"]),
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit0(mescroll) {
      mescroll.tabType = 0; // 加入标记,便于在回调中取到对应的list
      this.tab0.mescroll = mescroll;
    },
    mescrollInit1(mescroll) {
      mescroll.tabType = 1;
      this.tab1.mescroll = mescroll;
    },
    mescrollInit2(mescroll) {
      mescroll.tabType = 2;
      this.tab2.mescroll = mescroll;
    },
    mescrollInit3(mescroll) {
      mescroll.tabType = 3;
      this.tab3.mescroll = mescroll;
    },
    mescrollInit4(mescroll) {
      mescroll.tabType = 4;
      this.tab4.mescroll = mescroll;
    },
    // 多mescroll的配置,需通过方法获取,保证每个配置是单例
    getMescrollDown(tabType) {
      // console.log(tabType);
      let isAuto = tabType == this.tabType; // 第一个mescroll传入true,列表自动加载,当进来不是第一页时设置获取传过来的参数
      return {
        auto: isAuto,
        callback: this.downCallback
      };
    },
    /* 下拉刷新的回调 */
    downCallback(mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新tab1的轮播数据
      if (mescroll.tabType === 0) {
        // loadSwiper();
      } else if (mescroll.tabType === 1) {
        // ....
      } else if (mescroll.tabType === 2) {
        // ....
      } else if (mescroll.tabType === 3) {
        // ....
      }else if(mescroll.tabType === 4){

      }
      mescroll.resetUpScroll(); // 触发下拉刷新的回调,加载第一页的数据
    },
    mescrollUp(tabType) {
      let emptyWarpId = "dataList" + tabType;
      return {
        auto: false,
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 6 //每页数据条数,默认10
        },
        noMoreSize: 6, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          warpId: emptyWarpId, // 父布局的id;
          icon: "./static/images/mescroll-empty.png", // 图标,默认null
          tip: "暂无订单~", // 提示
          btntext: "去逛逛", // 按钮,默认""
          btnClick: function() {
            // 点击按钮的回调,默认null
            window.history.go(-1);
          }
        },
        toTop: {
          // 配置回到顶部按钮
          src: "./static/images/mescroll-totop.png" // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
        }
      };
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      if (mescroll.tabType === 0) {
        this.tab0.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
        var data = {
          type: this.tabtype,
          pagination: { count: page.size, page: page.num }
        };
        this.$api.appdata
          .orderlist(data)
          .then(res => {
              if (res.data.status.error_code == 100) {
              this.$api.appdata.signout().then(res => {
                if (res.data.status.succeed == 1) {
                  this.OUT_LOGIN();
                  this.$router.push({ path: "/login" });
                }
              });
            }
            else{
            let arr = res.data.data.order_info;
            if (page.num === 1) this.tab0.list = []; // 如果是第一页需手动制空列表
            this.tab0.list = this.tab0.list.concat(arr); // 追加新数据
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length);
            });
            }
          })
          .catch(e => {
            if (page.num === 1) this.tab0.isListInit = false;
            mescroll.endErr();
          });
      } else if (mescroll.tabType === 1) {
        this.tab1.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
        var data = {
          type: "await_pay",
          pagination: { count: page.size, page: page.num }
        };
        this.$api.appdata
          .orderlist(data)
          .then(res => {
             if (res.data.status.error_code == 100) {
              this.$api.appdata.signout().then(res => {
                if (res.data.status.succeed == 1) {
                  this.OUT_LOGIN();
                  this.$router.push({ path: "/login" });
                }
              });
            }else{
              let arr = res.data.data.order_info;
              if (page.num === 1) this.tab1.list = []; // 如果是第一页需手动制空列表
              this.tab1.list = this.tab1.list.concat(arr); // 追加新数据
              this.$nextTick(() => {
                mescroll.endSuccess(arr.length);
              });
            }
          })
          .catch(e => {
            // if (page.num === 1) this.tab1.isListInit = false;
            mescroll.endErr();
          });
      } else if (mescroll.tabType === 2) {
        this.tab2.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
        var data = {
          type: "await_ship",
          pagination: { count: page.size, page: page.num }
        };
        this.$api.appdata
          .orderlist(data)
          .then(res => {
             if (res.data.status.error_code == 100) {
              this.$api.appdata.signout().then(res => {
                if (res.data.status.succeed == 1) {
                  this.OUT_LOGIN();
                  this.$router.push({ path: "/login" });
                }
              });
            }else{
              let arr = res.data.data.order_info;
              if (page.num === 1) this.tab2.list = []; // 如果是第一页需手动制空列表
              this.tab2.list = this.tab2.list.concat(arr); // 追加新数据
              this.$nextTick(() => {
                mescroll.endSuccess(arr.length);
              });
            }
          })
          .catch(e => {
            if (page.num === 1) this.tab2.isListInit = false;
            mescroll.endErr();
          });
      } else if (mescroll.tabType === 3) {
        this.tab3.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
        var data = {
          type: "shipped",
          pagination: { count: page.size, page: page.num }
        };
        this.$api.appdata
          .orderlist(data)
          .then(res => {
             if (res.data.status.error_code == 100) {
              this.$api.appdata.signout().then(res => {
                if (res.data.status.succeed == 1) {
                  this.OUT_LOGIN();
                }
              });
            }else{
              let arr = res.data.data.order_info;
              if (page.num === 1) this.tab3.list = []; // 如果是第一页需手动制空列表
              this.tab3.list = this.tab3.list.concat(arr); // 追加新数据
              this.$nextTick(() => {
                mescroll.endSuccess(arr.length);
              });
            }
          })
          .catch(e => {
            // if (page.num === 1) this.tab1.isListInit = false;
            mescroll.endErr();
          });
      }else if (mescroll.tabType === 4) {
        this.tab4.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
        var data = {
          type: "apply_refund",
          pagination: { count: page.size, page: page.num }
        };
        this.$api.appdata
          .orderlist(data)
          .then(res => {
             if (res.data.status.error_code == 100) {
              this.$api.appdata.signout().then(res => {
                if (res.data.status.succeed == 1) {
                  this.OUT_LOGIN();
                }
              });
            }else{
              let arr = res.data.data.order_info;
              if (page.num === 1) this.tab4.list = []; // 如果是第一页需手动制空列表
              this.tab4.list = this.tab4.list.concat(arr); // 追加新数据
              this.$nextTick(() => {
                mescroll.endSuccess(arr.length);
              });
            }
          })
          .catch(e => {
            // if (page.num === 1) this.tab1.isListInit = false;
            mescroll.endErr();
          });
      }
    },
    // 切换菜单
    changeTab(type, tabtype) {
      this.tabtype = tabtype;
      let curTab = this.getTabData(this.tabType); // 当前列表
      let newTab = this.getTabData(type); // 新转换的列表
      curTab.mescroll.hideTopBtn(); // 隐藏当前列表的回到顶部按钮
      this.tabType = type; // 切换菜单
      if (!newTab.isListInit) {
        newTab.mescroll.triggerDownScroll(); // 加载列表
      } else {
        setTimeout(() => {
          // 检查新转换的列表是否需要显示回到到顶按钮
          var curScrollTop = newTab.mescroll.getScrollTop();
          if (curScrollTop >= newTab.mescroll.optUp.toTop.offset) {
            newTab.mescroll.showTopBtn();
          } else {
            // newTab.mescroll.hideTopBtn();
          }
        }, 30);
      }
      this.ORDER_INDEX(type);
    },
    // 获取菜单对应的数据
    getTabData(tabType) {
      if (tabType == null) tabType = this.tabType;
      if (tabType === 0) {
        return this.tab0;
      } else if (tabType === 1) {
        return this.tab1;
      } else if (tabType === 2) {
        return this.tab2;
      } else if (tabType === 3) {
        return this.tab3;
      } else if (tabType === 4) {
        return this.tab4;
      }
    },

    // 页面剩余函数
    cancelord(ordId) {
      MessageBox.confirm("", {
        message: "订单取消之后将无法恢复",
        title: "确认取消订单？",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(action => {
          if (action == "confirm") {
            this.loadin=true;
            //确认的回调
            var data = {
              order_id: ordId
            };
            this.$api.appdata.cancelord(data).then(res => {
              if (res.data.status.succeed == 1) {
                this.loadin=false;
                if(this.tabType==0){
                  this.tab0.isListInit = false;
                  this.changeTab(0, this.tabtype);
                }else if(this.tabType==1){
                  this.tab1.isListInit = false;
                  this.changeTab(1, this.tabtype);
                }else if(this.tabType==2){
                  this.tab2.isListInit = false;
                  this.changeTab(2, this.tabtype);
                }else if(this.tabType==3){
                  this.tab3.isListInit = false;
                  this.changeTab(3, this.tabtype);
                }
                this.tab0.isListInit = false;
              } else {

              }
              //  console.log(res);
            });
          }
        })
        .catch(err => {
          if (err == "cancel") {
            //取消的回调
          }
        });
    },
    // 申请退款
    after(orderid){
      this.$router.push({ path: "/aftersales",query:{order_id: orderid}});
    },
    // 退款详情
    detref(refid){
      this.$router.push({ path: "/orderlist/detref",query:{ref_id:refid}});
    },
    // 撤销售后
    cancel(canid){
      var data={
        refund_sn:canid
      }
      this.$api.appdata.aftcancel(data).then(res => {
        if(res.data.status.succeed == 1){
          if(this.tabType==0){
            this.tab4.isListInit = false;
            this.changeTab(4, this.tabtype);
            this.tab0.isListInit = false;
            this.changeTab(0, this.tabtype);
          }if(this.tabType==4){
            this.tab0.isListInit = false;
            this.changeTab(0,);
            this.tab4.isListInit = false;
            this.changeTab(4, this.tabtype);
          }
            
        }
      })
    },
    // 支付
    paymon(ordId){
      var that=this;
       var data = {
        order_id: ordId
      };
      this.$api.appdata.orderdet(data).then(async res => {
        var ordList = res.data.data;
        await ordData(ordList)
        function ordData(rec_id) {
          var pay={
          amount:ordList.amount,
          pay_name:ordList.pay_name,
          order_id:ordId
          }
        that.$router.push({ path: "/pay", query: { paydata:pay } });
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      let curMescroll = vm.$refs["mescroll" + vm.tabType]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      curMescroll && curMescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    });
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    let curMescroll = this.$refs["mescroll" + this.tabType]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
    curMescroll && curMescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next();
  },
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.nav {
  box-sizing: border-box;
  padding: 0 0.2rem;
}
.nav li {
  flex: 1;
  font-size: 0.54rem;
  color: #777777;
  line-height: 0.59rem;
  box-sizing: border-box;
  text-align: center;
}
.nav span {
  display: inline-block;
  padding: 0.54rem 0;
}
.nav .active span {
  color: #d81e06;
}
.nav li.active {
  border-bottom: 1px solid #d81e06;
}
// 切换样式
.mescroll {
  position: fixed;
  overflow-x: hidden;
  background: #f2f2f2;
  padding-top: 0.4rem;
  top: 1.7rem;
  bottom: 0;
  height: auto;
  .data-list {
    position: relative;
    overflow: hidden;
    // padding-bottom: 2rem;
  }
}
.data-list li {
  margin: 0;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.2rem;
  .createtime {
    color: #333;
    line-height: 1.5rem;
    border-bottom: 1px solid #f4f4f4;
    padding: 0 0.6rem;
    font-size: 0.54rem;
    .order-status {
      text-align: right;
      flex: 1;
      color: #d81e06;
      font-weight: 600;
    }
  }
  .pros {
    padding: 0 0.6rem;
    > .display-flex {
      padding: 0.6rem;
    }
    .pro-img {
      position: relative;
      img {
        width: 3rem;
        height: 3rem;
        margin-right: 0.266667rem;
            vertical-align: middle;
        // border: 1px solid #e5e5e5;
      }
    }
    .title {
      padding: 0.133333rem;
      flex: 1;
      position: relative;
      .name {
        color: #333;
        font-size: 0.54rem;
        margin-bottom: 0.3rem;
      }
      .pro-price {
        font-size: 0.54rem;
        // color: #d81e06;
        margin-right: 0.4rem;
      }
      .number {
        font-size: 0.54rem;
        flex: 1;
        text-align: right;
      }
    }
  }
  .real {
    padding: 0 0.6rem;
    line-height: 1.5rem;
    font-size: 0.54rem;
    color: #333;
    border-bottom: 1px solid #f4f4f4;
    border-top: 1px solid #f4f4f4;
    .price-num-wrap {
      font-size: 0.54rem;
      > div {
        color: #d81e06;
      }
    }
    .money {
      flex: 1;
      text-align: right;
    }
  }
  .right-button {
    flex: 1;
    text-align: right;
    padding-right: 0.6rem;
    font-size: 0.45rem;
    color: #333;
    line-height: 1.5rem;
    .al-btn-primary-hollow {
      padding: 0.2rem 0.3rem;
      border-radius: 0.2rem;
      border: 1px solid transparent;
      border-color: #484747;
      color: #484747;
      margin-left: 0.4rem;
    }
    .al-btn-border-radius {
      color: #f42d2d;
      border: 1px solid #f42d2d;
    }
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




