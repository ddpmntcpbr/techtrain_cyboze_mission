import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import '@/assets/css/tailwind.css'
import { firestorePlugin } from 'vuefire'          
import firebase from 'firebase'     
import 'firebase/firestore'
import VueDateFns from "vue-date-fns";

Vue.use(VueDateFns);

Vue.use(firestorePlugin)
firebase.initializeApp({              
  apiKey: "AIzaSyAludjyTltGV6jvT6U57l3k4nlQmWoZNIQ",
  authDomain: "companyshareapp.firebaseapp.com",
  databaseURL: "https://companyshareapp.firebaseio.com",
  projectId: "companyshareapp",
  storageBucket: "companyshareapp.appspot.com",
  messagingSenderId: "624495551903",
  appId: "1:624495551903:web:e02a84768137ad6da149aa",
  measurementId: "G-QHMQM1QKQF"
})
export const db = firebase.firestore()
export const auth = firebase.auth()

Vue.config.productionTip = false

new Vue({
 router,
 render: h => h(App)
}).$mount('#app')