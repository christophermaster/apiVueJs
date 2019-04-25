<template>
  <v-app>
    <v-toolbar app>
      <img src="./assets/img/logoaforenvo.gif" style="width: 20%;"/>
      <v-toolbar-title class="headline text-uppercase">
        <!--
        <span>VueJS-</span>
        <span class="font-weight-light">My Example Vuetify</span>-->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon to="/">
            <v-icon class="color-i"  v-on="on">home</v-icon>
          </v-btn>
        </template>
        <span>Inicio</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon  to="/create">
            <v-icon class="color-i" v-on="on">playlist_add</v-icon>
          </v-btn>
        </template>
        <span>Agregar</span>
      </v-tooltip>
      <div class="text-xs-center">
          <v-menu>
            <template #activator="{ on: menu }">
              <v-tooltip bottom>
                <template #activator="{ on: tooltip }">
                  <v-btn
                    icon
                    flat
                    v-on="{ ...tooltip, ...menu }"
                  >
                    <v-icon class="color-i">account_circle</v-icon>
                  </v-btn>
                </template>
                <span>Perfil</span>
              </v-tooltip>
            </template>
            <v-list>
              <v-list-tile
                v-for="(item, index) in items"
                :key="index"
                @click=""
              >
                <v-list-tile-title><v-icon class="color-i"  v-on="on">{{ item.icon }}</v-icon>&nbsp;{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
    </v-toolbar>

    <v-content class="grey lighten-4">
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
  export default {
    name: 'App',
    data: () => ({
      items: [
        { title: 'Salir', icon: 'exit_to_app' },
        { title: 'Configurar perfil', icon: 'settings' },
      ]
    })
  }
</script>
