<template>
  <!-- Vue Router的router-view组件用于渲染与当前路由匹配的组件 -->
  <router-view>
    <!-- 使用默认插槽(slot)来访问当前匹配组件的属性，这里解构出Component和route对象 -->
    <!-- Component是需要渲染的Vue组件，route是当前的路由对象 -->
    <template #default="{ Component, route }">
      <!-- transition组件用于包裹需要应用动画的元素，这里用于给路由切换添加动画效果 -->
      <!-- name属性定义了过渡动画的名称，Vue会根据这个名称自动应用相应的CSS类 -->
      <!-- mode属性为"out-in"，意味着先等当前页面完全过渡出去，再显示和过渡新页面 -->
      <!-- appear属性指定在初次渲染时也应用过渡动画 -->
      <transition name="fade-slide" mode="out-in" appear>
        <!-- 动态组件，:is属性动态决定需要渲染哪个组件 -->
        <!-- :key属性确保组件在路由变化时能够正确触发过渡效果 -->
        <component :is="Component" :key="route.fullPath"></component>
      </transition>
    </template>
  </router-view>
</template>
