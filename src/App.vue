<script setup>
import {onBeforeMount} from "vue";
import MainControls from "@/components/MainControls.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import ClipBrowser from "@/components/ClipBrowser.vue";
import {useHyperdeckStore} from "@/stores/hyperdeck.store";
import ClipUploader from "@/components/ClipUploader.vue";

const hyperdeckStore = useHyperdeckStore();


onBeforeMount(() => {
  hyperdeckStore.init();
})

</script>

<template>

  <div class="bg-bm-grey  text-white h-full flex justify-center py-12">
    <div class="w-2/3">
      <h1 class="text-3xl border-b-2 py-2 ">Blackmagic Hyperdeck Controller</h1>

      <MainControls />

      <div class="grid grid-cols-2 border-t py-4 gap-4">

        <div>
          <ClipBrowser />
          <ClipUploader />
        </div>


          <VideoPlayer />
        </div>

    </div>
  </div>

</template>