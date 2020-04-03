import Vue from 'vue';
import Router from 'vue-router';
import routes from './router.config';

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes
});
router.beforeEach((to, from, next) => {
  const handleNext = () => {
    next();
  };
  handleNext();
});
Vue.use(Router);
export default router;
