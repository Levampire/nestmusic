<template>
  <transition name="scale">
      <div v-if="visible" class="toast_content">
        {{ content }}
      </div>
  </transition>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      content: '',
      type: '',
      delay: ''
    })

    const visible = ref(false)
    let timer

    const close = () => {
      clearTimeout(timer)
      visible.value = false
      timer = null
    }

    const open = () => {
      if (timer) clearTimeout(timer)

      visible.value = true
      timer = setTimeout(close, state.delay)

      return close
    }

    return {
      ...toRefs(state),
      visible,
      open,
      close
    }
  }
})
</script>

<style lang="css" scoped>

.toast_content {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100px;
  padding: 10px 20px;
  color: #fff;
  word-break: break-all;
  background-color: rgba(0, 0, 0, .7);
  border-radius: 10px;
  width: auto;
  z-index: 999;
}

.scale-enter-active, .scale-leave-active {
  transition:  .8s;
}

</style>
