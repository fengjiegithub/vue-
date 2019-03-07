<template>
  <div class="addcard">
    <div class="info-title padding010px">身份信息(必填)</div>
    <input type="text" placeholder="您的真实姓名" v-model="name">
    <input type="text" placeholder="您的身份证号（将加密处理）" v-model="cardId">
    <div class="button">
      <button class="al-btn al-btn-block" @click="save">保存</button>
    </div>
    <pop-Up v-if="isShow" @closeTip="isShow = false" :tiptitle="tiptitle"></pop-Up>
  </div>
</template>
<script>
import popUp from "../../../components/common/popup";
export default {
  components: {
    popUp
  },
  data() {
    return {
      isShow: false, //遮罩显示，隐藏
      name: null, //姓名
      cardId: null //身份证
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    save() {
      var idcard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      var that = this;
      if (this.name == null) {
        that.isShow = true;
        that.tiptitle = "请输入姓名";
      } else if (this.cardId == null) {
        that.isShow = true;
        that.tiptitle = "请输入身份证号码";
      } else if (!idcard.test(this.cardId)) {
        that.isShow = true;
        that.tiptitle = "请输入有效身份证号码";
      } else {
        var data = {
          name: this.name,
          card: this.cardId
        };
        this.$api.appdata.addreal(data).then(res => {
            if(res.data.status.succeed==0){
                if(res.data.status.error_code=='card_error'){
                    that.isShow = true;
                    that.tiptitle = "身份证格式不正确";
                }
            }else if(res.data.status.succeed==1){
                this.$router.replace({ path: "/realname" });
                this.$router.go(-1);
            }
        })
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.addcard {
  position: fixed;
  top: 0;
  bottom: 0rem;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  background: #f2f2f2;
  .info-title {
    padding: 0 0.4rem;
    margin: 0.4rem 0 0.4rem;
    font-size: 0.58rem;
    color: #333;
  }
  input {
    width: 100%;
    border: 0;
    outline: none;
    display: block;
    border-bottom: 1px solid #e5e5e5;
    padding: 0.6rem 0.52rem;
    background: #fff;
    font-size: 0.54rem;
    color: #999;
  }
  .button {
    padding: 0.4rem 0.42rem;
    margin: 0 auto;
    text-align: center;
    button {
      background: #d81f06;
      color: #fff;
      font-size: 0.65rem;
      padding: 0.48rem 5.06rem;
      border-radius: 0.4rem;
    }
  }
}
</style>


