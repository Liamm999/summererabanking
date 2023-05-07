<template>
  <div class="add">
    <div class="navbar">
      <NavbarAdmin />
    </div>
    <div class="px-36 pt-3 max-lg:px-2">
      <Breadcrum :title="component" />
    </div>
    <div class="main w-full flex justify-center mt-5">
      <TableAddAccount />
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
import TableAddAccount from "../components/TableAddAccount.vue"

export default {
  name: "AdminHomepage",
  data() {
    return {
      component: "Add Account",
    }
  },
  methods: {},
  components: { NavbarAdmin, Footer, Breadcrum, TableAddAccount },
}
</script>

<style lang="scss" scoped></style>
