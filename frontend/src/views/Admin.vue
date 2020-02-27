<template>
  <div>
    <div class="container row">
      <v-layout
        align-center
        justify-center
        class="col-md-12 col-sm-12 col-xs-12"
      >
        <v-flex
          xs12
          sm8
          md4
        >
          <v-card class="elevation-12">
            <v-toolbar 
              color="#00acee" 
            >
              <v-toolbar-title>Admin - Login</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form 
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-container>
                  <v-text-field                    
                    v-model="credentials.username"
                    prepend-icon="mdi-account" 
                    :counter="70"
                    label="Username"
                    :rules="rules.username"
                    maxlength="70"
                    required
                  />
                  <v-text-field
                    v-model="credentials.password"
                    prepend-icon="mdi-lock" 
                    type="password"
                    :counter="20"
                    label="Password"
                    :rules="rules.password"
                    maxlength="20"
                    required
                  />
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                @click="login"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import router from '../router';

export default {
    name: 'Auth',
    data: () => ({
        credentials: {},
        valid:true,
        loading:false,
        rules: {
          username: [
            v => !!v || "Username is required",
            v => (v && v.length > 3) || "A username must be more than 3 characters long",
            v => /^[a-z0-9_]+$/.test(v) || "A username can only contain letters and digits"
          ],
          password: [
            v => !!v || "Password is required",
            v => (v && v.length > 7) || "The password must be longer than 7 characters"
          ]
        }
    }),
    methods: {
        login() {
          if (this.$refs.form.validate()) {
              this.loading = true;
              this.$apollo.query({
                  query: require('../graphql/login.gql'),
                  variables: this.credentials,
              }).then(res => {
                  localStorage.setItem('apollo-token', res.data.loginUser.token);
                  router.push('/newproduct');
              }).catch(e => {
                this.loading = false;
                console.log(e);
              });
            }
        }
    }
}
</script>