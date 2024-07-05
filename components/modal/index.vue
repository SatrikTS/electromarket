<template>
  <div
    class='modal-alt'
    @click='closeModal'
  >
    <div class='modal-alt-window'>
      <slot />
    </div>
  </div>
</template>
<script setup>

defineProps({
  isShowModal: Boolean,
})

const emit = defineEmits(["closeModal"])

function closeModal(e) {
  if (e.target.classList.contains("modal")) {
    emit("closeModal", false)
  }
}
</script>
<style
  scoped
  lang='scss'
>
.modal-alt {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
}

.modal-alt-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, - 50%);
  background: $bg-main;
  padding: $offset-large;
  border-radius: 8px;
}
</style>