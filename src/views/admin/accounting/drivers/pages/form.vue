<template>
  <b-container>
    <b-row>
      <b-col cols="12" class="d-flex mb-2">
        <a-back :path="'/admin/drivers/' + driverId + '/invoices'" class="mr-2" />
        <b-button size="sm" v-if="!isEdit" :disabled="!dto.deliveryIds.length" @click="submit()" class="px-4 ml-auto"
          variant="primary">{{ $t('ok') }}
        </b-button>
      </b-col>
    </b-row>
    <b-card no-body class="mb-3">
      <b-card-header>
        <h6 class="m-0 title">
          البيانات الاساسية
        </h6>
      </b-card-header>
      <b-card-body class="pb-0">
        <b-row>
          <b-col cols="12" md="6">
            <a-input-text :label="$t('driver.form.name.label')" readonly name="name" :value="userName" />
          </b-col>
          <b-col cols="12" md="6">
            <a-input-text label="تاريخ الإنشاء" readonly name="date" :value="moment(new Date()).format('llll')" />
          </b-col>
          <b-col cols="12">
            <a-input-textarea :readonly="isEdit" label="ملاحظات" name="date" v-model="dto.note" />
          </b-col>
          <b-col cols="12" md="6">
            <a-input-text label="الكلفة الكلية المستحقة من السائق  عن جميع التوصيلات" readonly name="org total"
              :value="total + ' ' + $t('sp')" />
          </b-col>
          <b-col cols="12" md="6">
            <a-input-text label="الكلفة الكلية للفاتورة حسب التوصيلات المختارة" readonly name="total"
              :value="getTotalInvoiceCost() + ' ' + $t('sp')" />
          </b-col>
          <b-col cols="12" md="6">
            <a-input-text label="القيمة الكلية المستحقة من السائق عن التوصبلات المختارة" readonly name="total"
              :value="(getTotalDriverOutstandingValue() > 0 ? getTotalDriverOutstandingValue() : 0) + ' ' + $t('sp')" />
            <a-input-text v-if="getTotalDriverOutstandingValue() < 0" label="القيمة الكلية المستحقة للسائق" readonly
              name="total" :value="(getTotalDriverBenfits() - getTotalDriverOutstandingValue()) + ' ' + $t('sp')" />
          </b-col>
          <b-col cols="12" md="6">
            <a-input-text label="مرابح السائق من التوصيلات المختارة" readonly name="total"
              :value="getTotalDriverBenfits() + ' ' + $t('sp')" />
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-card no-body class="mb-3">
      <b-card-header>
        <h6 class="m-0 title">
          عناصر الفاتورة
        </h6>
      </b-card-header>
      <b-card-body>
        <ul class="list-group">
          <li class="list-group-item p-0 mb-3" v-for="(delivery, index) of deliveries" :key="index">
            <b-card-header class="p-2 d-flex justify-content-between align-items-center">
              <h6 class="m-0 title">
                <strong>اسم الزبون</strong>: {{ delivery.customerName }}
              </h6>
              <span v-if="!isEdit">
                <div class="form-check m-0">
                  <input class="form-check-input" type="checkbox" v-model="dto.deliveryIds" :value="delivery.id"
                    :id="'select' + delivery.id">
                  <label class="form-check-label" style="user-select: none" :for="'select' + delivery.id">
                    تحديد
                  </label>
                </div>
              </span>
            </b-card-header>
            <div class="p-2 pb-0 pt-3">
              <b-row>
                <b-col cols="12" md="6">
                  <div class="mb-2">
                    <strong>اسم السيارة</strong>: {{ delivery.vehicleName }} <br />
                  </div>
                  <div class="mb-2">
                    <strong>المسافة</strong>: {{ delivery.distance }} متر <br />
                  </div>
                  <div class="mb-2">
                    <strong>نسبة السائق</strong>: {{ delivery.rate + '%' }}
                  </div>
                </b-col>
                <b-col cols="12" md="6">
                  <div class="mb-2">
                    <strong>تكلفة الرحلة</strong>: {{ delivery.price + ' ' + $t('sp') }}
                  </div>
                  <div class="mb-2">
                    <strong>القيمة المدفوعة</strong>: {{ delivery.payingValue + ' ' + $t('sp') }} <br />
                  </div>
                  <div class="mb-2">
                    <strong>القيمة المستحقة من السائق</strong>: {{ delivery.payingValue - (delivery.price *
                        delivery.rate / 100) + ' ' + $t('sp')
                    }}
                  </div>
                </b-col>
              </b-row>
            </div>
          </li>
        </ul>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import { nullGuid } from '@core/util/global';
import moment from 'moment';
import { mapActions } from 'vuex';
export default {
  props: {
    id: String,
    driverId: String,
  },
  data: () => ({
    isEdit: false,
    dto: {
      id: nullGuid,
      note: '',
      date: new Date(),
      type: 1,
      deliveryIds: []
    },
    deliveries: [],
    total: 0,
    userName: ''
  }),
  created() {
    this.isEdit = this.id != nullGuid;
    if (this.isEdit)
      this.getDriverOwnerInvoiceById({
        id: this.id,
        callback: ({ data }) => {
          this.deliveries = data.deliveries;
          this.dto.deliveryIds = data.deliveries.map((d) => d.id)
          this.total = data.total;
          this.dto.date = data.date;
          this.dto.note = data.note;
          this.userName = data.deliveries[0].driverName
          this.$store.commit("Set_Main_Loading", false);
        }
      })
    else
      this.fillDriverOwnerInvoice({
        id: this.driverId,
        type: this.dto.type,
        callback: ({ data }) => {
          this.deliveries = data.invoice.deliveries;
          this.total = data.invoice.total
          this.userName = data.userName
          this.$store.commit("Set_Main_Loading", false);
        }
      })
  },
  methods: {
    moment,
    ...mapActions(['fillDriverOwnerInvoice', 'addDriverOwnerInvoice', "getDriverOwnerInvoiceById"]),
    getTotalDriverOutstandingValue() {
      return this.deliveries.filter(d => this.dto.deliveryIds.indexOf(d.id) != -1).reduce((c, n) => {
        return c + (n.payingValue - (n.price * n.rate / 100))
      }, 0)
    },
    getTotalDriverBenfits() {
      return this.deliveries.filter(d => this.dto.deliveryIds.indexOf(d.id) != -1).reduce((c, n) => {
        return c + (n.price * n.rate / 100)
      }, 0)
    },
    getTotalInvoiceCost() {
      return this.deliveries.filter(d => this.dto.deliveryIds.indexOf(d.id) != -1).reduce((c, n) => {
        return c + n.price
      }, 0)
    },
    submit() {
      this.addDriverOwnerInvoice({
        dto: {
          id: nullGuid,
          date: new Date(),
          note: this.dto.note,
          type: this.dto.type,
          userId: this.driverId,
          total: this.getTotalDriverOutstandingValue(),
          deliveryIds: this.dto.deliveryIds
        },
        callback: this.reset
      })
    },
    reset() {
      Object.assign(this.dto, {
        id: nullGuid,
        note: '',
        total: 0,
        date: new Date(),
        type: this.dto.type,
        deliveryIds: []
      })
      this.fillDriverOwnerInvoice({
        id: this.driverId,
        type: this.dto.type,
        callback: ({ data }) => {
          this.deliveries = data.invoice.deliveries;
          this.total = data.invoice.total
          this.userName = data.userName
          this.$store.commit("Set_Main_Loading", false);
        }
      })
    }
  }
}
</script>