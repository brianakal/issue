<template>
  <div class="about">
    <h1>This is an CSV Import page</h1>
    <form @submit.prevent="uploadCsv">
      <dl>
        <div>
          File CSV : <input type="file" ref="csvFile" accept=".csv">
        </div>
      </dl>
      <button type="submit">Import File CSV</button>
    </form>
    <div v-if="successUpload">
      Berhasil
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    successUpload: null,
    item: {
      file: null,
      preview: null
    }
  }),
  methods: {
    importCsv($event) {
      item.file = $event.target.files[0]

      const fileReader = new FileReader()

      // fileReader.addEventListener('load', function () {
      //   item.preview = fileReader.result;
      // }, false);

      const reader = fileReader.readAsDataURL(item.file)
    },

    async uploadCsv() {
      const formData = new FormData()
      
      /* 
      this.items.forEach((item) => {
        
      })
      */
      
// console.log(this.$refs.csvFile.files)

      formData.append('file', this.$refs.csvFile.files[0])
      console.log(formData)

      const response = await axios.post('files/importcsvform', formData)
      console.log(response)
      this.successUpload = true
      
    }
  }
}
</script>
