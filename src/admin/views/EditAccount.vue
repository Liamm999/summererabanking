<template>
  <div class="edit">
    <div class="navbar">
      <NavbarAdmin />
    </div>
    <div class="px-36 pt-3 max-lg:px-2">
      <Breadcrum :title="component" />
    </div>
    <div class="main w-full flex justify-center mt-5">
      <TableEditAccount />
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
import TableEditAccount from "../components/TableEditAccount.vue"
export default {
  name: "Edit account",
  data() {
    return {
      component: "Edit Account",
    }
  },
  methods: {},
  components: { NavbarAdmin, Footer, Breadcrum, TableEditAccount },
}
</script>

<style lang="scss" scoped></style>
