<template>
  <v-list
    shaped
    style="padding-top:20px"
  >
    <div class="col-md-12">
      <h5>Technologies Used:</h5>
    </div> 
    <v-list-item-group 
      v-model="item"
      color="#00acee" 
      style="align-self:left"
    >
      
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        style="align-self:left"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <span class="font-weight-bold"> {{ item.text }} </span>
      </v-list-item>
    </v-list-item-group><br>
    
  </v-list>
</template>

<script>
  import router from "../router";

  export default {
    name: "side-menu",
    data: () => ({
      item: 0,
      items: [
        { icon: 'mdi-nodejs', text: 'NodeJS'},
        { icon: 'mdi-vuejs', text: 'VueJS'},
        { icon: 'mdi-graphql', text: 'GraphQL'},
        { icon: 'mdi-bootstrap', text: 'Bootstrap'},
        { icon: 'mdi-aws', text: 'AWS S3'},
        { icon: 'mdi-cart', text: 'Snipcart'},
        { icon: 'mdi-cloud-search', text: 'Algolia'},        
        { icon: 'mdi-currency-usd', text: 'Stripe' }
      ]
    }),
    methods: {
      logout: function () {
        location.reload();
        router.push('/');
      },
    }
  }
</script>