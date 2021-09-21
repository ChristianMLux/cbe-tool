class GitAPIService {
  async getStudentIssues(studentScreenName, userToken) {
    let _userToken = "token " + userToken;
    const url =
      "https://api.github.com/repos/" +
      studentScreenName +
      "/bootcamp-schedule/issues";
    const httpElement = await fetch(url, {
      headers: {
        Accept: "application/json",
        authorization: _userToken,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    let _repoIssues = await httpElement.json();
    let _counter = await _repoIssues;
    return await _counter.length;
  }
  async printIssues(studentScreenName, userToken) {
    let printedIssuesCounter = await this.getStudentIssues(
      studentScreenName,
      userToken
    ).then(function (value) {
      return value;
    });
    return await printedIssuesCounter;
  }
  async getStudentRepos(studentScreenName, userToken) {
    let _userToken = "token " + userToken;
    const url = "https://api.github.com/users/" + studentScreenName + "/repos";
    const httpElement = await fetch(url, {
      headers: {
        Accept: "application/json",
        authorization: _userToken,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    let _studentRepos = await httpElement.json();
    let _counter = await _studentRepos;
    return await _counter.length;
  }
  async printRepos(studentScreenName, userToken) {
    let printedRepoCounter = await this.getStudentRepos(
      studentScreenName,
      userToken
    ).then(function (value) {
      return value;
    });
    return await printedRepoCounter;
  }
}
export default new GitAPIService();
