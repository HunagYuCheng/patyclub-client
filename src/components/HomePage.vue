<template>
  <main id="Home">
    <div
      id="Home-container"
      class="container"
    >
      <transition
        name="first-step"
        mode="out-in"
      >
        <div
          class="first-step"
          @click="showInfo"
          v-if="showInfoButton.showFirstStep"
        >
          <img
            src="../assets/PatyLogo.png"
            class="first-img"
          />
          <img
            src="../assets/PatyLogo-white.png"
            class="second-img"
          />
        </div>
        <div
          class="second-step"
          v-else-if="showInfoButton.showSecondStep"
        >
          <div
            class="billboard"
            @click="showBillBoard"
          >公佈欄｜BillBoard</div>
          <div
            class="hotActivity"
            @click="showActivities"
          >
            活動精選｜Hot Activities
          </div>
        </div>
      </transition>
      <transition name="billboard-step">
        <div
          class="CardInfo billboard-info"
          v-if="showInfoButton.showBillBoardInfo"
        >
          <div
            class="CardInfo-right CardInfo-right-bill"
            @mouseleave="showInfo"
          >
            <div class="tag-group tag-group-billboard">
              <div class="tag tag-billboard">公佈欄｜BillBoard</div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="hotActivity-step">
        <div
          class="CardInfo hotActivity-info"
          v-if="showInfoButton.showActivitiesInfo"
        >
          <div
            class="CardInfo-right CardInfo-right-hot"
            @mouseleave="showInfo"
          >
            <div class="tag-group tag-group-hotActivity">
              <div class="tag tag-hotActivity">活動精選｜Hot Activities</div>
              <div class="information-bg">
                <div class="information-list scrollbarCol">
                  <ul
                    v-if="allActivity.length===0"
                    class="timeline"
                  >
                    <li class="event">
                      <p>無精選活動</p>
                    </li>
                  </ul>
                  <ul
                    v-else
                    class="timeline"
                  >
                    <li
                      @mouseover="ActivityInformation = i.eventTitle"
                      class="event"
                      v-for="i in allActivity"
                      :key="i"
                    >
                      <p>{{ i.eventTitle }}</p>
                    </li>
                  </ul>
                </div>
                <div class="information-board">
                  <span>
                    {{ ActivityInformation }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div
      class="bg-image"
      :style="backgroundimg"
    ></div>
    <div
      class="bg-image"
      v-if="showbg===true"
    ></div>

  </main>
</template>
<script>
import LoginDialog from "./LoginDialog.vue";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { apiGetActivity } from "@/apis/api/userRequest.ts";
export default {
  setup() {
    const $q = useQuasar();
    function openLoginDialog() {
      $q.dialog({
        component: LoginDialog,
        // componentProps: {
        //   message: "something",
        // },
      })
        .onOk(() => {
          console.log("OK");
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    }
    const allActivity = ref([]);
    const ActivityInformation = ref("");
    const showbg = ref(true);

    const showInfoButton = ref({
      showFirstStep: true,
      showSecondStep: false,
      showBillBoardInfo: false,
      showActivitiesInfo: false,
    });
    const isopacity = ref(true);

    const backgroundimg = ref({
      backgroundImage: "url(" + require("../assets/backgroundPic.png") + ")",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundPosition: "bottom",
    });

    function showInfo() {
      showInfoButton.value.showFirstStep = false;
      showInfoButton.value.showSecondStep = true;
      showInfoButton.value.showBillBoardInfo = false;
      showInfoButton.value.showActivitiesInfo = false;
      showbg.value = true;
    }
    function showBillBoard() {
      showInfoButton.value.showSecondStep = false;
      showInfoButton.value.showBillBoardInfo = true;
      showInfoButton.value.showActivitiesInfo = false;
      showbg.value = false;
    }
    function showActivities() {
      showInfoButton.value.showSecondStep = false;
      showInfoButton.value.showBillBoardInfo = false;
      showInfoButton.value.showActivitiesInfo = true;
      showbg.value = false;
      apiGetActivity().then((response) => {
        allActivity.value = response.data;
        ActivityInformation.value = response.data[0].eventTitle;
      });
    }

    return {
      showInfoButton,
      backgroundimg,
      isopacity,
      allActivity,
      ActivityInformation,
      showbg,
      openLoginDialog,
      showInfo,
      showBillBoard,
      showActivities,
    };
  },
};
</script>
