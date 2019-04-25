<template>
  <div>
    <v-layout>
      <v-flex>
        <template>
          <v-sheet
            class="d-flex sheet"
            height="50px"
          >
            <span class="headline text-uppercase text-md-center py-2 font-span">Editar Elemento</span>       
          </v-sheet>
        </template>
      </v-flex>
    </v-layout>
    <br>
    <v-layout>
      <v-flex>
        <v-layout>
          <v-flex>
            <v-card>
              <v-card-title primary-title>
                <div></div>
              </v-card-title>
              <v-card-text>
                <template>
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-layout>
                      <v-text-field
                        v-model="name"
                        :error-messages="nameErrors"
                        :counter="10"
                        label="Nombre"
                        color="info"
                        required
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                      ></v-text-field>
                    </v-layout>
                    <v-layout>
                      <v-text-field
                        v-model="description"
                        :error-messages="descriptionErrors"
                        label="Descripción"
                        color="info"
                        required
                        @input="$v.description.$touch()"
                        @blur="$v.description.$touch()"
                      ></v-text-field>
                    </v-layout>
                    <v-layout>
                      <v-select
                        v-model="select"
                        :items="items"
                        :error-messages="selectErrors"
                        label="Número del Empleado"
                        color="info"
                        required
                        @change="$v.select.$touch()"
                        @blur="$v.select.$touch()"
                      ></v-select>
                    </v-layout>
                    <v-layout>
                      <v-spacer></v-spacer>
                      <v-btn color="secondary" to="/">
                        <v-icon>close</v-icon>&nbsp;Cancelar
                      </v-btn>
                      <v-btn  class="color-btn-save" :disabled="!valid" @click="submit">
                        <v-icon>save</v-icon>&nbsp;Guardar
                      </v-btn>
                    </v-layout>
                  </v-form>
                </template>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
   <x-alert :alert="alert"></x-alert>
  </div>
</template>

<script>

//Librerias
import { Component, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import axios from "axios";
import alert  from "../../components/alert";

export default {
    mixins: [validationMixin],
    // Validaciones 
    validations: {
        name: { required, maxLength: maxLength(10) },
        description: { required },
        select: { required }
    },
    components: {
        alert,
    },
    // Variables utilizadas
    data: () => ({
        name: "",
        description: "",
        select: null,
        items: [],
        alert: {
            color:'',
            show: false,
            message:''
        },
        valid: true
    }),
    // Propiedades computadas para las validaciones 
    computed: {
      // validacion del select
      selectErrors() {
        const errors = [];
        if (!this.$v.select.$dirty) return errors;
        !this.$v.select.required &&
        errors.push("Número de empleado es requerido");
        return errors;
      },
      // validacion del nombre
      nameErrors() {
        const errors = [];
        if (!this.$v.name.$dirty) return errors;
        !this.$v.name.maxLength &&
        errors.push("El nombre debe tener 10 caracteres como máximo.");
        !this.$v.name.required && errors.push("Nombre es Requerido.");
        return errors;
      },
      // validacion para la descripcion
      descriptionErrors() {
        const errors = [];
        if (!this.$v.description.$dirty) return errors;
        !this.$v.description.required && errors.push("Descripción es requerida");
        return errors;
      }
    },
    methods: {
      async submit() {
        console.log(this.$v);
        if (!this.$v.$invalid){
          await axios.put(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`, {
              userId: this.select,
              title: this.name,
              body: this.description
          })
          .then(response => {
              this.alert.color = "success";
              this.alert.message = "Se edito con exito";
              this.alert.show = true;
              setTimeout( () => {
                this.$router.push('/');
              },3000);
          })
          .catch(error => {
            this.alert.color = "error";
            this.alert.message = "Error al editar";
            this.alert.show = true;
          });
        }else{
          this.$v.$touch();
        }
      },
      async getUserId() {
          await axios.get("https://jsonplaceholder.typicode.com/posts")
          .then(response => {
              for (let entry of response.data) {
                  this.items.push(entry.userId); 
              }
          })
          .catch(error => {
              if (!error.response) {
                  console.log("Error");
              } else {
                  console.log(error.response.data.message);
              }
          });
      },
      async getId() {
          await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
          .then(response => {
              this.name = response.data.title;
              this.description = response.data.body;
              this.select = response.data.userId;
          })
          .catch(error => {
              if (!error.response) {
                  console.log("Error");
              } else {
                  console.log(error.response.data.message);
              }
          });
      },
      clear() {
          this.$v.$reset();
          this.name = "";
          this.description = "";
          this.select = null;
      }
    },
    created () {
        this.getId();
        this.getUserId();
    }
};
</script>