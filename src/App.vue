<template>
  <div class="text-center text-4xl font-bold my-12">
    Pics of cats (with ProgressImg component)
  </div>

  <div class="w-full max-w-screen-xl mx-auto">
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
</template>

<script>
import { ref } from 'vue'
import ProgressiveImg from './components/ProgressiveImg'

export default {
  components: {
    ProgressiveImg
  },

  setup () {
    const images = ref(require('./assets/data.json'))

    return {
      images
    }
  }
}
</script>

<style>
</style>
