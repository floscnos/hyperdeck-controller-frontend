<script setup>
import {onMounted, reactive} from "vue";
import {api} from "@/api";
import {useHyperdeckStore} from "@/stores/hyperdeck.store";

const hyperdeckStore = useHyperdeckStore();

const data = reactive({
  clips: [],
  diskinfo: null
})
const reloadClips = () => {
  data.clips = []
  api.get('/clips').then(response => {
    Object.entries(response.data).forEach(([key, value]) => {
      if (key !== 'clip count') {
        const clipArray = value.split(' ');
        let newClip = {
          id: key,
          name: clipArray[0],
          duration: clipArray[clipArray.length - 1]
        }
        data.clips.push(newClip);
      }
    })
  })

  getDiskInfo();
}

const getDiskInfo = () => {
  api.get('/diskinfo').then(response => {
    data.diskinfo = response.data
  })
}

const humanFileSize = (size) => {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

onMounted(() => {
  reloadClips();
})

const selectClip = (Id) => {
  api.get(`/setClip/${Id}`);
}

const deleteClip = (filename) => {
  const confirmed = confirm(`Are you sure you want to delete ${filename}?`)
  if (confirmed) {
    api.delete(`/clips/${filename}`).then(response => {
      reloadClips()
    }).catch((err) => {
      alert(err)
    })
  }
}

</script>

<template>
<div class="mb-4">
  <div class="flex justify-between items-center mb-2">
    <h2 class="text-xl">Clip Browser</h2>
    <fa-icon icon="rotate-left" size="xl" @click="reloadClips" class="cursor-pointer" />
  </div>

  <div class="border rounded">
    <table v-if="data.clips" class="table-auto w-full">
      <thead>
        <tr class="border-b">
          <th></th>
          <th class="text-left py-2">Id</th>
          <th class="text-left">Name</th>
          <th class="text-left">Duration</th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="clip in data.clips" class=" odd:bg-black">
        <td class="pl-2"><fa-icon v-if="clip.id === hyperdeckStore.clipId" icon="play" class="text-green-600"></fa-icon></td>
        <td class="py-2">{{ clip.id }}</td>
        <td>{{ clip.name }}</td>
        <td>{{ clip.duration }}</td>
        <td>
          <div class=" text-right">
            <button
              class="border rounded px-1 py-px"
              @click="selectClip(clip.id)"
            >
              play
            </button>
            <button class="mx-2">
              <fa-icon class="hover:text-orange-400" icon="trash-can"  size="xl" @click="deleteClip(clip.name)"/>
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <p v-if="data.diskinfo">Diskspace used: {{ humanFileSize(data.diskinfo[0].totalUsedSize) }}</p>

</div>
</template>

<style scoped>

</style>