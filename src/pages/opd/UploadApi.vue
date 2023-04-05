<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-uploader
          class="q-mb-md"
          color="primary"
          :accept="'.xlsx'"
          :auto-upload="false"
          :hide-upload-btn="true"
          @added="file = $event[0]"
        >
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-btn
                v-if="scope.queuedFiles.length > 0"
                icon="bi-x-circle-fill"
                @click="scope.removeQueuedFiles"
                round
                dense
                flat
              >
                <q-tooltip>Clear All</q-tooltip>
              </q-btn>
              <q-btn
                v-if="scope.uploadedFiles.length > 0"
                icon="bi-check-circle-fill"
                @click="scope.removeUploadedFiles"
                round
                dense
                flat
              >
                <q-tooltip>Remove Uploaded Files</q-tooltip>
              </q-btn>
              <q-spinner
                v-if="scope.isUploading"
                class="q-uploader__spinner"
              ></q-spinner>
              <div class="col">
                <div class="q-uploader__title">Upload your files</div>
                <div class="q-uploader__subtitle">
                  {{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}
                </div>
              </div>
              <q-btn
                v-if="scope.canAddFiles"
                type="a"
                icon="bi-calendar2-plus-fill"
                @click="scope.pickFiles"
                round
                dense
                flat
              >
                <q-uploader-add-trigger></q-uploader-add-trigger>
                <q-tooltip>Pick Files</q-tooltip>
              </q-btn>
              <q-btn
                v-if="scope.canUpload"
                icon="bi-cloud-arrow-up-fill"
                :disable="!file"
                @click="uploadFile"
                :loading="loading"
                round
                dense
                flat
              >
                <q-tooltip>Upload Files</q-tooltip>
              </q-btn>

              <q-btn
                v-if="scope.isUploading"
                icon="bi-trash"
                @click="scope.abort"
                round
                dense
                flat
              >
                <q-tooltip>Abort Upload</q-tooltip>
              </q-btn>
            </div>
          </template>
        </q-uploader>
        <q-table
          :rows="data"
          :columns="columns"
          :loading="loading"
          :visible-columns="['id', 'name', 'email', 'age', 'actions']"
        >
          <template v-slot:body-cell-actions="{ row }">
            <q-btn dense flat round icon="bi-eye" @click="viewRow(row)" />
            <q-btn dense flat round icon="bi-pencil" @click="editRow(row)" />
            <q-btn dense flat round icon="bi-x" @click="deleteRow(row)" />
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<!-- Keep the rest of your code as it is -->

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
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'left',
    field: 'actions',
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
      updateData(sheetData); // Call updateData inside reader.onload
    }
  };
  reader.onerror = () => {
    console.error('Error reading file:', reader.error);
    reader.abort();
  };
  reader.readAsBinaryString(file);
};

const updateData = (sheetData: any[]) => {
  data.value = sheetData.map((item) => ({
    id: item['id'],
    name: item['name'],
    email: item['email'],
    age: item['age'],
  }));
};

const uploadFile = () => {
  if (file.value) {
    loading.value = true;
    parseFile(file.value); // This should update the data.value inside reader.onload
    loading.value = false;
  }
};

const deleteRow = (row: DataItem) => {
  data.value = data.value.filter((item) => item.id !== row.id);
};
const viewRow = (row: DataItem) => {
  console.log('View row:', row);
  // Implement the logic for viewing the row
};

const editRow = (row: DataItem) => {
  console.log('Edit row:', row);
  // Implement the logic for editing the row
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
