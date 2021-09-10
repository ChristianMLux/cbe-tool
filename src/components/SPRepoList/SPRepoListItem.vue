<template>
  <li class="sp_list-item">
    <p class="sp__repo-name">{{ repoName }}</p>
    <p class="sp__repo-description">{{ repoDescription }}</p>
  </li>
</template>

<script>
export default {
  name: "SPRepoListItem",
  props: {
    repoName: {
      type: String,
    },
    repoDescription: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.sp__repo-name {
  padding-left: 1rem;
  text-align: left;
  font-weight: bold;
  color: var(--primary-color);
  width: 40%;
}
.sp__repo-description {
  width: 60%;
  text-align: left;
}
</style>
