class GitAPIService {
  async getStudentIssues(studentScreenName) {
    const url =
      "https://api.github.com/repos/" +
      studentScreenName +
      "/bootcamp-schedule/issues";
    const httpElement = await fetch(url, {
      headers: {
        Accept: "application/json",
        authorization: "token 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",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    let _repoIssues = await httpElement.json();
    let _counter = await _repoIssues;
    return _counter.length;
  }
  async printIssues(studentScreenName) {
    let printedIssuesCounter = await this.getStudentIssues(
      studentScreenName
    ).then(function (value) {
      return value;
    });
    return printedIssuesCounter;
  }
}
export default new GitAPIService();
