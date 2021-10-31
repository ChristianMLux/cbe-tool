<template>
  <section class="lr__recordig-section">
    <h2 class="mobile-heading">Lesson Recordings</h2>
    <div class="filter-wrapper">
      <LRFilter
        @filter-result="getFilterResults"
        filterHeading="Suche nach Titel oder Beschreibung"
        placeholder="Gebe ein Suchbegriff ein..."
      />
    </div>
    <ul class="lr__recording-list" v-if="userFilterQuery">
      <LRListElement
        v-for="recording in filteredRecordings"
        :key="recording.recordingKey"
        :date="recording.recordingData.date"
        :topic="recording.recordingData.topic"
        :description="recording.recordingData.description"
        :playURL="recording.recordingData.recordingFilesPlayUrl"
        :downloadURL="recording.recordingData.recordingFilesDownloadUrl"
        :shareURL="recording.recordingData.recordingFilesPlayUrl"
        @removeRecording="deleteRecording(recording.recordingKey)"
        v-bind="recording"
      />
    </ul>
    <ul class="lr__recording-list" v-else>
      <LRListElement
        v-for="recording in lrRecordingsArray"
        :key="recording.recordingKey"
        :date="recording.recordingData.date"
        :topic="recording.recordingData.topic"
        :description="recording.recordingData.description"
        :playURL="recording.recordingData.recordingFilesPlayUrl"
        :downloadURL="recording.recordingData.recordingFilesDownloadUrl"
        :shareURL="recording.recordingData.recordingFilesPlayUrl"
        @removeRecording="deleteRecording(recording.recordingKey)"
        v-bind="recording"
      />
    </ul>
  </section>
</template>
<script>
import firestore from "@/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

import LRListElement from "@/components/LRRecordingList/LRListElement";
import LRFilter from "./LRFilter.vue";
export default {
  name: "LRRecordingList",
  data() {
    return {
      lrRecordingsArray: [],
      userFilterQuery: "",
    };
  },
  components: {
    LRListElement,
    LRFilter,
  },
  computed: {
    filteredRecordings: function () {
      let recordingFilterStatus = this.userFilterQuery;
      return this.lrRecordingsArray.filter((recording) => {
        return (
          recording.recordingData.topic.includes(recordingFilterStatus) ||
          recording.recordingData.description.includes(recordingFilterStatus)
        );
      });
    },
  },
  methods: {
    async deleteRecording(recordingKey) {
      await deleteDoc(doc(firestore, "zoom-recordings", recordingKey));
      location.reload();
    },
    getFilterResults(result) {
      this.userFilterQuery = result;
    },
    compareDates(a, b) {
      if (a.recordingData.date < b.recordingData.date) return -1;
      if (a.recordingData.date > b.recordingData.date) return 1;
      return 0;
    },
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
            description: doc.data().description,
            uuid: doc.data().uuid,
            videoFilesDownloadUrl:
              doc.data()["video-files-download-url"] ||
              doc.data().videoFilesDownloadUrl,
          },
        });
      });
      this.lrRecordingsArray = this.lrRecordingsArray
        .slice(0)
        .sort(this.compareDates);
    },
  },
  async mounted() {
    await this.getAllRecordings();
  },
};
</script>

<style lang="scss" scoped>
.lr__recordig-section {
  margin: 0 4rem 0 2.5rem;
}
.lr__recording-list {
  list-style-type: none;
  display: grid;
  gap: 0.5rem;
  padding: 0;
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

.filter-wrapper {
  min-width: 33%;
}

@media screen and (max-width: 555px) {
  .lr__recording-list {
    padding: 0.125rem;
  }
}
</style>
