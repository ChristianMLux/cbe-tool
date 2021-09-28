<template>
  <section class="graphical">
    <div class="graphical">
      <canvas
        id="issuesDiagramm"
        class="issues_diagramm"
        style="border: 1px solid black; border-radius: 2px"
        width="1200"
        height="400"
      ></canvas>
    </div>
  </section>
</template>

<script>
import Issue from "./Issue";
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
      canvasWidth: 1200,
      canvasHeight: 400,
      vueCanvas: undefined,
    };
  },
  methods: {
    async getIssues(studentScreenName, userToken) {
      let _userToken = "token " + userToken;
      const url =
        "https://api.github.com/repos/" +
        studentScreenName +
        "/bootcamp-schedule/issues?state=all&per_page=100";
      console.log(url);
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
      console.log(this.issuesInfo);
    },
    async longestIssue() {
      const date = new Date();
      let maxduration = 0;
      console.log("IN LONGEST: ", this.issuesInfo.length);
      for (let i = 0; i < this.issuesInfo.length; i++) {
        if (this.issuesInfo[i].state === "open") {
          const date2 = new Date(this.issuesInfo[i].created_at);
          //console.log(date2);
          let diff = date - date2;
          const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
          const diffHour = Math.floor(diff / (1000 * 60 * 60));
          console.log("day:" + diffDay + "hour:" + (diffHour % 24));
          if (maxduration < diffHour) {
            maxduration = diffHour;
          }

          const issue = Issue.constructor(
            this.issuesInfo[i].title,
            "open",
            diffHour
          );
          console.log(issue);
          this.allIssues.push(issue);

          console.log("ALL ISSUES FIRST: ", this.allIssues);
        } else {
          const dateOpen = new Date(this.issuesInfo[i].created_at);
          const dateClose = new Date(this.issuesInfo[i].closed_at);
          let diff = dateClose - dateOpen;
          //const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
          const diffHour = Math.floor(diff / (1000 * 60 * 60));
          const issue = Issue.constructor(
            this.issuesInfo[i].title,
            "close",
            diffHour
          );
          this.allIssues.push(issue);
        }
      }
      console.log("max:" + maxduration);
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
      console.log(graphFaktor);
      var graphWidth =
        (this.canvasWidth - 2 * graphPadding) / (this.allIssues.length + 1);
      console.log(graphWidth);
      var graphTextcolor = "white";

      //Draw Graph
      console.log("ALLISSUES: ", this.allIssues);
      for (let ik = this.allIssues.length - 1; ik >= 0; ik--) {
        let tmpTop =
          (
            this.canvasHeight -
            graphFaktor * this.allIssues[i].duration
          ).toFixed() - graphPadding;
        let tmpHeight = (this.allIssues[i].duration * graphFaktor).toFixed();
        if (this.allIssues[i].status === "open") {
          cv.fillStyle = "#E65858";
        } else {
          cv.fillStyle = "green";
        }

        cv.fillRect(
          graphWidth +
            (this.allIssues.length - i - 1) * graphWidth +
            graphPadding,
          tmpTop,
          graphWidth - graphPadding,
          tmpHeight
        );
        cv.fillStyle = graphTextcolor;

        if (
          this.allIssues[i].status === "open" ||
          this.allIssues[i].duration > 72
        ) {
          cv.fillText(
            this.allIssues.length - i,
            graphWidth +
              (this.allIssues.length - i - 1) * graphWidth +
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
    var ctx = c.getContext("2d");
    this.vueCanvas = ctx;
    console.log(this.gitToken);
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
