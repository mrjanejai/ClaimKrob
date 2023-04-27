<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">ตรวจสอบกองทุน E-Claim</div>
        </q-card-section>

        <!-- <q-card-section> test </q-card-section> -->

        <q-separator dark />
        &nbsp;
        <q-card-actions>
          <q-btn-dropdown color="primary" label="กองทุน">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>กองทุน1</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>กองทุน2</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>กองทุน3</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>กองทุน4</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>กองทุน5</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>กองทุน6</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>กองทุน7</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          &nbsp;
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
            <template #prepend>
              <q-icon name="bi-search" />
            </template>
          </q-input>
          &nbsp;
          <!-- <q-btn @click="exportTable" color="primary" icon="bi-arrow-repeat">
            Sync
          </q-btn> -->
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
        :rows="filteredRows"
        :columns="columns"
        :xfilter="xfilter"
        :filter="filter"
        :loading="loading"
        row-key="id"
      >
        <!-- <template #header="props">
          <q-tr>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
              <div v-if="col.field !== 'actions'">
                <q-input
                  dense
                  debounce="300"
                  v-model="xfilter[col.field]"
                  placeholder="Search"
                />
              </div>
            </q-th>
          </q-tr>
        </template> -->
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              v-if="props.col.field === 'actions'"
              color="red"
              icon="bi-card-list"
              label="REP"
              @click="carousel = true"
            />&nbsp;
            <q-btn
              v-if="props.col.field === 'actions'"
              color="yellow"
              icon="bi-card-list"
              label="STM"
              @click="editItem(props.row.id)"
            />&nbsp;
            <q-btn
              v-if="props.col.field === 'actions'"
              color="green"
              icon="bi-piggy-bank"
              label="เงินโอน"
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
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import * as XLSX from 'xlsx';
import { useRouter } from 'vue-router';

interface DataItem {
  id: number;
  vn: string;
  an: string;
  hn: string;
  name: string;
  idcard: string;
  age: number;
  visit: string;
  [key: string]: string | number | undefined;
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
    const xfilter = ref<Record<string, string>>({
      id: '',
      vn: '',
      an: '',
      hn: '',
      name: '',
      idcard: '',
      age: '',
      visit: '',
    });

    // const filteredRows = computed(() => {
    //   return data.value.filter((row) =>
    //     Object.keys(xfilter.value).every((key) => {
    //       if (key === 'actions') return true;
    //       return String(row[key])
    //         .toLowerCase()
    //         .includes(xfilter.value[key].toLowerCase());
    //     })
    //   );
    // });

    const filteredRows = computed(() => {
      return data.value
        .filter((row) =>
          Object.keys(xfilter.value).every((key) => {
            if (key === 'actions') return true;
            return String(row[key])
              .toLowerCase()
              .includes(xfilter.value[key].toLowerCase());
          })
        )
        .filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(findAll.value.toLowerCase())
          )
        );
    });

    return {
      findAll,
      data,
      columns,
      filter,
      xfilter,
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
      onItemClick() {
        //
      },
      filteredRows,
    };
  },
};
</script>
