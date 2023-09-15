import { $http } from './index'

uni.$showMsg = function (title = "数据加载失败", duration = 1500) {
    uni.showToast({
        title,
        duration,
        icon: 'none'
    })
}

uni.$http = $http;
// $http.baseUrl = "http://127.0.0.1:4523/m1/3273039-0-default";
$http.baseUrl = "http://192.168.115.130:4523/m1/3273039-0-default";
$http.beforeRequest = function (options) {
    let token = uni.getStorageSync('token')
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