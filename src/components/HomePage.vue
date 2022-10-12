<template>
  <div class="wrap">
    <div class="header">
        <div class="profile">
          <img alt="ai" src="../assets/profile2.jpg">
          <P class="name">THEA VANNAK</P>
        </div>
        <div class="search">
          <input class="search-txt" type="text" placeholder="Search here" v-model="search">
        </div>
  </div>   
  <div class="main-containt">
    <h2>List countries in the world</h2>
    <table>
      <tr>
        <th>Flag</th>
        <th @click="sortDataTable(i++)" class="tile-name">Name</th>
        <th @click="sortDataTable(i++)">2 charchter Country</th>
        <th @click="sortDataTable(i++)">3 charchter Country Code</th>
        <th @click="sortDataTable(i++)">Native Name</th> 
        <th @click="sortDataTable(i++)">Alternative</th>
        <th>Country Calling Codes</th>
      </tr>
      <tr v-for="data in filterTableData" :key="data">
        <td><img :src="data.flags.png" alt=""></td>
        <td>{{data.name.official}}</td>
        <td>{{data.cca2}}</td>
        <td>{{data.cca3}}</td>
        <td>{{data.name.nativeName?.zho?.official}}</td>
        <td>
          <div v-for="alt in data.altSpellings" :key="alt" class="alternative">
            {{alt}},
          </div>  
        </td> 
        <td>{{data.idd.root}}</td>
      </tr>
    </table>
  </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'


export default {
  setup() {
    const search = ref('');
    const sort = ref('');
    const i = ref(0);
    const originalTableData = ref([]);
    const cloneOriginalTableData = ref([]);
    const getData = () => {
      axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        originalTableData.value = response.data;
      });
    }
    getData();
    watch(() => i.value, () => {
      if (i.value === 0) {
        getData();
      } else if (i.value === 1) {
        originalTableData.value = originalTableData.value.sort((a, b) => a.name.official.localeCompare(b.name.official));
      } else if (i.value === 2) {
        originalTableData.value = originalTableData.value.sort((a, b) => b.name.official.localeCompare(a.name.official));
      } else if (i.value === 3) {
        i.value = 0;
      }
    });

    watch(() => i.value, () => {
      if (i.value === 0) {
        console.log(originalTableData);
      } else if (i.value === 1) {
        originalTableData.value = originalTableData.value.sort((a, b) => a.altSpellings.localeCompare(b.altSpellings));
      } else if (i.value === 2) {
        originalTableData.value = originalTableData.value.sort((a, b) => b.altSpellings.localeCompare(a.altSpellings));
      } else if (i.value === 3) {
        i.value = 0;
      }
    });

    const filterTableData = computed(() => originalTableData.value.filter(data => data.name.official.toLowerCase().indexOf(search.value.toLowerCase()) > -1));
    return {
        search,
        filterTableData,
        originalTableData,
        // sortDataTable,
        i,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
    padding: 20px 20px 0 20px;
    position: relative;
    border: 1px solid #ccc;
    border-bottom: 0;
}
.profile{
    display: flex;
    justify-content: left;
}
.profile img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
}
.name{
    display: flex;
    align-items: center;
}
.search {
    position: absolute;
    right: 20px;
    top: 25px;
}
.search-txt{
    width: 210px;
    padding: 10px 10px;
    border-radius: 5px;
}
.main-containt{
  padding: 0 20px 20px 20px;
  border: 1px solid #ccc;
  border-top: 0;
  margin-bottom: 50px;
}
h2{
  margin-bottom: 20px;
}
table{
  background: #f3f3f3;
  border-spacing: 0;
  font-size: 13px;
  text-align: left;
}
th{
  background: #e5e5e5;
  padding: 10px 10px;
  border-right: 1px solid #fff;
  cursor: pointer;
}
.tile-name{
  position: relative;
}
.tile-name::before{
  content: "";
  position: absolute;
  top: 0;
  left: 30px;
}
th:nth-child(7){
  border: 0;
  width: 10%;
}
.alternative {
    display: inline;
}
td{
  padding: 5px 10px;
  border-bottom: 1px solid #fff;
}
img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
