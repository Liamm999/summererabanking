<template>
  <div
    id="footer"
    class="flex flex-row justify-center items-center text-cyan-100 pl-6 max-lg:pl-0 mt-1 w-full"
  >
    <div class="lg:hidden max-lg:text-xs flex justify-center items-center">
      <span class="text-center"
        >©2022 Joint Stock Commercial Bank for Investment and Development of
        Vietnam</span
      >
    </div>
    <div class="left flex flex-row max-lg:hidden">
      <div class="leftInfo">
        <font-awesome-icon
          icon="fa-solid fa-headphones "
          class="fa-lg"
          style="color: #ffffff"
        />
        <span class="font-medium text-xs text-white ml-2">Hotline</span>
      </div>
      <div class="leftInfo ml-8">
        <font-awesome-icon
          icon="fa-solid fa-shield"
          style="color: #ffffff"
          class="fa-lg"
        />
        <span class="font-medium text-xs text-white ml-2">Security</span>
      </div>
      <div class="leftInfo ml-8">
        <font-awesome-icon
          icon="fa-regular fa-bookmark"
          style="color: #ffffff"
          class="fa-lg"
        />
        <span class="font-medium text-xs text-white ml-2">FAQs</span>
      </div>
      <div class="leftInfo1 ml-8">
        <font-awesome-icon
          icon="fa-regular fa-circle-question"
          style="color: #ffffff"
          class="fa-lg"
        />
        <span class="guide font-medium text-xs text-white ml-2"
          >User guide</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin",
}
</script>

<style lang="scss" scoped>
@media not all and (min-width: 768px) {
  .right {
    display: none;
  }

  .leftInfo,
  .leftInfo1 {
    margin-right: 3rem;
  }
  .left span {
    margin-top: 0.25rem;
  }
}

@media screen and (max-width: 640px) {
  .leftInfo,
  .leftInfo1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .leftInfo,
  .leftInfo1 span {
    margin-left: 0;
  }
  #id .right {
    display: none;
  }
  .guide {
    font-size: x-small;
  }

  .leftInfo1 {
    width: fit-content;
    margin-left: 9px;
  }

  .left {
    justify-content: space-between;
  }
}
</style>
