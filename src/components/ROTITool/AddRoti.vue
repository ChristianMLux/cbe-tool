<template>
  <section class="add-roti__section">
    <h2 class="mobile-heading">Return of Time invested</h2>
    <RotiRating
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
  </section>
</template>

<script>
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
      currentRoti: {
        rotiRating: 0,
        rotiMessage: "",
        rotiAutor: "",
        autorID: "",
        rotiDate: "",
      },
    };
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
    },
    setRating(ratingValue) {
      this.currentRoti.rotiRating = ratingValue;
    },
    setRotiMessage(message) {
      this.currentRoti.rotiMessage = message;
    },
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
