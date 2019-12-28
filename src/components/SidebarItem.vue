<template>
  <div class="ml-2">
    <div v-for="group in groups" :key="group.id" class="hover:bg-blue-700">
      <div v-if="group.memberIds.includes(currentUser.uid)">
        <p>{{ group.groupName }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { db } from '@/main'
export default {
  props: ['currentUser'],
  data() {
    return {
      groups: []
    }
  },
  firestore() {
    return {
      groups: db.collection('groups').orderBy("updatedAt","desc")
    }
  }
}
</script>