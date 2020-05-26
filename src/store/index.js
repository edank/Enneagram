import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    answers: []
  },
  mutations: {
    set_answer(state, { answerNumber, answerOption }) {
      state.answers[answerNumber] = answerOption;
    },
    reset_answers(state) {
      state.answers = [];
    }
  },
  actions: {
    saveAnswer({ commit }, answerObj) {
      let answerNumber = answerObj.answerNumber;
      let answerOption = answerObj.answerOption;
      commit("set_answer", { answerNumber, answerOption });
      // commit("set_answer", {answerObj.answerNum, answerObj.answerOption});
      // commit("set_answer", answerObj);
    },
    resetAnswers({ commit }) {
      commit("reset_answers");
    }
  },
  getters: {
    // answer: (state, questionNum) => {
    answer: state => questionNum => {
      return state.answers[questionNum];
    },
    answers: state => {
      return state.answers;
    }
  },
  modules: {},
  plugins: [new VuexPersistence().plugin]
});
