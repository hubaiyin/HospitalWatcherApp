import App from './App'


// #ifndef VUE3
import Vue from 'vue'
import uView from 'uview-ui'
Vue.use(uView)
import './uni.promisify.adaptor'
import {uni} from './api/request.js'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
/* let main = plus.android.runtimeMainActivity();
plus.runtime.quit = function(){
	main.moveTaskToBack(false);
}
plus.nativeUI.toast = function(str){
	if (str =='再次返回退出应用') {
	    plus.runtime.quit();
	}
} */
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif