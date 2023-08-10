<script setup>

import {onMounted, reactive} from "vue";
import {useMessagesStore} from "@/stores/messages.store";
import MainControlButton from "@/components/MainControlButton.vue";

const messagesStore = useMessagesStore();

const data = reactive({
  status: null
})

onMounted(() => {
  messagesStore.socket.addEventListener("message", (event) => {
    const res = JSON.parse(event.data);
    if (res.response === "status") {
      data.status = res.params;
    }

  })
})

const play = () => {
  messagesStore.socket.send(JSON.stringify({
    command: "play",
    params: {
      loop: data.status.loop === 'true',
      single: data.status['single clip'] === 'true',
      speed: 1.0,
    },
  }))
}

const stop = () => {
  messagesStore.socket.send(JSON.stringify({
    command: "stop"
  }))
}

const loopClick = () => {
  const params = {
    loop: data.status.loop !== 'true',
    single: data.status['single clip'] === 'true',
  }
  const command = data.status.status === "play" ? 'play' : 'stop'

  messagesStore.socket.send(JSON.stringify({
    command: command,
    params: params
  }))
}

const singleClipLoop = () => {
  const params = {
    loop: data.status.loop === 'true',
    single: data.status["single clip"] !== 'true',
  }
  const command = data.status.status === "play" ? 'play' : 'stop'

  messagesStore.socket.send(JSON.stringify({
    command: command,
    params: params
  }))
}
</script>

<template>
  <div v-if="data.status" class="my-6">
    <div class="flex my-2 gap-6">

      <MainControlButton
          :active="data.status.status === 'play'"
          tooltip="Play"
          icon="play"
          @click="play"
      />
      <MainControlButton
          :active="data.status.status === 'stopped'"
          tooltip="Stop"
          icon="stop"
          @click="stop"
      />

      <span class="my-2 border-l border-gray-200">
      </span>

      <MainControlButton
          :active="data.status.loop === 'true'"
          tooltip="Loop"
          icon="infinity"
          @click="loopClick"
      />

      <MainControlButton
          :active="data.status['single clip'] === 'true'"
          tooltip="Single Clip"
          icon="1"
          @click="singleClipLoop"
      />

    </div>
    <div class="flex gap-4 items-center">
      <p class="text-orange-400 text-xl">{{ data.status.timecode }}</p>
      <p>Clip id: {{ data.status["clip id"] }}</p>
    </div>



  </div>

</template>