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
            :accept="'.xlsx,.xls'"
            :auto-upload="false"
            :hide-upload-btn="true"
            @added="onFilesAdded"
            multiple
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
                    {{ scope.uploadSizeLabel }} /
                    {{ scope.uploadProgressLabel }}
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
                  :disable="!files"
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
          <div>จำนวนข้อมูลทั้งหมด: {{ data.length }}</div>
          <!-- <q-table :rows="data" :loading="loading" :columns="columns"> </q-table> -->
          <br />
          <q-btn color="primary" @click="confirm" disable
            >Save To Database</q-btn
          ></q-card-section
        >
      </q-card>
    </div>
  </q-page>
</template>

<!-- Keep the rest of your code as it is -->

<script lang="ts" setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { ExcelRep } from '@/types/models';
import UploadApiService from '@/api/UploadApiService';
import useBase from '@/composables/useBase';
import { useLang } from 'src/composables/useLang';

const { WeeLoader, WeeToast, WeeConfirm } = useBase();
const { t } = useLang();
const { uploadApi } = UploadApiService();
const file = ref<File | null>(null);
const data = ref<ExcelRep[]>([]);
const loading = ref(false);
const columns: any[] = [
  {
    name: 'repno',
    required: true,
    label: 'Rep No',
    align: 'left',
    field: '0',
    sortable: true,
  },
  { name: 'no', align: 'left', label: 'No', field: '1', sortable: true },
  {
    name: 'tran_id',
    align: 'left',
    label: 'Tran ID',
    field: '2',
    sortable: true,
  },
  { name: 'hn', align: 'left', label: 'HN', field: '3', sortable: true },
  { name: 'an', align: 'left', label: 'AN', field: '4', sortable: true },
  {
    name: 'pid',
    align: 'left',
    label: 'PID',
    field: '5',
    sortable: true,
  },
  {
    name: 'fullname',
    align: 'left',
    label: 'Fullname',
    field: '6',
    sortable: true,
  },
  {
    name: 'pttype',
    align: 'left',
    label: 'PT Type',
    field: '7',
    sortable: true,
  },
  {
    name: 'visitdate',
    align: 'left',
    label: 'Visit Date',
    field: '8',
    sortable: true,
  },
  {
    name: 'dchdate',
    align: 'left',
    label: 'DCH Date',
    field: '9',
    sortable: true,
  },
  {
    name: 'total_nhso_pay',
    align: 'left',
    label: 'Total NHSO Pay',
    field: '10',
    sortable: true,
  },
  {
    name: 'total_agency_pay',
    align: 'left',
    label: 'Total Agency Pay',
    field: '11',
    sortable: true,
  },
  {
    name: 'compen_from',
    align: 'left',
    label: 'Compensation From',
    field: '12',
    sortable: true,
  },
  {
    name: 'error_code',
    align: 'left',
    label: 'Error Code',
    field: '13',
    sortable: true,
  },
  {
    name: 'main_funds',
    align: 'left',
    label: 'Main Funds',
    field: '14',
    sortable: true,
  },
  {
    name: 'sub_funds',
    align: 'left',
    label: 'Sub Funds',
    field: '15',
    sortable: true,
  },
  {
    name: 'type_service',
    align: 'left',
    label: 'Type Service',
    field: '16',
    sortable: true,
  },
  {
    name: 'referin',
    align: 'left',
    label: 'Refer In',
    field: '17',
    sortable: true,
  },
  {
    name: 'has_pttype',
    align: 'left',
    label: 'Has PT Type',
    field: '18',
    sortable: true,
  },
  {
    name: 'use_pttype',
    align: 'left',
    label: 'Use PT Type',
    field: '19',
    sortable: true,
  },
  {
    name: 'chk',
    align: 'left',
    label: 'Check',
    field: '20',
    sortable: true,
  },
  {
    name: 'hosmain',
    align: 'left',
    label: 'Hos Main',
    field: '21',
    sortable: true,
  },
  {
    name: 'subhos',
    align: 'left',
    label: 'Sub Hos',
    field: '22',
    sortable: true,
  },
  {
    name: 'href',
    align: 'left',
    label: 'HREF',
    field: '23',
    sortable: true,
  },
  {
    name: 'hcode',
    align: 'left',
    label: 'H Code',
    field: '24',
    sortable: true,
  },
  {
    name: 'hmain',
    align: 'left',
    label: 'H Main',
    field: '25',
    sortable: true,
  },
  {
    name: 'prov1',
    align: 'left',
    label: 'Prov1',
    field: '26',
    sortable: true,
  },
  {
    name: 'rg1',
    align: 'left',
    label: 'Rg1',
    field: '27',
    sortable: true,
  },
  {
    name: 'hmain2',
    align: 'left',
    label: 'H Main2',
    field: '28',
    sortable: true,
  },
  {
    name: 'prov2',
    align: 'left',
    label: 'Prov2',
    field: '29',
    sortable: true,
  },
  {
    name: 'rg2',
    align: 'left',
    label: 'Rg2',
    field: '30',
    sortable: true,
  },
  {
    name: 'dmis_hmain3',
    align: 'left',
    label: 'Dmis H Main3',
    field: '31',
    sortable: true,
  },
  { name: 'da', align: 'left', label: 'Da', field: '32', sortable: true },
  {
    name: 'proj',
    align: 'left',
    label: 'Proj',
    field: '33',
    sortable: true,
  },
  { name: 'pa', align: 'left', label: 'Pa', field: '34', sortable: true },
  {
    name: 'drg',
    align: 'left',
    label: 'DRG',
    field: '35',
    sortable: true,
  },
  { name: 'rw', align: 'left', label: 'RW', field: '36', sortable: true },
  {
    name: 'ca_type',
    align: 'left',
    label: 'CA Type',
    field: '37',
    sortable: true,
  },
  {
    name: 'non_car_drg_ins',
    align: 'left',
    label: 'Non Car DRG Ins',
    field: '38',
    sortable: true,
  },
  {
    name: 'car_drg_ins',
    align: 'left',
    label: 'Car DRG Ins',
    field: '39',
    sortable: true,
  },
  {
    name: 'total_charge',
    align: 'left',
    label: 'Total Charge',
    field: '40',
    sortable: true,
  },
  {
    name: 'central_reimburse',
    align: 'left',
    label: 'Central Reimburse',
    field: '41',
    sortable: true,
  },
  {
    name: 'payment',
    align: 'left',
    label: 'Payment',
    field: '42',
    sortable: true,
  },
  {
    name: 'point',
    align: 'left',
    label: 'Point',
    field: '43',
    sortable: true,
  },
  {
    name: 'delay_num',
    align: 'left',
    label: 'Delay Num',
    field: '44',
    sortable: true,
  },
  {
    name: 'delay_per',
    align: 'left',
    label: 'Delay Per',
    field: '45',
    sortable: true,
  },
  {
    name: 'ccuf',
    align: 'left',
    label: 'CCUF',
    field: '46',
    sortable: true,
  },
  {
    name: 'adjrw_nhso',
    align: 'left',
    label: 'Adj RW NHSO',
    field: '47',
    sortable: true,
  },
  {
    name: 'adjrw2',
    align: 'left',
    label: 'Adj RW2',
    field: '48',
    sortable: true,
  },
  {
    name: 'compensate',
    align: 'left',
    label: 'Compensate',
    field: '49',
    sortable: true,
  },
  {
    name: 'act',
    align: 'left',
    label: 'Act',
    field: '50',
    sortable: true,
  },
  {
    name: 'salary',
    align: 'left',
    label: 'Salary',
    field: '51',
    sortable: true,
  },
  {
    name: 'total_salary',
    align: 'left',
    label: 'Total Salary',
    field: '52',
    sortable: true,
  },
  {
    name: 'total_salary_cut',
    align: 'left',
    label: 'Total Salary Cut',
    field: '53',
    sortable: true,
  },
  {
    name: 'iphc',
    align: 'left',
    label: 'IPHC',
    field: '54',
    sortable: true,
  },
  {
    name: 'ophc',
    align: 'left',
    label: 'OPHC',
    field: '55',
    sortable: true,
  },
  {
    name: 'opae',
    align: 'left',
    label: 'OPAE',
    field: '56',
    sortable: true,
  },
  {
    name: 'ae_ipnb',
    align: 'left',
    label: 'AE IPNB',
    field: '57',
    sortable: true,
  },
  {
    name: 'ae_ipuc',
    align: 'left',
    label: 'AE IPUC',
    field: '58',
    sortable: true,
  },
  {
    name: 'ae_ip3sss',
    align: 'left',
    label: 'AE IP3SSS',
    field: '59',
    sortable: true,
  },
  {
    name: 'ae_ip7sss',
    align: 'left',
    label: 'AE IP7SSS',
    field: '60',
    sortable: true,
  },
  {
    name: 'ae_carae',
    align: 'left',
    label: 'AE CARAE',
    field: '61',
    sortable: true,
  },
  {
    name: 'ae_caref',
    align: 'left',
    label: 'AE CAREF',
    field: '62',
    sortable: true,
  },
  {
    name: 'ae_caref_puc',
    align: 'left',
    label: 'AE CAREF PUC',
    field: '63',
    sortable: true,
  },
  {
    name: 'opinst',
    align: 'left',
    label: 'OPINST',
    field: '64',
    sortable: true,
  },
  {
    name: 'inst',
    align: 'left',
    label: 'Inst',
    field: '65',
    sortable: true,
  },
  {
    name: 'ipaec',
    align: 'left',
    label: 'IPAEC',
    field: '66',
    sortable: true,
  },
  {
    name: 'ipaer',
    align: 'left',
    label: 'IPAER',
    field: '67',
    sortable: true,
  },
  {
    name: 'ipinrgc',
    align: 'left',
    label: 'IPINRGC',
    field: '68',
    sortable: true,
  },
  {
    name: 'ipinrgr',
    align: 'left',
    label: 'IPINRGR',
    field: '69',
    sortable: true,
  },
  {
    name: 'ipinspsn',
    align: 'left',
    label: 'IPINSPSN',
    field: '70',
    sortable: true,
  },
  {
    name: 'ipprcc',
    align: 'left',
    label: 'IPPRCC',
    field: '71',
    sortable: true,
  },
  {
    name: 'ipprcc_puc',
    align: 'left',
    label: 'IPPRCC PUC',
    field: '72',
    sortable: true,
  },
  {
    name: 'ipbkk_inst',
    align: 'left',
    label: 'IPBKK Inst',
    field: '73',
    sortable: true,
  },
  {
    name: 'ip_ontop',
    align: 'left',
    label: 'IP Ontop',
    field: '74',
    sortable: true,
  },
  {
    name: 'dmis_cataract',
    align: 'left',
    label: 'DMIS Cataract',
    field: '75',
    sortable: true,
  },
  {
    name: 'dmis_ssj',
    align: 'left',
    label: 'DMIS SSJ',
    field: '76',
    sortable: true,
  },
  {
    name: 'dmis_hos',
    align: 'left',
    label: 'DMIS Hos',
    field: '77',
    sortable: true,
  },
  {
    name: 'dmis_catinst',
    align: 'left',
    label: 'DMIS Catinst',
    field: '78',
    sortable: true,
  },
  {
    name: 'dmis_dmisrc',
    align: 'left',
    label: 'DMIS DMISRC',
    field: '79',
    sortable: true,
  },
  {
    name: 'dmis_dmisrc2',
    align: 'left',
    label: 'DMIS DMISRC2',
    field: '80',
    sortable: true,
  },
  {
    name: 'dmis_rcuhosc',
    align: 'left',
    label: 'DMIS RCUHOSC',
    field: '81',
    sortable: true,
  },
  {
    name: 'dmis_rcuhosc2',
    align: 'left',
    label: 'DMIS RCUHOSC2',
    field: '82',
    sortable: true,
  },
  {
    name: 'dmis_rcuhosr',
    align: 'left',
    label: 'DMIS RCUHOSR',
    field: '83',
    sortable: true,
  },
  {
    name: 'dmis_rcuhosr2',
    align: 'left',
    label: 'DMIS RCUHOSR2',
    field: '84',
    sortable: true,
  },
  {
    name: 'dmis_llop',
    align: 'left',
    label: 'DMIS LLOP',
    field: '85',
    sortable: true,
  },
  {
    name: 'dmis_llrgc',
    align: 'left',
    label: 'DMIS LLRGC',
    field: '86',
    sortable: true,
  },
  {
    name: 'dmis_llrgr',
    align: 'left',
    label: 'DMIS LLRGR',
    field: '87',
    sortable: true,
  },
  {
    name: 'dmis_lp',
    align: 'left',
    label: 'DMIS LP',
    field: '88',
    sortable: true,
  },
  {
    name: 'dmis_stroke_stemi_drug',
    align: 'left',
    label: 'DMIS Stroke STEMI Drug',
    field: '89',
    sortable: true,
  },
  {
    name: 'dmis_dmidml',
    align: 'left',
    label: 'DMIS DMIDML',
    field: '90',
    sortable: true,
  },
  {
    name: 'dmis_pp',
    align: 'left',
    label: 'DMIS PP',
    field: '91',
    sortable: true,
  },
  {
    name: 'dmis_dmishd',
    align: 'left',
    label: 'DMIS DMISHD',
    field: '92',
    sortable: true,
  },
  {
    name: 'dmis_dmicnt',
    align: 'left',
    label: 'DMIS DMICNT',
    field: '93',
    sortable: true,
  },
  {
    name: 'dmis_paliative_care',
    align: 'left',
    label: 'DMIS Paliative Care',
    field: '94',
    sortable: true,
  },
  {
    name: 'dmis_dm',
    align: 'left',
    label: 'DMIS DM',
    field: '95',
    sortable: true,
  },
  {
    name: 'drug',
    align: 'left',
    label: 'Drug',
    field: '96',
    sortable: true,
  },
  {
    name: 'opbkk_hc',
    align: 'left',
    label: 'OPBKK HC',
    field: '97',
    sortable: true,
  },
  {
    name: 'opbkk_dent',
    align: 'left',
    label: 'OPBKK Dent',
    field: '98',
    sortable: true,
  },
  {
    name: 'opbkk_drug',
    align: 'left',
    label: 'OPBKK Drug',
    field: '99',
    sortable: true,
  },
  {
    name: 'opbkk_fs',
    align: 'left',
    label: 'OPBKK FS',
    field: '100',
    sortable: true,
  },
  {
    name: 'opbkk_others',
    align: 'left',
    label: 'OPBKK Others',
    field: '101',
    sortable: true,
  },
  {
    name: 'deny_hc',
    align: 'left',
    label: 'Deny HC',
    field: '102',
    sortable: true,
  },
  {
    name: 'deny_ae',
    align: 'left',
    label: 'Deny AE',
    field: '103',
    sortable: true,
  },
  {
    name: 'deny_inst',
    align: 'left',
    label: 'Deny Inst',
    field: '104',
    sortable: true,
  },
  {
    name: 'deny_ip',
    align: 'left',
    label: 'Deny IP',
    field: '105',
    sortable: true,
  },
  {
    name: 'deny_dmis',
    align: 'left',
    label: 'Deny DMIS',
    field: '106',
    sortable: true,
  },
  {
    name: 'base_rate',
    align: 'left',
    label: 'Base Rate',
    field: '107',
    sortable: true,
  },
  {
    name: 'base_rate_extra',
    align: 'left',
    label: 'Base Rate Extra',
    field: '108',
    sortable: true,
  },
  {
    name: 'base_rate_total',
    align: 'left',
    label: 'Base Rate Total',
    field: '109',
    sortable: true,
  },
  { name: 'fs', align: 'left', label: 'FS', field: '110', sortable: true },
  { name: 'va', align: 'left', label: 'VA', field: '111', sortable: true },
  {
    name: 'remark',
    align: 'left',
    label: 'Remark',
    field: '112',
    sortable: true,
  },
];
const files = ref<File[]>([]);

const onFilesAdded = (addedFiles: readonly any[]) => {
  // Make a copy of addedFiles and assign it to files
  files.value = [...addedFiles];
};

const uploadFiles = async () => {
  if (files.value.length > 0) {
    loading.value = true;
    for (const file of files.value) {
      await parseFile(file);
    }
    loading.value = false;
  }
};

const uploadFile = async () => {
  await uploadFiles();
};

const parseFile = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    const data = e.target?.result;
    if (typeof data === 'string') {
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      const sheetData = [];
      let runNum = 7;
      // Check if the filename contains %_IP_% or %_IPLGO_%
      const fileName = file.name;
      console.log('fileName:', fileName);
      if (
        fileName.split('_').findIndex((x) => x === 'IP') == 2 ||
        fileName.split('_').findIndex((x) => x === 'IPSTP') == 2
      ) {
        runNum = 8;
      } else if (
        fileName.split('_').findIndex((x) => x === 'IPLGO') == 2 ||
        fileName.split('_').findIndex((x) => x === 'IPBKK') == 2 ||
        fileName.split('_').findIndex((x) => x === 'IPCS') == 2
      ) {
        runNum = 7;
      }

      for (let rowNum = runNum; rowNum <= range.e.r; rowNum++) {
        const rowData: any = {};
        let emptyRowFound = false;

        for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
          const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
          const cell = worksheet[cellAddress];

          if (cell && cell.v !== null) {
            const columnName = columns[colNum].name; // Use the correct column name
            rowData[columnName] = cell.w;
          } else {
            emptyRowFound = true;
            break;
          }
        }

        if (emptyRowFound) {
          break; // Stop reading when an empty row is encountered
        }

        sheetData.push(rowData);
        //console.log('rowData:', rowData);
      }

      //console.log('sheetData:', sheetData);
      updateData(sheetData);
      save();
    }
  };
  reader.onerror = () => {
    console.error('Error reading file:', reader.error);
    reader.abort();
  };
  reader.readAsBinaryString(file);
};

const updateData = (sheetData: Record<string, string>[]) => {
  data.value = sheetData.map((row) => {
    const rowData: ExcelRep = {} as ExcelRep;
    columns.forEach((column) => {
      const columnName = column.name as keyof ExcelRep;
      rowData[columnName] = row[columnName];
    });
    return rowData;
  });
  //console.log('data:', data.value);
};

// const uploadFile = () => {
//   if (file.value) {
//     loading.value = true;
//     parseFile(file.value); // This should update the data.value inside reader.onload
//     loading.value = false;
//   }
// };

const save = async () => {
  try {
    //console.log('data:', data.value);
    const jsondata = JSON.stringify(data.value);
    //console.log('jsondata:', jsondata);
    //for (const item of jsondata) {
    const response = await saveProcess(jsondata);
    console.log('response:', response);
    //}
  } catch (error) {
    console.error('Error sending data', error);
  }
};

const saveProcess = async (item: any): Promise<any> => {
  //console.log('item:', item);
  const response = await uploadApi(item);
  return new Promise((resolve) => {
    resolve(response);
  });
};
const confirm = async () => {
  const conf = await WeeConfirm(t('app.monogram'), t('base.uploadFile'));
  if (conf) {
    WeeLoader();
    await uploadFile();
    WeeToast('Confirm', { type: 'positive' });
    // ทำการ delay 1.5 วินาที
    setTimeout(() => {
      // หลังจากบันทึกเสร็จแล้ว ให้ทำการรีเฟรชหน้าเว็บ
      location.reload();
    }, 2000); // 1.5 วินาที
    WeeLoader(false);
  } else {
    WeeToast('Cancle', { type: 'negative' });
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
