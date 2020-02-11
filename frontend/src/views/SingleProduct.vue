<template>
    <product v-bind="object"/>
</template>

<script>
import Product from '../components/Product.vue';

export default {
    data: () => ({
        id: null,
        object: {},
    }),
    components: {
        Product
    },
    created() {
        this.id = this.$route.params.id;
        this.$apollo.query({
            query: require('../graphql/singleProduct.gql'),
            variables: {
                id: this.id
            }
        }).then((res) => {
            this.object = res.data.singleProduct;
        })
    }
}
</script>