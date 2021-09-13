<template>
  <section class="lp__entry-section">
    <form class="lp__entry-form">
      <LPRatingFieldset
        lpLegend="Wie schätzt du deinen allgemeinen Lernfortschritt ein?"
        lp__labelGroupName="lp__general-progress"
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
        lp_messageID="Gebe bitte noch einen zusätzlichen Kommentar ab."
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
        lp_messageID="Gebe bitte noch einen zusätzlichen Kommentar ab."
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
        lp_messageID="Gebe bitte noch einen zusätzlichen Kommentar ab."
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
        lp_messageID="Gebe bitte noch einen zusätzlichen Kommentar ab."
      />
    </form>
  </section>
</template>

<script>
import LPRatingFieldset from "@/components/LPRatingFieldset/LPRatingFieldset.vue";
export default {
  name: "LPStudentEntry",
  components: {
    LPRatingFieldset,
  },
};
</script>

<style lang="scss" scoped>
.lp__entry-section {
  margin: 0 4rem 0 2.5rem;
}

@media only screen and (max-width: 814px) {
  .lp__entry-section {
    margin: 0 2rem 0 2.5rem;
  }
}
</style>
