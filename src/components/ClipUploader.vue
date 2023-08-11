<script setup>

import {reactive} from "vue";
import {api} from "@/api";

const data = reactive({
  clip: null,
  uploadWebsocket: null,
  clipSize: 0,
  bytesTransferred: 0,
});

const uploadClip = (event) => {
  data.clip = event.target.files[0];
  resetProgress()
}
const handleUpload = () => {
  const formData = new FormData();
  formData.append('clip', data.clip);
  const headers = {'Content-Type': 'multipart/form-data'};
  api.post('/clips', formData, { headers }).then(response => {
    console.log("Clipsize: " + response.data.filesize)
    data.clipSize = response.data.filesize;
    data.uploadWebsocket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL + '/job/' + response.data.job);
    data.uploadWebsocket.onmessage = (event) => {
      data.bytesTransferred = JSON.parse(event.data).info.bytes;

      if (data.bytesTransferred === data.clipSize) resetProgressDelayed();
    }
  });
}

const resetProgressDelayed = async () => {
  await new Promise(r => setTimeout(r, 5000));
  resetProgress();
}
const resetProgress = () => {
  data.uploadWebsocket = null;
  data.clipSize = 0;
  data.bytesTransferred = 0;
}
</script>

<template>
  <h2 class="text-lg">Upload new Clip</h2>
<div class="border rounded p-2">
  <form enctype='multipart/form-data' @submit.prevent="handleUpload">
    <input name="clip" type="file" @change="uploadClip"/>
    <button type="submit" class="border rounded px-1 py-px">Upload</button>
  </form>
  <div v-if="data.uploadWebsocket">
    <div class="border h-3 mt-3 rounded-sm">
      <div class="bg-orange-400 h-full" :style="'width: ' + (data.bytesTransferred / data.clipSize * 100) + '%'" ></div>
    </div>
  </div>
</div>
</template>
