import { defineStore } from "pinia"
import { ref } from "vue"

export const useShareStore = defineStore("shared", () => {
  const currentUser = ref({})
  function initCurrentUser(user) {
    currentUser.value = user
  }

  function getCurrentUser() {
    return currentUser
  }

  return { currentUser, initCurrentUser, getCurrentUser }
})
