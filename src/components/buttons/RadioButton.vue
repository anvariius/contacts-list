<template>
  <div
      class="radio"
      @click="$emit('checkRadioButton', value)"
  >
    <div
        class="radio__button"
        :class="{'radio__button_active': active}"
    ></div>
    <div class="radio__value">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.radio{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}
.radio__button{
  height: 25px;
  width: 25px;
  border-radius: 100%;
  border: 2px solid var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.radio__button_active::before{
  content: "";
  height: 15px;
  width: 15px;
  border-radius: 100%;
  background-color: var(--primary);
}
.radio__value{
  font-size: 18px;
  font-weight: 500;
}
</style>