<template>
    <div class="container card">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4"> 
                <img class="col-xs-11 col-sm-11 col-md-11" :src="this.imgUrl" />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4" style="font-family: Montserrat;">
                <br><br>
                <h1> {{ name }} </h1> 
                <h4> by {{ author }} </h4>
                <h6> {{ numberOfPages}} pages </h6> <br><br>
                <v-btn class="snipcart-add-item"
                    color="#00acee"
                    outlined
                    :data-item-id="_id"
                    :data-item-price="price"
                    data-item-url="www.google.com/"
                    :data-item-description="author"
                    :data-item-image="imgUrl"
                    :data-item-name="name"
                > Add to Cart </v-btn>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4" style="font-family: Montserrat;">
                <br><br>
                <h4> Description : </h4>
                <p> You will recieve a PDF of the Book through an E-Mail. </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({

    }),
    props: {
        "_id"           : String,
        "name"          : String,
        "numberOfPages" : Number,
        "genre"         : String,
        "imgUrl"        : String,
        "price"         : Number,
        "author"        : String,
        "purchasedBy"   : Number
    }
}
</script>