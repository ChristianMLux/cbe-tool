<template>
  <li data-cy="list-element">
    <div class="question-heading">
      {{ questionTitle }}
      <div class="inner-question-wrapper">
        <span class="who-asked">
          Frage von: <br />
          {{ questionAuthor }}
        </span>
        <span class="question-category">
          Kategorie: <br />
          {{ questionCategory }}
        </span>
        <span class="date">
          Erstellt am:<br />
          {{ questionCreated_at }}
        </span>
      </div>
    </div>
    <div class="question-edit">
      <cbe-main-btn
        id="answer-question-btn"
        buttonClass="secondary"
        v-if="!questionIsDone"
        @click="$emit('answer')"
        >BEANTWORTEN
      </cbe-main-btn>
      <cbe-main-btn
        id="takeback-question-btn"
        buttonClass="secondary"
        v-if="questionIsDone"
        @click="$emit('takebackanswer')"
        >ZURÜCKZIEHEN
      </cbe-main-btn>

      <div class="vote-wrapper">
        <p>Votes: {{ questionUpvotes }}</p>

        <div class="vote-arrows-wrapper">
          <button
            class="vote-button-up"
            :disabled="!isUserAllowedToVote"
            @click="$emit('upvote')"
          >
            <i
              class="fi-rr-angle-up"
              data-cy="vote-arrow"
              v-if="isUserAllowedToVote"
            ></i>
          </button>
          <p v-show="!isUserLoggedIn">Logge dich bitte ein!</p>
          <button
            class="vote-button-down"
            :disabled="isUserAllowedToVote"
            @click="$emit('downvote')"
          >
            <i class="fi-rr-angle-down" v-if="!isUserAllowedToVote"></i>
          </button>
        </div>
      </div>
      <div class="vote-wrapper-small-screen">
        <p>Votes: {{ questionUpvotes }}</p>
        <div class="vote-arrows-wrapper">
          <button
            class="vote-button-up"
            :disabled="!isUserAllowedToVote"
            @click="$emit('upvote')"
          >
            <i class="fi-rr-angle-up" v-if="isUserAllowedToVote"></i>
          </button>
          <button
            class="vote-button-down"
            :disabled="isUserAllowedToVote"
            @click="$emit('downvote')"
          >
            <i class="fi-rr-angle-down" v-if="!isUserAllowedToVote"></i>
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
/**  */
export default {
  name: "QuestionListElement",
  data() {
    return {
      usersVoted: [],
    };
  },
  props: {
    questionKey: {
      type: [String, Number],
    },
    questionTitle: {
      type: String,
    },
    questionDescription: {
      type: String,
    },
    questionCategory: {
      type: String,
    },
    questionIsDone: {
      type: Boolean,
      default: false,
    },
    questionCreated_at: {
      type: [String, Date],
    },
    questionAuthor: {
      type: String,
    },
    questionUpvotes: {
      type: Number,
    },
    usersVotedQuestion: {
      hasVoted: {
        type: Boolean,
      },
      userID: {
        type: [Number, String],
      },
    },
    userVoted: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["upvote", "answer", "downvote", "takebackanswer"],
  computed: {
    buttonText() {
      return this.questionIsDone
        ? this.takebackanswer(this.questionKey)
        : this.questionIsDone;
    },
    isUserAllowedToVote() {
      let b = false;
      this.$store.getters.getUsersVotedQuestion.forEach((vote) => {
        if (
          vote.userID === this.$store.getters.getCurrentUserID &&
          vote.hasVoted === true
        ) {
          b = false;
        } else {
          b = true;
        }
      });
      return b;
    },
    isUserLoggedIn() {
      return this.$store.getters.getUserLoginState === null ? false : true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css");
.vote-wrapper-small-screen {
  display: none;
}
li {
  a {
    color: var(--font-color);
    font-weight: bold;
  }
  margin: 1rem 0rem 1rem 0;
  list-style-type: none;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid var(--primary-color);
  border-radius: 0.25rem;
  .question-heading {
    margin: 0.5rem 2rem 0.5rem 1rem;
    min-width: 50%;
    max-width: 70ch;
  }
  .inner-question-wrapper {
    display: flex;
    flex-flow: row;
    align-items: baseline;
    justify-content: space-between;
    span {
      font-size: 0.85em;
      margin-right: 1rem;
      display: inline;
      text-align: justify;
    }
  }
  div {
    margin-left: 1rem;
    display: flex;
    flex-flow: column;
    text-align: left;
  }
  div > * {
    margin: 0;
    padding: 0;
  }
  .question-title {
    margin: 0;
    padding: 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 550;
    text-decoration: none;
    border-bottom: 0.5px solid var(--primary-color);
  }
  .question-edit {
    flex-flow: column-reverse;
  }
  h3,
  p {
    padding: 0.5rem 0;
  }
  h3 {
    border-bottom: 0.5px solid var(--primary-color);
  }
  button {
    margin: 1rem;
  }
  .vote-wrapper {
    margin: 0.5rem 2rem;
    text-align: center;
    p {
      font-size: 0.9rem;
    }
  }
  .vote-button-up {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    i {
      font-size: 1.7rem;
      color: var(--success-color) !important;
      font-weight: bold !important;
    }
  }
  .vote-button-down {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    i {
      font-size: 1.7rem;
      color: var(--fail-color) !important;
      font-weight: bold !important;
    }
  }
}
@media only screen and (max-width: 814px) {
  li {
    margin: 1rem 0rem 1rem 0;
    min-width: 50%;
    list-style-type: none;
    justify-content: space-between;
    align-items: start;
    border: 0.5px solid var(--secondary-color);
    border-radius: 0.25rem;
    .question-heading {
      margin: 0.5rem 2rem 0.5rem 1rem;
      min-width: 80%;
      max-width: 100%;
    }
    button {
      margin: 0;
    }
    .vote-wrapper {
      display: none;
    }
    .question-edit {
      width: 90%;
      display: flex;
      justify-content: space-between;
      flex-flow: row-reverse;
      margin-bottom: 0.5rem;
      height: 3rem;
    }
    .inner-question-wrapper {
      width: 100%;
    }
    .vote-wrapper-small-screen {
      margin: 0 0 1rem 0;
      display: flex;
      flex-flow: row-reverse;
      align-items: center;
      p {
        margin-left: 0.5rem;
        font-size: 0.9rem;
      }
    }
    .question-heading {
      width: 92%;
    }
  }
}
</style>
