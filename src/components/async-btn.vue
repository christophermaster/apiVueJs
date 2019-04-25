<template>
  <v-btn
    :active-class="activeClass"
    class="modal"
    :disabled="disabled"
    :large="large"
    :outline="outline"
    :small="small"

    :loading="loading"
    @click.prevent="execute"
  >
    <slot/>
  </v-btn>
</template>

<script>
export default {
  props: {
    // v-btn most used props
    activeClass: String,
    color: {
      type: String,
      default: "info"
    },
    disabled: Boolean,
    large: Boolean,
    outline: Boolean,
    small: Boolean,
    // own props
    action: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    execute() {
      const promise = this.action();
      if (Promise.resolve(promise) !== promise) {
        throw new Error('Action must return a promise');
      }

      this.loading = true;
      promise
        .then(() => this.loading = false)
        .catch(() => this.loading = false);
    },
  },
}
</script>