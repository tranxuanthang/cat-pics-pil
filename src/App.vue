<template>
  <div class="text-center text-4xl font-bold my-12">
    Pics of cats (with Progressive Image Loading)
  </div>

  <div class="flex flex-col items-center w-full max-w-screen-xl mx-auto">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="relative mb-6 overflow-hidden pil"
      :data-index="index"
    >
      <img
        class="pil-tiny max-w-full filter blur-lg transform scale-110"
        :src="require('./assets/images/tiny-' + image.image).default"
        :width="image.width"
        :height="image.height"
        alt=""
      >
      <img
        v-if="image.shouldLoad"
        class="pil-original absolute top-0 left-0 w-full transition duration-1000"
        :class="{ 'opacity-0': !image.loaded }"
        :src="require('./assets/images/' + image.image).default"
        :width="image.width"
        :height="image.height"
        @load="originalImageLoaded(index)"
        alt=""
      >
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup () {
    const images = ref(require('./assets/data.json'))

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            const imageIndex = entry.target.dataset.index
            images.value[imageIndex].shouldLoad = true
          }, 1200)

          observer.unobserve(entry.target)
        }
      })
    }

    const initIntersectionObserver = () => {
      const observer = new IntersectionObserver(observerCallback)
      const elements = document.querySelectorAll('.pil')

      elements.forEach(element => observer.observe(element))
    }

    const originalImageLoaded = (index) => {
      images.value[index].loaded = true
    }

    onMounted(initIntersectionObserver)

    return {
      images,
      originalImageLoaded
    }
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
