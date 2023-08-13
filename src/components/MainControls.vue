<script setup>
import MainControlButton from "@/components/MainControlButton.vue";
import {api} from "@/api";
import {playStateEnum, useHyperdeckStore} from "@/stores/hyperdeck.store";

const hyperdeckStore = useHyperdeckStore();


const play = () => {
  api.get('/play')
}

const stop = () => {
  api.get('/stop')
}

const loopClick = () => {
  api.get('/loop')
}

const singleClipLoop = () => {
  api.get('/singleClip')
}
</script>

<template>
  <div class="my-6">
    <div class="flex my-2 gap-6">

      <MainControlButton
          :active="hyperdeckStore.playState === playStateEnum.PLAYING"
          tooltip="Play"
          icon="play"
          @click="play"
      />
      <MainControlButton
          :active="hyperdeckStore.playState === playStateEnum.STOPPED"
          tooltip="Stop"
          icon="stop"
          @click="stop"
      />

      <span class="my-2 border-l border-gray-200">
      </span>

      <MainControlButton
          :active="hyperdeckStore.looped"
          tooltip="Loop"
          icon="infinity"
          @click="loopClick"
      />

      <MainControlButton
          :active="hyperdeckStore.singleClip"
          tooltip="Single Clip"
          icon="1"
          @click="singleClipLoop"
      />

    </div>
    <div class="flex gap-4 items-center">
      <p class="text-orange-400 text-xl">{{ hyperdeckStore.timecode }}</p>
      <p>Clip id: {{ hyperdeckStore.clipId }}</p>
    </div>



  </div>

</template>