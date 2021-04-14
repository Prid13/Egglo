import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import '@fontsource/dosis'
import '@fontsource/dosis/800.css'

import '@fontsource/fira-sans/300.css'
import '@fontsource/fira-sans/700.css'
import '@fontsource/fira-sans/200.css'

import './assets/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
