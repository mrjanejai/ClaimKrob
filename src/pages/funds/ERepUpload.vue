<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">นำเข้า REP E-Claim</div>
        </q-card-section>
        <q-card-section>
          <q-uploader
            class="q-mb-md"
            color="primary"
            accept=".xlsx"
            :auto-upload="true"
            :hide-upload-btn="file !== null"
            @added="file = $event[0]"
          >
            <template>
              <div class="text-body2">
                {{ file?.name }}
                <q-btn dense flat round icon="close" @click="file = null" />
              </div>
            </template>
            <template #list>
              <q-btn
                color="primary"
                :disabled="!file"
                @click="uploadFile"
                :loading="loading"
              >
                Upload
              </q-btn>
            </template>
          </q-uploader></q-card-section
        >
      </q-card>
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="data"
        :columns="columns"
        :loading="loading"
        :visible-columns="['id', 'name', 'email', 'age']"
      />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';

interface DataItem {
  id: number;
  name: string;
  email: string;
  age: number;
}

const file = ref<File | null>(null);
const data = ref<DataItem[]>([]);
const columns: any[] = [
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
const loading = ref(false);

const parseFile = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    const data = e.target?.result;
    if (typeof data === 'string') {
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json(worksheet);
      updateData(sheetData);
    }
  };
  reader.readAsBinaryString(file);
};

const updateData = (sheetData: any[]) => {
  data.value = sheetData.map((item) => ({
    id: item['ID'],
    name: item['Name'],
    email: item['Email'],
    age: item['Age'],
  }));
};

const uploadFile = () => {
  if (file.value) {
    loading.value = true;
    parseFile(file.value);
    file.value = null;
    loading.value = false;
  }
};
</script>

<style scoped>
.q-table {
  font-size: 14px;
  border: 1px solid #ddd;
}

.q-table td {
  padding: 10px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.q-table th {
  font-weight: bold;
  padding: 10px;
  background-color: #f2f2f2;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.q-table .q-tr:hover {
  background-color: #f5f5f5;
}

.q-table .q-td--first {
  border-left: 1px solid #ddd;
}

.q-table .q-td--last {
  border-right: none;
}

.q-table .q-tr:last-child .q-td {
  border-bottom: none;
}
</style>
