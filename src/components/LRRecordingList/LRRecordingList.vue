<template>
  <section class="lr__recordig-section">
    <ul class="lr__recording-list">
      <LRListElement
        v-for="recording in lrRecordingsArray"
        :key="recording.recordingKey"
        :date="recording.recordingData.date"
        :topic="recording.recordingData.topic"
        :playURL="recording.recordingData.playURL"
        v-bind="recording"
      />
    </ul>
  </section>
</template>
<script>
import firestore from "@/firestore";
import { collection, getDocs } from "firebase/firestore";

import LRListElement from "@/components/LRRecordingList/LRListElement";
export default {
  name: "LRRecordingList",
  data() {
    return {
      lrRecordingsArray: [],
      questions: [],
    };
  },
  components: { LRListElement },
  methods: {
    async getAllRecordings() {
      const querySnapshot = await getDocs(
        collection(firestore, "zoom-recordings-test")
      );
      querySnapshot.forEach((doc) => {
        this.lrRecordingsArray.push({
          recordingKey: doc.id,
          recordingData: doc.data(),
        });
      });
    },
    async getAllQuestions() {
      const querySnapshot = await getDocs(
        collection(firestore, "ama-questions")
      );
      querySnapshot.forEach((doc) => {
        this.questions.push({
          questionKey: doc.id,
          questionData: doc.data(),
        });
      });
    },
  },
  async mounted() {
    this.getAllRecordings();
    await this.getAllQuestions();
    console.log(this.questions);
  },
};
</script>
