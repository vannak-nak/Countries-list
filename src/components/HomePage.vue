<template>
  <div class="wrap bg-slate-50 p-5 py-1">
    <el-row class="mt-8 pb-5">
      <el-col :span="8"><div class="grid-content ep-bg-purple" />
        <img class="rounded-full w-14 relative" src="../assets/profile2.jpg" alt=""> <p class="absolute left-16 inset-y-5">Thea Vannak</p> 
      </el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple-light" />
        <h1 class="Pink: 300">All countries in the world</h1>
      </el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple" />
        <el-input v-model="search" size="big" placeholder="search" type="text" />
      </el-col>
    </el-row>
    <el-table 
      :data="filterTableData"
      @select="handleSelect"
      style="width: 100%;"
      
    >
      <el-table-column label="Flags" width="80px">
        <template #default="scope">
          <img class="rounded-full" :src="scope.row.flags.png" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name.official" label="Name" sortable width="250" >
        <template #header>
          <span @click="clickSort(name = 'name')" class="w-full">
            <p :class="{'text-red-500': activeTab === 'name'}">Name</p>
            <el-icon v-if="arrowSort === 0 " class="opacity-0 hover:opacity-100 text-red-500"><Top /></el-icon>
            <el-icon v-else-if="arrowSort === 1 " class="text-red-500"><Top /></el-icon>
            <el-icon v-else class="text-red-500"><Bottom /></el-icon>
           </span>
        </template>
      </el-table-column>
      <el-table-column prop="cca2" label="2 character Country Code" sortable width="230" >
      <template #header>
          <span @click="clickCCC2(name = 'country-code')" class="w-full">
            <p :class="{'text-red-500': activeTab === 'country-code'}">2 character Country Code</p>
            <el-icon v-if="sortCCC2 === 0 " class="opacity-0 hover:opacity-100 text-red-500"><Top /></el-icon>
            <el-icon v-else-if="sortCCC2 === 1 " class="text-red-500"><Top /></el-icon>
            <el-icon v-else  class="text-red-500"><Bottom /></el-icon>
           </span>
        </template>
      </el-table-column>  
      <el-table-column prop="cca3" label="3 character Country Code" sortable width="230" >
        <template #header>
          <span @click="clickCCC3(name = 'country-code3')" class="w-full">
            <p :class="{'text-red-500': activeTab === 'country-code3'}">3 character Country Code</p>
            <el-icon v-if="sortCCC3 === 0 " class="opacity-0 hover:opacity-100 text-red-500"><Top /></el-icon>
            <el-icon v-else-if="sortCCC3 === 1 " class="text-red-500"><Top /></el-icon>
            <el-icon v-else class="text-red-500"><Bottom /></el-icon>
           </span>
        </template>
      </el-table-column>
      <el-table-column prop="name.nativeName.zho.official" label="Native Name" width="120" />
      <el-table-column prop="altSpellings" label="Alternative" sortable >
        <template #header>
          <span @click="clickAlter(name = 'alter')" class="w-full">
            <p :class="{'text-red-500': activeTab === 'alter'}">Alternative</p>
            <el-icon v-if="sortAlter === 0 " class="opacity-0 hover:opacity-100 text-red-500"><Top /></el-icon>
            <el-icon v-else-if="sortAlter === 1 " class="text-red-500"><Top /></el-icon>
            <el-icon v-else class="text-red-500"><Bottom /></el-icon>
           </span>
        </template>
      </el-table-column>
      <el-table-column prop="idd.root" label="Character Calling Code" sortable width="140" />
    </el-table>
    <!--Pagination-->
    <div class="flex justify-end mb-12 mt-4">
      <el-pagination
      v-model:currentPage="data.page"
      v-model:page-size="data.pageSize"
      :page-sizes="[5, 10, 20, 250]"
      :small="small"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.tableData.length"/>
    </div>
  
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
export default {
  setup() {
    const data = ref({
      tableData: [],
      page: 1,
      pageSize: 10,
    })
    const getData = () => {
      axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        data.value.tableData = response.data;
      console.log('data.value.tableData', data.value.tableData);
      });
    }
    getData();
    const search = ref('')
    const filterTableData = computed(() => {
      return data.value.tableData.slice(data.value.pageSize * data.value.page - data.value.pageSize, data.value.pageSize * data.value.page)
      .filter((data) =>!search.value || data.name.official.toLowerCase().includes(search.value.toLowerCase()))
    })
    console.log(filterTableData);
    const arrowSort = ref(0);
    const activeTab = ref('');
    const clickSort = (name) => {
      arrowSort.value = arrowSort.value + 1;
      if (arrowSort.value > 2){
        arrowSort.value = 0;
      }
      activeTab.value = name
    }
    const sortCCC2 = ref(0);
    const clickCCC2 = (name) => {
      sortCCC2.value = sortCCC2.value + 1;
      if (sortCCC2.value > 2){
        sortCCC2.value = 0;
      }
      activeTab.value = name
    }
    const sortCCC3 = ref(0);
    const clickCCC3 = (name) => {
      sortCCC3.value = sortCCC3.value + 1;
      if (sortCCC3.value > 2){
        sortCCC3.value = 0;
      }
      activeTab.value = name
    }
    const sortAlter = ref(0);
    const clickAlter = (name) => {
      sortAlter.value = sortAlter.value + 1;
      if (sortAlter.value > 2){
        sortAlter.value = 0;
      }
      activeTab.value = name
    }

    return {
      search,
      filterTableData,
      arrowSort,
      clickSort,
      data,
      sortAlter,
      clickAlter,
      sortCCC2,
      clickCCC2,
      sortCCC3,
      clickCCC3,
      activeTab,
    } 
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
  width: 90%;
  margin: 0 auto;
}
h1{
  font-weight: bold;
  font-size: 20px;
}
.el-input{
  width: 200px;
  display: block;
  float: right;
  margin-bottom: 20px;
}
:deep(.el-table .cell){
  display: flex;
}
:deep(.el-table th.el-table__cell){
  color: #333;
  background-color: #eef2f7;
}
.el-table__cell img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}
:deep(.el-table th.el-table__cell:hover){
  color: #f43f5e;
}
.el-icon{
  position: absolute;
  justify-content: right;
  z-index: 9999;
}
.el-table .cell .el-icon {
  width: 100%;
  top: 7px;
  right: 0;
  padding: 25px 20px 25px 0px;
}
:deep(.caret-wrapper i) {
  display: none;
}

</style>
