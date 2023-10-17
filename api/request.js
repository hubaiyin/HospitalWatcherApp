import { $http } from './index'

uni.$showMsg = function (title = "数据加载失败", duration = 1500) {
    uni.showToast({
        title,
        duration,
        icon: 'none'
    })
}

uni.$http = $http;
$http.baseUrl = "http://101.43.254.115:10115";
// $http.baseUrl = "http://192.168.115.66:10115"

$http.beforeRequest = function (options) {
    let token = uni.getStorageSync('token')
    // console.log("token!!!!1",token);
    let header = {};
    if (token) {
        header = {
            Authorization: token
        }
    }
    options.header = header
    uni.showLoading({
        title: '加载中'
    })
}
$http.afterRequest = function () {
    uni.hideLoading();
}