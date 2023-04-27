<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">ข้อมูลผู้ป่วยใน</div>
        </q-card-section>

        <!-- <q-card-section> test </q-card-section> -->

        <q-separator dark />

        <q-card-actions>
          <q-input filled v-model="startDate" label="start" mask="##-##-####">
            <template #append>
              <q-icon name="bi-calendar-date-fill" />
              <q-popup-proxy>
                <q-date v-model="startDate" mask="DD-MM-YYYY" />
              </q-popup-proxy>
            </template>
          </q-input>
          &nbsp;
          <q-input filled v-model="endDate" label="end" mask="##-##-####">
            <template #append>
              <q-icon name="bi-calendar-date-fill" />
              <q-popup-proxy>
                <q-date v-model="endDate" mask="DD-MM-YYYY" />
              </q-popup-proxy>
            </template>
          </q-input>
          &nbsp;
          <q-input filled v-model="findAll" label="ค้นหา">
            <template>
              <q-icon name="bi-search" />
            </template>
          </q-input>
          &nbsp;
          <q-btn @click="exportTable" color="primary" icon="bi-arrow-repeat">
            Sync
          </q-btn>
          <q-btn @click="exportTable" color="primary" icon="bi-search">
            ค้นหา
          </q-btn>
          <q-btn
            @click="exportTable"
            color="primary"
            icon="bi-file-earmark-excel-fill"
          >
            Export
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="data"
        :columns="columns"
        :filter="filter"
        :loading="loading"
        row-key="id"
      >
        <template #top-left>
          <!-- <q-input filled v-model="startDate" label="start" mask="##-##-####">
          <template #append>
            <q-icon name="bi-calendar-date-fill" />
            <q-popup-proxy>
              <q-date v-model="startDate" mask="DD-MM-YYYY" />
            </q-popup-proxy>
          </template>
        </q-input>
        <q-input filled v-model="endDate" label="end" mask="##-##-####">
          <template #append>
            <q-icon name="bi-calendar-date-fill" />
            <q-popup-proxy>
              <q-date v-model="endDate" mask="DD-MM-YYYY" />
            </q-popup-proxy>
          </template>
        </q-input>
        <q-btn @click="exportTable" color="primary" icon="bi-arrow-repeat">
          Sync
        </q-btn> -->
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              v-if="props.col.field === 'actions'"
              color="primary"
              icon="bi-ticket-detailed-fill"
              @click="carousel = true"
            />
            <q-btn
              v-if="props.col.field === 'actions'"
              color="primary"
              icon="bi-pencil-square"
              @click="editItem(props.row.id)"
            />
            <q-btn
              v-if="props.col.field === 'actions'"
              color="primary"
              icon="bi-arrow-repeat"
              @click="syncItem(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
  <q-dialog v-model="carousel" :full-height="true" :full-width="true">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="bi-x-lg" flat round dense v-close-popup />
      </q-card-section>
      <div>
        <q-splitter v-model="splitterModel" style="height: 100%; width: 100%">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-teal">
              <q-tab :name="1" icon="bi-virus" label="วินิจฉัย" />
              <q-tab :name="2" icon="bi-activity" label="ICD10" />
              <q-tab :name="3" icon="bi-folder-symlink-fill" label="หัตถการ" />
              <q-tab :name="4" icon="bi-wallet2" label="ค่าใช้จ่าย" />
              <q-tab :name="5" icon="bi-capsule" label="ยา" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel :name="1">
                <div class="text-h4 q-mb-md">วินิจฉัย</div>
                <q-table
                  :rows="data"
                  :columns="columns"
                  :filter="filter"
                  :loading="loading"
                  row-key="id"
                ></q-table>
              </q-tab-panel>

              <q-tab-panel :name="2">
                <div class="text-h4 q-mb-md">ICD10</div>
                <q-table
                  :rows="data"
                  :columns="columns"
                  :filter="filter"
                  :loading="loading"
                  row-key="id"
                ></q-table>
              </q-tab-panel>

              <q-tab-panel :name="3">
                <div class="text-h4 q-mb-md">หัตถการ</div>
                <q-table
                  :rows="data"
                  :columns="columns"
                  :filter="filter"
                  :loading="loading"
                  row-key="id"
                ></q-table>
              </q-tab-panel>
              <q-tab-panel :name="4">
                <div class="text-h4 q-mb-md">ค่าใช้จ่าย</div>
                <q-table
                  :rows="data"
                  :columns="columns"
                  :filter="filter"
                  :loading="loading"
                  row-key="id"
                ></q-table>
              </q-tab-panel>
              <q-tab-panel :name="5">
                <div class="text-h4 q-mb-md">ยา</div>
                <q-table
                  :rows="data"
                  :columns="columns"
                  :filter="filter"
                  :loading="loading"
                  row-key="id"
                ></q-table>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
      <!-- <q-tabs
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        v-model="slide"
        control-color="primary"
        navigation-icon="bi-circle"
        navigation
        padding
        height="100%"
        class="bg-white shadow-1 rounded-borders text-teal"
      >
        <q-tab
          :name="1"
          class="column no-wrap flex-center"
          icon="bi-check2-circle"
          label="วินิจฉัย"
        />
        <q-tab
          :name="2"
          class="column no-wrap flex-center"
          icon="bi-exclamation-circle"
          label="ค่าใช้จ่าย"
        />
        <q-tab
          :name="3"
          class="column no-wrap flex-center"
          icon="bi-filter-circle-fill"
          label="หัตถการ"
        />
      </q-tabs> -->
      <!-- <q-carousel
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        v-model="slide"
        control-color="primary"
        navigation
        padding
        height="100%"
        class="bg-white shadow-1 rounded-borders text-black"
      >
        <q-carousel-slide :name="1" class="column no-wrap flex-center">
          <q-icon name="bi-check2-circle" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center">
          <q-icon name="bi-exclamation-circle" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center">
          <q-icon name="bi-filter-circle-fill" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="column no-wrap flex-center">
          <q-icon name="bi-r-circle" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel> -->
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { useRouter } from 'vue-router';
import { QInput, QDate } from 'quasar';

interface DataItem {
  id: number;
  vn: string;
  an: string;
  hn: string;
  name: string;
  idcard: string;
  age: number;
  visit: string;
}

export default {
  setup() {
    const startDate = ref('');
    const endDate = ref('');
    const findAll = ref('');
    const data = ref<DataItem[]>([
      {
        id: 1,
        vn: '660417183657',
        an: '660000001',
        hn: '1111111',
        name: 'John Doe',
        idcard: '1111111111111',
        age: 30,
        visit: '2022-01-01',
      },
      {
        id: 2,
        vn: '660417183657',
        an: '660000001',
        hn: '2222222',
        name: 'Jane Doe',
        idcard: '22222222222222',
        age: 25,
        visit: '2022-01-01',
      },
      {
        id: 3,
        vn: '660417183657',
        an: '660000001',
        hn: '3333333',
        name: 'Bob Smith',
        idcard: '3333333333333',
        age: 45,
        visit: '2022-01-01',
      },
      {
        id: 4,
        vn: '660417183657',
        an: '660000001',
        hn: '4444444',
        name: 'Alice Johnson',
        idcard: '4444444444444',
        age: 28,
        visit: '2022-01-01',
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
        name: 'vn',
        required: true,
        label: 'VN',
        align: 'left',
        field: 'vn',
        sortable: true,
      },
      {
        name: 'an',
        required: true,
        label: 'AN',
        align: 'left',
        field: 'an',
        sortable: true,
      },
      {
        name: 'hn',
        required: true,
        label: 'HN',
        align: 'left',
        field: 'hn',
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
        name: 'idcard',
        required: true,
        label: 'ID-Card',
        align: 'left',
        field: 'idcard',
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
        name: 'visit',
        required: true,
        label: 'Visit',
        align: 'left',
        field: 'visit',
        sortable: true,
      },
      {
        name: 'actions',
        required: true,
        label: 'Actions',
        align: 'center',
        field: 'actions',
        sortable: false,
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
    const syncItem = (id: number) => {
      router.push(`/sync/${id}`);
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
      findAll,
      data,
      columns,
      filter,
      startDate,
      endDate,
      loading,
      viewItem,
      editItem,
      exportTable,
      syncItem,
      carousel: ref(false),
      slide: ref(1),
      tab: ref('วินิจฉัย'),
      splitterModel: ref(20),
    };
  },
};
</script>
