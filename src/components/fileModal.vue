<template>
  <n-modal :show="showModal">
    <n-card
      style="width: 600px"
      :title="title"
      role="dialog"
      aria-modal="true"
    >
      <n-input :value="fileName" @input="val => $emit('update:fileName', val)" type="text" placeholder="File name" 
      @keypress.enter="$emit('save')" />
      <template #footer>
        <div style="display: flex; gap: 10px;">
          <n-button 
            @click="$emit('save')"
            strong round
            secondary type="success"
            size="large"
            style="width: 50%;"
            >
            Save
          </n-button>
          <n-button 
            @click="$emit('close')"
            strong round
            secondary type="tertiary" 
            size="large"
            style="width: 50%;"
          >
            Close
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
const props = defineProps({
  showModal: Boolean,
  title: String,
  fileName: String
})
const emit = defineEmits(['update:fileName', 'save', 'close'])
</script>