<template>
  <div>
    <footer>
      <div class="bg-primary footer-body p-5">
        <b-container>
          <b-row>
            <b-col cols="12" md="3">
            </b-col>
            <b-col cols="12" md="3" class="text-center mb-4">
              <ul class="list-unstyled p-0 m-0">
                <li class="title text-white">خريطة الموقع</li>
                <li>
                  <router-link to="/" class="text-white">الرئيسية</router-link>
                </li>
                <li>
                  <router-link to="/stores" class="text-white">المتاجر</router-link>
                </li>
                <li>
                  <router-link to="/about-us" class="text-white">من نحن</router-link>
                </li>
                <li>
                  <router-link to="/signup" class="text-white">انضم إلينا</router-link>
                </li>
              </ul>
            </b-col>
            <b-col cols="12" md="3" class="text-center">
              <ul class="list-unstyled p-0 m-0">
                <li>
                  <h6 class="m-0 title text-white mt-1">تواصل معنا</h6>
                </li>
                <li>
                  <ul class="
                      list-unstyled
                      p-0
                      py-3
                      m-0
                      d-flex
                      justify-content-between
                    ">
                    <li class="p-2">
                      <i class="mdi mdi-facebook mdi-24px"></i>
                    </li>
                    <li class="p-2">
                      <i class="mdi mdi-instagram mdi-24px"></i>
                    </li>
                    <li class="p-2">
                      <i class="mdi mdi-twitter mdi-24px"></i>
                    </li>
                    <li class="p-2">
                      <i class="mdi mdi-linkedin mdi-24px"></i>
                    </li>
                  </ul>
                </li>
                <li v-if="!isCustomer()">
                  <b-button to="/login" size="sm" class="px-3" block variant="outline-light">تسجيل الدخول</b-button>
                </li>
              </ul>
            </b-col>
            <b-col cols="12" md="3">
            </b-col>
          </b-row>
        </b-container>
      </div>
      <mini-footer />
    </footer>
  </div>
</template>

<script>
import { isCustomer } from "@core/util/auth";
import miniFooter from "@core/layout/components/mini-footer.vue";
export default {
  components: {
    miniFooter,
  },
  methods: {
    isCustomer,
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/helpers/variables";

.newsletter {
  background: var(--primary);
}

.footer-body {
  h6 {
    letter-spacing: 1px;
  }

  ul {
    li {
      font-size: 14px;
      text-transform: capitalize;
      color: #ddd;
      line-height: 30px;
    }
  }
}

.features {
  ul {
    padding: 20px 0 0;
    border-color: $borderColor;

    li {
      &:not(:first-of-type) {
        border-left: solid 1px $borderColor;
      }

      padding: 0 12px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 28px;
        line-height: 1;
        margin-right: 16px;
      }
    }
  }
}
</style>
