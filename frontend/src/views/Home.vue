<template>
  <div class="home">
    <div class="container-fluid">
        <div>
          <ais-instant-search :search-client="searchClient" index-name="products">
            <ais-search-box placeholder="Master Search.. (search for name, genre, author..)" autofocus :class-names="{'ais-SearchBox': 'search'}"/>
            <ais-configure :hitsPerPage="9" />
            <ais-hits :escapeHTML="true" :class-names="{'ais-Hits': 'col-md-12', 
              'ais-Hits-list': 'col-md-12', 
              'ais-Hits-item': 'col-md-3 col-sm-5 col-xs-12'}">
              <div slot="item" slot-scope="{ item }">
                <div> <center> <product-item v-bind="item"/> </center> </div>
              </div>
            </ais-hits>
            <div><ais-pagination /></div>
          </ais-instant-search>
        </div>
    </div>
  </div>
</template>

<script> 
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
import ProductItem from '../components/ProductItem.vue';

export default {
  name: 'Home',
  components: {
    ProductItem
  },
  data: () => ({
    searchClient: algoliasearch(
        '4C6MY66NS6',
        '49632c48bd46d4de11acf9f434f1bfab'
    ),
  })
}
</script>

<style scoped>
  .search {
    border: 1px solid #00acee;
  }
</style>

