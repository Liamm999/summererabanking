<template>
  <div class="edit">
    <div class="navbar">
      <NavbarAdmin />
    </div>
    <div class="px-36 pt-3 max-lg:px-2">
      <Breadcrum :title="component" :third="navigator" :link="link" />
    </div>
    <div class="main w-full flex justify-center mt-5">
      <TableListSaving :title="phoneNumber" />
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
import TableListSaving from "../components/TableListSaving.vue"
export default {
  name: "Saving Details",
  data() {
    return {
      component: "Saving",
      navigator: "Details",
      phoneNumber: "0982117287",
      link: "/admin/dashboard/",
    }
  },
  methods: {},
  components: { NavbarAdmin, Footer, Breadcrum, TableListSaving },
}
</script>

<style lang="scss" scoped></style>
