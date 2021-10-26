<template>
  <section>
    <div v-show="userValidation" class="wrapper">
      <div class="wrapper-question-title">
        <input
          type="text"
          id="question-title"
          v-bind:class="titleBorderColor"
          name="question-title"
          v-model="currentQuestion.questionTitle"
          maxlength="150"
          data-cy="input-text-title"
        />
        <label for="question-title" v-bind:class="titleSize"
          >Titel der Frage</label
        >
        <p class="char-counter-short">
          {{ 150 - currentQuestion.questionTitle.length }}/150
        </p>
      </div>
      <RadioButton @getCategory="setNewCategory" />
      <div class="wrapper-question-description">
        <textarea
          id="question-description"
          v-bind:class="descriptionBorderColor"
          name="question-description"
          v-model="currentQuestion.questionDescription"
          maxlength="5000"
          data-cy="input-text-description"
          cols="30"
          rows="10"
        ></textarea>
        <label for="question-description" v-bind:class="descriptionSize"
          >Beschreibung der Frage</label
        >
        <p class="char-counter">
          {{ 5000 - currentQuestion.questionDescription.length }}/5000
        </p>
      </div>
      <div
        id="question-preview"
        class="question-preview"
        name="question-preview"
        placeholder="Bitte beschreibe deine Frage genauer."
        v-show="togglePreview"
        data-cy="question-preview"
      >
        <Markdown
          :source="currentQuestion.questionDescription"
          text-align:
          left
        />
      </div>

      <div class="wrapper-btn-row">
        <cbe-main-btn
          id="preview-question-btn"
          buttonClass="primary"
          @click="showPreview"
          data-cy="preview-button"
          >{{ buttonText }}
        </cbe-main-btn>

        <div class="empty-flex-item"></div>

        <cbe-main-btn
          id="cancel-question-btn"
          buttonClass="primary"
          @click="resetInput"
          >ABBRECHEN
        </cbe-main-btn>

        <cbe-main-btn
          id="send-question-btn"
          class="margin-left"
          buttonClass="secondary"
          data-cy="send-button"
          @click="initQuestions"
          >SENDEN
        </cbe-main-btn>
      </div>
      <div
        id="question-validation"
        class="question-validation no-valid-feedback"
        name="question-validation"
        v-show="validation === false"
      >
        <label>Fehlerhafte Angaben:</label>
        <p v-show="!this.validTitle">
          Der Titel benötigt mindestens 10 Zeichen und drei Wörter
        </p>
        <p v-show="!this.validDescription">
          Die Beschreibung benötigt mindestens 10 Zeichen und drei Wörter
        </p>
        <p v-show="!this.validCategory">Es wurde keine Kategorie gewählt</p>
      </div>
      <div
        id="question-validation"
        class="question-validation valid-feedback"
        name="question-validation"
        v-show="validation === true"
      >
        <label>Deine Frage wurde erfolgreich gesendet!</label>
      </div>
    </div>
  </section>
</template>

<script>
import Markdown from "vue3-markdown-it";
import "highlight.js/styles/github.css";
import firestore from "@/firestore";
import {
  collection,
  addDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";

import RadioButton from "./RadioButton.vue";
export default {
  name: "AskQuestion",
  components: {
    RadioButton,
    Markdown,
  },
  data() {
    return {
      disabled: 0,
      validTitle: true,
      validDescription: true,
      validCategory: true,
      validUser: this.userValidation,
      validation: "",
      currentQuestion: {
        questionTitle: "",
        questionDescription: "",
        questionCategory: "Keine Kategorie",
        questionIsDone: false,
        questionCreated_at: new Date(),
        questionAuthor: "Kein*e Autor*in",
        questionAuthorID: "",
        questionUpvotes: 0,
        usersVotedQuestion: ["0"],
      },
      previewIsVisible: false,
      text: "Vorschau einblenden",
      questionArray: [],
    };
  },
  mounted() {
    document.title = "AMA-Frage stellen";
  },
  methods: {
    async addQuestionToUser(question) {
      const studentRef = doc(
        firestore,
        "all-users",
        this.$store.getters.getCurrentUserID
      );
      await updateDoc(studentRef, {
        studentQuestions: arrayUnion(question),
      });
    },
    validateQuestion() {
      if (
        this.currentQuestion.questionTitle.length < 10 ||
        this.countWords(this.currentQuestion.questionTitle) < 2
      ) {
        this.validTitle = false;
      } else this.validTitle = true;
      if (
        this.currentQuestion.questionDescription.length < 10 ||
        this.countWords(this.currentQuestion.questionDescription) < 2
      ) {
        this.validDescription = false;
      } else this.validDescription = true;
      if (this.currentQuestion.questionCategory === "Keine Kategorie") {
        this.validCategory = false;
      } else this.validCategory = true;

      if (!this.validTitle || !this.validDescription || !this.validCategory) {
        this.validation = false;
        return false;
      } else {
        this.validation = true;
        return true;
      }
    },
    initQuestions() {
      firestore;
      // initiated with send-button. questionToList will be new stringify-Entry and will be pushed in array - later new DB-entry.
      // todo: check min-length of title/description?
      // afterwards delete this.title, this.description. Later on have to check all the attributes.
      let validation = this.validateQuestion();
      if (validation) {
        let fullDate = new Date();
        let month = fullDate.getMonth() + 1;
        let day = fullDate.getDate();
        let year = fullDate.getFullYear();
        this.questionCreated_at = `${day}.${month}.${year}`;
        this.questionAuthor = this.$store.getters.getCurrentUserScreenname;
        this.questionAuthorID = this.$store.getters.getCurrentUserID;
        const questionToList = {
          questionTitle: this.currentQuestion.questionTitle,
          questionDescription: this.currentQuestion.questionDescription,
          questionCategory: this.currentQuestion.questionCategory,
          questionIsDone: this.currentQuestion.questionIsDone,
          questionCreated_at: this.questionCreated_at,
          questionAuthor: this.questionAuthor,
          questionAuthorID: this.questionAuthorID,
          questionUpvotes: this.currentQuestion.questionUpvotes,
          usersVotedQuestion: this.currentQuestion.usersVotedQuestion,
        };
        this.questionArray.push(questionToList);
        // creates database entry with given questionToList
        addDoc(collection(firestore, "ama-questions"), {
          ...questionToList,
        });
        this.addQuestionToUser(questionToList);
        this.$store.dispatch("updateAllQuestions");
        this.currentQuestion.questionTitle = "";
        this.currentQuestion.questionDescription = "";
      } else {
        // not validat message
      }
    },
    countWords(text) {
      let count = 0;
      for (let i = 0; i < text.length; i++) {
        if (" " === text.charAt(i)) {
          count++;
        }
      }
      return count;
    },
    resetInput() {
      // resets the written values (Todo: re-routing; Reset more values?!)
      this.currentQuestion.questionDescription = "";
      this.currentQuestion.questionTitle = "";
      this.validation = "";
      this.validTitle = true;
      this.validDescription = true;
    },
    showPreview() {
      if (this.currentQuestion.questionDescription.length > 0) {
        this.previewIsVisible = !this.previewIsVisible;
        this.previewIsVisible === true
          ? (this.text = "Vorschau ausblenden")
          : (this.text = "Vorschau einblenden");
      }
    },
    setNewCategory(result) {
      this.currentQuestion.questionCategory = result;
    },
  },
  computed: {
    titleSize() {
      return this.currentQuestion.questionTitle.length === 0
        ? "label-title"
        : "small-label-title";
    },
    titleBorderColor() {
      return this.validTitle ? "question-title" : "question-title red-border";
    },
    descriptionSize() {
      return this.currentQuestion.questionDescription.length === 0
        ? "label-description"
        : "small-label-title";
    },
    descriptionBorderColor() {
      return this.validDescription
        ? "question-description"
        : "question-description red-border";
    },

    userValidation() {
      return this.$store.getters.getUserLoginState === null ? false : true;
    },

    togglePreview() {
      if (
        this.currentQuestion.questionDescription.length === 0 &&
        this.previewIsVisible === true
      ) {
        return !this.previewIsVisible;
      } else {
        return this.previewIsVisible;
      }
    },

    buttonText() {
      return this.togglePreview === true
        ? "VORSCHAU AUSBLENDEN"
        : "VORSCHAU EINBLENDEN";
    },
  },
};
</script>

<style scoped>
/* -------- Styling of the input field and textarea -------- */
textarea {
  resize: none;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrapper-no-user {
  margin: 0 2rem;
}
.question-title,
.question-description,
.question-preview,
.question-validation {
  border: 0.5px solid var(--font-color);
  border-radius: 0.25rem;
  padding: 0.8rem 4rem 0.3rem 0.3rem;
  margin: 0.5rem;
  line-height: 1.5rem;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  width: 60vw;
  min-width: 27rem;
  max-width: 40rem;
  text-align: left;
  cursor: text;
}

.red-border {
  border: 0.5px solid var(--fail-color);
}

.wrapper-question-title,
.wrapper-question-description {
  position: relative;
}
.label-title {
  position: absolute;
  transition: 0.3s;
  top: 50%;
  left: 0.95rem;
  transform: translateY(-50%);
  color: var(--placeholder-color);
}
.small-label-title {
  position: absolute;
  top: 20px;
  transition: 0.3s;
  left: 0.95rem;
  font-size: 0.6rem;
  transform: translateY(-50%);
  color: var(--font-color);
}
.label-description {
  position: absolute;
  transition: 0.3s;
  top: 10%;
  left: 0.95rem;
  transform: translateY(-50%);
  color: var(--placeholder-color);
}
.question-title:focus + label,
.question-description:focus + label {
  font-size: 0.6rem;
  transition: 0.3s;
  top: 20px;
  color: var(--font-color);
}
.question-title:focus,
.question-description:focus {
  outline: none;
  border: 0.5px solid var(--success-color);
}
.char-counter-short {
  position: absolute;
  transform: translateY(-190%);
  right: 1.4rem;
  font-size: 0.7rem;
  color: var(--placeholder-color);
}
.char-counter {
  position: absolute;
  transform: translateY(-230%);
  right: 1.4rem;
  font-size: 0.7rem;
  color: var(--placeholder-color);
}

.no-valid-feedback {
  color: var(--fail-color);
}

.valid-feedback {
  color: var(--success-color);
  text-align: center;
}

/* -------- Styling of the buttons -------- */
.wrapper-btn-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 60vw;
  min-width: 27rem;
  max-width: 40rem;
}

.empty-flex-item {
  flex-grow: 2;
}
.margin-left {
  margin-left: 1rem;
}

.no-user-view {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
}

.no-valid-user {
  margin-left: 1rem;
  color: var(--font-color);
}

@media screen and (max-width: 720px) {
  .wrapper {
    align-items: flex-start;
  }

  .question-title,
  .question-description,
  .question-preview,
  .question-validation {
    min-width: 16rem;
    width: 82vw;
    margin-left: 1rem;
  }
  .label-description {
    left: 1.3rem;
  }
  .label-title {
    left: 1.3rem;
  }

  .wrapper-btn-row {
    min-width: 16rem;
    width: 82vw;
    margin-left: 1rem;
  }
}

@media screen and (max-width: 555px) {
  .wrapper {
    margin-right: 0.5rem;
  }
}
</style>
