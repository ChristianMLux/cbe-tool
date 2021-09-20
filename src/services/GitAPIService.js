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
    return await _counter.length;
  }
  async printIssues(studentScreenName) {
    let printedIssuesCounter = await this.getStudentIssues(
      studentScreenName
    ).then(function (value) {
      return value;
    });
    return await printedIssuesCounter;
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
    return await _counter.length;
  }
  async printRepos(studentScreenName) {
    let printedRepoCounter = await this.getStudentRepos(studentScreenName).then(
      function (value) {
        return value;
      }
    );
    return await printedRepoCounter;
  }
}
export default new GitAPIService();
