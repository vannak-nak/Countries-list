<template>
  <div class="wrap">
    <el-row class="mt-8">
      <el-col :span="8"><div class="grid-content ep-bg-purple" />
        <img class="rounded-full w-14 relative" src="../assets/profile2.jpg" alt=""> <p class="absolute left-16 inset-y-5">Thea Vannak</p> 
      </el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple-light" />
        <h1 class="">All countries in the world</h1>
      </el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple" />
        <el-input v-model="search" size="big" placeholder="search" type="text" />
      </el-col>
    </el-row>
    <el-table
      :data="filterTableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column label="Flags" width="100px">
        <template #default="scope">
          <img class="rounded-full" :src="scope.row.flags.png" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name.official" label="Name" sortable width="180">
        <template #header>Name
           <span @click="arrowSort++">
            <el-icon v-if="displaySort === 0"  class="opacity-0 hover:opacity-100"><Top /></el-icon>
            <el-icon v-if="displaySort === 2" class="opacity-0 hover:opacity-100"><Bottom /></el-icon>
           </span>
        </template>
      </el-table-column>
      <el-table-column prop="cca2" label="2 character Country Code" />
      <el-table-column prop="cca3" label="3 character Country Code" />
      <el-table-column prop="name.nativeName.zho.official" label="Native Name" width="180" />
      <el-table-column prop="altSpellings" label="Alternative" width="280" />
      <el-table-column prop="idd.root" label="Character Calling Code" width="110" />
    </el-table>
    <div class="flex justify-end mb-12 mt-4">
      <el-pagination
      v-model:currentPage="currentPage2"
      v-model:page-size="pageSize2"
      :page-sizes="[5, 10, 20, 'All']"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, pager, prev, next"
      :total="250"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </div>
  
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { arrow } from '@popperjs/core';

export default {
  setup() {
 
    const tableData = ref([])
    const getData = () => {
      axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        tableData.value = response.data;
      });
    }
    getData();

    const search = ref('')
    const filterTableData = computed(() => tableData.value.filter((data) =>!search.value || data.name.official.toLowerCase().includes(search.value.toLowerCase())))

    const arrowSort = ref(0);
   
    const clickSort = (data) => {
      arrowSort.value = arrowSort.value + 1;
      if ( arrowSort.value === 3) {
        arrow.value = 0;
      }
    }
     watch(() => arrowSort.value, () => {
      if (arrowSort.value === 3) {
        arrowSort.value = 0;
      }
    })
    const displaySort = computed(() => arrowSort.value)

    // const currentPage1 = ref(5)
    // const currentPage2 = ref(5)
    // const currentPage3 = ref(5)
    // const currentPage4 = ref(5)
    // const small = ref(false)
    // const disabled = ref(false)

    // const handleSizeChange = (val) => {
    //   console.log(`${val} items per page`)
    // }
    // const handleCurrentChange = (val) => {
    //   console.log(`current page: ${val}`)
    // }

    return {
      tableData,
      search,
      filterTableData,
      arrowSort,
      clickSort,
      displaySort,
    } 
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
  width: 70%;
  margin: 0 auto;
}
.el-input{
  width: 200px;
  display: block;
  float: right;
  margin-bottom: 20px;
}
.el-table__cell img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

:deep(.caret-wrapper i) {
  display: none;
}
</style>