<template>
  <a-table title="رسائل الدعم" :items="supports" :columns="columns" no_footer no_select>
  </a-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["supports"]),
  },
  data: () => ({
    columns: [
      {
        label: "اسم المستخدم",
        field: "userName",
      },
      {
        label: "E-mail",
        field: "email",
      },
      {
        label: "رقم الهاتف",
        field: "phoneNumber",
      },
      {
        label: "الوصف",
        field: "description",
      },
    ],
  }),
  created() {
    this.getSupports()
  },
  methods: {
    ...mapActions(["getSupports"]),
  },
};
</script>
