<template>
  <v-app id="app">
    <v-navigation-drawer
    
      clipped
      app
      overflow
    >
      <side-bar />
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      app
      height="80px"
      style="padding-left: 20px"
    >
      
      <v-toolbar-title
        class="font-weight-bold"
      >  
        <v-img
          src="https://www.nicepng.com/png/detail/247-2475175_ecommerce-e-commerce-website-logo.png"
          class="my-03"
          contain
          width="80"
          height="80"
        ></v-img>
      </v-toolbar-title>
      <v-toolbar-title
        class="font-weight-bold"
      >
        PDF Store
      </v-toolbar-title> <v-spacer />
      <v-btn icon large><v-icon large> mdi-cart </v-icon></v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row
          align="centeconst sourceOfTruth = {}r"
          justify="center"
        >
          <v-col cols="11">
            <!-- <v-card> -->
              
              <router-view />
            <!-- </v-card> -->
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SideBar from './components/SideBar.vue';

export default {
  name: 'App',
  components: {
    SideBar
  },

  data: () => ({
    //
  }),
};
</script>
