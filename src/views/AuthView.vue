<template>
  <div class="auth-screen">
    <div class="auth-block">
      <radio-buttons-list
          :radio-list="radioList"
          @checkRadioButton="checkRadioButton"
      />
      <v-button
          full
          @click.native="setAuth"
      >
        Войти
      </v-button>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/buttons/VButton";
import RadioButton from "@/components/buttons/RadioButton";
import RadioButtonsList from "@/components/forms/RadioButtonsList";
export default {
  components: {RadioButtonsList, RadioButton, VButton},
  data () {
    return {
      //список доступов
      radioList: [
        {value: 'user', text: 'Пользователь', active: true},
        {value: 'admin', text: 'Администратор', active: false},
      ]
    }
  },
  methods: {
    //отображение выбранной кнопки
    checkRadioButton(value) {
      this.radioList.map((item) => item.active = item.value === value);
    },
    setAuth() {
      const checkedRole = this.radioList.find((i) => i.active).value; //находим активную роль
      this.$emit('setAuth', checkedRole); //отправляем роль родителю
    }
  }
}
</script>

<style scoped>
.auth-screen{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth-block{
  background-color: var(--lightgrey);
  border-radius: 10px;
  padding: 50px;
  margin-bottom: 180px;
}
</style>