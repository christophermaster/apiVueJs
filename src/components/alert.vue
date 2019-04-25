<template>
  <v-snackbar
    v-model="alert.show"
    :color="alert.color"
    :right="'right'"
    :top="'top'"
    :timeout='5000'
  >
    <span class="font-weight-bold">{{ alert.message }}</span>
    <v-btn color="black" flat @click="alert.show = false">
      <v-icon color="white">close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
    export default {
        props: {
            alert: { type: Object, default: () => {} },
        },
    }
</script>