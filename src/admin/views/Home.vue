<template>
  <div class="homepage flex flex-row text-cyan-100 h-1/2">
    <div class="px-4 w-1/3">
      <img src="../assets/image/Logo_bank.png" class="w-32 h-32" />
      <div class="flex flex-col h-3/4 justify-center items-center">
        <button @click="handleClick" class="button p-3 rounded-xl">
          <span>Change setting</span>
        </button>
      </div>
    </div>
    <div class="w-3/5 h-1/2">
      <img src="../assets/image/homepage.png" class="w-auto h-auto" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    handleClick: function () {
      this.$router.push("/admin/dashboard")
    },
  },
}
</script>

<style lang="scss" scoped>
.homepage {
  background-image: url(../assets/image/homepage.png);
}

.button {
  border-radius: 10px;
  background-image: linear-gradient(
    to right,
    #2b5876 0%,
    #4e4376 51%,
    #2b5876 100%
  );
  box-shadow: 0 0 20px #eee;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 22px;
  padding: px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
