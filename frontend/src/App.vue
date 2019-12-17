<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> <br />
      <router-link to="/upload">Upload</router-link> |
      <router-link to="/download">Download</router-link> <br />
      <router-link to="/emailSend">Email Send</router-link> |
      <router-link to="/emailForm">Email Form</router-link> <br />
      <router-link to="/pdfEmbed">PDF Embed</router-link> |
      <router-link to="/pdfPreview">PDF Preview</router-link> |
      <router-link to="/pdfShow">PDF Show</router-link> |
      <router-link to="/pdfDownload">PDF Download</router-link> |
      <router-link to="/pdfExport">PDF Export</router-link> |
      <router-link to="/pdfOnlyOffice">PDF Only Office</router-link> <br />
      <router-link to="/csvImport">CSV Import</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
