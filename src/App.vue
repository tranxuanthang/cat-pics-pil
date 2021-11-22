<template>
  <div class="flex gap-4 mb-8 mt-2 justify-center">
    <button class="border-b-2 font-bold uppercase" :class="{ 'text-blue-700 border-blue-800': mode == 'component' }" @click="mode = 'component'">Component mode</button>
    <button class="border-b-2 font-bold uppercase" :class="{ 'text-blue-700 border-blue-800': mode == 'directive' }" @click="mode = 'directive'">Directive mode</button>
  </div>

  <div v-if="mode == 'component'">
    <div class="text-center text-4xl font-bold my-12">
      Pics of cats (with ProgressiveImgComponent)
    </div>

    <div class="w-full max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <span class="block flex justify-center mb-6 mx-auto max-h-[50vh]"
            v-for="(image, index) in images"
            :key="index"
      >
        <progressive-img
          :tiny-src="require('./assets/images/tiny-' + image.image).default"
          :src="require('./assets/images/' + image.image).default"
          :width="image.width"
          :height="image.height"
          alt="Hlaesdsf"
        />
      </span>
    </div>
  </div>

  <div v-if="mode == 'directive'">
    <div class="text-center text-4xl font-bold my-12">
      Pics of cats (with ProgressiveImgDirective)
    </div>

    <div class="w-full max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
         v-progressive-img="'img'"
    >
      <span class="block flex justify-center mb-6 mx-auto max-h-[50vh]"
            v-for="(image, index) in images"
            :key="index"
      >
        <img
          :data-tiny-src="require('./assets/images/tiny-' + image.image).default"
          :data-full-src="require('./assets/images/' + image.image).default"
          :width="image.width"
          :height="image.height"
          alt="Hlaesdsf"
        />
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const images = ref(require('./assets/data.json'))
    const mode = ref('component')

    return {
      images,
      mode
    }
  }
}
</script>

<style>
</style>
