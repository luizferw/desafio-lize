<template>
  <v-card>
    <v-img
      height="200"
      :src="content.imgUrl"
      cover
    />
    <v-card-title>{{ content.title }}</v-card-title>
    <v-card-text>{{ cutContent }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        size="small"
        prepend-icon="mdi-pencil"
        @click="editPost"
      >
        Edit
      </v-btn>
      <v-btn
        size="small"
        prepend-icon="mdi-delete"
        @click="deletePost"
        color="error"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    content: Object
  },
  computed: {
    cutContent () {
      const content = this.content.description
      return content.length >= 175 ? content.substring(0, 160) + '...' : content
    }
  },
  methods: {
    editPost () {
      this.$emit('editPost', this.content)
    },
    deletePost () {
      this.$emit('deletePost', this.content)
    }
  }
}
</script>
