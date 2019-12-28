<template>
  <div class="flex list-none hover:bg-gray-200 border border-gray-300 rounded shadow-md">
    <router-link :to=" '/post/' + user.id + '/' + post.id">
      <div class="py-2 px-4">
        <h2 class="text-xl">{{ post.title }}</h2>  
        <div class="flex mt-2">
          <div 
            class="w-10 h-10 bg-cover bg-center rounded-full border border-black mr-2"
            :style=" 'background-image: url(' + user.photoURL + ')' "
          ></div>
          <div>
            <p>{{ user.displayName }}</p>
            <p class="text-xs">{{ post.createdAt }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import { db } from '@/main'
export default {
  props: ['post'],
  data() {
    return {
      user: {}
    }
  },
  firestore() {
    return {
      user: db.collection('users').doc(this.$props.post.uid)
    }
  }
}
</script>