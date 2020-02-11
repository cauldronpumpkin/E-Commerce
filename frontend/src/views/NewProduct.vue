<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 text-center">
            <input type="file" ref="img" v-on:change="selectFile()" />
        </div> <br><br><br>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <v-text-field outlined v-model="name" label="name.." />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <v-text-field outlined v-model="author" label="author.." />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <v-text-field outlined v-model="price" label="price.." />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <v-text-field outlined v-model="genre" label="genre.." />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <v-text-field outlined v-model="numberOfPages" label="number Of Pages.." />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 text-center">
            <v-btn dark v-on:click="uploadFile()" :loading="loading"> Upload </v-btn>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        file: null,
        loading: false,
        name: "",
        price: "",
        author: "",
        numberOfPages: "",
        genre: "",
    }),
    methods: {
        selectFile() {
            this.file = this.$refs.img.files[0];
        },
        async uploadFile() {
            var filedata = new FormData();
            filedata.append('file', this.file);
            this.loading = true;
            const res = await axios.post('http://localhost:4000/upload', filedata); 
            this.$apollo.mutate({
                mutation    : require('../graphql/newProduct.gql'),
                variables   : {
                    credentials: {
                        name            : this.name,
                        price           : parseFloat(this.price),
                        author          : this.author,
                        numberOfPages   : parseFloat(this.numberOfPages),
                        genre           : this.genre,
                        imgUrl          : res.data.url
                    }
                }
            }).then (() => {
                this.loading = false;
                this.name = "";
                this.author = "";
                this.price = "";
                this.numberOfPages = "";
            })
        }
    }
}
</script>

<style scoped>

</style>