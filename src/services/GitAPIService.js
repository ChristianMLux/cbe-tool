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
  async getStudentRepos(studentScreenName) {
    const url = "https://api.github.com/users/" + studentScreenName + "/repos";
    const httpElement = await fetch(url, {
      headers: {
        Accept: "application/json",
        authorization: "token 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",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    let _studentRepos = await httpElement.json();
    let _counter = await _studentRepos;
    return _counter.length;
  }
  async printRepos(studentScreenName) {
    let printedRepoCounter = await this.getStudentRepos(studentScreenName).then(
      function (value) {
        return value;
      }
    );
    return printedRepoCounter;
  }
}
export default new GitAPIService();
