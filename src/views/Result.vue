<template>
  <div class="questions">
    <h1>Your Enneagram Test Result:</h1>

    <p>
      {{ answers }} <br />
      {{ results }}<br />

      <h2>Your Enneagram is most likely: {{results[0].questionNo}}</h2>
      
      <h3>Second most likely Enneagram number is: {{results[1].questionNo}}</h3>
      
      <div class="results">
        <h4>Following is the list of all Enneagram numbers by descending order of likelihood:<br>
          <small>(Numbers in parentheses represent the number of answers associated with each Enneagram numbers)</small></h4>
        
        <p v-for="(res, index) in results" >{{res.questionNo}} <small>({{res.count}})</small></p>
      </div>
    </p>
  </div>
</template>

<script>
import store from "../store/index";
import { mapGetters } from "vuex";

//

export default {
  name: "Result",
  data: function() {
    return {
      results: []
    };
  },
  computed: {
    ...mapGetters(["answers"])
  },
  methods: {
    calculateResults: function() {
      let countArr = [];

      // add up answers
      for (let i = 0; i < this.answers.length; i++) {
        let val = this.answers[i];
        countArr[val] = !!countArr[val] ? countArr[val] + 1 : 1;
      }
      console.log(countArr);
      //assign in objects
      for (let i = 1; i <= 9; i++) {
        if (countArr[i]) {
          this.results.push({ questionNo: i, count: countArr[i] });
        }
      }

      this.results = this.results.sort(function(a, b) {
        return b.count - a.count;
      });
    }
  },
  watch: {},
  created: function() {
    this.calculateResults();
  }
};
</script>

<style scoped lang="scss">
.results {
  h4 small {
    font-weight: 400;
  }
}
</style>
