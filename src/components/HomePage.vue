<template>
  <div class="text-red-500">Test Tailwind</div>
  <div class="wrap">
    <el-row>
    <el-col :span="12"><div class="grid-content ep-bg-purple" />
      <el-input v-model="search" size="big" placeholder="search" type="text" />
    </el-col>
    <el-col :span="12"><div class="grid-content ep-bg-purple-light" /></el-col>
    </el-row>
    <el-table
      :data="filterTableData"
      :default-sort="{ prop: 'name.official'}"
      style="width: 100%"
    >
    <el-table-column label="Flags" width="100px">
      <template #default="scope">
        <img class="rounded-full" :src="scope.row.flags.png" alt="">
      </template>
    </el-table-column>
      <el-table-column prop="name.official" label="Name" sortable width="180" >
        <template #header>Name
          <el-icon><Top /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="cca2" label="2 character Country Code" />
      <el-table-column prop="cca3" label="3 character Country Code" />
      <el-table-column prop="name.nativeName.zho.official" label="Native Name" width="180" />
      <el-table-column prop="altSpellings" label="Alternative" width="280" />
      <el-table-column prop="idd.root" label="Character Calling Code" width="110" />
    </el-table>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

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
    const filterTableData = computed(() =>
      tableData.value.filter(
        (data) =>
          !search.value ||
          data.name.toLowerCase().includes(search.value.toLowerCase())
      )
    )

    return {
      tableData,
      filterTableData
    } 
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

.el-table .caret-wrapper{
  display: none !important;
}
</style>
