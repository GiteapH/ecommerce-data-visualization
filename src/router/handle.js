import router from './index';



router.afterEach((to, from, next) => {
  document.title = to.meta?.title;
})
