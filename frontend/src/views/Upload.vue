<template>
  <div style="padding: 40px;">


    <!-- <img src="http://localhost:3000/download" alt=""> -->

    <form @submit.prevent="upload">
      <dl>
        <dd v-for="(item, index) in items" :key="index">
          <div>
            Title: <input type="text" v-model="item.name">
          </div>
          <div>
            <input type="file" :ref="item.file" @change="updateFile(item, $event)" accept="image/jpeg,application/pdf">
            <img :src="item.preview" alt="">
          </div>
        </dd>
      </dl>
      <button type="button" @click="addMore">Add more</button>
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    items: [
      {
        name: '',
        file: null,
        preview: '',
      }
    ]
  }),
  methods: {
    updateFile(item, $event) {
      item.file = $event.target.files[0]

      const fileReader = new FileReader()

      fileReader.addEventListener('load', function () {
        item.preview = fileReader.result;
      }, false);

      const reader = fileReader.readAsDataURL(item.file)
    },


    addMore() {
      this.items.push({
        name: '',
        file: null
      })
    },
    async upload() {
      console.log(this.items)
      const formData = new FormData()

      this.items.forEach((item) => {
        formData.append('name', item.name)
        formData.append('file', item.file)
      })

      console.log(formData)

      const response = await axios.post('files/upload', formData)

      console.log(response)
    }
  }
}
</script>
