<template>
  <div class="bg-blue-900 fixed top-0 left-0 h-screen border-r-4 border-gray-600 text-blue-200 pl-4 pt-1">
    <!-- タイトル＆ユーザー情報 -->
    <div class="">
      <router-link to="/">
        <h1 class="text-2xl text-white font-bold">Share!</h1>
      </router-link>
      <div 
        v-if="currentUser"
      >
        <div 
          class="w-10 h-10 rounded-full bg-cover bg-center mr-2"
          :style=" 'background-image: url(' + currentUser.photoURL + ')' "
        ></div>
        <div>
          <p>{{ currentUser.displayName }}</p>
          <button 
            class="bg-blue-500 hover:bg-blue-700 border border-blue-700 rounded"
            @click="signOut"
          >Log Out</button>
        </div>
      </div>
      <div v-else>
        <button 
          class="bg-blue-500 hover:bg-blue-700 border border-blue-700 rounded"
          @click="signIn"
        >Sign In</button>
      </div>
    </div>
    <!-- チャンネル -->
    <div v-if="currentUser" class="mt-5 mr-5">
     
      <div class="flex justify-between text-xl">
        <h2 class="font-bold">チャンネル</h2>
        <router-link to="/create">
          <i class="far fa-plus-square hover:text-white "></i>
        </router-link>
      </div>

      <SidebarItem :currentUser = currentUser />

    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { auth } from '@/main'
import { db } from '@/main'
import SidebarItem from '@/components/SidebarItem'
export default {
  components: {
    SidebarItem
  },

  data() {
    return {
      currentUser: {},
      groups: {}
    }
  },
  // firestore() {
  //   return {
  //     groups: db.collection('groups').orderBy("updatedAt","desc")
  //   }
  // },
  created() {
    auth.onAuthStateChanged(user => { 
      this.currentUser = user
    })
  },
  methods: {
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
      .then((result) => {
        alert('Hello, '+result.user.displayName+'!'),

        db.collection('users').doc(result.user.uid).set({
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          email: result.user.email
        })

      })
    },
    signOut () {
      if (window.confirm('Are You Sure to Sign Out?')) {
        auth.signOut()
        .then(() => {
          alert('You Safely Signed Out.')
          this.$router.push('/'),
          location.reload()
        })
      }
    }
  }
}
</script>