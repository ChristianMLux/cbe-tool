<template>
  <section class="add-roti__section">
    <h2 class="mobile-heading">Return of Time invested</h2>
    <RotiRating
      v-if="userAllowedToGiveRoti"
      rotiLegend="Was gibst du dem Tag für ein Roti?"
      roti__labelGroupName="roti__rating"
      roti__vModelGroupName="roti__vRating"
      roti__idOne="rotiOne"
      roti__idTwo="rotiTwo"
      roti__idThree="rotiThree"
      roti__idFour="rotiFour"
      roti__idFive="rotiFive"
      roti__messageID="rotiMessageID"
      :rotiMessage="currentRoti.rotiMessage"
      @getRotiMessage="setRotiMessage"
      @getRating="setRating"
      @initRoti="initRoti()"
    />
    <p v-else>
      Du hast heute schon ein Roti abgegeben, warte bitte bis morgen, bevor du
      ein weiteres Roti abgeben kannst.
    </p>
  </section>
</template>

<script>
//todo: add 24h lock
import firestore from "@/firestore";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import RotiRating from "./RotiRating.vue";
export default {
  name: "AddRoti",
  components: { RotiRating },
  data() {
    return {
      currentDate: new Date(),
      currentRoti: {
        rotiRating: 0,
        rotiMessage: "",
        rotiAutor: "",
        autorID: "",
        rotiDate: "",
      },
    };
  },
  computed: {
    userAllowedToGiveRoti() {
      return this.$store.getters.getUserRotis.find(
        (roti) => roti.rotiDate === this.currentDate
      )
        ? false
        : true;
    },
  },
  methods: {
    async addRotiToUser(roti) {
      const studentRef = doc(
        firestore,
        "all-users",
        this.$store.getters.getCurrentUserID
      );
      await updateDoc(studentRef, {
        studentRotis: arrayUnion(roti),
      });
    },
    initRoti() {
      firestore;
      let fullDate = new Date();
      let month = fullDate.getMonth() + 1;
      let day = fullDate.getDate();
      let year = fullDate.getFullYear();
      this.currentRoti.rotiDate = `${day}.${month}.${year}`;
      this.currentRoti.rotiAutor = this.$store.getters.getCurrentUserScreenname;
      this.currentRoti.autorID = this.$store.getters.getCurrentUserID;
      addDoc(collection(firestore, "student-roti"), this.currentRoti);
      this.addRotiToUser(this.currentRoti);
      alert("Danke dass du dein Roti abgegeben hast :)");
    },
    setRating(ratingValue) {
      this.currentRoti.rotiRating = ratingValue;
    },
    setRotiMessage(message) {
      this.currentRoti.rotiMessage = message;
    },
    setCurrentDate() {
      let date = new Date();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();
      this.currentDate = `${day}.${month}.${year}`;
    },
  },
  created() {
    this.setCurrentDate();
  },
};
</script>

<style lang="scss" scoped>
section {
  margin: 0 4rem 0 2.5rem;
}
@media screen and (max-width: 555px) {
  section {
    margin: 0.75rem;
  }
}
</style>
