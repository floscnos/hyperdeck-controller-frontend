<script setup>

import {useMessagesStore} from "@/stores/messages.store";
import {onMounted, reactive} from "vue";

const messagesStore = useMessagesStore();

const data = reactive({
  clips: []
})
const reloadClips = () => {
  data.clips = [];
  messagesStore.socket.send(JSON.stringify({
    command: "clip_refresh"
  }));
}

onMounted(() => {
  messagesStore.socket.addEventListener("message", (event) => {
    const res = JSON.parse(event.data);
    if (res.response === "clip_info") {
      let clip = data.clips.find(clip => clip.id == res.params.id);
      if (clip == null) {
        data.clips.push(res.params);
      } else {
        data.clips[data.clips.indexOf(clip)] = res.params;
      }
    } else if (data.clips.length === 0) {
      reloadClips();
    }
  })

})

const selectClip = async (Id) => {
  const playing = messagesStore.lastState.status === "play";

  // console.log(Id);

  const command = {
    command: "clip_select",
    params: {
      id: Id - 1
    }
  }
  console.log(JSON.stringify(command));
  messagesStore.socket.send(JSON.stringify(command));

}

</script>

<template>
<div>
  <div class="flex justify-between items-center mb-2">
    <h2 class="text-xl">Clip Browser</h2>
    <fa-icon icon="rotate-left" size="xl" @click="reloadClips" />
  </div>

  <div class="border rounded p-2">
    <table v-if="data.clips" class="table-auto w-full">
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Name</th>
          <th class="text-left">Duration</th>
        </tr>
      </thead>
      <tr v-for="clip in data.clips" class=" odd:bg-black">
        <td class="py-2">{{ clip.id }}</td>
        <td>{{ clip.name }}</td>
        <td>{{ clip.duration }}</td>
        <td>
          <button
            class="border rounded px-1 py-px"
            @click="selectClip(clip.id)"
          >
            play
          </button>
        </td>
      </tr>
    </table>
  </div>

</div>
</template>

<style scoped>

</style>