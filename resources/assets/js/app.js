
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */ 

require('./bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router';
import moment from 'moment';
import {Form, HasError,AlertError} from 'vform';
//validate and show error 
Vue.use(VueRouter);     
window.Form=Form; 
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
   
//event
let Fire = new Vue();
window.Fire = Fire;  

//alert
import swal from 'sweetalert2'; 
window.swal = swal;
const toast =swal.mixin({
    toast : true,
    icon: 'success',
    position : 'top-end',
    showConfirmButton : false,
    timer : 3000 
});
window.toast = toast; 
 
//filtering
Vue.filter('UpperText',function(text){
    return text.charAt(0).toUpperCase()+text.slice(1) 
});
Vue.filter('MyDate',function(sopo){
    return moment(sopo).format('ddd');   
}); 

 
  

//progress bar
import VueProgressBar from 'vue-progressbar';  
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px' 
})

//laravel passport
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
); 
Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
); 
Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

//load view and render
import Dashboard from './components/Dashboard.vue'
import Profile from './components/Profile.vue'
import Users from './components/Users.vue'
import Developer from './components/Developer.vue'
let routes = [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    {path: '/dashboard',component: Dashboard, },
    {path: '/profile',component: Profile, },
    {path: '/users',component: Users, },
    {path: '/developer',component: Developer, }
]
const router = new VueRouter({
    mode : 'history',
    routes 
})
  
const app = new Vue({
    router
}).$mount('#app')

 