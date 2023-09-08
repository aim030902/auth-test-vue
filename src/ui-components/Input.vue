<script>
    export default{
        name: 'Input',
        props: {
            type: String,
            label: String,
            modelValue: String
        },
        methods: {
            updateInput(e) {
                this.$emit('update:modelValue', e.target.value)
            }
        }
    }
</script>
        
<template>
    <div class="form-floating">
        <input :type="type" class="form-control" :id="label" :placeholder="label" @input="updateInput" :value="modelValue">
        <label :for="label">{{ label }}</label>
    </div>
</template>
        
<style scoped>


</style>
