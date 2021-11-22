import { createApp } from 'vue'
import App from './App.vue'
import './tailwind.css'
import { ProgressiveImgPlugin } from 'vue-progressive-img'
import 'vue-progressive-img/src/styles.css'

const app = createApp(App)

app.use(ProgressiveImgPlugin)
app.mount('#app')
