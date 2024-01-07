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
        row-key="an"
      >
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
        <q-splitter
          v-model="splitterModel[0]"
          style="height: 100%; width: 100%"
        >
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

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as XLSX from 'xlsx';
import { useRouter } from 'vue-router';
import { ClIpd } from '@/types/models';
import useBase from '@/composables/useBase';
import { useLang } from 'src/composables/useLang';
import ipdService from '@/api/IpdService';

const { WeeLoader, WeeToast, WeeConfirm } = useBase();
const { t } = useLang();
const findIpd = ipdService();
const carousel = ref(false);
const splitterModel = ref([20, 80]);
const tab = ref(1);
const startDate = ref('');
const endDate = ref('');
const findAll = ref('');
const data = ref<ClIpd[]>([]);

let columns: any[] = [
  {
    name: 'an',
    required: true,
    align: 'left',
    label: 'an',
    field: '0',
    sortable: true,
  },
  {
    name: 'admdoctor',
    align: 'left',
    label: 'admdoctor',
    field: '1',
    sortable: true,
  },
  {
    name: 'dchdate',
    align: 'left',
    label: 'dchdate',
    field: '2',
    sortable: true,
  },
  {
    name: 'dchstts',
    align: 'left',
    label: 'dchstts',
    field: '3',
    sortable: true,
  },
  {
    name: 'dchtime',
    align: 'left',
    label: 'dchtime',
    field: '4',
    sortable: true,
  },
  {
    name: 'dchtype',
    align: 'left',
    label: 'dchtype',
    field: '5',
    sortable: true,
  },
  {
    name: 'dthdiagdct',
    align: 'left',
    label: 'dthdiagdct',
    field: '6',
    sortable: true,
  },
  { name: 'hn', align: 'left', label: 'hn', field: '7', sortable: true },
  {
    name: 'ivstist',
    align: 'left',
    label: 'ivstist',
    field: '8',
    sortable: true,
  },
  {
    name: 'ivstost',
    align: 'left',
    label: 'ivstost',
    field: '9',
    sortable: true,
  },
  {
    name: 'lockdx',
    align: 'left',
    label: 'lockdx',
    field: '10',
    sortable: true,
  },
  {
    name: 'prediag',
    align: 'left',
    label: 'prediag',
    field: '11',
    sortable: true,
  },
  {
    name: 'pttype',
    align: 'left',
    label: 'pttype',
    field: '12',
    sortable: true,
  },
  {
    name: 'regdate',
    align: 'left',
    label: 'regdate',
    field: '13',
    sortable: true,
  },
  {
    name: 'regtime',
    align: 'left',
    label: 'regtime',
    field: '14',
    sortable: true,
  },
  {
    name: 'rfrics',
    align: 'left',
    label: 'rfrics',
    field: '15',
    sortable: true,
  },
  {
    name: 'rfrilct',
    align: 'left',
    label: 'rfrilct',
    field: '16',
    sortable: true,
  },
  {
    name: 'rfrocs',
    align: 'left',
    label: 'rfrocs',
    field: '17',
    sortable: true,
  },
  {
    name: 'rfrolct',
    align: 'left',
    label: 'rfrolct',
    field: '18',
    sortable: true,
  },
  {
    name: 'spclty',
    align: 'left',
    label: 'spclty',
    field: '19',
    sortable: true,
  },
  { name: 'vn', align: 'left', label: 'vn', field: '20', sortable: true },
  { name: 'ward', align: 'left', label: 'ward', field: '21', sortable: true },
  {
    name: 'rcpt_disease',
    align: 'left',
    label: 'rcpt_disease',
    field: '22',
    sortable: true,
  },
  {
    name: 'dch_doctor',
    align: 'left',
    label: 'dch_doctor',
    field: '23',
    sortable: true,
  },
  {
    name: 'ipt_type',
    align: 'left',
    label: 'ipt_type',
    field: '24',
    sortable: true,
  },
  {
    name: 'iref_type',
    align: 'left',
    label: 'iref_type',
    field: '25',
    sortable: true,
  },
  { name: 'ipacc', align: 'left', label: 'ipacc', field: '26', sortable: true },
  {
    name: 'act_money_limit',
    align: 'left',
    label: 'act_money_limit',
    field: '27',
    sortable: true,
  },
  { name: 'drg', align: 'left', label: 'drg', field: '28', sortable: true },
  { name: 'mdc', align: 'left', label: 'mdc', field: '29', sortable: true },
  { name: 'rw', align: 'left', label: 'rw', field: '30', sortable: true },
  { name: 'wtlos', align: 'left', label: 'wtlos', field: '31', sortable: true },
  { name: 'ot', align: 'left', label: 'ot', field: '32', sortable: true },
  {
    name: 'result',
    align: 'left',
    label: 'result',
    field: '33',
    sortable: true,
  },
  {
    name: 'gravidity',
    align: 'left',
    label: 'gravidity',
    field: '34',
    sortable: true,
  },
  {
    name: 'parity',
    align: 'left',
    label: 'parity',
    field: '35',
    sortable: true,
  },
  {
    name: 'living_children',
    align: 'left',
    label: 'living_children',
    field: '36',
    sortable: true,
  },
  {
    name: 'rxdoctor',
    align: 'left',
    label: 'rxdoctor',
    field: '37',
    sortable: true,
  },
  { name: 'staff', align: 'left', label: 'staff', field: '38', sortable: true },
  { name: 'bw', align: 'left', label: 'bw', field: '39', sortable: true },
  {
    name: 'first_ward',
    align: 'left',
    label: 'first_ward',
    field: '40',
    sortable: true,
  },
  {
    name: 'refer_out_number',
    align: 'left',
    label: 'refer_out_number',
    field: '41',
    sortable: true,
  },
  {
    name: 'incharge_doctor',
    align: 'left',
    label: 'incharge_doctor',
    field: '42',
    sortable: true,
  },
  {
    name: 'an_guid',
    align: 'left',
    label: 'an_guid',
    field: '43',
    sortable: true,
  },
  {
    name: 'an_lock',
    align: 'left',
    label: 'an_lock',
    field: '44',
    sortable: true,
  },
  {
    name: 'ergent',
    align: 'left',
    label: 'ergent',
    field: '45',
    sortable: true,
  },
  {
    name: 'chart_state',
    align: 'left',
    label: 'chart_state',
    field: '46',
    sortable: true,
  },
  {
    name: 'receive_chart_date_time',
    align: 'left',
    label: 'receive_chart_date_time',
    field: '47',
    sortable: true,
  },
  {
    name: 'receive_chart_staff',
    align: 'left',
    label: 'receive_chart_staff',
    field: '48',
    sortable: true,
  },
  {
    name: 'receive_chart_note',
    align: 'left',
    label: 'receive_chart_note',
    field: '49',
    sortable: true,
  },
  { name: 'adjrw', align: 'left', label: 'adjrw', field: '50', sortable: true },
  {
    name: 'ipt_spclty',
    align: 'left',
    label: 'ipt_spclty',
    field: '51',
    sortable: true,
  },
  {
    name: 'finance_lock',
    align: 'left',
    label: 'finance_lock',
    field: '52',
    sortable: true,
  },
  {
    name: 'last_check_autoincome',
    align: 'left',
    label: 'last_check_autoincome',
    field: '53',
    sortable: true,
  },
  {
    name: 'admit_fee_guid',
    align: 'left',
    label: 'admit_fee_guid',
    field: '54',
    sortable: true,
  },
  {
    name: 'leave_home_day',
    align: 'left',
    label: 'leave_home_day',
    field: '55',
    sortable: true,
  },
  {
    name: 'operation_status',
    align: 'left',
    label: 'operation_status',
    field: '56',
    sortable: true,
  },
  {
    name: 'finance_summary_date',
    align: 'left',
    label: 'finance_summary_date',
    field: '57',
    sortable: true,
  },
  {
    name: 'estimate_discharge_date',
    align: 'left',
    label: 'estimate_discharge_date',
    field: '58',
    sortable: true,
  },
  {
    name: 'old_cause_revisit',
    align: 'left',
    label: 'old_cause_revisit',
    field: '59',
    sortable: true,
  },
  {
    name: 'finance_transfer',
    align: 'left',
    label: 'finance_transfer',
    field: '60',
    sortable: true,
  },
  {
    name: 'provision_dx',
    align: 'left',
    label: 'provision_dx',
    field: '61',
    sortable: true,
  },
  {
    name: 'dw_hhc_list_id',
    align: 'left',
    label: 'dw_hhc_list_id',
    field: '62',
    sortable: true,
  },
  {
    name: 'hos_guid',
    align: 'left',
    label: 'hos_guid',
    field: '63',
    sortable: true,
  },
  {
    name: 'hos_guid_ext',
    align: 'left',
    label: 'hos_guid_ext',
    field: '64',
    sortable: true,
  },
  {
    name: 'body_height',
    align: 'left',
    label: 'body_height',
    field: '65',
    sortable: true,
  },
  {
    name: 'update_datetime',
    align: 'left',
    label: 'update_datetime',
    field: '66',
    sortable: true,
  },
  {
    name: 'cur_dep_code',
    align: 'left',
    label: 'cur_dep_code',
    field: '67',
    sortable: true,
  },
  {
    name: 'finance_status_flag',
    align: 'left',
    label: 'finance_status_flag',
    field: '68',
    sortable: true,
  },
  {
    name: 'ipt_admit_type_id',
    align: 'left',
    label: 'ipt_admit_type_id',
    field: '69',
    sortable: true,
  },
  {
    name: 'no_visit',
    align: 'left',
    label: 'no_visit',
    field: '70',
    sortable: true,
  },
  {
    name: 'no_food',
    align: 'left',
    label: 'no_food',
    field: '71',
    sortable: true,
  },
  {
    name: 'confirm_discharge',
    align: 'left',
    label: 'confirm_discharge',
    field: '72',
    sortable: true,
  },
  {
    name: 'lab_status',
    align: 'left',
    label: 'lab_status',
    field: '73',
    sortable: true,
  },
  {
    name: 'xray_status',
    align: 'left',
    label: 'xray_status',
    field: '74',
    sortable: true,
  },
  {
    name: 'grouper_version',
    align: 'left',
    label: 'grouper_version',
    field: '75',
    sortable: true,
  },
  {
    name: 'grouper_err',
    align: 'left',
    label: 'grouper_err',
    field: '76',
    sortable: true,
  },
  {
    name: 'grouper_warn',
    align: 'left',
    label: 'grouper_warn',
    field: '77',
    sortable: true,
  },
  {
    name: 'grouper_actlos',
    align: 'left',
    label: 'grouper_actlos',
    field: '78',
    sortable: true,
  },
  {
    name: 'auto_charge_amount',
    align: 'left',
    label: 'auto_charge_amount',
    field: '79',
    sortable: true,
  },
  {
    name: 'provision_dx_icd',
    align: 'left',
    label: 'provision_dx_icd',
    field: '80',
    sortable: true,
  },
  {
    name: 'ipt_cause_type_id',
    align: 'left',
    label: 'ipt_cause_type_id',
    field: '81',
    sortable: true,
  },
  {
    name: 'ipt_severe_type_id',
    align: 'left',
    label: 'ipt_severe_type_id',
    field: '82',
    sortable: true,
  },
  {
    name: 'ipt_cause_type_note',
    align: 'left',
    label: 'ipt_cause_type_note',
    field: '83',
    sortable: true,
  },
  {
    name: 'followup',
    align: 'left',
    label: 'followup',
    field: '84',
    sortable: true,
  },
  {
    name: 'dch_severe_type_id',
    align: 'left',
    label: 'dch_severe_type_id',
    field: '85',
    sortable: true,
  },
  {
    name: 'opd_finance_wait_tr',
    align: 'left',
    label: 'opd_finance_wait_tr',
    field: '86',
    sortable: true,
  },
  {
    name: 'home_leave_status',
    align: 'left',
    label: 'home_leave_status',
    field: '87',
    sortable: true,
  },
  {
    name: 'grouper_adjrw_price',
    align: 'left',
    label: 'grouper_adjrw_price',
    field: '88',
    sortable: true,
  },
  {
    name: 'reimburse_price',
    align: 'left',
    label: 'reimburse_price',
    field: '89',
    sortable: true,
  },
  {
    name: 'oldcode',
    align: 'left',
    label: 'oldcode',
    field: '90',
    sortable: true,
  },
  {
    name: 'data_ok',
    align: 'left',
    label: 'data_ok',
    field: '91',
    sortable: true,
  },
  {
    name: 'data_exp_date',
    align: 'left',
    label: 'data_exp_date',
    field: '92',
    sortable: true,
  },
  {
    name: 'ipt_summary_status_id',
    align: 'left',
    label: 'ipt_summary_status_id',
    field: '93',
    sortable: true,
  },
  {
    name: 'no_charge_room',
    align: 'left',
    label: 'no_charge_room',
    field: '94',
    sortable: true,
  },
  {
    name: 'rx_home_med',
    align: 'left',
    label: 'rx_home_med',
    field: '95',
    sortable: true,
  },
  {
    name: 'hhc_hospcode',
    align: 'left',
    label: 'hhc_hospcode',
    field: '96',
    sortable: true,
  },
  {
    name: 'operation_status_id',
    align: 'left',
    label: 'operation_status_id',
    field: '97',
    sortable: true,
  },
  {
    name: 'ipd_nurse_eval_range_code',
    align: 'left',
    label: 'ipd_nurse_eval_range_code',
    field: '98',
    sortable: true,
  },
];

const filter = ref('');
const loading = ref(false);
const router = useRouter();

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

// const fetchData = async () => {
//   try {
//     loading.value = true;

//     // แทนที่ URL_API ด้วย URL ของ API ที่คุณใช้
//     const result = await findIpd.json();

//     // นำข้อมูลที่ได้มาใส่ในตัวแปร data
//     data.value = result;
//     console.log(data.value);

//     loading.value = false;
//   } catch (error) {
//     loading.value = false;
//     console.error('Error fetching data:', error);
//   }
// };
// onMounted(() => {
//   fetchData();
// });
</script>
