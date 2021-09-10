<template>
  <section class="sp__repo-section">
    <ul class="sp__repo-list" id="repos">
      <BookListItem
        v-for="(repo, index) in books"
        :key="repo.isbn"
        v-bind="book"
        @read="readBook(index)"
      />
    </ul>
  </section>
</template>

<script>
import BookListItem from "@/components/BookList/BookListItem/BookListItem.vue";
export default {
  name: "BookList",
  components: {
    BookListItem,
  },
  data() {
    return {
      books: [],
    };
  },
  methods: {
    readBook(index) {
      this.books[index] = {
        ...this.books[index],
        read: true,
      };
    },
    async updateBooks() {
      const url = "http://localhost:4730/books";
      const httpElement = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      this.books = await httpElement.json();
    },
  },
  created() {
    this.updateBooks();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  border-top: 1px solid #42b883;
}
</style>
