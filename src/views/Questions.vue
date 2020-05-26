<template>
  <div class="questions">
    <h1>Find your Enneagram Number</h1>

    <p>
      {{ answers }}
    </p>

    <div class="questionare">
      <div class="question">
        <h3>Question {{ currentQuestionNumber + 1 }}</h3>

        <input
          type="radio"
          id="one"
          :value="currentQuestion.v1"
          v-model="currentAnswer"
        />
        <label for="one"
          >{{ currentQuestion.o1 }}({{ currentQuestion.v1 }})</label
        >
        <br />
        <input
          type="radio"
          id="two"
          :value="currentQuestion.v2"
          v-model="currentAnswer"
        />
        <label for="two"
          >{{ currentQuestion.o2 }}({{ currentQuestion.v2 }})</label
        >
        <br />
        <span>Picked: {{ currentAnswer }}</span>

        <div>
          <button @click="prevQuestion()" v-if="currentQuestionNumber > 0">
            Prev
          </button>
          <button
            @click="nextQuestion()"
            v-if="
              currentAnswer > 0 && currentQuestionNumber < questions.length - 1
            "
          >
            Next
          </button>
          <button
            @click="submit()"
            v-if="currentQuestionNumber == questions.length - 1"
          >
            Finish
          </button>
        </div>
      </div>
    </div>

    <br />
    <br />
    <br />
    <br />
    <br />
    <button @click="reset" class="mt-5">Reset Questions</button>
  </div>
</template>

<script>
// import questionsSrc from "../assets/questions";
import questionsSrc from "../assets/questions-short";
import store from "../store/index";
import { mapGetters } from "vuex";

export default {
  name: "Questions",
  data: function() {
    return {
      questions: questionsSrc,
      currentQuestionNumber: 0,
      currentAnswer: 0
    };
  },
  computed: {
    ...mapGetters(["answer", "answers"]),
    currentQuestion: function() {
      return this.questions[this.currentQuestionNumber];
    }
  },
  methods: {
    nextQuestion: function() {
      // Save answer
      // this.saveAnswer();

      // Change question to next one
      if (this.currentQuestionNumber < this.questions.length - 1) {
        this.currentQuestionNumber++;
      }
    },
    prevQuestion: function() {
      // this.saveAnswer();

      if (this.currentQuestionNumber > 0) {
        this.currentQuestionNumber--;
      }
    },
    setLastAnsweredQuestion: function() {
      // count answers
      let answersCount = this.answers.length;

      if (answersCount > 0) {
        //set last answered question
        this.currentQuestionNumber = answersCount - 1;

        //set last answered question's answer
        this.setAnswer();
      }
    },
    setAnswer: function() {
      this.currentAnswer = this.answer(this.currentQuestionNumber);
    },
    saveAnswer: function() {
      let ansObj = {
        answerNumber: this.currentQuestionNumber,
        answerOption: this.currentAnswer
      };
      store.dispatch("saveAnswer", ansObj);
    },
    submit: function() {
      this.$router.push("result");
    },
    reset: function() {
      this.currentQuestionNumber = 0;
      store.dispatch("resetAnswers");
    }
  },
  watch: {
    currentQuestionNumber: function() {
      //update answer
      this.setAnswer();
    },
    currentAnswer: function(newVal) {
      if (newVal) {
        this.saveAnswer();
      }
    }
  },
  created: function() {
    // Show last answered question on page load
    this.setLastAnsweredQuestion();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
