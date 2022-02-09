<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Metingen List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(meting, index) in metingen"
          :key="index"
          @click="setActiveMeting(meting, index)"
        >
          {{ meting.BT }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllMetingen">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentMeting">
        <meting-details
          :meting="currentMeting"
          @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br />
        <p>Please click on a Meting...</p>
      </div>
    </div>
  </div>
</template>

<script>
import MetingDataService from "../services/MetingDataService";
import MetingDetails from "./Meting";

export default {
  name: "metingen-list",
  components: { MetingDetails },
  data() {
    return {
      metingen: [],
      currentMeting: null,
      currentIndex: -1
    };
  },
  methods: {
    onDataChange(items) {
      let _metingen = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _metingen.push({
          key: key,
          prismaflipper6m: data.prismaflipper6m,
          bt: data.bt,
          bn: data.bn,
          prismaflipper40cm: data.prismaflipper40cm,
          moeite: data.moeite,
          // published: data.published,
        });
      });

      this.metingen = _metingen;
    },

    refreshList() {
      this.currentMeting = null;
      this.currentIndex = -1;
    },

    setActiveMeting(meting, index) {
      this.currentMeting = meting;
      this.currentIndex = index;
    },

    removeAllMetingen() {
      MetingDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    MetingDataService.getAll().on("value", this.onDataChange);
  },
  beforeUnmount() {
    MetingDataService.getAll().off("value", this.onDataChange);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
