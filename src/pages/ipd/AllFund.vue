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
      <template #top-left>
        <q-btn
          @click="exportTable"
          color="primary"
          icon="bi-file-earmark-excel-fill"
        >
          create
        </q-btn>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            v-if="props.col.field === 'actions'"
            color="primary"
            icon="bi-eye-fill"
            @click="viewItem(props.row.id)"
          />
          <q-btn
            v-if="props.col.field === 'actions'"
            color="primary"
            icon="bi-pencil-fill"
            @click="editItem(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { useRouter } from 'vue-router';

interface DataItem {
  id: number;
  name: string;
  email: string;
  age: number;
}

export default {
  setup() {
    const data = ref<DataItem[]>([
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
      {
        name: 'actions',
        required: true,
        label: 'Actions',
        align: 'center',
        field: 'actions',
        sortable: false,
        format: (value: DataItem, row: DataItem) => {
          return `
            <q-btn dense color="primary" icon="visibility" @click="viewItem(${row.id})" />
            <q-btn dense color="warning" icon="edit" @click="editItem(${row.id})" />
          `;
        },
      },
    ];

    const filter = ref('');
    const loading = ref(false);

    const router = useRouter();

    const viewItem = (id: number) => {
      router.push(`/view/${id}`);
    };

    const editItem = (id: number) => {
      router.push(`/edit/${id}`);
    };

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
      viewItem,
      editItem,
      exportTable,
    };
  },
};
</script>
