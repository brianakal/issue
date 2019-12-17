<template>
  <div class="about">
    <h1>This is an send email page</h1>
    <button type="button" @click="kirimEmail">Kirim Email</button>
  </div>
</template>
<script>

import axios from "axios";

export default {
  data: () => ({
  }),

  methods: {
    async kirimEmail() {
      const response = await axios.post("mail/emailSend");
    },
  }
}
</script>