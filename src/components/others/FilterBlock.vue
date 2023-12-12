<template>
  <div class="filter" v-if="Object.keys(nationsList).length > 0">
    <div class="filter__item">
      <div class="filter__title">Поиск</div>
      <v-input
          placeholder="Введите имя"
          @changeInput="$emit('searchByName', $event)"
          :value="searchInput"
      />
    </div>
    <div class="filter__item">
      <div class="filter__title">Пол</div>
      <radio-buttons-list
          :radio-list="gendersList"
          @checkRadioButton="changeFilter($event, 'genders')"
      />
    </div>
    <div class="filter__item">
      <div class="filter__title">Национальность</div>
      <radio-buttons-list
          :radio-list="nationsList"
          @checkRadioButton="changeFilter($event, 'nations')"
      />
    </div>
    <v-button
        full
        @click.native="$emit('resetFilters')"
    >
      Сбросить фильтр
    </v-button>
  </div>
</template>

<script>
import VInput from "@/components/forms/VInput";
import RadioButtonsList from "@/components/forms/RadioButtonsList";
import VButton from "@/components/buttons/VButton";
export default {
  components: {VButton, RadioButtonsList, VInput},
  props: {
    nationsList: {
      type: Array,
      required: true
    },
    gendersList: {
      type: Array,
      required: true
    },
    searchInput: {
      type: String,
      required: true
    }
  },
  methods: {
    changeFilter(value, key){
      this.$emit('changeFilter', key, value);
    }
  }
}
</script>

<style scoped>
.filter{
  min-width: 300px;
  margin-left: 30px;
  min-height: 100%;
  background-color: var(--lightgrey);
  padding: 20px;
}
.filter__item{
  max-height: 600px;
  margin-bottom: 20px;
  overflow-y: scroll;
}
.filter__title{
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
}
</style>