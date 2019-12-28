<template>
  <div class="fixed top-0 w-full p-3 bg-gray-300">
    <div class="flex justify-between">
      <router-link to="/">
        <h1 class="text-2xl font-bold">Share!</h1>
      </router-link>
      <div 
        v-if="currentUser"
        class="flex"
      >

        <router-link to="/create">
          <button 
            class="mt-2 mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >Write</button>
        </router-link>

        <div 
          class="w-10 h-10 rounded-full bg-cover bg-center mr-2"
          :style=" 'background-image: url(' + currentUser.photoURL + ')' "
        ></div>
        <div>
          <p>{{ currentUser.displayName }}</p>
          <p 
            class="mt-1 text-sm cursor-pointer bg-blue-500 hover:bg-blue-700 text-white px-1 border border-blue-700 rounded"
            @click="signOut"
          >Log Out</p>
        </div>
      </div>
      <div v-else>
        <button 
          class="cursor-pointer focus:outline-none bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded"
          @click="signIn"
        >Sign In</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { auth } from '@/main'
import { db } from '@/main' // ここを追加
export default {
  data() {
    return {
      currentUser: {}
    }
  },
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