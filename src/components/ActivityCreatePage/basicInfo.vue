<template>
  <div class="basicInfo">
    <div class="page-title">活動基本資料</div>
    <div class="text-title">活動名稱</div>
    <q-input
      v-model="eventTitle"
      class="input-title"
      @update:modelValue="(event) => getPara('eventTitle', event)"
      borderless
      placeholder="30字以內"
    />
    <div class="date_file_text">
      <div class="text-date">活動日期</div>
      <div class="text-field">其他附件</div>
    </div>
    <div class="date_file_input">
      <div class="select-date">
        <q-input
          v-model="eventStDate"
          @update:modelValue="(event) => getPara('eventStDate', event)"
          borderless
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="eventStDate"
                  @update:modelValue="(event) => getPara('eventStDate', event)"
                  color="yellow-9"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="#deb06b" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="file-field">
        <q-file
          multiple
          append
          bottom-slots
          v-model="dataField"
          counter
          max-files="12"
          borderless
        >
          <template v-slot:append>
            <q-icon
              v-if="dataField !== null"
              name="close"
              @click="dataField = null"
              class="cursor-pointer"
            />
            <q-icon name="create_new_folder" @click.stop />
          </template>
          <template v-slot:hint />
        </q-file>
      </div>
    </div>
    <div class="text-image">活動圖片</div>
    <q-uploader  ref="dataUploader"  class="uploader-image" :factory="factoryFn" auto-upload multiple append />
    <div class="text-introduction">活動簡介</div>
    <q-input
      class="input-introduction"
      v-model="eventIntroduction"
      @update:modelValue="(event) => getPara('eventIntroduction', event)"
      filled
      type="textarea"
    />
    <div class="category_ageLimit_text">
      <div class="text-category">活動類別</div>
      <div class="text-ageLimit">年齡限制</div>
    </div>
    <div class="category_ageLimit_input">
      <q-select
        class="select-category"
        v-model="eventCategory"
        :options="options"
        borderless
      />
      <q-select
        class="select-ageLimit"
        v-model="ageLimit"
        :options="ageOptions"
        @update:modelValue="(event) => getPara('ageLimit', event)"
        borderless
      />
    </div>

    <div class="numberLimit_cost_text">
      <div class="text-numberLimit">人數限制</div>
      <div class="text-cost">參與費用</div>
    </div>
    <div class="numberLimit_cost_input">
      <q-input class="input-numberLimit" v-model="personLimit" @update:modelValue="(event) => getPara('personLimit', event)" borderless />
      <q-input
        class="input-cost"
        v-model="cost"
        @update:modelValue="(event) => getPara('cost', event)"
        borderless
      />
    </div>
    <div class="text-addTag">增加標籤</div>
    <q-input class="input-addTag" v-model="tag" borderless />
  </div>
</template>

<script setup>
import { ref,  onMounted } from "vue";
import { defineEmits } from "vue";
import { defineProps } from "vue";

/********************const variable********************/

const eventTitle = ref("");
const ageOptions = [">6", ">15", ">18"];
const eventCategory = ref("");
const eventStDate = ref("");
const dataField = ref(null);
const ageLimit = ref("");
const personLimit = ref("");
const cost = ref("");
const tag = ref("");
const eventIntroduction = ref("");
const preview = ref(null);
const emit = defineEmits(["get-para"]);
const allChildPara = defineProps(["allChildPara"]);
const dataUploader = ref();

/********************const variable end********************/

let fileTemp = allChildPara.allChildPara.fileTemp ? allChildPara.allChildPara.fileTemp :[];

let savePara = allChildPara.allChildPara.basicInfo
  ? allChildPara.allChildPara.basicInfo
  : {};
let saveParaFile = {};
let savePathArray = [];

eventTitle.value = savePara.eventTitle ? savePara.eventTitle : "";
eventStDate.value = savePara.eventStDate ? savePara.eventStDate : "";
eventIntroduction.value = savePara.eventIntroduction ? savePara.eventIntroduction : "";
eventCategory.value = savePara.eventCategory ? savePara.eventCategory : "";
ageLimit.value = savePara.ageLimit ? savePara.ageLimit : "";
personLimit.value = savePara.personLimit ? savePara.personLimit : "";
cost.value = savePara.cost ? savePara.cost : "";


onMounted(() => {
  dataUploader.value.addFiles(fileTemp);
})


// set now date
let newDate = new Date();
let year = newDate.getFullYear();
let month =
  newDate.getMonth() + 1 < 10
    ? "0" + (newDate.getMonth() + 1)
    : newDate.getMonth() + 1;
let date = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
eventStDate.value = year + "/" + month + "/" + date;

getPara("eventStDate", eventStDate.value); // 進入頁面後處理各項參數




/********************methods********************/

// 參數處理
function getPara(key, event) {
  switch (key) {
    case "eventTitle":
      savePara.eventTitle = event;
      break;

    case "eventStDate":
      savePara.eventStDate = event;
      break;

    case "eventIntroduction":
      savePara.eventIntroduction = event;
      break;

    case "cost":
      savePara.cost = event;
      break;

    case "ageLimit":
      savePara.ageLimit = event;
      break;

    case "personLimit":
      savePara.personLimit = parseFloat(event);
      break;

    case "preview":
      event.forEach(function (value) {
        savePathArray.push("/Data/" + value.name);
        fileTemp.push(value);
      });
      saveParaFile.appendixPath = savePathArray;
      break;

    default:
      break;
  }

  // 與父元件參數做連結
  emit("get-para", {
    event: savePara,
    file: saveParaFile,
    fileTemp: fileTemp
  });
}

function factoryFn(file) {
  // preview.value = file[0].__img.currentSrc;
  preview.value = file;
  // fileTemp.push(file);
  getPara("preview", file);
  console.log(dataUploader.value);

  return new Promise((resolve, reject) => {
    resolve({
      url: "https://localhost:5001/api/Event/dataUpload",
      method: "POST",
    });
    console.log(reject);
  });
}
// 封面圖片
// 活動圖片
/********************methods end********************/
</script>

