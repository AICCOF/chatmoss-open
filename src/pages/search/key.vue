<template>
  <logo>-Key信息查询</logo>
  <section class="search-container">
    <section class="search-keyword">
      <el-input
        v-model="keyword"
        type="textarea"
        placeholder="请输入API KEY，每行一个"
      ></el-input>
      <el-button @click="search">查询</el-button>
    </section>
    <el-table v-loading="loading" :data="tableData">
      <el-table-column label="key" prop="key" align="center"></el-table-column>
      <el-table-column
        label="总额度（USD）"
        prop="hard_limit_usd"
        align="center"
      ></el-table-column>
      <el-table-column
        label="已使用（USD）"
        prop="totalUsage"
        align="center"
      ></el-table-column>
      <el-table-column
        label="剩余额度（USD）"
        prop="remaining"
        align="center"
      ></el-table-column>
      <el-table-column
        label="有效期"
        prop="endDate"
        align="center"
      ></el-table-column>
      <el-table-column label="是否是4.0" align="center">
        <template #default>
          <el-tag>未知</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script setup lang="ts">
import { searchKey, usageInfo } from "@/api/search";
import dayjs from "dayjs";

const keyword = ref<string>("");
const tableData = ref<any>([]);
const loading = ref(false);

const search = async () => {
  tableData.value = [];
  keyword.value = keyword.value.trim();
  if (!keyword.value) return ElMessage.error("请输入API KEY");

  loading.value = true;

  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 90 * 24 * 60 * 60 * 1000);

  const keys: string[] = keyword.value.split(/\s+/);
  try {
    keys.forEach(async (key, index) => {
      // 获取key对应信息
      const data = (await searchKey(key)) as any;

      // 获取额度详情
      const usageRes = (await usageInfo({
        start_date: dayjs(startDate).format("YYYY-MM-DD"),
        end_date: dayjs(endDate).format("YYYY-MM-DD"),
        key,
      })) as any;

      data.key = key;
      data.totalUsage = (usageRes.total_usage / 100).toFixed(2); // 已使用额度
      data.remaining = (data.hard_limit_usd - data.totalUsage).toFixed(2); // 剩余额度
      data.hard_limit_usd = data.hard_limit_usd.toFixed(2); // 总额度
      data.endDate = dayjs(data.access_until * 1000).format("YYYY-MM-DD"); // 结束时间

      tableData.value.push(data);

      if(index === keys.length - 1) {
        loading.value = false
        ElMessage.success('查询成功')
      }
    });
    
  } catch (error) {
    loading.value = false
  }
};
</script>

<style lang="scss" scoped>
.search-container {
  margin: 0 150px;

  .search-keyword {
    display: flex;
    align-items: center;

    .el-textarea {
      margin-right: 20px;
    }
  }
}
</style>
