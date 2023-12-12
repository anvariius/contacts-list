<template>
  <button class="button" :class="{'button_full': full}"><slot></slot></button>
</template>

<script>
export default {
  props: {
    full: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
.button{
  font-size: 18px;
  font-weight: 600;
  background-color: var(--primary);
  color: var(--white);
  border-radius: 5px;
  padding: 10px 20px;
  height: 42px;
}
.button_full{
  width: 100%;
}
</style>