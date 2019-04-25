<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="600px">
    <v-card>
      <v-toolbar dark class="modal">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="hideModal">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <div class="text-xs-center">
          <slot name="question"></slot>
        </div>
        <div v-if="!reversible">
          <br>
          <div class="text-xs-center">Recuerde que está acción es irreversible</div>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="justify-center layout">
          <v-btn color="secondary" dark @click="hideModal">
            <v-icon v-if="icon">close</v-icon>&nbsp;Cancelar
          </v-btn>
          <x-async-btn
            class="white--text"
            :action="confirm"
          >
            <v-icon v-if="icon">{{ icon }}</v-icon>&nbsp;Confirmar
          </x-async-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: Boolean,
    reversible: Boolean,
    title: String,
    icon: String,
    action: Function,
  },
  methods: {
    confirm() {
      return this.action().then(() => {
        return this.hideModal();
      });
    },
    hideModal(office) {
      this.$emit('close');
    }
  }
};
</script>