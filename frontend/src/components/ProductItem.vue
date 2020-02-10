<template>
    <div class="container card" style="background-color: #f5f6f7">
        <img class="col-sm-12 col-xs-12 col-md-12" :src="imgUrl">
        <div class="openProduct">
            <v-btn rounded outlined v-on:click="openProduct()">View</v-btn>
        </div>
        <div class="addToCart">
            <v-btn rounded outlined v-on:click="addToCart()">Add to Cart</v-btn>
        </div>
        <div class="card-body">
            <h4 class="card-text">{{ name }}</h4>
            <p> by {{ author }} </p>
            <p> {{ numberOfPages }} Pages</p>
            <h3> $ {{ price }} </h3>
        </div>
    </div>
</template>

<script>
export default {
    name: "product-item",
    data: () => ({

    }),
    computed: {
        cart() {
            return this.$store.getters.cart;
        }
    },
    props: {
        "_id"           : String,
        "name"          : String,
        "numberOfPages" : Number,
        "genre"         : String,
        "imgUrl"        : String,
        "price"         : Number,
        "author"        : String,
        "purchasedBy"   : Number
    },
    methods: {
        openProduct() {
            
        },
        addToCart() {
            var payload = {
                "_id"    : this._id,
                "name"  : this.name,
                "imgUrl": this.imgUrl,
                "price" : this.price,
                "author": this.author,
            }
            this.$store.dispatch('addToCart', payload);
            alert("Added to Cart.");
        }
    }
}
</script>  

<style scoped>
    .addToCart {
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
    }
    .openProduct {
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
    }
    .card:hover .addToCart {
        opacity: 1;
    }
    .card:hover .openProduct {
        opacity: 1;
    }
    .card:hover img {
        opacity: 0.5;
    }
</style>