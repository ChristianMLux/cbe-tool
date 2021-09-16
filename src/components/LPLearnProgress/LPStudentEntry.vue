<template>
  <section class="lp__entry-section">
    <form class="lp__entry-form">
      <div class="lp__fieldset-wrapper">
        <LPRatingFieldset
          lpLegend="Bewerte deinen allgemeinen Lernfortschritt"
          lp__labelGroupName="generalProgress"
          lp__idOne="generalProgressOne"
          lp__idTwo="generalProgressTwo"
          lp__idThree="generalProgressThree"
          lp__idFour="generalProgressFour"
          lp__idFive="generalProgressFive"
          lp__idSix="generalProgressSix"
          lp__idSeven="generalProgressSeven"
          lp__idEight="generalProgressEight"
          lp__idNine="generalProgressNine"
          lp__idTen="generalProgressTen"
          lp__messageID="generalProgressMessage"
          lp__vModelGroupName="generalProgress"
        />
        <LPRatingFieldset
          lpLegend="Wie fit und wohl fühlst du dich in HTML?"
          lp__labelGroupName="lp__html-progress"
          lp__idOne="htmlProgressOne"
          lp__idTwo="htmlProgressTwo"
          lp__idThree="htmlProgressThree"
          lp__idFour="htmlProgressFour"
          lp__idFive="htmlProgressFive"
          lp__idSix="htmlProgressSix"
          lp__idSeven="htmlProgressSeven"
          lp__idEight="htmlProgressEight"
          lp__idNine="htmlProgressNine"
          lp__idTen="htmlProgressTen"
          lp__messageID="htmlProgressMessage"
        />
        <LPRatingFieldset
          lpLegend="Wie fit und wohl fühlst du dich in CSS?"
          lp__labelGroupName="lp__css-progress"
          lp__idOne="cssProgressOne"
          lp__idTwo="cssProgressTwo"
          lp__idThree="cssProgressThree"
          lp__idFour="cssProgressFour"
          lp__idFive="cssProgressFive"
          lp__idSix="cssProgressSix"
          lp__idSeven="cssProgressSeven"
          lp__idEight="cssProgressEight"
          lp__idNine="cssProgressNine"
          lp__idTen="cssProgressTen"
          lp__messageID="cssProgressMessage"
        />
        <LPRatingFieldset
          lpLegend="Wie fit und wohl fühlst du dich in JavaScript?"
          lp__labelGroupName="lp__js-progress"
          lp__idOne="jsProgressOne"
          lp__idTwo="jsProgressTwo"
          lp__idThree="jsProgressThree"
          lp__idFour="jsProgressFour"
          lp__idFive="jsProgressFive"
          lp__idSix="jsProgressSix"
          lp__idSeven="jsProgressSeven"
          lp__idEight="jsProgressEight"
          lp__idNine="jsProgressNine"
          lp__idTen="jsProgressTen"
          lp__messageID="jsProgressMessage"
        />
        <LPCommentFieldset
          class="lp_what-went-well-fs"
          lpLegend="Was lief deiner Meinung nach gut für dich?"
          lp__areaID="lpWhatWentWell"
          lp__areaName="lp__what-went-well"
          lp__placeholder="Beschreibe was deiner Meinung nach gut für dich lief..."
        />
        <LPCommentFieldset
          class="lp_what-to-improve-fs"
          lpLegend="Was würdest du gerne besser machen?"
          lp__areaID="lpWhatToImprove"
          lp__areaName="lp__what-to-improve"
          lp__placeholder="Beschreibe was du gerne besser machen würdest..."
        />
        <LPCommentFieldset
          class="lp_good-in-course-fs"
          lpLegend="Was läuft gut im Kurs?"
          lp__areaID="lpGoodInCourse"
          lp__areaName="lp__good-in-course"
          lp__placeholder="Beschreibe was du am Kurs gut findest..."
        />
        <LPCommentFieldset
          class="lp_what-improve-in-course-fs"
          lpLegend="Was würdest du gerne verbessert sehen?"
          lp__areaID="lpWhatImproveInCourse"
          lp__areaName="lp__what-improve-in-course"
          lp__placeholder="Beschreibe was du am Kurs verbessern würdest..."
        />
      </div>
      <div class="lp__btn-wrapper">
        <cbe-main-btn buttonClass="primary" class="btn">ABBRECHEN</cbe-main-btn>
        <cbe-main-btn buttonClass="secondary" class="btn" @click="initEntry"
          >ABSCHICKEN</cbe-main-btn
        >
      </div>
    </form>
  </section>
</template>

<script>
import LPRatingFieldset from "@/components/LPRatingFieldset/LPRatingFieldset.vue";
import LPCommentFieldset from "@/components/LPCommentFieldset/LPCommentFieldset.vue";
export default {
  name: "LPStudentEntry",
  components: {
    LPRatingFieldset,
    LPCommentFieldset,
  },
  data() {
    return {
      currentStudentLPEntry: {},
      generalProgress: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.lp__fieldset {
  padding: 0;
  border: 1px solid var(--primary-color);
  border-radius: 0.25rem;
}

.lp__entry-section {
  margin: 0 4rem 0 2.5rem;
}
.lp__fieldset-wrapper {
  display: grid;
  grid-gap: 1rem;
}
.lp_what-went-well-fs {
  grid-column: 1 / span 2;
}
.lp_what-to-improve-fs {
  grid-column: 1 / span 2;
}
.lp_good-in-course-fs {
  grid-column: 1 / span 2;
}
.lp_what-improve-in-course-fs {
  grid-column: 1 / span 2;
}

.lp__btn-wrapper {
  display: flex;
  justify-content: space-between;
  flex-flow: row;
}

@media only screen and (max-width: 814px) {
  .lp__entry-section {
    margin: 0 2rem 0 2.5rem;
  }
}
</style>
