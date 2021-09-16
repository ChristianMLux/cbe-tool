<template>
  <span class="sp__issue-count">Open Issues: {{ issueCount }}</span>
</template>
<script>
export default {
  name: "SPIssueCounter",
  data() {
    return {
      issueCount: 0,
      repoIssues: [],
    };
  },
  methods: {
    async getIssues() {
      const url =
        "https://api.github.com/repos/ChristianMLux/bootcamp-schedule/issues";
      const httpElement = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      this.repoIssues = await httpElement.json();
      this.repoIssues.forEach(() => {
        this.issueCount++;
      });
    },
  },
  created() {
    this.getIssues();
  },
};
</script>
