<template>
  <section class="graphical">
    <div class="graphical">
      <canvas
        id="issuesDiagramm"
        class="issues_diagramm"
        style="border: 1px solid var(--primary-color); border-radius: 0.25rem"
        :width="canvasWidth"
        :height="canvasHeight"
      ></canvas>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
export default {
  name: "IssuesAnalyze",
  props: {
    gitScreenName: {
      type: String,
    },
    gitToken: {
      type: [String, Number],
    },
  },
  data() {
    return {
      issuesInfo: this.$store.getters.getIssuesInfo,
      allIssues: [],
      canvasWidth: computed(() => window.innerWidth - 100),
      canvasHeight: 400,
      vueCanvas: undefined,
      currentIssue: this.$store.getters.getCurrentIssue,
    };
  },
  methods: {
    async getIssues(studentScreenName, userToken) {
      let _userToken = "token " + userToken;
      const url =
        "https://api.github.com/repos/" +
        studentScreenName +
        "/bootcamp-schedule/issues?state=all&per_page=100";
      const httpElement = await fetch(url, {
        headers: {
          Accept: "application/json",
          authorization: _userToken,
          "Content-Type": "application/json",
        },
        method: "GET",
        redirect: "follow",
      });
      let _issuesInfo = await httpElement.json();
      this.$store.commit({
        type: "setIssuesInfo",
        issuesInfo: _issuesInfo,
      });
    },
    async longestIssue() {
      const date = new Date();
      let maxduration = 0;
      for (let i = 0; i < this.issuesInfo.length; i++) {
        if (this.issuesInfo[i].state === "open") {
          const date2 = new Date(this.issuesInfo[i].created_at);
          let diff = date - date2;
          //const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
          const diffHour = Math.floor(diff / (1000 * 60 * 60));
          if (maxduration < diffHour) {
            maxduration = diffHour;
          }
          this.$store.commit({
            type: "setCurrentIssue",
            name: this.issuesInfo[i].title,
            status: "open",
            duration: diffHour,
          });
          this.allIssues.push(this.$store.getters.getCurrentIssue);
        } else {
          const dateOpen = new Date(this.issuesInfo[i].created_at);
          const dateClose = new Date(this.issuesInfo[i].closed_at);
          let diff = dateClose - dateOpen;
          //const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
          const diffHour = Math.floor(diff / (1000 * 60 * 60));
          this.$store.commit({
            type: "setCurrentIssue",
            name: this.issuesInfo[i].title,
            status: "close",
            duration: diffHour,
          });
          this.allIssues.push(this.$store.getters.getCurrentIssue);
        }
      }
      this.createDiagram(maxduration);
    },
    createDiagram(y) {
      var cv = this.vueCanvas;
      cv.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      //Options Grid
      var graphGridSize = 50;
      var graphGridX = (this.canvasWidth / graphGridSize).toFixed();
      //Draw Grid
      for (var i = 0; i < graphGridX; i++) {
        cv.moveTo(this.canvasWidth, graphGridSize * i);
        cv.lineTo(0, graphGridSize * i);
        cv.fillText(
          Math.floor(
            (this.canvasHeight - graphGridSize * i) * (y / this.canvasHeight)
          ) + "h",
          5,
          i * 50 - 3
        );
      }
      cv.strokeStyle = "#dbdbdb";
      cv.stroke();

      //Options Graph
      var graphMax = y;
      var graphPadding = 2;
      var graphFaktor = (this.canvasHeight - 5 * graphPadding) / graphMax;
      var graphWidth =
        (this.canvasWidth - 2 * graphPadding) / (this.allIssues.length + 1);
      var graphTextcolor = "black";

      //Draw Graph
      for (let ik = this.allIssues.length - 1; ik >= 0; ik--) {
        let tmpTop =
          (
            this.canvasHeight -
            graphFaktor * this.allIssues[ik].duration
          ).toFixed() - graphPadding;
        let tmpHeight = (this.allIssues[ik].duration * graphFaktor).toFixed();
        if (this.allIssues[ik].status === "open") {
          cv.fillStyle = "#ed3221";
        } else {
          cv.fillStyle = "#a3db33";
        }

        cv.fillRect(
          graphWidth +
            (this.allIssues.length - ik - 1) * graphWidth +
            graphPadding,
          tmpTop,
          graphWidth - graphPadding,
          tmpHeight
        );
        cv.fillStyle = graphTextcolor;

        if (
          this.allIssues[ik].status === "open" ||
          this.allIssues[ik].duration > 72
        ) {
          cv.fillText(
            this.allIssues.length - ik,
            graphWidth +
              (this.allIssues.length - ik - 1) * graphWidth +
              graphPadding,
            this.canvasHeight - 2,
            graphWidth
          );
        }
      }
    },
  },
  mounted() {
    var c = document.getElementById("issuesDiagramm");
    var ctx = c.getContext("2d", { alpha: false });
    ctx.font = "12px Open Sans";
    this.vueCanvas = ctx;

    this.getIssues(this.gitScreenName, this.gitToken);
    this.longestIssue();
  },
};
</script>

<style lang="scss" scoped>
.graphical {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
}
</style>
