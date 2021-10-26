<template>
  <section class="sp__profile-section">
    <h2 class="mobile-heading">Your Profile</h2>
    <div class="sp__profile-wrapper">
      <div class="sp__student-info-wrapper">
        <p class="sp__student-name">
          {{ this.$store.getters.getspUser.gitDisplayName }}
        </p>
        <a :href="this.$store.getters.getspUser.gitURL">GitHub Profile</a>
        <span class="sp__issue-count"
          >Open Issues: {{ this.$store.getters.getspUser.userIssues }}</span
        >
      </div>
      <div class="button-wrapper">
        <div class="lp__link-wrapper">
          <router-link class="lp__entry-link" to="/learnprogress"
            >Erstelle Lernfortschritt-Eintrag
            <i class="fas fa-chalkboard-teacher"></i
          ></router-link>
        </div>
        <cbe-main-btn
          id="showAmaBtn"
          class="margin-left hidebtn"
          buttonClass="secondary"
          @click="showQuestions"
          >{{ questionBtnText }}
        </cbe-main-btn>
        <cbe-main-btn
          id="showRotiBtn"
          class="margin-left hidebtn"
          buttonClass="secondary"
          @click="showRotis"
          >{{ rotiBtnText }}
        </cbe-main-btn>
      </div>
      <ul class="list sp__student-question-list" v-if="questionsShown">
        <legend>AMA - Questions</legend>
        <li
          v-for="question in this.$store.getters.getUserQuestions"
          :key="question.key"
          v-bind="question"
        >
          <div class="question-heading">
            <p class="question-title">{{ question.data.questionTitle }}</p>
            <p class="question-cat">
              Kategorie: {{ question.data.questionCategory }}
            </p>
            <p class="question-date">{{ question.data.questionCreated_at }}</p>
          </div>
          <p class="question-description">
            {{ question.data.questionDescription }}
          </p>
        </li>
      </ul>

      <ul class="list sp__student-roti-list" v-if="rotisShown">
        <legend>Roti-Liste</legend>
        <li
          class="roti-list-entry"
          v-for="roti in this.$store.getters.getUserRotis"
          :key="roti.key"
          v-bind="roti"
        >
          <p class="roti-rating">{{ roti.rotiRating }}</p>
          <p class="roti-message">{{ roti.rotiMessage }}</p>
          <p class="roti-date">{{ roti.rotiDate }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  name: "SPStudentProfile",
  data() {
    return {
      userID: this.$route.params.studentKey,
      questionsShown: false,
      questionBtnTxtShow: "Zeige Fragen",
      questionBtnTxtHide: "Verstecke Fragen",
      rotisShown: false,
      rotisBtnTxtShow: "Zeige Rotis",
      rotisBtnTxtHide: "Verstecke Rotis",
    };
  },
  computed: {
    questionBtnText() {
      return this.questionsShown
        ? this.questionBtnTxtHide
        : this.questionBtnTxtShow;
    },
    rotiBtnText() {
      return this.rotisShown ? this.rotisBtnTxtHide : this.rotisBtnTxtShow;
    },
  },
  methods: {
    showQuestions() {
      this.questionsShown = !this.questionsShown;
    },
    showRotis() {
      this.rotisShown = !this.rotisShown;
    },
  },
  async created() {
    await this.$store.dispatch("setUserRotis", this.$route.params.studentKey);
    await this.$store.dispatch(
      "setUserQuestions",
      this.$route.params.studentKey
    );
    await this.$store.dispatch("setspUser", this.$route.params.studentKey);
  },
};
</script>
<style lang="scss" scoped>
.sp__profile-section {
  margin: 0 4rem 0 2.5rem;
}
.sp__student-info-wrapper {
  margin: 1rem 0;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-flow: row;
  align-items: baseline;
  border: 1px solid var(--secondary-color);
  border-radius: 0.25rem;
}
.lp__entry-link {
  color: var(--background-color);
  font-weight: bold;
  background-color: var(--primary-color);
  border: 2.5px solid transparent;
  border-radius: 0.25rem;
  padding: 1.17rem 0.7rem;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  line-height: 1.5rem;
}
.button-wrapper {
  display: grid;
  grid-template-columns: 60% 20% 20%;
}
.lp__link-wrapper {
  place-self: center;
  a {
    color: var(--background-color);
    text-decoration: none;
  }
  i {
    color: var(--background-color);
  }
}
.list {
  border-radius: 0.25rem;
  padding: 0;
  list-style-type: none;
  display: grid;
  gap: 1.5rem;
  p {
    margin-bottom: 0;
  }
}
li {
  border-top: 0.5px solid var(--primary-color);
}
.list > li:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.list > li:last-child {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.list > li:nth-child(1n + 1) {
  background: var(--background-color);
  div {
    border-bottom: 0.5px dotted var(--secondary-color);
    background: whitesmoke;
  }
}
.list > li:nth-child(2n + 2) {
  background: whitesmoke;
  div {
    border-bottom: 0.5px dotted var(--secondary-color);
    background: var(--background-color);
  }
}

.roti-list-entry {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding: 0.5rem;
}
.roti-message {
  flex-grow: 1;
  padding-left: 1rem;
  text-align: left;
}

.question-heading {
  display: flex;
  justify-content: space-between;
  flex-flow: row;
}
.question-title {
  flex-grow: 1;
  text-align: left;
  padding-left: 1rem;
  font-weight: bold;
}
.question-cat {
  padding-right: 2rem;
}
.question-date {
  padding-right: 0.5rem;
}
.question-description {
  line-height: 1.5rem;
  text-align: justify;
  padding-left: 1rem;
  padding-bottom: 1rem;
}

.hidebtn {
  margin: 1rem;
}
@media screen and (max-width: 720px) {
  .lp__entry-link {
    padding: 0.65rem 0.7rem;
  }
}
@media screen and (max-width: 650px) {
  .button-wrapper {
    grid-template-columns: 80vw;
  }
  .lp__entry-link {
    font-size: 0.7em;
  }
}
@media screen and (max-width: 555px) {
  .sp__student-info-wrapper {
    display: grid;
    max-width: 95%;
    grid-template-columns: 100%;
    gap: 1rem;
    text-align: left;
  }
  .sp__student-name {
    width: 100%;
  }
  .sp__profile-section {
    margin: 0;
    padding: 0.5rem;
    padding-top: 0;
  }
  .lp__entry-link {
    margin: 0;
  }
  .list {
    max-width: 95%;
  }
  .question-title {
    padding: 0.25rem;
    padding-top: 0;
    text-align: left;
  }
  .question-date,
  .question-cat,
  .question-description {
    padding: 0.25rem;
  }
}
</style>
