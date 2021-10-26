<template>
  <section class="lr__recordig-section">
    <h2>Lesson Recordings</h2>
    <div class="filter-wrapper"></div>
    <ul class="lr__recording-list">
      <LRListElement
        v-for="recording in lrRecordingsArray"
        :key="recording.recordingKey"
        :date="recording.recordingData.date"
        :topic="recording.recordingData.topic"
        :playURL="recording.recordingData.recordingFilesPlayUrl"
        :downloadURL="recording.recordingData.recordingFilesDownloadUrl"
        :shareURL="recording.recordingData.recordingFilesPlayUrl"
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
    };
  },
  components: { LRListElement },
  methods: {
    async getAllRecordings() {
      const querySnapshot = await getDocs(
        collection(firestore, "zoom-recordings")
      );
      querySnapshot.forEach((doc) => {
        let date = new Date(doc.data().date);
        this.lrRecordingsArray.push({
          recordingKey: doc.id,
          recordingData: {
            date: date.toDateString(),
            recordingFilesDownloadUrl:
              doc.data()["recording-files-download-url"] ||
              doc.data().recordingFilesDownloadUrl,
            recordingFilesPlayUrl:
              doc.data()["recording-files-play-url"] ||
              doc.data().recordingFilesPlayUrl,
            shareUrl: doc.data()["share-url"] || doc.data().shareUrl,
            topic: doc.data().topic,
            uuid: doc.data().uuid,
            videoFilesDownloadUrl:
              doc.data()["video-files-download-url"] ||
              doc.data().videoFilesDownloadUrl,
          },
        });
      });
      console.log(this.lrRecordingsArray);
    },
  },
  async mounted() {
    await this.getAllRecordings();
  },
};
</script>

<style lang="scss" scoped>
.lr__recording-list {
  list-style-type: none;
  display: grid;
  gap: 0.5rem;
}
.lr__recording-list > li {
  display: grid;
}

.lr__recording-list > li:nth-child(1n + 1) {
  background: var(--background-color);
}
.lr__recording-list > li:nth-child(2n + 2) {
  background: var(--light-grey);
}
</style>
