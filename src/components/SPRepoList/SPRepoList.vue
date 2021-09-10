<template>
  <section class="sp__repo-section">
    <ul class="sp__repo-list" id="repos">
      <SPRepoListItem
        v-for="repo in repos"
        :key="repo.id"
        v-bind="repo"
        :repoName="repo.name"
        :repoDescription="repo.description"
        :repoURL="repo.html_url"
      />
    </ul>
  </section>
</template>

<script>
import SPRepoListItem from "@/components/SPRepoList/SPRepoListItem.vue";
export default {
  name: "RepoList",
  components: {
    SPRepoListItem,
  },
  data() {
    return {
      repos: [],
    };
  },
  methods: {
    async updateRepos() {
      const url = "https://api.github.com/users/ChristianMLux/repos";
      const httpElement = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      this.repos = await httpElement.json();
      console.log(this.repos);
    },
  },
  created() {
    this.updateRepos();
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  border-top: 1px solid var(--primary-color);
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--secondary-color);
  }
}
</style>
