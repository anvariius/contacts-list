<template>
  <table class="table" v-if="contactsList.length > 0">
    <thead>
      <tr>
        <td class="table__item table__item_head">Avatar</td>
        <td class="table__item table__item_head">Fullname</td>
        <td class="table__item table__item_head">Birthday</td>
        <td class="table__item table__item_head">Email</td>
        <td class="table__item table__item_head">Phone</td>
        <td class="table__item table__item_head">Location</td>
        <td class="table__item table__item_head">Nation</td>
      </tr>
    </thead>
    <tbody>
      <tr
          v-for="contact in contactsList"
          :key="contact.id"
          class="table__row"
      >
        <td class="table__item">
          <div class="table__image" :style="{ backgroundImage: `url(${contact.picture.medium})` }"></div>
        </td>
        <td class="table__item">
          <div class="table__text">
            {{ contact.fullName }}
          </div>
        </td>
        <td class="table__item">
          <div class="table__text">
            {{ contact.birthday }}
          </div>
        </td>
        <td class="table__item">
          <div class="table__text table__text_clickable" @click="$emit('copyToClipboard', contact.email)">
            {{ contact.email }}
          </div>
        </td>
        <td class="table__item">
          <div class="table__text table__text_clickable" @click="$emit('copyToClipboard', contact.phone)">
            {{ contact.phone }}
          </div>
        </td>
        <td class="table__item">
          <div class="table__text">
            {{ contact.place }}
          </div>
        </td>
        <td class="table__item">
          <div class="table__text">
            {{ contact.nat }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
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
.table{
  width: 100%;
}
.table__item{
  padding: 15px;
  border: 1px solid var(--lightgrey);
}
.table__item_head{
  background-color: var(--lightgrey);
}
.table__image{
  height: 60px;
  width: 60px;
  border-radius: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.table__text_clickable{
  color: var(--primary);
  cursor: pointer;
}
.table__text_clickable:hover{
  text-decoration: underline;
}
</style>