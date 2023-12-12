<template>
  <div class="dropdown">
    <v-button
        @click.native="dropdownShow = !dropdownShow"
    >
      {{dropdownList.find((i) => i.active).name}}
    </v-button>
    <div class="dropdown-list" v-show="dropdownShow">
      <div
          class="dropdown-item"
          v-for="(item, key) in dropdownList"
          :key="key"
          @click="$emit('changeDropdown', item.value); dropdownShow = false"
      >
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/buttons/VButton";
export default {
  components: {VButton},
  props: {
    dropdownList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dropdownShow: false
    }
  }
}
</script>

<style scoped>
.dropdown{
  position: relative;
}
.dropdown-list{
  background-color: var(--white);
  border: 2px solid var(--lightgrey);
  border-radius: 10px;
  padding: 20px;
  min-width: 200px;
  position: absolute;
  right: 0;
  top: 50px;
}
.dropdown-item{
  font-size: 16px;
  padding: 10px 5px;
  border-bottom: 2px solid var(--lightgrey);
  cursor: pointer;
  transition: 0.3s;
}
.dropdown-item:hover{
  background-color: var(--primary);
  color: var(--white);
}
</style>