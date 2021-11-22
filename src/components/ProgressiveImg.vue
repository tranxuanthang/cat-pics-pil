<template>
  <span
    ref="pilElement"
    class="inline-flex justify-center items-center relative"
    :class="wrapperClass"
  >
    <canvas ref="canvasElement" :width="width" :height="height" class="max-w-full max-h-full object-contain filter-blur-svg transition duration-500 ease-in"></canvas>

    <img
      v-if="shouldLoad"
      class="absolute top-0 left-0 w-full h-full transition duration-500 object-contain ease-out"
      :class="{ 'opacity-0': !isLoaded }"
      :src="src"
      :width="width"
      :height="height"
      @load="originalImageLoaded(index)"
      alt=""
      v-bind="$attrs"
    >
  </span>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  inheritAttrs: false,

  props: {
    width: Number,
    height: Number,
    src: String,
    tinySrc: String,
    wrapperClass: [String, Object],
  },

  setup (props) {
    const shouldLoad = ref(false)
    const isLoaded = ref(false)
    const pilElement = ref(null)
    const canvasElement = ref(null)
    let tinyImage = null
    let observer = null

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            shouldLoad.value = true
          }, 1200)

          observer.disconnect()
        }
      })
    }

    const initIntersectionObserver = () => {
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(observerCallback)
        observer.observe(pilElement.value)
      } else {
        shouldLoad.value = true
      }
    }

    const originalImageLoaded = () => {
      isLoaded.value = true
    }

    const onTinyImageLoaded = () => {
      const ctx = canvasElement.value.getContext('2d')
      ctx.drawImage(tinyImage, 0, 0, tinyImage.naturalWidth, tinyImage.naturalHeight, 0, 0, props.width, props.height);
      tinyImage.removeEventListener('load', onTinyImageLoaded)
    }

    const createPlaceholder = () => {
      tinyImage = new Image()
      tinyImage.src = props.tinySrc
      tinyImage.addEventListener('load', onTinyImageLoaded)
    }


    onMounted(() => {
      createPlaceholder()
      initIntersectionObserver()
    })

    onBeforeUnmount(() => {
      tinyImage.removeEventListener('load', onTinyImageLoaded)
      if (observer) {
        observer.disconnect()
      }
    })

    return {
      originalImageLoaded,
      pilElement,
      shouldLoad,
      isLoaded,
      canvasElement
    }
  }
}
</script>

<style>
.filter-blur-svg {
  filter: url('../assets/blur-filter.svg#sharpBlur')
}
</style>
