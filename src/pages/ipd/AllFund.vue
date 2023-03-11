<template>
  <q-page>
    <q-table
      :rows="data"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      row-key="id"
    >
      <template #top-right>
        <q-btn
          @click="exportTable"
          color="primary"
          icon="bi-file-earmark-excel-fill"
        >
          Export
        </q-btn>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import * as XLSX from 'xlsx';

export default {
  setup() {
    const data = ref([
      { id: 1, name: 'John Doe', email: 'johndoe@example.com', age: 30 },
      { id: 2, name: 'Jane Doe', email: 'janedoe@example.com', age: 25 },
      { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com', age: 45 },
      {
        id: 4,
        name: 'Alice Johnson',
        email: 'alicejohnson@example.com',
        age: 28,
      },
    ]);

    let columns: any[] = [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'email',
        required: true,
        label: 'Email',
        align: 'left',
        field: 'email',
        sortable: true,
      },
      {
        name: 'age',
        required: true,
        label: 'Age',
        align: 'left',
        field: 'age',
        sortable: true,
      },
    ];

    const filter = ref('');
    const loading = ref(false);

    const exportTable = () => {
      loading.value = true;

      // Prepare the worksheet
      const ws = XLSX.utils.json_to_sheet(data.value);

      // Prepare the workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');

      // Save the file
      XLSX.writeFile(wb, 'table_data.xlsx');
      loading.value = false;
    };

    return {
      data,
      columns,
      filter,
      loading,
      exportTable,
    };
  },
};
</script>
