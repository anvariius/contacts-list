<template>
  <input type="text" class="input" @input="$emit('changeInput', $event.target.value)" :value="value">
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>
.input{
  border: 2px solid var(--primary);
  background-color: var(--white);
  border-radius: 10px;
  height: 50px;
  width: 100%;
  font-size: 18px;
  padding: 10px 20px;
}
</style>