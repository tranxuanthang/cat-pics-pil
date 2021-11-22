<template>
  <div class="text-center text-4xl font-bold my-12">
    Pics of cats (with Progressive Image Loading)
  </div>

  <svg class='hideSvgSoThatItSupportsFirefox'>
    <filter id='sharpBlur'>
      <feGaussianBlur stdDeviation='6'></feGaussianBlur>
      <feColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0'></feColorMatrix>
      <feComposite in2='SourceGraphic' operator='in'></feComposite>
    </filter>
  </svg>

  <div class="w-full max-w-screen-xl mx-auto">
    <span class="block flex justify-center mb-6 mx-auto max-h-[50vh]"
      v-for="(image, index) in images"
      :key="index"
      >
      <span
        class="inline-flex relative pil"
        :data-index="index"
      >
        <img
          class="pil-tiny max-w-full max-h-full object-contain"
          :style="`filter: url(#sharpBlur);`"
          :src="require('./assets/images/tiny-' + image.image).default"
          :width="image.width"
          :height="image.height"
          alt=""
        >
        <img
          v-if="image.shouldLoad"
          class="pil-original absolute top-0 left-0 w-full h-full transition duration-500 object-contain"
          :class="{ 'opacity-0': !image.loaded }"
          :src="require('./assets/images/' + image.image).default"
          :width="image.width"
          :height="image.height"
          @load="originalImageLoaded(index)"
          alt=""
        >
      </span>
    </span>
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

.hideSvgSoThatItSupportsFirefox {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
</style>
