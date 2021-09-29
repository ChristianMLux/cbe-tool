<template>
  <section class="question-list" id="questionList">
    <div class="user-options">
      <div class="filter-options">
        <div class="single-filter-wrapper">
          <input
            type="radio"
            v-model="questionFilterStatus"
            name="filter"
            id="filterAll"
            value="All"
            data-cy="input-radio-all"
          />
          <label for="filterAll">Alle Fragen</label>
        </div>
        <div class="single-filter-wrapper">
          <input
            type="radio"
            v-model="questionFilterStatus"
            name="filter"
            id="filterOpen"
            value="false"
            data-cy="input-radio-open"
          />
          <label for="filterOpen">Offene Fragen</label>
        </div>
        <div class="single-filter-wrapper">
          <input
            type="radio"
            v-model="questionFilterStatus"
            name="filter"
            id="filterClosed"
            value="true"
            data-cy="input-radio-closed"
          /><label for="filterClosed">Beantwortete Fragen</label>
        </div>
      </div>
    </div>
    <div class="question-list-wrapper">
      <ol id="questions">
        <QuestionListElement
          v-for="question in this.$store.getters.getAllQuestions"
          :key="question.questionKey"
          :questionTitle="question.questionData.questionTitle"
          :questionAuthor="question.questionData.questionAuthor"
          :questionCategory="question.questionData.questionCategory"
          :questionCreated_at="question.questionData.questionCreated_at"
          :questionUpvotes="question.questionData.questionUpvotes"
          :questionIsDone="question.questionData.questionIsDone"
          v-bind="question"
          @upvote="voteQuestion(question.questionKey, getUserID())"
          @answer="answerQuestion(question.questionKey)"
          @takebackanswer="takebackanswer(question.questionKey)"
          @downvote="downVote(question.questionKey, getUserID())"
        />
      </ol>
    </div>
  </section>
</template>

<script>
import QuestionListElement from "./QuestionListElement.vue";

import firestore from "@/firestore";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";

export default {
  name: "QuestionList",
  props: ["question"],
  el: "#questionList",
  components: {
    QuestionListElement,
  },
  data() {
    return {
      questionsDOM: [],
      usersVotedQuestionDOM: [],
      watchedQuestion: null,
      questionFilterStatus: "All",
      storageKeyUserID: "userID",
      storageKeyVoteStatus: "voteStatus",
      userID: this.$store.getters.getCurrentUserID,
    };
  },
  watch: {
    question: function (question) {
      this.watchedQuestion = { ...question };
    },
  },
  methods: {
    async getAllQuestions() {
      const querySnapshot = await getDocs(
        collection(firestore, "ama-questions")
      );
      querySnapshot.forEach((doc) => {
        this.questionsDOM.push({
          questionKey: doc.id,
          questionData: doc.data(),
        });
      });
      this.$store.commit({
        type: "setAllQuestions",
        allQuestions: this.questionsDOM,
      });
    },
    async initUsersVotedQuestion() {
      const querySnapshot = await getDocs(
        collection(firestore, "ama-questions")
      );
      querySnapshot.forEach((doc) => {
        this.usersVotedQuestionDOM.push(doc.data().usersVotedQuestion);
      });
      console.log(this.usersVotedQuestionDOM);
      this.$store.commit({
        type: "setUsersVotedQuestion",
        vote: this.usersVotedQuestionDOM,
      });
    },
    /**
     * On each Datachange, update the questionsDOM Array with new Data
     */
    onDataChange(changedQuestions) {
      let _questions = [];
      changedQuestions.forEach((changedQuestion) => {
        let questionKey = changedQuestion.key;
        let changedData = changedQuestion.val();
        _questions.push({
          questionKey: questionKey,
          ...changedData,
        });
      });
      this.questionsDOM = _questions;
      this.questionsDOM = this.questionsDOM.slice(0).sort(this.compareVotes);
    },

    getUserID() {
      if (this.$store.getters.getUserLoginState === true) {
        return this.$store.getters.getCurrentUserID;
      }
    },
    async createUsersVotedArray(questionKey) {
      const querySnapshot = await getDocs(
        collection(firestore, "ama-questions")
      );
      querySnapshot.forEach((doc) => {
        if (doc.id === questionKey) {
          this.usersVotedQuestionDOM.push(...doc.data().usersVotedQuestion);
          this.$store.commit({
            type: "setUsersVotedQuestion",
            vote: this.usersVotedQuestionDOM,
          });
        }
      });
      this.$store.dispatch("updateAllQuestions");
    },

    isUserAllowedToVote(userIDInc) {
      const voterFound = this.$store.getters.getUsersVotedQuestion.find(
        (vote) => {
          vote.userID === userIDInc && vote.hasVoted === true;
        }
      );
      if (voterFound === undefined) {
        return true; // darf wählen
      } else {
        return false; // darf nicht wählen
      }
    },

    async voteQuestion(questionKey, userIDInc) {
      await this.createUsersVotedArray(questionKey);
      if (this.isUserAllowedToVote(userIDInc) === true) {
        const questionRef = doc(firestore, "ama-questions", questionKey);
        updateDoc(questionRef, {
          usersVotedQuestion: arrayUnion({
            hasVoted: true,
            userID: userIDInc,
          }),
        });

        const docRef = doc(firestore, "ama-questions", questionKey);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const voteRef = doc(firestore, "ama-questions", questionKey);
            updateDoc(voteRef, {
              questionUpvotes: docSnap.data().questionUpvotes + 1,
            });
            console.log("Document data:", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });
      }
      this.$store.dispatch("updateAllQuestions");
    },
    /*
    Wenn der user votet, kommt er ins array. wenn er auf dem array ist, darf er nicht voten
    wenn er nicht voten darf, wird der knopf rot. wenn man auf den knopf drückt, 
    darf man wieder voten.
    die anzahl der votes = usersVoted.length
    
    
    */
    downVote(questionKey, userIDInc) {
      this.createUsersVotedArray(questionKey);
      const questionRef = doc(firestore, "ama-questions", questionKey);
      updateDoc(questionRef, {
        usersVotedQuestion: arrayUnion({
          hasVoted: false,
          userID: userIDInc,
        }),
      });
      const docRef = doc(firestore, "ama-questions", questionKey);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const voteRef = doc(firestore, "ama-questions", questionKey);
          updateDoc(voteRef, {
            questionUpvotes: docSnap.data().questionUpvotes - 1,
          });
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
      this.$store.dispatch("updateAllQuestions");
    },

    async answerQuestion(questionKey) {
      const questionRef = doc(firestore, "ama-questions", questionKey);
      await updateDoc(questionRef, {
        questionIsDone: true,
      });
      this.$store.dispatch("updateAllQuestions");
    },

    async takebackanswer(questionKey) {
      const questionRef = doc(firestore, "ama-questions", questionKey);
      await updateDoc(questionRef, {
        questionIsDone: false,
      });
      this.$store.dispatch("updateAllQuestions");
    },
    compareVotes(a, b) {
      if (a.questionUpvotes > b.questionUpvotes) return -1;
      if (a.questionUpvotes < b.questionUpvotes) return 1;
      return 0;
    },
  },
  computed: {
    filteredQuestions: function () {
      let questionFilterStatus = this.questionFilterStatus;
      if (questionFilterStatus === "All") {
        return this.$store.getters.getAllQuestions;
      } else if (questionFilterStatus === "false") {
        return this.$store.getters.getAllQuestions.filter((question) => {
          return question.questionIsDone === false;
        });
      } else {
        return this.$store.getters.getAllQuestions.filter((question) => {
          return question.questionIsDone === true;
        });
      }
    },
  },
  async created() {
    await this.$store.dispatch("setAllQuestions");
    await this.initUsersVotedQuestion();
    document.title = "AMA-Fragenliste";
  },
};
</script>
<style lang="scss" scoped>
ol {
  all: unset;
}
ol > li {
  display: flex;
}
.filter-options {
  display: flex;
  flex-flow: row;
  align-items: flex-start;
  padding-left: 2rem;
  label {
    margin-right: 1rem;
  }
}
.question-list-wrapper {
  margin: 0 4rem 0 2.5rem;
}
@media only screen and (max-width: 814px) {
  .question-list-wrapper {
    margin: 0 2rem 0 2.5rem;
  }

  ol > li {
    display: flex;
    flex-flow: column;
  }
  .filter-options {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
  }
}
@media only screen and (max-width: 600px) {
  .question-list-wrapper {
    margin: 0 2rem 0 1rem;
  }
  .filter-options {
    padding: 0;
    margin: 0 1rem;
  }
}
</style>
