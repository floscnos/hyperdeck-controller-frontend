<script setup>
import {onBeforeMount} from "vue";
import {useMessagesStore} from "@/stores/messages.store";
import MainControls from "@/components/MainControls.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import ClipBrowser from "@/components/ClipBrowser.vue";
import {useHyperdeckStore} from "@/stores/hyperdeck.store";

const messagesStore = useMessagesStore();
const hyperdeckStore = useHyperdeckStore();

onBeforeMount(() => {
  messagesStore.init();
  hyperdeckStore.init();
})

</script>

<template>

  <div class="bg-bm-grey  text-white h-full flex justify-center py-12">
    <div class="w-2/3">
      <h1 class="text-3xl border-b-2 py-2 ">Blackmagic Hyperdeck Controller</h1>

      <MainControls />

      <div class="grid grid-cols-2 border-t py-4 gap-4">

          <ClipBrowser />

          <VideoPlayer />
        </div>

    </div>
  </div>

</template>