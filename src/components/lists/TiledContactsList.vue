<template>
  <div class="contacts">
    <div
        class="item"
        v-for="contact in contactsList"
        :key="contact.id"
    >
      <div
          class="item__image"
          :style="{ backgroundImage: `url(${contact.picture.large})` }"
      ></div>
      <div class="item__content">
        <div class="item__text">{{ contact.fullName }}</div>
        <div class="item__text">{{ contact.birthday }}</div>
        <div class="item__text item__text_clickable" @click="$emit('copyToClipboard', contact.email)">{{ contact.email }}</div>
        <div class="item__text item__text_clickable" @click="$emit('copyToClipboard', contact.phone)">{{ contact.phone }}</div>
        <div class="item__text">{{ contact.place }}</div>
        <div class="item__text">{{ contact.nat }}</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    contactsList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.contacts{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.item{
  width: 48%;
  display: flex;
  background-color: var(--lightgrey);
  overflow: hidden;
  margin-bottom: 15px;
}
.item__image{
  min-height: 100%;
  min-width: 130px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.item__text{
  margin-bottom: 5px;
}
.item__content{
  padding: 10px 30px;
}
.item__text_clickable{
  color: var(--primary);
  cursor: pointer;
}
.item__text_clickable:hover{
  text-decoration: underline;
}
</style>