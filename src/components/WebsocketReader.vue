<script setup>
import {onMounted, reactive} from "vue";
import {useMessagesStore} from "@/stores/messages.store";

const wsMessages = reactive({
  data: ""
});

const messagesStore = useMessagesStore();


onMounted(() => {

  messagesStore.socket.addEventListener("message", (event) => {
    wsMessages.data = JSON.parse(event.data);

    if (wsMessages.data.response === "status") {
      messagesStore.lastState = wsMessages.data.params;
    }
  })
})
</script>

<template>
<!--  <div class="bg-white text-black overflow-auto max-h-96">-->
<!--    <p>-->
<!--      {{ wsMessages.data }}-->
<!--    </p>-->
<!--  </div>-->
</template>