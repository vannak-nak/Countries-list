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
    <table style="width:100%">
      <tr>
        <th>Flag</th>
        <th style="width:30%">Name</th>
        <th>2 charchter Country</th>
        <th>3 charchter Country Code</th>
        <th>Native Name</th> 
        <th>Alternative</th>
        <th>Country Calling Codes</th>
      </tr>
      <tr v-for="data in filterTableData" :key="data">
        <td><img :src="data.flags.png" alt=""></td>
        <td>{{data.name.official}}</td>
        <td>{{data.cca2}}</td>
        <td>{{data.cca3}}</td>
        <td>{{data.name.nativeName?.zho?.official}}</td>
        <td style="display: flex; gap: 10px; padding: 24px 0;">
          <div v-for="alt in data.altSpellings" :key="alt">
            {{alt}}
          </div>  
        </td> 
        <td>{{data.idd.root}}</td>
      </tr>
    </table>
  </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'


export default {
  setup() {
    
    const search = ref('');
    const originalTableData = ref([]);
    const filterTableData = computed(() => originalTableData.value.filter(data => data.name.official.toLowerCase().indexOf(search.value.toLowerCase()) > -1));
    
    onMounted(() => {
      axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response);
      originalTableData.value = response.data
      });
    });
    return {
        search,
        filterTableData,
        originalTableData,
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
  width: 12%;
}
th:nth-child(7){
  border: 0;
  width: 11%;
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
