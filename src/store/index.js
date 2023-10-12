import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const STORE_NAME = 'main'

export const useStore = defineStore(STORE_NAME, {
  state: () => ({
    files: useStorage('files', [], localStorage),
    showModal: false,
    selectedFile: null,
    changingFile: null
  }),
  actions: {
    toggleModal() {
      this.showModal = !this.showModal
    },
    addNewFile(fileName) {
      this.files.push({
          fileName,
          id: this.generateID(),
          value: ''
        })
    },
    generateID() {
      return crypto.getRandomValues(new Uint32Array(4)).join('-');
    },
    deleteFile(id) {
      const i = this.files.findIndex(e => e.id === id)
      this.files.splice(i, 1)
      if (this.selectedFile) this.selectedFile = null
    },
    selectFile(file) {
      this.selectedFile = this.selectedFile && this.selectedFile.id === file.id ? null : file
    },
    changeSelectedFileValue(val) {
      const i = this.files.findIndex(e => e.id === this.selectedFile.id)
      this.files[i].value = val
    },
    setChangingFile(fileId) {
      this.changingFile = this.changingFile ? null : fileId
    },
    changeFileName(newFileName) {
      const i = this.files.findIndex(e => e.id === this.changingFile)
      console.log(i);
      this.files[i].fileName = newFileName
      this.changingFile = null
    }
  },
})