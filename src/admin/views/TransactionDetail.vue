<template>
  <div class="edit">
    <div class="navbar">
      <NavbarAdmin />
    </div>
    <div class="px-36 pt-3 max-lg:px-2">
      <Breadcrum :title="component" :third="navigator" :link="link" />
    </div>
    <div class="main w-full flex justify-center mt-5">
      <TableTransactionDetail />
    </div>

    <div class="footer mt-3 max-lg:m-2">
      <Footer />
    </div>
  </div>
</template>

<script>
import NavbarAdmin from "../components/Navbar/NavbarAdmin.vue"
import Footer from "../components/Footer.vue"
import Breadcrum from "../components/Breadcrum.vue"
import TableTransactionDetail from "../components/TableTransactionDetail.vue"
export default {
  name: "Saving Details",
  data() {
    return {
      component: "Transaction logs",
      navigator: "Details",
      link: "/admin/dashboard/",
    }
  },
  methods: {},
  components: {
    NavbarAdmin,
    Footer,
    Breadcrum,
    TableTransactionDetail,
  },
}
</script>

<style lang="scss" scoped></style>
