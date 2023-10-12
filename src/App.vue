<template>
  <n-dialog-provider>
    <n-space vertical size="large">
      <n-layout has-sider>
        <n-layout-sider
          collapse-mode="transform"
          :collapsed-width="20"
          :width="240"
          show-trigger="arrow-circle"
          bordered
        >
        <Sidebar />
        </n-layout-sider>
        <n-layout-content>
          <codemirror
            v-if="selectedFile"
            v-model="selectedFile.value"
            placeholder="Code goes here..."
            :style="{ height: '100vh' }"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            @change="val => onChange(val)"
          />
          <n-h2 style="margin: 10px 20px;" v-else>No file selected</n-h2>
        </n-layout-content>
      </n-layout>
    </n-space>
  </n-dialog-provider>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { storeToRefs } from 'pinia'
import { useStore } from './store'

const store = useStore()
const { selectedFile } = storeToRefs(store)

const extensions = [javascript(), oneDark]

function onChange(val) {
  store.changeSelectedFileValue(val)
}

</script>
