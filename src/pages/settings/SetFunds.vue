<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">ตั้งค่ากองทุน</div>
        </q-card-section>

        <!-- <q-card-section> test </q-card-section> -->

        <q-separator dark />
        &nbsp;
        <q-card-actions>
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
            @click="carousel = true"
            color="primary"
            icon="bi-file-earmark-excel-fill"
          >
            สร้างกองทุนใหม่
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
              color="primary"
              icon="bi-card-list"
              label="รายละเอียดกองทุน"
              @click="carousel = true"
            />&nbsp;
            <q-btn
              v-if="props.col.field === 'actions'"
              color="primary"
              icon="bi-card-list"
              label="แก้ไขกองทุน"
              @click="editItem(props.row.id)"
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
        <label>ปิด</label>
        <q-btn icon="bi-x-lg" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section> <q-separator dark /></q-card-section>
      <div>
        <div class="q-pa-md">
          <q-card class="my-card">
            <q-card-section>
              <div class="q-pa-md">
                <q-input
                  filled
                  v-model="findAll"
                  label="ชื่อกองทุน"
                  style="width: 500px; height: 50px"
                >
                  <template>
                    <q-icon name="bi-search" />
                  </template>
                </q-input>
              </div>
              <div class="q-pa-md">
                <q-input
                  filled
                  v-model="findAll"
                  label="รหัสกองทุน"
                  style="width: 500px; height: 50px"
                >
                  <template>
                    <q-icon name="bi-search" />
                  </template>
                </q-input>
              </div>
              <div class="q-pa-md">
                <q-btn-dropdown color="primary" label="ประเภทกองทุน">
                  <q-list>
                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>E-Claim</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>Seamless</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                &nbsp;
                <q-btn-dropdown color="primary" label="ประเภทผู้ป่วย">
                  <q-list>
                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>IPD</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>OPD</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                &nbsp;
                <q-btn-dropdown color="primary" label="สถานะ">
                  <q-list>
                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>ใช้งาน</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>ไม่ใช้งาน</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                &nbsp;
                <q-btn @click="exportTable" color="green" icon="bi-search">
                  บันทึก
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <q-splitter v-model="splitterModel" style="height: 100%; width: 100%">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-teal">
              <q-tab :name="1" icon="bi-virus" label="สิทธิ์การรักษา" />
              <q-tab :name="2" icon="bi-activity" label="หัตถการผู้ป่วยนอก" />
              <q-tab
                :name="3"
                icon="bi-folder-symlink-fill"
                label="หัตถการผู้ป่วยใน"
              />
              <q-tab :name="4" icon="bi-wallet2" label="ยา" />
              <q-tab :name="5" icon="bi-capsule" label="ค่าใช้จ่าย" />
              <q-tab :name="5" icon="bi-capsule" label="ห้องตรวจ" />
              <q-tab :name="5" icon="bi-capsule" label="ICD-10" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <div class="q-pa-md">
              <q-input
                filled
                v-model="findAll"
                label="ค้นหา"
                style="width: 500px; height: 50px"
              >
                <template #prepend>
                  <q-icon name="bi-search" />
                </template>
              </q-input>
            </div>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel :name="1">
                <div class="text-h4 q-mb-md">สิทธิ์การรักษา</div>
                <q-table
                  :rows="data"
                  :columns="columns"
                  :filter="filter"
                  :loading="loading"
                  row-key="id"
                >
                  <template v-slot:body-cell-ismap="{ row }">
                    <q-td>
                      <q-checkbox v-model="row.ismap" />
                    </q-td>
                  </template>
                </q-table>
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
  code: string;
  typec: string;
  typeh: string;
  name: string;
  status: string;
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
        code: 'string',
        typec: 'E-Claim',
        typeh: 'IPD',
        name: 'ฟื้นฟู อบจ',
        status: 'Y',
      },
      {
        id: 2,
        code: 'string',
        typec: 'Seamless',
        typeh: 'IPD',
        name: 'Fee66 ข้อ 10',
        status: 'Y',
      },
      {
        id: 3,
        code: 'string',
        typec: 'E-Claim',
        typeh: 'OPD',
        name: 'DT หมอพร้อม',
        status: 'Y',
      },
      {
        id: 4,
        code: 'string',
        typec: 'Seamless',
        typeh: 'OPD',
        name: 'Fee66 ข้อ 15',
        status: 'Y',
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
        name: 'code',
        required: true,
        label: 'Code',
        align: 'left',
        field: 'code',
        sortable: true,
      },
      {
        name: 'typec',
        required: true,
        label: 'ประเภทการ Claim',
        align: 'left',
        field: 'typec',
        sortable: true,
      },
      {
        name: 'typeh',
        required: true,
        label: 'ประเภทผู้ป่วย',
        align: 'left',
        field: 'typeh',
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
        name: 'status',
        required: true,
        label: 'Status',
        align: 'left',
        field: 'status',
        sortable: true,
      },
      {
        name: 'ismap',
        //required: true,
        label: 'ผูกกับกองทุนนี้',
        align: 'left',
        field: 'ismap',
        sortable: false,
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
<style scoped>
.my-custom-input {
  width: 200px;
  height: 50px;
}
</style>
