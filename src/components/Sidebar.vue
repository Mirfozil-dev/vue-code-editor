<template>
  <n-list hoverable clickable>
    <n-button 
      @click="store.toggleModal()"
      strong round
      secondary type="success" 
      size="large" style="width: calc(100% - 20px); margin: 10px;"
      >
      Add file
      <template #icon>
        <n-icon>
          <AddCircleOutline />
        </n-icon>
      </template>
    </n-button>
    <n-list-item 
      v-for="file in files" :key="file.id"
      @click="store.selectFile(file)"
      :style="selectedFile && selectedFile.id === file.id && `background: #dcdcdc !important;`"
    >
      {{ file.fileName }}
      <template #suffix>
        <div style="display: flex; align-items: center;gap:5px;">
          <n-button strong secondary circle type="info" @click.stop.prevent="setChangeFileModal(file)">
            <template #icon>
              <n-icon>
                <PencilSharp />
              </n-icon>
            </template>
          </n-button>
          <n-button @click.stop.prevent="store.deleteFile(file.id)" strong secondary circle type="error">
            <template #icon>
              <n-icon>
                <Trash />
              </n-icon>
            </template>
          </n-button>
        </div>
      </template>
    </n-list-item>
  </n-list>
  <fileModal 
    :title="changingFile ? 'Change file name' : 'Add file'"
    :show-modal="showModal"
    v-model:fileName="fileName"
    @save="onSave()"
    @close="store.toggleModal()"
  />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store'
import { ref } from 'vue'
import { Trash, PencilSharp, AddCircleOutline } from '@vicons/ionicons5'
import fileModal from './fileModal.vue'
import { useDialog } from 'naive-ui'

const store = useStore()
const { files, showModal, selectedFile, changingFile } = storeToRefs(store)
const dialog = useDialog()

const fileName = ref('')

function onSave() {
  //  Validation on empty input
  if (fileName.value && fileName.value !== '') {
    changingFile.value ? store.changeFileName(fileName.value) : store.addNewFile(fileName.value)
    fileName.value = ''
    store.toggleModal()
  } else {
  //  Error message 
    dialog.error({
      title: 'Error',
      content: 'Enter file name!',
      positiveText: 'Ok',
    })
  }
  
}
function setChangeFileModal(file) {
  // Setting up a changing file name modal window
  store.setChangingFile(file.id)
  fileName.value = file.fileName
  store.toggleModal()
}
</script>