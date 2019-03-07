/*模块接口列表
**/
import base from './base'; // 导入接口域名列表
import axios from '../utils/http';    //导入axios
const appdata = {
  //首页数据
  homePage() {
    return axios.post(`${base.sq}/home/data.php`);
  },
  // 首页上拉加载数据
  homeList(params) {
    return axios.post(`${base.sq}/goods/list.php`, params)
  },
  // 登录
  login(params) {
    return axios.post(`${base.sq}/user/signin.php`, params)
  },
  // 退出登录
  signout() {
    return axios.post(`${base.sq}/user/signout.php`)
  },
  //商品详情数据
  detail(params) {
    return axios.post(`${base.sq}/goods/detail.php`, params);
  },
  // 单个商品详情图片
  desc(params) {
    return axios.post(`${base.sq}/goods/desc.php`, params);
  },
  // 添加到购物车
  cart(params) {
    return axios.post(`${base.sq}/cart/create.php`, params);
  },
  // 购物车商品列表
  cartPay() {
    return axios.post(`${base.sq}/cart/list.php`);
  },
  update(params) {
    return axios.post(`${base.sq}/cart/update.php`, params);
  },
  // 添加地址
  address(params) {
    return axios.post(`${base.sq}/address/add.php`, params)
  },
  // 获取地址
  addressList() {
    return axios.post(`${base.sq}/address/list.php`)
  },
  // 获取详细地址
  adet(params) {
    return axios.post(`${base.sq}/address/info.php`, params);
  },
  // 删除地址
  detress(params) {
    return axios.post(`${base.sq}/address/delete.php`, params);
  },
  // 获取省市区
  getadd(params) {
    return axios.post(`${base.sq}/address/get_area.php`, params)
  },
  // 编辑地址
  updateress(params) {
    return axios.post(`${base.sq}/address/update.php`, params)
  },
  // 我的订单
  orderList(params) {
    return axios.post(`${base.sq}/flow/checkOrder.php`, params)
  },
  // 配送方式
  changeShip(params) {
    return axios.post(`${base.sq}/flow/changeShip.php`, params);
  },
  // 生成订单
  done(params) {
    return axios.post(`${base.sq}/flow/done.php`, params);
  },
  // 订单支付
  pay(params) {
    return axios.post(`${base.sq}/order/pay.php`, params);
  },
  // 订单列表
  orderlist(params) {
    return axios.post(`${base.sq}/order/list.php`, params);
  },
  // 订单详情
  orderdet(params) {
    return axios.post(`${base.sq}/order/detail.php`, params);
  },
  // 取消订单
  cancelord(params) {
    return axios.post(`${base.sq}/order/cancel.php`, params);
  },
  // 收藏
  collection(params) {
    return axios.post(`${base.sq}/user/collect/create.php`, params);
  },
  // 取消收藏
  detcoll(params) {
    return axios.post(`${base.sq}/user/collect/delete.php`, params);
  },
  //收藏列表
  collectList(params) {
    return axios.post(`${base.sq}/user/collect/list.php`, params);
  },
  // 售后原因
  refund() {
    return axios.post(`${base.sq}/refund/reasons.php`)
  },
  // 订单申请售后
  apply(params) {
    return axios.post(`${base.sq}/refund/apply.php`, params);
  },
  // 退款详情
  detref(params) {
    return axios.post(`${base.sq}/refund/detail.php`, params);
  },
  // 撤销售后
  aftcancel(params) {
    return axios.post(`${base.sq}/refund/cancel.php`, params);
  },
  // 优惠券
  conpon(params){
    return axios.post(`${base.sq}/bonus/coupon.php`,params);
  },
  // 兑换优惠券
  exchange(params){
    return axios.post(`${base.sq}/bonus/bind.php`,params)
  },
  // 个人中心优惠券
  percon(params){
    return axios.post(`${base.sq}/bonus/list.php`,params)
  },
  // 实名认证信息列表
  card(){
    return axios.post(`${base.sq}/user/card/list.php`)
  },
  //删除认证信息
  detcard(params){
    return axios.post(`${base.sq}/user/card/delete.php`,params);
  },
  //设置默认认证信息
  defaultCard(params){
    return axios.post(`${base.sq}/user/card/default.php`,params);
  },
  // 添加实名信息
  addreal(params){
    return axios.post(`${base.sq}/user/card/add.php`,params);
  }

}
export default appdata;
