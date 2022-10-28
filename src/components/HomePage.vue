<template>
  <div class="w-full absolute">
    <div class="2xl:w-11/12 xl:w-11/12 lg:w-11/12 m-auto bg-slate-100 px-6 pb-1">
      <el-row class="header py-8 items-center">
        <el-col :span="6">
          <img class="rounded-full w-14 relative" src="../assets/profile2.jpg" alt=""> 
          <p class="absolute top-11 left-16">Thea Vannak</p> 
        </el-col>
        <el-col :span="12">
          <h1 class="Pink: 300">All countries in the world</h1>
        </el-col>
        <el-col :span="6">
          <el-input v-model="search" size="big" placeholder="search" type="text" style="margin-bottom: 0;"/>
        </el-col>
      </el-row>
      <el-row class="rsp-header md:hidden">
        <el-col :span="24">
          <h1 class="Pink: 300 pb-2">All countries in the world</h1>
        </el-col>
        <el-col :span="12">
          <img class="rounded-full w-14 relative" src="../assets/profile2.jpg" alt=""> 
          <p class="absolute bottom-8 left-24">Thea Vannak</p> 
        </el-col>
        <el-col :span="12">
          <el-input v-model="search" size="big" placeholder="search" type="text" style="margin-bottom: 0;"/>
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
          <el-table-column prop="name.official" sortable >
            <template #header>
              <span @click="clickSort(name = 'name')" class="w-full">
                <p v-if="arrowSort === 0 " :class="{disableactive: activeTab === 'name'}">Country Name</p>
                <p v-else :class="{ active: activeTab === 'name'}">Country Name</p>
                <el-icon v-if="arrowSort === 0 " :class="{'opacity-0': activeTab === 'name'}"><Top /></el-icon>
                <el-icon v-else-if="arrowSort === 1 " :class="{ active: activeTab === 'name'}"><Top /></el-icon>
                <el-icon v-else :class="{ active: activeTab === 'name'}"><Bottom /></el-icon>
              </span>
            </template>
            <template #default="scope">
              <div @click="onDetail(scope.row)">{{scope.row.name.official}}</div>
          </template>  
          </el-table-column>
          <el-table-column prop="cca2" label="2 character Country Code" sortable >
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
          <el-table-column prop="cca3" label="3 character Country Code" sortable >
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
          <el-table-column label="Native Name" width="170" sortable>     
            <!-- <template #header>
              <span @click="clickNative(name = 'native')" class="w-full">
                <p v-if="nativeSort === 0 " :class="{disableactive: activeTab === 'native'}">Native Name</p>
                <p v-else :class="{ active: activeTab === 'native'}">Native Name</p>
                <el-icon v-if="nativeSort === 0 " :class="{'text-blue opacity-0': activeTab === 'native'}"><Top /></el-icon>
                <el-icon v-else-if="nativeSort === 1 " :class="{ active: activeTab === 'native'}"><Top /></el-icon>
                <el-icon v-else :class="{ active: activeTab === 'native'}"><Bottom /></el-icon>
              </span>
            </template> -->
            <template #default="scope" >
              <div v-if="!scope.row.name.nativeName">--</div>
              <div v-else>{{Object.values(scope.row.name.nativeName)[0].official}}</div>
          </template> 
          </el-table-column>
          <el-table-column prop="altSpellings" label="Alternative" sortable >
            <template #header>
              <span @click="clickAlter(name = 'alter')" class="w-full">
                <p v-if="sortAlter === 0 " :class="{disableactive: activeTab === 'alter'}">Alternative</p>
                <p v-else :class="{ active: activeTab === 'alter'}">Alternative</p>
                <el-icon v-if="sortAlter === 0 " :class="{'opacity-0': activeTab === 'alter'}"><Top /></el-icon>
                <el-icon v-else-if="sortAlter === 1 " :class="{ active: activeTab === 'alter'}"><Top /></el-icon>
                <el-icon v-else :class="{ active: activeTab === 'alter'}"><Bottom /></el-icon>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="idd.root" label="Character Calling Code" sortable width="150" >
          <template #header>
              <span @click="clickIdd(name = 'idd')" class="w-full">
                <p v-if="iddSort === 0 " :class="{disableactive: activeTab === 'idd'}">Character Calling Code</p>
                <p v-else :class="{ active: activeTab === 'idd'}">Character Calling Code</p>
                <el-icon v-if="iddSort === 0 " :class="{'opacity-0': activeTab === 'idd'}"><Top /></el-icon>
                <el-icon v-else-if="iddSort === 1 " :class="{ active: activeTab === 'idd'}"><Top /></el-icon>
                <el-icon v-else :class="{ active: activeTab === 'idd'}"><Bottom /></el-icon>
              </span>
            </template>
          </el-table-column>
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
  </div>
  <!--Dialog Pop up-->
  <el-dialog v-model="dialogTableVisible" :show-close="false">    
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header bg-sky-500 p-2.5">
        <h4 :id="titleId" :class="titleClass">Detail Information</h4>
        <el-button type="danger" @click="close" class="absolute bottom-5 right-5 bg-red-500 border-0 pl-7">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template>
    <div class="flex gap-5">
      <div class="w-1/2">
        <div class="grid grid-cols-7 text-left">
          <div class="col-span-2 font-bold mb-2.5">Official Name</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">{{detailInformation.name.official}}</div>
          <div class="col-span-2 font-bold mb-2.5" v-show="isTrue">Native Name</div>
          <div class="col-span-1 text-center mb-2.5" v-show="isTrue">:</div>
          <div class="col-span-4 mb-2.5" v-show="isTrue">{{nativeName(detailInformation.name)}}</div>
          <div class="col-span-2 font-bold mb-2.5">Common Name</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">{{detailInformation.name.common}}</div>
          <div class="col-span-2 font-bold mb-2.5" v-show="detailInformation.capital">Capital</div>
          <div class="col-span-1 text-center mb-2.5" v-show="detailInformation.capital">:</div>
          <div class="col-span-4 mb-2.5" v-show="detailInformation.capital"><div v-for="item in detailInformation.capital" :key="item">{{item}}</div></div>
          <div class="col-span-2 font-bold mb-2.5" v-show="isTrue">Languages</div>
          <div class="col-span-1 text-center mb-2.5" v-show="isTrue">:</div>
          <div class="col-span-4 mb-2.5" v-show="isTrue">{{lanEmpty.languages}}<span  v-for="item in detailInformation.languages" :key="item">{{item}}<span>, </span></span></div>
          <div class="col-span-2 font-bold mb-2.5">Region</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">{{detailInformation.region}}</div>
          <div class="col-span-2 font-bold mb-2.5" v-show="detailInformation.subregion">Sub-Region</div>
          <div class="col-span-1 text-center mb-2.5" v-show="detailInformation.subregion">:</div>
          <div class="col-span-4 mb-2.5" v-show="detailInformation.subregion">{{detailInformation.subregion}}</div>
          <div class="col-span-2 font-bold mb-2.5">Country-code 2</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">{{detailInformation.cca2}}</div>
          <div class="col-span-2 font-bold mb-2.5">Country-code 3</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">{{detailInformation.cca3}}</div>
          <div class="col-span-2 font-bold mb-2.5">CCN3</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">{{detailInformation.ccn3}}</div>
          <div class="col-span-2 font-bold mb-2.5" v-show="detailInformation.cioc">CIOC</div>
          <div class="col-span-1 text-center mb-2.5" v-show="detailInformation.cioc">:</div>
          <div class="col-span-4 mb-2.5" v-show="detailInformation.cioc">{{detailInformation.cioc}}</div>        
        </div>
      </div>
      <div class="w-1/2 pb-5">
        <div class="grid grid-cols-7 text-left mb-3">
          <div class="col-span-2 font-bold mb-2.5">Independant</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">{{detailInformation.independent}}</div>
          <div class="col-span-2 font-bold mb-2.5">Status</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">{{detailInformation.status}}</div>
          <div class="col-span-2 font-bold mb-2.5" v-show="isTrue">Currency</div>
          <div class="col-span-1 text-center mb-2.5" v-show="isTrue">:</div>
          <div class="col-span-4 mb-2.5" v-show="isTrue">{{currencyEmpty(detailInformation.currencies)}}</div>
          <div class="col-span-2 font-bold mb-2.5" v-show="detailInformation.idd.root">IDD root</div>
          <div class="col-span-1 text-center mb-2.5" v-show="detailInformation.idd.root">:</div>
          <div class="col-span-4 mb-2.5" v-show="detailInformation.idd.root">{{detailInformation.idd.root}}</div>
          <div class="col-span-2 font-bold mb-2.5">Unmember</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">{{detailInformation.unMember}}</div>
          <div class="col-span-2 font-bold mb-2.5">Population</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">{{detailInformation.population}}</div>
          <div class="col-span-2 font-bold mb-2.5">Timezone</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">{{Object.values(detailInformation.timezones)[0]}}</div>
          <div class="col-span-2 font-bold mb-2.5">Contient</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5"><div v-for="item in detailInformation.continents" :key="item">{{item}}</div></div>
          <div class="col-span-2 font-bold mb-2.5">Flag</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5 text-blue-500 cursor-pointer">{{detailInformation.flags.png}}</div>
          <div class="col-span-2 font-bold mb-2.5">Alternative</div>
          <div class="col-span-1 text-center mb-2.5">:</div>
          <div class="col-span-4 mb-2.5">
            <span v-for="alt in Object.values(detailInformation.altSpellings)" :key="alt">{{alt}}<span>, </span></span> 
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="flex">
      <table class="w-1/2 text-left">
        <tr><th class="w-40 pb-2.5">Official Name</th><td class="w-8">:</td><td>{{detailInformation.name.official}}</td></tr>
        <tr><th class="w-40 pb-2.5">Native Name</th><td class="w-8">:</td><td>
          
          {{nativeName(detailInformation.name)}}
        </td></tr>
        <tr><th class="w-40 pb-2.5">Common Name</th><td class="w-8">:</td><td>{{detailInformation.name.common}}</td></tr>
        <tr><th class="w-40 pb-2.5">Capital</th><td class="w-8">:</td><td><div v-for="item in detailInformation.capital" :key="item">{{item}}</div></td></tr>
        <tr><th class="w-40 pb-2.5">Languages</th><td class="w-8">:</td><td>
          {{lanEmpty(detailInformation.languages)}}
        </td></tr>
        <tr><th class="w-40 pb-2.5">Region</th><td class="w-8">:</td><td>{{detailInformation.region}}</td></tr>
        <tr><th class="w-40 pb-2.5">Subregion</th><td class="w-8">:</td><td>{{detailInformation.subregion}}</td></tr>
        <tr><th class="w-40 pb-2.5">Country-code 2</th><td class="w-8">:</td><td>{{detailInformation.cca2}}</td></tr>
        <tr><th class="w-40 pb-2.5">Country-code 3</th><td class="w-8">:</td><td>{{detailInformation.cca3}}</td></tr>
        <tr><th class="w-40 pb-2.5">CCN3</th><td class="w-8">:</td><td>{{detailInformation.ccn3}}</td></tr>
        <tr><th class="w-40 pb-2.5">CIOC</th><td class="w-8">:</td><td>{{detailInformation.cioc}}</td></tr>
      </table>
      <table class="w-1/2 text-left float-right">
        <tr>
          <th class="w-40 pb-2.5">Independant</th><td class="w-8">:</td>
          <td>{{detailInformation.independent}}</td>
        </tr>
        <tr><th class="w-40 pb-2.5">Status</th><td class="w-8">:</td><td>{{detailInformation.status}}</td></tr>
        <tr><th class="w-40 pb-2.5">Currency</th><td class="w-8">:</td><td>
          {{currencyEmpty(detailInformation.currencies)}}
        </td></tr>
        <tr><th class="w-40 pb-2.5">IDD root</th><td class="w-8">:</td><td>{{detailInformation.idd.root}}</td></tr>
        <tr><th class="w-40 pb-2.5">Unmember</th><td class="w-8">:</td><td>{{detailInformation.unMember}}</td></tr>
        <tr><th class="w-40 pb-2.5">Population</th><td class="w-8">:</td><td>{{detailInformation.population}}</td></tr>
        <tr><th class="w-40 pb-2.5">Timezone</th><td class="w-8">:</td><td>{{Object.values(detailInformation.timezones)[0]}}</td></tr>
        <tr><th class="w-40 pb-2.5">Contient</th><td class="w-8">:</td><td><div v-for="item in detailInformation.continents" :key="item">{{item}}</div></td></tr>
        <tr><th class="w-40 pb-2.5">Flag</th><td class="w-8">:</td><td style="color: blue;">{{detailInformation.flags.png}}</td></tr>
        <tr>
          <th class="w-40 pb-2.5">Alternative</th>
          <td class="w-8">:</td>
          <td class="flex gap-2" v-for="alt in Object.values(detailInformation.altSpellings)" :key="alt">
            {{alt}}
        </td></tr>
      </table>
    </div> -->

     <!-- <el-row>
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
            {{Object.values(detailInformation.name.nativeName)[0].official}}                     
          </el-row>        
          <el-row class="mb-4">{{detailInformation.name.common}}</el-row>
          <el-row class="mb-4"><div v-for="item in detailInformation.capital" :key="item">{{item}}</div></el-row>
          <el-row class="mb-4"> 
            <div v-for="lan in Object.values(detailInformation.languages)" :key="lan">{{lan}}</div> 
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
            <div v-for="cur in Object.values(detailInformation.currencies)" :key="cur">{{cur.name}}</div>
          </el-row>
          <el-row class="mb-4">{{detailInformation.idd.root}}</el-row>
          <el-row class="mb-4">{{detailInformation.unMember}}</el-row>
          <el-row class="mb-4">{{detailInformation.population}}</el-row>
          <el-row class="mb-4">
            {{Object.values(detailInformation.timezones)[0]}}
          </el-row>
          <el-row class="mb-4"><div v-for="item in detailInformation.continents" :key="item">{{item}}</div></el-row>
          <el-row class="mb-4" style="color:#0133e7">{{detailInformation.flags.png}}</el-row>
          <el-row class="mb-4"><div v-for="item in detailInformation.altSpellings" :key="item">{{item}}</div></el-row>
        </el-col>
      </el-row> -->
  </el-dialog>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    
    const isTrue = ref(false)
    const nativeName = (prop) => {
      let result = '';
       if (!prop.nativeName) {
        result = '--'
        isTrue.value = false;
      } else if (prop.nativeName) {
        isTrue.value = true
        result = Object.values(prop.nativeName)[0].official;
      }
      return result;
    };
    const lanEmpty = (languages) => {
      let result = '';
        if (!languages) {
         result = '-----------'
         isTrue.value = false;
       } else if (languages) {
          isTrue.value = true;
          result = Object.values(languages); 
       }
       return result;
    };
    const currencyEmpty = (currencies) => {
      let result = '';
        if (!currencies) {
         result = '-----------'
         isTrue.value = false;
       } else if (currencies) {
        isTrue.value = true;
         result = Object.values(currencies)[0].name;
       }
       return result;
    };
    const data = ref({
      tableData: [],
      page: 1,
      pageSize: 10,
    })
    const getData = () => {
      axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        data.value.tableData = response.data;
      });
    }
    getData();
    const search = ref('')
    const filterTableData = computed(() => {
      return data.value.tableData.slice(data.value.pageSize * data.value.page - data.value.pageSize, data.value.pageSize * data.value.page)
      .filter((data) =>!search.value || data.name.official.toLowerCase().includes(search.value.toLowerCase()))
    })

    const activeTab = ref('');
    
    const iddSort = ref(0);
    const clickIdd = (name) => {
      iddSort.value = iddSort.value + 1;
      if (iddSort.value > 2){
        iddSort.value = 0;
      }
      activeTab.value = name;
    }
    const nativeSort = ref(0);
    const clickNative = (name) => {
      nativeSort.value = nativeSort.value + 1;
      if (nativeSort.value > 2){
        nativeSort.value = 0;
      }
      activeTab.value = name;
    }
    const arrowSort = ref(0);
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
      nativeName,
      lanEmpty,
      currencyEmpty,
      isTrue,
      clickNative,
      nativeSort,
      clickIdd,
      iddSort,
    } 
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  background-color: #dee6f0;
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
  top: calc(50% - 24px);
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
:deep(.el-dialog__body){
  display: flex;
}
.el-dialog__title{
  color: #fff;
}
i.el-icon.el-icon--left{
  left: 8px;
}
.el-id-7293-260{
  padding-top: 0;
}
@media (max-width: 768px) {
  :deep(.el-table__header,.el-table__body){
    width: auto !important;
  }
  :deep(.el-table__body){
    width: auto !important;
  }
  .el-input{
    width: auto;
  }
  .header{
    display: none;
    
  }
  .rsp-header{
    padding: 20px ;
    display: flex;
    align-items: center;
  }
}
</style>
