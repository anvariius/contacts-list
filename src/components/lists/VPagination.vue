<template>
  <div class="pagin">
    <div
        class="pagin__item"
        v-for="page of pagesCount"
        :class="{'pagin__item_active': page === currentPage}"
        @click="$emit('changePage', page)"
    >
      {{ page }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pagesCount: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.pagin{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
}
.pagin__item{
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: var(--primary);
  border: 2px solid var(--primary);
  color: var(--white);
  margin: 0 3px;
  cursor: pointer;
}
.pagin__item_active{
  background-color: transparent;
  color: var(--primary);
}
</style>