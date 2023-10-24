<template>
  <q-drawer
    v-model="langugeAndThemeStore.leftDrawerOpen"
    show-if-above
    :width="240"
    :overlay="overlay"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item
          v-for="link in links1"
          :key="link.text"
          :to="link.link"
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <!--<q-expansion-item icon="bi-file" label="Pages">
          <q-list class="q-pl-lg">
            <q-item to="/auth/login" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-box-arrow-in-right" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Login-1</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              to="/auth/login2"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="bi-box-arrow-in-right" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Login-2</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Lock" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-lock" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Lock-2" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-lock" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen - 2</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Pricing" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Pricing</q-item-label>
              </q-item-section>
            </q-item>
            <q-item-label header class="text-weight-bold">Generic</q-item-label>
            <q-item to="/Profile" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>User Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              to="/Maintenance"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="bi-gear" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Maintenance</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>-->

        <!-- <q-separator class="q-my-md" />
        <q-item-label header class="text-weight-bold text-uppercase"
          >E-Claim
        </q-item-label>
        <q-item v-for="link in links2" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item> -->
        <div class="q-mt-md q-mb-xs">
          <q-list class="rounded-borders">
            <q-expansion-item
              expand-separator
              label="e-claim"
              class="text-weight-bold text-uppercase"
              icon="bi-currency-exchange"
            >
              <q-card>
                <q-card-section>
                  <q-item
                    v-for="link in links2"
                    :key="link.text"
                    :to="link.link"
                    v-ripple
                    clickable
                  >
                    <q-item-section avatar>
                      <q-icon
                        :color="$q.dark.isActive ? 'white' : 'black'"
                        :name="link.icon"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ link.text }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
        <!--  -->
        <div class="q-mt-md q-mb-xs">
          <q-list class="rounded-borders">
            <q-expansion-item
              expand-separator
              label="Seamless"
              class="text-weight-bold text-uppercase"
              icon="bi-currency-exchange"
            >
              <q-card>
                <q-card-section>
                  <q-item
                    v-for="link in links3"
                    :key="link.text"
                    :to="link.link"
                    v-ripple
                    clickable
                  >
                    <q-item-section avatar>
                      <q-icon
                        :color="$q.dark.isActive ? 'white' : 'black'"
                        :name="link.icon"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ link.text }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
        <!--  -->
        <div class="q-mt-md q-mb-xs">
          <q-list class="rounded-borders">
            <q-expansion-item
              expand-separator
              label="กองทุนนอก"
              class="text-weight-bold text-uppercase"
              icon="bi-currency-exchange"
            >
              <q-card>
                <q-card-section>
                  <q-item
                    v-for="link in links4"
                    :key="link.text"
                    :to="link.link"
                    v-ripple
                    clickable
                  >
                    <q-item-section avatar>
                      <q-icon
                        :color="$q.dark.isActive ? 'white' : 'black'"
                        :name="link.icon"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ link.text }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
        <!-- <q-separator class="q-mt-md q-mb-xs" />
        <q-item-label header class="text-weight-bold text-uppercase">
          Seamless
        </q-item-label>
        <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item> -->

        <q-separator class="q-my-md" />
        <div class="q-mt-md q-mb-xs">
          <q-list class="rounded-borders">
            <q-expansion-item
              expand-separator
              label="settings"
              class="text-weight-bold text-uppercase"
              icon="bi-gear"
            >
              <q-card>
                <q-card-section>
                  <q-item
                    v-for="link in links5"
                    :key="link.text"
                    :to="link.link"
                    v-ripple
                    clickable
                  >
                    <q-item-section avatar>
                      <q-icon
                        :color="$q.dark.isActive ? 'white' : 'black'"
                        :name="link.icon"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ link.text }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>

        <!-- <q-item
          v-for="link in links4"
          :key="link.text"
          :to="link.link"
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item> -->

        <q-separator class="q-mt-md q-mb-lg" />

        <div
          class="q-px-md"
          :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
        >
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a
              v-for="button in buttons1"
              :key="button.text"
              class="YL__drawer-footer-link"
              href="javascript:void(0)"
            >
              {{ button.text }}
            </a>
          </div>
        </div>
        <div
          class="q-py-md q-px-md"
          :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
        >
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a
              v-for="button in buttons2"
              :key="button.text"
              class="YL__drawer-footer-link"
              href="javascript:void(0)"
            >
              {{ button.text }}
            </a>
          </div>
        </div>
        <div
          class="q-py-md q-px-md"
          :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
        >
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a class="YL__drawer-footer-link" href="javascript:void(0)">
              {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
            </a>
          </div>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { getYearNow } from 'src/utils/dateUtil';
import { useLang } from '@/composables/useLang';
export default defineComponent({
  name: 'AppDrawer',
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { t } = useLang();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    return {
      langugeAndThemeStore,
      getYearNow,
      t,
      links1: [
        { icon: 'bi-house-door', text: 'Home', link: '/' },
        //{ icon: 'bi-card-heading', text: 'Feed', link: '/feed' },
        { icon: 'bi-file-medical', text: 'นำเข้าผู้ป่วยนอก', link: '/opd' },
        { icon: 'bi-bandaid', text: 'นำเข้าผู้ป่วยใน', link: '/ipd' },
        // {
        //   icon: 'bi-file-arrow-down',
        //   text: 'Fetch data',
        //   link: '/fetch-data',
        // },
        // { icon: 'bi-file', text: 'Tutor1', link: '/tutor1' },
      ],
      links2: [
        { icon: 'bi-check2-circle', text: 'ตรวจสอบกองทุน', link: '/echeck' },
        //{ icon: 'bi-file-spreadsheet', text: 'สถานะการเคลม', link: '/erep' },
        { icon: 'bi-file-spreadsheet', text: 'REP', link: '/erep' },
        { icon: 'bi-file-spreadsheet', text: 'STM', link: '/estm' },
        { icon: 'bi-cash-coin', text: 'เงินโอน', link: '/emoney' },
      ],
      links3: [
        { icon: 'bi-check2-circle', text: 'ตรวจสอบกองทุน', link: '/scheck' },
        //{ icon: 'bi-file-spreadsheet', text: 'สถานะการเคลม', link: '/erep' },
        { icon: 'bi-file-spreadsheet', text: 'REP', link: '/srep' },
        { icon: 'bi-file-spreadsheet', text: 'STM', link: '/sstm' },
        { icon: 'bi-cash-coin', text: 'เงินโอน', link: '/smoney' },
      ],
      links4: [
        { icon: 'bi-check2-circle', text: 'ตรวจสอบกองทุน', link: '/scheck' },
        //{ icon: 'bi-file-spreadsheet', text: 'สถานะการเคลม', link: '/erep' },
        { icon: 'bi-file-spreadsheet', text: 'REP', link: '/srep' },
        { icon: 'bi-file-spreadsheet', text: 'STM', link: '/sstm' },
        { icon: 'bi-cash-coin', text: 'เงินโอน', link: '/smoney' },
      ],
      links5: [
        {
          icon: 'bi-arrow-clockwise',
          text: 'นำเข้าข้อมูลหลัก',
          link: '/stmain',
        },
        { icon: 'bi-flag', text: 'ตั้งค่ากองทุน', link: '/stfund' },
        // { icon: 'bi-question-circle', text: 'Help' },
        // { icon: 'bi-info-square', text: 'Send feedback' },
      ],
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' },
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' },
      ],
    };
  },
});
</script>
<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      text-decoration: underline
</style>
