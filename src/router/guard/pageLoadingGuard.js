/**
 * 创建页面加载进度条的路由守卫。
 * 
 * @param {VueRouter} router - Vue应用的路由实例。
 */
export function createPageLoadingGuard(router) {
  // 在路由跳转之前启动加载进度条
  router.beforeEach(() => {
    // 开始显示加载进度条
    $loadingBar.start()
  })

  // 在路由跳转完成后结束加载进度条
  router.afterEach(() => {
    // 使用setTimeout来模拟一个短暂的加载延迟，确保加载进度条有足够的时间显示
    setTimeout(() => {
      // 完成加载进度，隐藏加载进度条
      $loadingBar.finish()
    }, 200) // 延迟200毫秒结束进度条，以确保用户能看到进度条的完成
  })

  // 如果路由跳转过程中发生错误，显示错误状态的加载进度条
  router.onError(() => {
    // 显示加载进度条的错误状态
    $loadingBar.error()
  })
}
