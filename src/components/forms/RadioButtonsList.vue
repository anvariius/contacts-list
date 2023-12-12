<template>
  <div class="radio-list">
    <div
        v-for="(radio, key) in radioList"
        :key="key"
    >
      <radio-button
          :value="radio.value"
          :text="radio.text"
          :active="radio.active"
          @checkRadioButton="$emit('checkRadioButton', radio.value)"
      />
    </div>
  </div>
</template>

<script>
import RadioButton from "@/components/buttons/RadioButton";
export default {
  components: {RadioButton},
  props: {
    radioList: {
      type: Array,
      required: false
    }
  }
}
</script>

<style scoped>

</style>