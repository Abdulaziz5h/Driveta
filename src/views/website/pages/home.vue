<template>
  <div>
    <div class="position-relative">
      <b-container>
        <b-row class="hero-header pb-5">
          <b-col cols="12" lg="6" order="2" order-lg="1" class="position-relative">
            <div class="
                w-100
                h-100
                d-flex
                flex-column
                justify-content-center
                text-lg-left text-center
              ">
              <h2 class="text-primary font-weight-bold text-capitalize">
                منصة درافيتا
              </h2>
              <p class="mb-5 text-secondary text-justify">
                الحركة.. هي ما نملك من قوة. إنه شريان حياتنا. إنه يمر عبر عروقنا. إنه ما يخرجنا من الفراش كل صباح. إنه
                ما يدفعنا لإعادة تصور كيف يمكننا أن نتحرك بشكل أفضل. من أجلك، ولجميع الأماكن التي تريد الذهاب إليها. لكل
                الأشياء التي تريد الحصول عليها. لجميع الطرق التي تريد كسبها. في جميع أنحاء العالم. في الوقت الحقيقي.
                بسرعة لا تصدق الآن.
              </p>
              <div>
                <b-button class="px-5" variant="outline-primary" to="/stores">تسوق الان</b-button>
              </div>
              <div class="mt-3">
                <img src="@/assets/images/app-store.png" style="cursor: pointer" height="38" class="mr-2 rounded"
                  alt="app store" />
                <img src="@/assets/images/google-play.png" style="cursor: pointer" height="38" class="rounded"
                  alt="google play" />
              </div>
            </div>
          </b-col>
          <b-col cols="12" lg="6" order="1" order-lg="2">
            <div class="
                w-100
                h-100
                d-flex
                flex-column
                align-items-center
                justify-content-center
                pb-5
              ">
              <hero-svg style="max-width: 100%" />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <section class="bg-primary py-4">
      <b-container>
        <b-row>
          <b-col cols="12" lg="4">
            <div class="mx-auto p-3 my-4 text-center" style="max-width: 300px">
              <span class="image-icon text-white mx-auto"><i class="mdi mdi-car mdi-48px"></i></span>
              <h6 class="title text-white">احجز السيارة التي تناسبك</h6>
              <p class="m-0 text-white" style="font-size: 14px">
                اختر فئة السيارة التي تناسبك من بين مجموعة واسعة من الخيارات لتصلك خلال دقائق. أو بإمكانك حجز مشوارك
                لوقت لاحق
              </p>
            </div>
          </b-col>
          <b-col cols="12" lg="4">
            <div class="mx-auto p-3 my-4 text-center" style="max-width: 300px">
              <span class="image-icon text-white mx-auto"><i class="mdi mdi-map mdi-48px"></i></span>
              <h6 class="title text-white">تتبع مسار السيارة</h6>
              <p class="m-0 text-white" style="font-size: 14px">
                تتبع مسار السيارة في الوقت الفعلي بدءا من وقت اختيار السيارة والكابتن إلى أن تصل إلى وجهتك. وبإمكانك
                مشاركة التفاصيل مع معارفك.
              </p>
            </div>
          </b-col>
          <b-col cols="12" lg="4">
            <div class="mx-auto p-3 my-4 text-center" style="max-width: 300px">
              <span class="image-icon text-white mx-auto"><i class="mdi mdi-store mdi-48px"></i></span>
              <h6 class="title text-white">اطلب منتجاتك</h6>
              <p class="m-0 text-white" style="font-size: 14px">
                تصفح المتاجر واطلب توصيل منتجاتك للمكان الذي ترغب به.  
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="py-5">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h3 class="title text-center mt-3 mb-5">
              قواعد العمل
            </h3>
          </b-col>
          <b-col cols="12" md="6">
            <div class="d-flex p-3 my-4">
              <span class="image-icon text-primary mb-0"><i class="mdi mdi-calendar mdi-48px"></i></span>
              <div class="ml-3">
                <h6 class="title">العمر</h6>
                <p class="m-0 text-justify" style="font-size: 14px">
                  عليك أن تكون قد تجاوزت سن الـ18 وأن تكون حائزاً على رخصة قيادة.
                </p>
              </div>
            </div>
          </b-col>
          <b-col cols="12" md="6">
            <div class="d-flex p-3 my-4">
              <span class="image-icon text-primary mb-0"><i class="mdi mdi-phone mdi-48px"></i></span>
              <div class="ml-3">
                <h6 class="title">الهاتف الجوال</h6>
                <p class="m-0 text-justify" style="font-size: 14px">
                  أنت بحاجة لجهاز أندرويد لتلقي الحجوزات على التطبيق
                </p>
              </div>
            </div>
          </b-col>
          <b-col cols="12" md="6">
            <div class="d-flex p-3 my-4">
              <span class="image-icon text-primary mb-0"><i class="mdi mdi-wallet-membership mdi-48px"></i></span>
              <div class="ml-3">
                <h6 class="title">رخصة القيادة</h6>
                <p class="m-0 text-justify" style="font-size: 14px">
                  يجب امتلاك رخصة قيادة موثقة ومجددة
                </p>
              </div>
            </div>
          </b-col>
          <b-col cols="12" md="6">
            <div class="d-flex p-3 my-4">
              <span class="image-icon text-primary mb-0"><i class="mdi mdi-security mdi-48px"></i></span>
              <div class="ml-3">
                <h6 class="title">لتحقق الأمني</h6>
                <p class="m-0 text-justify" style="font-size: 14px">
                  قد يتضمن ذلك فحوصات المخدرات وتقارير الشرطة وغيرها
                </p>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="py-5" v-if="advertisements.length">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h3 class="title text-center mb-5">
              الإعلانات
            </h3>
          </b-col>
          <b-col cols="12" sm="6" md="4" class="mb-3" v-for="(ad, index) in advertisementsList" :key="index">
            <b-card no-body>
              <b-card-header>
                <h6 class="title m-0">
                  {{ ad.title }}
                </h6>
              </b-card-header>
              <b-card-body class="p-0">
                <!-- <img style="object-fit: cover;" class="w-100" :src="$store.getters.domainHost + ad.documents[0].src" height="160" :alt="ad.documents[0].name"> -->
                <p class="m-3 text-justify">
                  {{ ad.description }}
                </p>
              </b-card-body>
            </b-card>
          </b-col>
          <b-col cols="12 d-flex justify-content-center pt-5">
            <a-pagination :pageLength="3" :items="advertisements" v-model="advertisementsList"></a-pagination>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="py-5">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h3 class="title text-center">
              كيف تبدأ استخدام درافيتا
            </h3>
          </b-col>
          <b-col cols="12">
            <b-tabs class="my-5" pills card vertical>
              <b-tab title="1" active>
                <h5 class="title">تسجيل حساب جديد</h5>
                <b-card-text class="text-justify">
                  املأ طلب تسجيل حساب جديد
                </b-card-text>
              </b-tab>
              <b-tab title="2">
                <h5 class="title">تسجيل الدخول</h5>
                <b-card-text class="text-justify">
                  يمكنك تسجيل الدخول ومتابعة حسابك واخر التحديثات
                </b-card-text>
              </b-tab>
              <b-tab title="3">
                <h5 class="title">اكمل بياناتك</h5>
                <b-card-text class="text-justify">
                  عند تسجيل حساب جديد يجب اكمال بيانتك لتساعد درافيتا على تفعيل حسابك والاستفادة من ميزات المنصة
                </b-card-text>
              </b-tab>
              <b-tab title="4">
                <h5 class="title">استكشاف المحلات التجارية واحجز توصيلتك</h5>
                <b-card-text class="text-justify">
                  تفاعل مع المنصة واطلب توصيلتك عن طريق تطبيق المستخدم
                  وفي حال كنت سائق يمكنك استقبال طلبات التوصيل وزيادة ارباحك
                  في حال كنت صاب متجر يمكنك إعلان عن منتجاتك لمستاعدة عملاك على طلب منتجاتك
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="py-5">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h3 class="title text-center mb-5">
              الأسئلة الأكثر شيوعا
            </h3>
          </b-col>
          <b-col cols="12" md="4" class="text-justify">
            <h5 class="title">
              كيف يمكنني إنشاء حساب؟
            </h5>
            لإنشاء حساب برنامج تشغيل ، تحتاج إلى عنوان بريد إلكتروني ورقم هاتف محمول صالحين. تحميل التطبيق لدائرة
            الرقابة الداخلية الخاصة بك
            أو جهاز الروبوت والاشتراك مع رقم هاتفك المحمول. يمكنك استخدام رقم دولي طالما
            عدد نشط لتلقي الرسائل القصيرة.
            للتأكد من أنه رقمك الحقيقي ، سنرسل لك رمز التحقق عبر الرسائل القصيرة التي تحتاج إلى إدخالها
            سجل. إذا لم تصل الرسائل القصيرة مع الرمز ، يمكنك طلب مكالمة من نفس الشاشة.
            بمجرد التحقق من رقمك ، تكون جاهزا لاستخدام دريفيتا!
          </b-col>
          <b-col cols="12" md="4" class="text-justify">
            <h5 class="title">كيف أصبح سائق؟
            </h5>
            أن تصبح قائدا هو عملية بسيطة من ثلاث خطوات. أولا سوف تحتاج إلى تسجيل مع يقودها
            ملء استمارة الكابتن المتاحة على الموقع. بعد مراجعة طلبك ، سوف ندعوك
            لدورة تدريبية. بمجرد اكتمال التدريب ، يمكنك البدء في ركوب معنا.
          </b-col>
          <b-col cols="12" md="4" class="text-justify">
            <h5 class="title">
              لماذا تقود مع درافيتا؟
            </h5>يكون مدرب الخاصة بك ، وكسب المزيد من المال!
            درايفيتا يمنحك الفرصة للعمل بقدر ما تريد وقتما تشاء.
            تقدم درايفيتا مكافأة غير عادية ، وخطط ضمان ، ومساعدة فورية من قبل مركز الاتصال الخاص بها ، والتأمين على
            الحياة
            أثناء ركوب الخيل.
            ليس ذلك فحسب ، دريفيتا لديها أعلى معدلات أجرة للقباطنة في السوق.
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>
<script>
import heroSvg from "@/assets/vue/hero-svg.vue";
import { isCustomer } from "@core/util/auth";
import { mapGetters, mapActions } from 'vuex';
// ! this just to create fake client
// import { MapHub } from "@/libs/map/map-hub.js";
export default {
  components: {
    heroSvg,
  },
  data: () => ({
    advertisementsList: []
  }),
  computed: {
    ...mapGetters(['advertisements'])
  },
  created() {
    this.getAdvertisements()
    // this.mapHub = new MapHub();
    // const connection = this.mapHub.startSignalR();
    // let rotate = 0
    // const position = {
    //   lat: 36.204,
    //   lng: 37.135,
    // }
    // setInterval(() => {
    //   rotate += 0.1;
    //   if (connection.state == "Connected")
    //     connection.invoke(`SendLocation`, position.lat.toString(), position.lng.toString(), rotate.toString())
    //   position.lat += 0.00002;
    //   position.lng += 0.00002;
    // }, 1000)
  },
  methods: {
    ...mapActions([
      "getAdvertisements"
    ]),
    isCustomer,
  },
  // beforeDestroy() {
  //   this.mapHub.stopSignalR();
  // },
};
</script>
<style scoped lang="scss">
.hero-header {
  min-height: calc(100vh - 56px);
}

.image-icon {
  display: block;
  width: 80px;
  height: 80px;
  margin-bottom: 40px;
}
</style>
