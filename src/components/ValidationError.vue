<script>
    export default{
        name: 'ValidationError',
        props: {
            errors: Object
        },
        computed: {
            error() {
                return Object.keys(this.errors).map(key => {
                    return (this.errors[key])[0]
                })[0]
            }
        }
    }
</script>
        
<template>
    <div class="alert alert-danger" role="alert">
        {{ error }}
    </div>

</template>
        
<style scoped>
        
</style>