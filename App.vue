<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
    if (uni.getStorageSync("token")) {
      setTimeout(() => {
		  console.log('hi')
        uni.switchTab({
          url: "/pages/sys/dateWatcher/dateWatcher",
        });
      }, 2000);
    } else {
      setTimeout(() => {
        uni.redirectTo({
          url: "/pages/sys/login/index",
        });
      }, 2000);
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@import "./static/fonts/stylesheet.css";
page {
  height: 100%;
}
</style>
