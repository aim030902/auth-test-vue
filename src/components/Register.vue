<script>
    import { mapGetters } from 'vuex'
    import { gettersType } from '@/modules/types';
    import ValidationError from './ValidationError.vue'

    export default{
        name: 'RegisterView',
        data() {
            return {
                username: '',
                email: '',
                password: ''
            }
        },
        components: {
            ValidationError
        },
        methods: {
            submitRegisterForm() {
                const userData = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }

                this.$store.dispatch('register', userData)
                .then(response => {
                    console.log('USER', response);
                    this.$router.push({name: 'profile'})
                })
                .catch(errors => {
                    console.log('ERRORS', errors);
                })
            }
        },
        computed: {
            ...mapGetters({
                errors: gettersType.errors,
            }),
            hasErrors() {
                return this.$store.getters[gettersType.errors] != null && Object.keys(this.$store.getters[gettersType.errors]).length != 0
            } 
        }
    }
</script>
        
<template>
    <div class="d-flex align-items-center py-4">
        <main class="form-signup w-100 m-auto">
            <form @submit.prevent>                
                <img class="mb-4" src="@/assets/logo.svg" alt="" width="72" height="57">
                <h1 class="h3 mb-3 fw-normal">Register</h1>

                <ValidationError v-if="hasErrors" :errors="errors" />

                <Input :type="'text'" :label="'Username'" v-model="username" />
                <Input :type="'email'" :label="'Email address'" v-model="email" />
                <Input :type="'password'" :label="'Password'" v-model="password" />

                <Button type="submit" @click="submitRegisterForm">Register</Button>
            </form>
        </main>
    </div>
</template>
        
<style scoped>
    .form-signup {
        max-width: 330px;
        padding: 1rem;
    }
</style>