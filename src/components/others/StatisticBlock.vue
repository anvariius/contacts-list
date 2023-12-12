<template>
  <div class="stat" v-if="stats.size > 0">
    <div class="stat__text">Размер: {{stats.size}}</div>
    <div class="stat__text">Национальности:</div>
    <div class="stat__items">
      <div
          class="stat__item"
          v-for="(column, key) in Object.keys(stats.nations)"
          :key="key"
      >
        {{`${column}: ${stats.nations[column]}`}}
      </div>
    </div>
    <div class="stat__text">Гендеры:</div>
    <div class="stat__items">
      <div
          class="stat__item"
          v-for="(column, key) in Object.keys(stats.genders)"
          :key="key"
      >
        {{`${column}: ${stats.genders[column]}`}}
      </div>
    </div>
    <div class="stat__text">Популярный гендер: {{stats.popularGender}}</div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.stat{
  margin-top: 60px;
}
.stat__text{
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  color: var(--grey);
}
.stat__item{
  color: var(--grey);
  margin-right: 5px;
  margin-left: 5px;
}
.stat__items{
  display: flex;
  justify-content: center;
}
</style>