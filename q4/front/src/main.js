import Vue from 'vue'
import App from './App.vue'
import store from './store';

// basic logging on dev server
if (process.env.NODE_ENV==='development')
  window.log = console.log.bind(console);
else
  window.log = function() {};

new Vue({
  el: '#app',
  render: h => h(App),
  store,
});
