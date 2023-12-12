<template>
  <div class="section">
    <div class="container">
      <div class="section__header">
        <v-title>Список контактов</v-title>
        <div class="section__actions">
          <dropdown-button
              class="section__button"
              :dropdown-list="sortTypes"
              @changeDropdown="changeSortType"
          />
          <v-button
              class="section__button"
              @click.native="changeView"
          >
            {{viewType === 'table' ? 'Отобразить плиткой' : 'Отобразить таблицей'}}
          </v-button>
        </div>
      </div>
      <div class="section__content">
        <div v-if="contactsToShow.length === 0">
          Ничего не найдено
        </div>
        <div v-else>
          <table-contacts-list
              v-if="viewType === 'table'"
              :contacts-list="contactsToShow"
              @copyToClipboard="copyToClipboard"
          />
          <tiled-contacts-list
              v-else
              :contacts-list="contactsToShow"
              @copyToClipboard="copyToClipboard"
          />
        </div>
        <filter-block
            v-if="this.auth === 'admin'"
            :nations-list="filters.nations"
            :genders-list="filters.genders"
            :search-input="searchInput"
            @changeFilter="changeFilter"
            @resetFilters="resetFilters"
            @searchByName="searchByName"
        />
      </div>
      <div>
        <v-pagination
            :pages-count="Math.floor(readyContacts.length / contactsInPage)"
            :current-page="currentPage"
            @changePage="changePage"
        />
      </div>
      <div class="reload-wrap">
        <v-button @click.native="getContacts">Обновить данные</v-button>
      </div>
      <div>
        <statistic-block :stats="stats"/>
      </div>
    </div>
    <v-button @click.native="logOut" class="logout-button">Выйти из ЛК</v-button>
  </div>
</template>

<script>
import VTitle from "@/components/text/VTitle";
import TableContactsList from "@/components/lists/TableContactsList";
import TiledContactsList from "@/components/lists/TiledContactsList";
import VButton from "@/components/buttons/VButton";
import VPagination from "@/components/lists/VPagination";
import DropdownButton from "@/components/buttons/DropdownButton";
import axios from "axios";
import StatisticBlock from "@/components/others/StatisticBlock";
import FilterBlock from "@/components/others/FilterBlock";
export default {
  components: {
    FilterBlock,
    StatisticBlock, DropdownButton, VPagination, VButton, TiledContactsList, TableContactsList, VTitle
  },
  props: {
    auth: {
      type: String | null,
      required: true
    }
  },
  data() {
    return {
      contactsList: [], //полный список контактов
      readyContacts: [], //отфильтрованные и отсортированные контакты
      contactsToShow: [], //отображаемые контакты текущей страницы
      viewType: this.$store.getters.getViewType, //тип отображения (таблица или плитка)

      //типы сортировок
      sortTypes: [
        {
          name: 'По умолчанию',
          value: 'default',
          active: true,
        },
        {
          name: 'от A до Z',
          value: 'a-z',
          active: false
        },
        {
          name: 'от Z до A',
          value: 'z-a',
          active: false
        },
      ],

      //статистика
      stats: {
        size: 0,
        nations: {},
        genders: {},
        popularGender: ''
      },

      //переменные пагинации
      contactsInPage: 10,
      currentPage: 1,
      startPosition: 0,
      endPosition: 10,

      //переменные отображения фильтров
      filters: {
        nations: [],
        genders: []
      },

      //переменные для активных фильтров
      activeFilters: {
        nations: [],
        genders: []
      },
      searchInput: ''
    }
  },
  methods: {
    //функция получения контактов
    async fetchContacts() {
      try {
        const response = await axios.get(this.$store.state.apiUrl); //отправка запроса
        let maxGenderNum = 0; //макс кол-во гендера

        response.data.results.map((contact) => {
          //приведение необходимых полей в нужный вид
          contact.id = contact.id.value ? contact.id.value : contact.cell;
          contact.fullName = contact.name.first + ' ' + contact.name.last;
          contact.birthday = this.convertDate(contact.dob.date);
          contact.place = contact.location.country + ', ' + contact.location.city;

          //вычисление статистики
          //записываем кол-во контактов по каждой национальности
          this.stats.nations[contact.nat] ? this.stats.nations[contact.nat] += 1 : this.stats.nations[contact.nat] = 1;

          //кол-во мужчин, женщин и неопределившихся
          this.stats.genders[contact.gender] ? this.stats.genders[contact.gender] += 1 : this.stats.genders[contact.gender] = 1;

          //вычисление самого многочисленного гендера
          if(this.stats.genders[contact.gender] > maxGenderNum) {
            maxGenderNum = this.stats.genders[contact.gender];
            this.stats.popularGender = contact.gender;
          }
        });

        this.contactsList = [...response.data.results];

        //размер списка
        this.stats.size = this.contactsList.length;

        //инициализируем список фильтров
        this.setFilters();
      }catch (e) {
        return console.error(e);
      }
    },

    //функция сортировки контактов
    sortContacts() {
      //находим выбранный тип сортировки
      const activeSortType = this.sortTypes.find((i) => i.active).value;

      //если знчение по умолчанию, возвращаем изначальный список контактов
      if(activeSortType === 'default'){
        return this.readyContacts = [...this.contactsList];
      }

      //иначе, определяем функцию сортировки
      let sortFunction;
      if(activeSortType === 'a-z'){
        sortFunction = (a, b) => a.fullName.toLowerCase() > b.fullName.toLowerCase() ?  1 : -1;
      }
      else if(activeSortType === 'z-a'){
        sortFunction = (a, b) => a.fullName.toLowerCase() < b.fullName.toLowerCase() ?  1 : -1;
      }

      //сортируем
      this.readyContacts = this.contactsList.toSorted(sortFunction);
    },

    //фильтрация контактов
    filterContacts() {

      //если не админ, то выходим
      if(this.auth !== 'admin') {
        return;
      }

      //если фильтры пустые, ничего не фильтруем
      if(
          this.activeFilters.genders.length === 0 &&
          this.activeFilters.nations.length === 0 &&
          this.searchInput.length === 0
      ){
        return;
      }

      console.log(this.searchInput);
      this.readyContacts = this.readyContacts.filter((item) => {
        //проверяем совпадают ли значения с фильтрами
        return (this.activeFilters.genders.length === 0 || this.activeFilters.genders.includes(item.gender)) &&
        (this.activeFilters.nations.length === 0 || this.activeFilters.nations.includes(item.nat)) &&
        (this.searchInput.length === 0 || item.fullName.toLowerCase().includes(this.searchInput.toLowerCase()))
      });
    },

    //функция определения контактов текущей страницы
    setContactsToShow() {
      this.contactsToShow = this.readyContacts.slice(this.startPosition, this.endPosition);
    },

    //вывод контактов
    initContacts() {
      //сортируем контакты
      this.sortContacts();
      //фильтруем контакты
      this.filterContacts();
      //отображение с первой страницы
      this.changePage(1);
    },

    //получение и вывод контактов
    async getContacts() {
      this.clearFilters();
      await this.fetchContacts();
      this.initContacts();
    },

    //очистка фильтров
    clearFilters() {
      this.activeFilters.genders = [];
      this.activeFilters.nations = [];
      this.searchInput = '';
    },


    searchByName(value) {
      this.searchInput = value;
      this.initContacts();
    },

    //сброс фильтра к изначальным
    resetFilters() {
      this.clearFilters();
      this.setFilters();
      this.initContacts();
    },

    //функция изменения сортировки
    changeSortType(value) {
      this.sortTypes.map((i) => i.active = i.value === value);
      this.initContacts();
    },

    //функция изменения режима просмотра
    changeView() {
      this.viewType = this.viewType === 'table' ? 'tile' : 'table';
      this.$store.commit('setViewType', this.viewType);
    },

    //функция изменения текущий страницы
    changePage(page) {
      this.currentPage = page;
      this.endPosition = page * this.contactsInPage;
      this.startPosition = this.endPosition - this.contactsInPage;

      this.setContactsToShow();
    },

    //функция конвертирования даты
    convertDate(date) {
      date = new Date(date);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return `${days[date.getDay()]}, mm/dd/yyyy, hh:mm am`;
    },
    //функция копирования в буфер
    copyToClipboard(text){
      try {
        navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    },

    //определение списка фильтров
    setFilters() {
      const mapFunc = (i) => {
        return {text: i, value: i, active: false}
      }

      //элментры фильтров берем из списков статистики
      this.filters.nations = Object.keys(this.stats.nations).map(mapFunc);
      this.filters.genders = Object.keys(this.stats.genders).map(mapFunc);
    },

    //выбор или снятие фильтра
    changeFilter(key, value) {
      this.filters[key].forEach((item) => {
        if(item.value === value){
          item.active = !item.active;

          const index = this.activeFilters[key].indexOf(item.value);
          index === -1 ? this.activeFilters[key].push(value) : this.activeFilters[key].splice(index, 1);
        }
      });
      this.initContacts();
    },

    logOut() {
      this.$emit('logOut');
    }
  },
  mounted () {
    this.getContacts();
  }
}
</script>

<style scoped>
.section__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 45px;
}
.section__actions{
  display: flex;
  justify-content: flex-end;
}
.reload-wrap{
  display: flex;
  justify-content: center;
  margin: 60px 0 0;
}
.section__button{
  margin-left: 10px;
}
.section__content{
  display: flex;
  justify-content: space-between;
}

.logout-button{
  position: fixed;
  right: 15px;
  bottom: 15px;
}
</style>