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
      <el-table-column sortable width="250" >
        <template #header>
          <span @click="clickSort(name = 'name')" class="w-full">
            <p v-if="arrowSort === 0 " :class="{disableactive: activeTab === 'name'}">Country Name</p>
            <p v-else :class="{ active: activeTab === 'name'}">Country Name</p>
            <el-icon v-if="arrowSort === 0 "><Top /></el-icon>
            <el-icon v-else-if="arrowSort === 1 " :class="{ active: activeTab === 'name'}"><Top /></el-icon>
            <el-icon v-else :class="{ active: activeTab === 'name'}"><Bottom /></el-icon>
           </span>
        </template>
        <template #default="scope">
          <div @click="onDetail(scope.row)">{{scope.row.name.official}}</div>
       </template>
      </el-table-column>
      <el-table-column prop="cca2" label="2 character Country Code" sortable width="230" >
        <template #header>
          <span @click="clickCCC2(name = 'country-code')" class="w-full">
            <p v-if="sortCCC2 === 0 " :class="{disableactive: activeTab === 'country-code'}">2 character Country Code</p>
            <p v-else :class="{ active: activeTab === 'country-code'}">2 character Country Code</p>
            <el-icon v-if="sortCCC2 === 0 "><Top /></el-icon>
            <el-icon v-else-if="sortCCC2 === 1 " :class="{ active: activeTab === 'country-code'}"><Top /></el-icon>
            <el-icon v-else  :class="{ active: activeTab === 'country-code'}"><Bottom /></el-icon>
          </span>
        </template>
      </el-table-column>  
      <el-table-column prop="cca3" label="3 character Country Code" sortable width="230" >
        <template #header>
          <span @click="clickCCC3(name = 'country-code3')" class="w-full">
            <p v-if="sortCCC3 === 0 " :class="{disableactive: activeTab === 'country-code3'}">3 character Country Code</p>
            <p v-else :class="{ active: activeTab === 'country-code3'}">3 character Country Code</p>
            <el-icon v-if="sortCCC3 === 0 " :class="{'text-blue opacity-0': activeTab === 'name'}"><Top /></el-icon>
            <el-icon v-else-if="sortCCC3 === 1 " :class="{ active: activeTab === 'country-code3'}"><Top /></el-icon>
            <el-icon v-else :class="{ active: activeTab === 'country-code3'}"><Bottom /></el-icon>
           </span>
        </template>
      </el-table-column>
      <el-table-column prop="name.nativeName.eng.official" label="Native Name" width="120" />
      <el-table-column prop="altSpellings" label="Alternative" sortable >
        <template #header>
          <span @click="clickAlter(name = 'alter')" class="w-full">
            <p v-if="sortAlter === 0 " :class="{disableactive: activeTab === 'alter'}">Alternative</p>
            <p v-else :class="{ active: activeTab === 'alter'}">Alternative</p>
            <el-icon v-if="sortAlter === 0 " :class="{'text-blue opacity-0': activeTab === 'name'}"><Top /></el-icon>
            <el-icon v-else-if="sortAlter === 1 " :class="{ active: activeTab === 'alter'}"><Top /></el-icon>
            <el-icon v-else :class="{ active: activeTab === 'alter'}"><Bottom /></el-icon>
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
      :page-sizes="[10, 25, 50, 250]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.tableData.length"/>
    </div>
  </div>
  <el-dialog v-model="dialogTableVisible">
    <template #header><el-row class="font-bold justify-center bg-slate-700 text-white p-2 m-0">Detail Information</el-row></template>    
     <el-row>
        <el-col :span="4" class="">
          <el-row class="font-bold mb-4">Official Name</el-row>
          <el-row class="font-bold mb-4">Native Name</el-row>
          <el-row class="font-bold mb-4">Common Name</el-row>
          <el-row class="font-bold mb-4">Capital</el-row>
          <el-row class="font-bold mb-4">Languages</el-row>
          <el-row class="font-bold mb-4">Region</el-row>
          <el-row class="font-bold mb-4">Subregion</el-row>
          <el-row class="font-bold mb-4">Country-code 2</el-row>
          <el-row class="font-bold mb-4">Country-code 3</el-row>
          <el-row class="font-bold mb-4">CCN3</el-row>
          <el-row class="font-bold mb-4">CIOC</el-row>
        </el-col>
        <el-col :span="1" class="">
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row> 
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
        </el-col>
        <el-col :span="7" class="text-left">
          <el-row class="mb-4">{{detailInformation.name.official}}</el-row>
          <el-row class="mb-4">
             <div v-for="key in Object.entries(detailInformation.name.nativeName)" :key="key">
               <div v-for="k in key" :key="k">
                 {{k.official}}
              </div>
            </div>            
          </el-row>        
          <el-row class="mb-4">{{detailInformation.name.common}}</el-row>
          <el-row class="mb-4"><div v-for="item in detailInformation.capital" :key="item">{{item}}</div></el-row>
          <el-row class="mb-4">
            <div v-for="lan in Object.entries(detailInformation.languages)" :key="lan">
              <div v-for="l in lan" :key="l">  
                 {{l}}
              </div>  
            </div> 
          </el-row>
          <el-row class="mb-4">{{detailInformation.region}}</el-row>
          <el-row class="mb-4">{{detailInformation.subregion}}</el-row>         
          <el-row class="mb-4">{{detailInformation.cca2}}</el-row>
          <el-row class="mb-4">{{detailInformation.cca3}}</el-row>
          <el-row class="mb-4">{{detailInformation.ccn3}}</el-row>
          <el-row class="mb-4">{{detailInformation.cioc}}</el-row>
        </el-col>
        <el-col :span="4" class="">
          <el-row class="font-bold mb-4">Independant</el-row>
          <el-row class="font-bold mb-4">Status</el-row>
          <el-row class="font-bold mb-4">Currency</el-row>
          <el-row class="font-bold mb-4">IDD root</el-row>
          <el-row class="font-bold mb-4">Unmember</el-row>
          <el-row class="font-bold mb-4">Population</el-row>
          <el-row class="font-bold mb-4">Timezone</el-row>
          <el-row class="font-bold mb-4">Contient</el-row>
          <el-row class="font-bold mb-4">Flag</el-row>
          <el-row class="font-bold mb-4">Alternative</el-row>
        </el-col>
        <el-col :span="1" class="">
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
          <el-row class="font-bold mb-4">:</el-row>
        </el-col>
        <el-col :span="7" class="text-left">
          <el-row class="mb-4">{{detailInformation.independent}}</el-row>
          <el-row class="mb-4">{{detailInformation.status}}</el-row>
          <el-row class="mb-4">
            <div v-for="cur in Object.entries(detailInformation.currencies)" :key="cur">
              <div v-for="c in cur" :key="c">  
                 {{c.name}}
              </div>
            </div>
          </el-row>
          <el-row class="mb-4">{{detailInformation.idd.root}}</el-row>
          <el-row class="mb-4">{{detailInformation.unMember}}</el-row>
          <el-row class="mb-4">{{detailInformation.population}}</el-row>
          <el-row class="mb-4"><div v-for="item in detailInformation.timezones" :key="item">{{item}}</div></el-row>
          <el-row class="mb-4"><div v-for="item in detailInformation.continents" :key="item">{{item}}</div></el-row>
          <el-row class="mb-4">{{detailInformation.flags.png}}</el-row>
          <el-row class="mb-4"><div v-for="item in detailInformation.altSpellings" :key="item">{{item}}</div></el-row>
        </el-col>
      </el-row>
  </el-dialog>
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
      activeTab.value = name;
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
    const detailInformation = ref();
    const dialogTableVisible = ref(false);
    const onDetail = (obj) => {
      detailInformation.value = obj;
      dialogTableVisible.value = true;
    };
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
      dialogTableVisible,
      onDetail,
      detailInformation,
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
:deep(.el-table tr){
  cursor: pointer;
}
.el-table .cell .el-icon {
  width: 100%;
  top: 7px;
  right: 0;
  padding: 25px 20px 25px 0px;
  opacity: 0;
}
.el-table .cell .el-icon:hover{
  opacity: 100;
}
:deep(.caret-wrapper i) {
  display: none;
}
.active{
  color: #f43f5e;
  opacity: 100 !important;
}
.disableactive{
  color: #333;
}


</style>
