<template>
    <div>
        <div class="search-bar">
            <div class="search-wrap display-flex">
                <!-- <div class="list-button">分类</div> -->
                <div class="input-wrap">
                    <div class="searp-searchicon"></div>
                    <input type="search" name="search" placeholder="搜索你想要的" class="input" v-model="keywords">
                     <div class="search" @click="search()">搜索</div>
                </div>
                <!-- <div class="service">客服</div> -->
            </div>
        </div>
         <ul class="nav display-flex">
            <li v-for="(demo,index) in label"  :class="{active:index == tabType}" :key="index">
                 <span v-if="index==3" @click="changeTab(3,demo.tabtype=demo.tabtype==='price_asc'?'price_desc' :'price_asc')" :class="{down: isdown}">价格</span>
                <span @click="changeTab(index,demo.tabtype)">{{demo.text}}</span>
               
            </li>
        </ul>
        <!-- 菜单数据 -->
        <mescroll-vue ref="mescroll0"  v-show="tabType==0" :down="getMescrollDown(0)" :up="mescrollUp(0)" @init="mescrollInit0">
            <ul class="data-list" id="dataList0">
                 <li v-for="item in tab0.list" :key="item.goods_id">
                     <!--  -->
                     <router-link :to="{path:'/details',query:{id:item.goods_id}}">
                        <div class="imgwrap">
                            <div class="img-ratio-wrap">
                                <img :src="item.img.small" alt="">
                                <div class="proicon" v-if="item.end_time!=undefined"></div>
                            </div>
                        </div>
                        <div class="imgname line-clamp line-clamp2">{{item.goods_name}}</div>
                        <!-- <div class="description">
                            <p>促销</p>
                            <p>优惠券</p>
                        </div> -->
                        <div class="price-buy display-flex">
                            <div class="price" v-if="item.end_time!=undefined">￥{{item.promote_price}}</div>
                            <div class="price" v-else>￥{{item.shop_price}}</div>
                            <div class="buy"></div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mescroll-vue>

         <mescroll-vue ref="mescroll1" v-show="tabType==1" :up="mescrollUp(1)" @init="mescrollInit1">
            <ul class="data-list" id="dataList1">
                 <li v-for="item in tab1.list" :key="item.goods_id">
                     <!--  -->
                    <router-link :to="{path:'/details',query:{id:item.goods_id}}">
                        <div class="imgwrap">
                            <div class="img-ratio-wrap">
                                <img :src="item.img.small" alt="">
                                  <div class="proicon" v-if="item.end_time!=undefined"></div>
                            </div>
                        </div>
                        <div class="imgname line-clamp line-clamp2">{{item.goods_name}}</div>
                        <!-- <div class="description">
                            <p>促销</p>
                            <p>优惠券</p>
                        </div> -->
                        <div class="price-buy display-flex">
                            <div class="price" v-if="item.end_time!=undefined">￥{{item.promote_price}}</div>
                            <div class="price" v-else>￥{{item.shop_price}}</div>
                            <div class="buy"></div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mescroll-vue>

          <mescroll-vue ref="mescroll2" v-show="tabType==2" :up="mescrollUp(2)" @init="mescrollInit2">
            <ul class="data-list" id="dataList2">
                 <li v-for="item in tab2.list" :key="item.goods_id">
                     <!--  -->
                    <router-link :to="{path:'/details',query:{id:item.goods_id}}">
                        <div class="imgwrap">
                            <div class="img-ratio-wrap">
                                <img :src="item.img.small" alt="">
                                  <div class="proicon" v-if="item.end_time!=undefined"></div>
                            </div>
                        </div>
                        <div class="imgname line-clamp line-clamp2">{{item.goods_name}}</div>
                        <!-- <div class="description">
                            <p>促销</p>
                            <p>优惠券</p>
                        </div> -->
                        <div class="price-buy display-flex">
                           <div class="price" v-if="item.end_time!=undefined">￥{{item.promote_price}}</div>
                            <div class="price" v-else>￥{{item.shop_price}}</div>
                            <div class="buy"></div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mescroll-vue>

          <mescroll-vue ref="mescroll3" v-show="tabType==3" :up="mescrollUp(3)" @init="mescrollInit3">
            <ul class="data-list" id="dataList3">
                 <li v-for="item in tab3.list" :key="item.goods_id">
                     <!--  -->
                    <router-link :to="{path:'/details',query:{id:item.goods_id}}">
                        <div class="imgwrap">
                            <div class="img-ratio-wrap">
                                <img :src="item.img.small" alt="">
                                  <div class="proicon" v-if="item.end_time!=undefined"></div>
                            </div>
                        </div>
                        <div class="imgname line-clamp line-clamp2">{{item.goods_name}}</div>
                        <!-- <div class="description">
                            <p>促销</p>
                            <p>优惠券</p>
                        </div> -->
                        <div class="price-buy display-flex">
                            <div class="price" v-if="item.end_time!=undefined">￥{{item.promote_price}}</div>
                            <div class="price" v-else>￥{{item.shop_price}}</div>
                            <div class="buy"></div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mescroll-vue>
        <!-- 左侧列表 -->
        <div class="leftlist">
          <ul class="list-ul">
            <li>红酒</li>
            <li>零食</li>
            <li>衣服</li>
            <li>测试</li>
            <li>汾酒</li>
          </ul>
        </div>
        <load-In v-show="loadin"></load-In>
    </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import loadIn from '../../components/common/loading'
export default {
  components: {
    MescrollVue, // 注册mescroll组件
    loadIn
  },
  data() {
    return {
        //选项卡
        label: [
        { text: "综合", tabtype: "synthesise" },
        { text: "销量", tabtype: "is_hot" },
        { text: "新品", tabtype: "is_new" },
        { text: "",tabtype:"price_asc"}
      ], 
      tab0: {mescroll: null, list: [], isListInit: false}, // 综合
      tab1: {mescroll: null, list: [], isListInit: false}, // 销量
      tab2: {mescroll: null, list: [], isListInit: false}, // 新品
      tab3: {mescroll: null, list: [], isListInit: false}, // 价格
      tabType: 0, // 菜单类型
      isdown:false,    //升序降序icon
      tabtype:"synthesise",  //切换类型
      listID:null,
      keywords:"null",
      loadin:false
    };
  },
  created:function(){
    this.listID=this.$route.query.id;
    this.keywords=this.$route.query.key;
  },
  mounted: function() {
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit0 (mescroll) {
      mescroll.tabType = 0; // 加入标记,便于在回调中取到对应的list
      this.tab0.mescroll = mescroll;
    },
    mescrollInit1 (mescroll) {
      mescroll.tabType = 1;
      this.tab1.mescroll = mescroll;
    },
    mescrollInit2 (mescroll) {
      mescroll.tabType = 2;
      this.tab2.mescroll = mescroll;
    },
    mescrollInit3 (mescroll) {
      mescroll.tabType = 3;
      this.tab3.mescroll = mescroll;
    },
    // 多mescroll的配置,需通过方法获取,保证每个配置是单例
    getMescrollDown (tabType) {
      let isAuto = tabType === 0; // 第一个mescroll传入true,列表自动加载
      return {
        auto: isAuto,
        callback: this.downCallback
      }
    },
     /* 下拉刷新的回调 */
    downCallback (mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新tab1的轮播数据
      if (mescroll.tabType === 0) {
        // loadSwiper();
      } else if (mescroll.tabType === 1) {
        // ....
      } else if (mescroll.tabType === 2) {
        // ....
      } else if (mescroll.tabType === 3) {
        // ....
      }
      mescroll.resetUpScroll();// 触发下拉刷新的回调,加载第一页的数据
    },
    mescrollUp (tabType) {
      let emptyWarpId = 'dataList' + tabType;
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
          icon: './static/images/mescroll-empty.png', // 图标,默认null
          tip: '暂无相关数据~', // 提示
          btntext: '去逛逛', // 按钮,默认""
          btnClick: function () { // 点击按钮的回调,默认null
            window.history.go(-1);
          }
        },
        toTop: { // 配置回到顶部按钮
          src: './static/images/mescroll-totop.png' // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
        }
      }
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
        if (mescroll.tabType === 0) {
            this.tab0.isListInit = true;// 标记列表已初始化,保证列表只初始化一次
             var data={
                filter:{category_id:this.listID,keywords:this.keywords},
                pagination:{count:page.size,page:page.num},
              }
               this.$api.appdata.homeList(data)
            .then(response => {
            let arr = response.data.data;
            if (page.num === 1) this.tab0.list = []; // 如果是第一页需手动制空列表
            this.tab0.list = this.tab0.list.concat(arr); // 追加新数据
            this.$nextTick(() => {
                    mescroll.endSuccess(arr.length)
                })
            }).catch((e) => {
                if (page.num === 1) this.tab0.isListInit = false;
                mescroll.endErr()
            });
        }else if(mescroll.tabType === 1){
          this.loadin=true;
            this.tab1.isListInit = true;// 标记列表已初始化,保证列表只初始化一次
            var data={
                filter:{sort_by: this.tabtype,category_id:this.listID,keywords:this.keywords},
                pagination:{count:page.size,page:page.num},
              }
               this.$api.appdata.homeList(data)
            .then(response => {
            let arr = response.data.data;
            if (page.num === 1) this.tab1.list = []; // 如果是第一页需手动制空列表
            this.tab1.list = this.tab1.list.concat(arr); // 追加新数据
            this.$nextTick(() => {
                    mescroll.endSuccess(arr.length)
                    this.loadin=false;
                })
            }).catch((e) => {
                // if (page.num === 1) this.tab1.isListInit = false;
                mescroll.endErr()
            });
        }else if (mescroll.tabType === 2) {
          this.loadin=true;
            this.tab2.isListInit = true;// 标记列表已初始化,保证列表只初始化一次
                var data={
                filter:{intro:this.tabtype,category_id:this.listID,keywords:this.keywords},
                pagination:{count:page.size,page:page.num}
              }
               this.$api.appdata.homeList(data)
            .then(response => {
            let arr = response.data.data;
            if (page.num === 1) this.tab2.list = []; // 如果是第一页需手动制空列表
            this.tab2.list = this.tab2.list.concat(arr); // 追加新数据
            this.$nextTick(() => {
                    mescroll.endSuccess(arr.length)
                    this.loadin=false;
                })
            }).catch((e) => {
                if (page.num === 1) this.tab2.isListInit = false;
                mescroll.endErr()
            });
        }else if(mescroll.tabType === 3){
          this.loadin=true;
            this.tab3.isListInit = true;// 标记列表已初始化,保证列表只初始化一次
              var data={
                filter:{sort_by:this.tabtype,category_id:this.listID,keywords:this.keywords},
                pagination:{count:page.size,page:page.num}
              }
               this.$api.appdata.homeList(data)
            .then(response => {
            let arr = response.data.data;
            if (page.num === 1) this.tab3.list = []; // 如果是第一页需手动制空列表
            this.tab3.list = this.tab3.list.concat(arr); // 追加新数据
            this.$nextTick(() => {
                    mescroll.endSuccess(arr.length)
                    this.loadin=false;
                })
            }).catch((e) => {
                // if (page.num === 1) this.tab1.isListInit = false;
                mescroll.endErr()
            });
        }
    },
    // 切换菜单
    changeTab (type,tabtype) {
        if(type==3){
          this.isdown=!this.isdown;
          this.tab3.isListInit = false;
        }
      this.tabtype=tabtype;
      let curTab = this.getTabData(this.tabType);// 当前列表
      let newTab = this.getTabData(type);// 新转换的列表
      curTab.mescroll.hideTopBtn(); // 隐藏当前列表的回到顶部按钮
      this.tabType = type // 切换菜单
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
        }, 30)
      }
    },
        // 获取菜单对应的数据
    getTabData (tabType) {
      if (tabType == null) tabType = this.tabType;
      if (tabType === 0) {
        return this.tab0;
      } else if (tabType === 1) {
        return this.tab1;
      } else if (tabType === 2) {
        return this.tab2;
      } else if (tabType === 3) {
        return this.tab3; 
      }
    },
    search(){
      this.tab0.mescroll.resetUpScroll()
      this.tab1.mescroll.resetUpScroll()
      this.tab2.mescroll.resetUpScroll()
      this.tab3.mescroll.resetUpScroll()
    },
  },
    beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
        let curMescroll = vm.$refs['mescroll' + vm.tabType]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
        curMescroll && curMescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
    },
    beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    let curMescroll = this.$refs['mescroll' + this.tabType]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
    curMescroll && curMescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.search-wrap {
  padding: 0.6rem 0.4rem;
}
.search-bar {
  box-sizing: border-box;
}
.search-wrap .list-button {
  width: 2rem;
  height: 1.6rem;
  background: url(../../../static/images/listicon.png) center 0 no-repeat;
  background-size: 0.9rem;
  font-size: 0.54rem;
  padding: 1rem 0 0 0;
  text-align: center
}
.search-wrap .service {
  width: 2rem;
  height: 1.6rem;
  background: url(../../../static/images/service.png) center 0 no-repeat;
  background-size: 0.9rem;
  font-size: 0.54rem;
  padding: 1rem 0 0 0;
  text-align: center;
}
.search-wrap .input-wrap {
  position: relative;
  flex: 1;
}
.input-wrap .input {
  width: 86%;
  border: 0;
  height: 1.52rem;
  text-align: center;
  color: #333;
  background-color: #f8f8f8;
  outline: none;
  border-radius: 0.38rem;
  font-size: 0.54rem;
}
.searp-searchicon {
  background: url(../../../static/images/searchicon.png) center 0 no-repeat;
  width: 0.8rem;
  height: 0.8rem;
  background-size: 0.7rem;
  position: absolute;
  left: 3rem;
  top: 0.55rem;
}
.search{
    width: 1.6rem;
    height: 1.2rem;
    text-align: center;
    font-size: 0.56rem;
    display: inline-block;
    padding: 0.2rem;
    box-sizing: border-box;

  }
// 切换标签
.nav {
  box-sizing: border-box;
  padding: 0 0.2rem;
}
.nav li {
  flex: 1;
  font-size: 0.52rem;
  color: #777777;
  line-height: 0.59rem;
  box-sizing: border-box;
  text-align: center;
}
.nav span{
    display: inline-block;
    padding: 0.52rem 0;
}
.nav .active span {
  color: #d81e06;
  
  
}
.nav li.active {
    border-bottom: 1px solid #d81e06;
}
.nav li:last-child span:first-child {
  background: url(../../../static/images/noup.png) center 0 no-repeat;
  display: inline-block;
  padding: 0.52rem 1.5rem 0.47rem 0;
  margin-left: 1rem;
  background-size: 0.4rem;
  background-position: 1.3rem 0.55rem;

}
.nav li:last-child.active span:first-child {
  background: url(../../../static/images/redup.png) center 0 no-repeat;
  padding: 0.52rem 1.5rem 0.47rem 0;
  margin-left: 1rem;
  background-size: 0.4rem;
  background-position: 1.3rem 0.55rem;
  display: inline-block;
}
.nav li:last-child.active span:first-child.down{
  background: url(../../../static/images/reddown.png) center 0 no-repeat;
  padding: 0.52rem 1.5rem 0.47rem 0;
  margin-left: 1rem;
  background-size: 0.4rem;
  background-position: 1.3rem 0.55rem;
  display: inline-block;
}
// 切换样式
.mescroll {
  position: fixed;
  overflow-x: hidden;
  background: #f2f2f2;
  padding-top: 0.4rem;
  top: 4.44rem;
  bottom: 0;
  width: 100%;
  height: auto;
  .data-list {
    position: relative;
    overflow: hidden;
    // padding-bottom: 2rem;
  }
}
.data-list li {
  margin: 0;
  position: relative;
  background-color: #fff;
  width: 50%;
  box-sizing: border-box;
  float: left;
}
.data-list li:nth-child(2n) {
  border-top: 2px solid #f4f4f4;
  border-left: 1px solid #f4f4f4;
}
.data-list li:nth-child(2n-1) {
  border-right: 1px solid #f4f4f4;
  border-top: 2px solid #f4f4f4;
}
.data-list li .imgwrap {
  width: 100%;
  padding: 0.8rem;
  box-sizing: border-box;
}
.img-ratio-wrap {
  position: relative;
  height: 0;
  width: 100%;
  padding-bottom: 100%;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
   .proicon{
     background: url(../../../static/images/proicon.png) center 0 no-repeat;
      width: 1.2rem;
      height: 1.2rem;
      background-size: 1.1rem;
      position: absolute;
      right:0.2rem ;
      top: 0.2rem;
    }
}
.data-list li .imgname {
  font-size: 0.54rem;
  color: #515151;
  margin: 0 0.6rem 0.4rem 0.6rem;
}
.price-buy {
  margin-left: 0.6rem;
  margin-bottom: 0.33rem;
}
.price-buy .price {
  font-size: 0.54rem;
  color: #e72714;
  text-align: left;
  line-height: 1rem;
}
.price-buy .buy {
  background: url(../../../static/images/buyred.png) center 0 no-repeat;
  background-size: 0.8rem;
  margin-left: 3.7rem;
  width: 1rem;
  height: 0.8rem;
  margin-top: 0.15rem;
}
.line-clamp {
  -webkit-line-clamp: 2;
  height: 2.92em;
  line-height: 0.82rem;
}
.data-list li .description {
  font-size: 0;
  margin: 0 0.6rem 0.2rem 0.6rem;
}
.description p {
  font-size: 0.54rem;
  line-height: 0.54rem;
  color: #d81e06;
  display: inline-block;
  padding: 0.15rem;
  border-radius: 0.28rem;
  border: solid 0.03rem #d81e06;
}
.description p:last-child {
  margin-left: 0.2rem;
}
.leftlist{
  width: auto;
  height: auto;
  position: fixed;
  margin-top: 0.45rem;
  z-index: 200;
  .list-ul{
    display: table;
    background: #fff;
    background: rgba(255, 255, 255, 0.6);
    li{
      text-align: center;
      font-size: 0.58rem;
      color: #333;
      padding: 0 0.4rem;
      line-height: 1.6rem;
      
    }
  }
}
</style>


