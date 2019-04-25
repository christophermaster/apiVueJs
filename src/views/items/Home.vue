<template>
  <div>
    <v-layout>
      <v-flex>
        <template>
          <v-sheet
            class="d-flex sheet"
            height="50px"
          >
            <span class="headline text-uppercase text-md-center py-2 font-span">Lista de Elementos</span>       
          </v-sheet>
        </template>
      </v-flex>
    </v-layout>
    <br>
    <v-layout>
      <v-flex>
        <template>
          <v-card>
            <v-card-title>
              <!--Lista da Productos-->
              <v-spacer></v-spacer>
          
            </v-card-title>
            <v-data-table :headers="headers" :items="itemList" :search="search">
              <template v-slot:items="props">
                <td>{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.userId }}</td>
                <td class="text-xs-left">{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.body }}</td>
                <td class="justify-center layout px-0">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on" :to="`edit/${props.item.id}`">
                        <v-icon class="color-i" small>edit</v-icon>
                      </v-btn>
                    </template>
                    <span>Editar</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template  v-slot:activator="{ on }">
                      <v-btn icon >
                        <v-icon class="color-i" small v-on="on" @click.stop="showDeleteModal(props.item)">delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Eliminar</span>
                  </v-tooltip>
                </td>
              </template>
              <template v-slot:no-results>
                <v-alert
                  :value="true"
                  color="error"
                  icon="warning"
                >Su búsqueda de "{{ search }}" no encontró resultados.</v-alert>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
    <x-confirmation-modal
      :show="deleteModal.show"
      title="Eliminar Elemento"
      icon="delete"
      :action="deleteItems"
      @close="hideDeleteModal"
    >
     <template slot="question">
        <label>¿Está seguro que desea eliminar este Elemento?</label>
        <br/><br/>
        <strong>
          {{ deleteModal.item.userId }} -
          {{ deleteModal.item.title }} 
        </strong> 
    </template>
    </x-confirmation-modal>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import itemsService from '../../services/items'; 

export default {
  name: "App",
  data() {
    return {
      search: "",// variable para el buscador 
      itemList: [],
      // cabeceras
      headers: [
        { text: "Id", value: "id" },
        { text: "Número de Empleado ", value: "userId" },
        { text: "Nombre", value: "title" },
        { text: "Descripción", value: "description" },
        { text: "Acciones", value: "" }
      ],
      // objeto para el manejo de la modal
      deleteModal: {
        show: false,
        item: {
          type : {},
        },
      },
    };
  },
  methods: {
    // llenado de la tabla 
    getItems() {
      return itemsService.list()
        .then(response => {
          this.itemList = [];
          this.itemList = response;
        });
    },
    // llamado a la api para la eliminacion
    deleteItems() {        
      return itemsService.delete(this.deleteModal.item.id)
      .then((res) => {
        console.log("Elimino");
      });
    },
    // Mostrar la modal
    showDeleteModal(item) {
      this.deleteModal.show = true;
      this.deleteModal.item = item;
    },
    // Ocultar la modal 
    hideDeleteModal() {
      this.deleteModal.show = false;
      this.deleteModal.item = {
        type : {},
      }
    }
  },
  created() {
    this.getItems();
  }
};
</script>
