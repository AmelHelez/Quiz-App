import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './assets/stylesheets/global.scss';

createApp(App).use(store).mount('#app');
