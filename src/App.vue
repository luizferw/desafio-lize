<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-btn
          icon="mdi-plus"
          color="primary"
          class="mb-4"
          size="large"
          @click="addPost()"
        />
        <v-text-field
          label="Search"
          v-model.trim="search"
        />
        <v-row>
          <template
            v-for="(post, index) in filteredPosts"
            :key="index"
          >
            <v-col
              lg="3"
              md="4"
              sm="6"
              cols="12"
            >
              <Post
                :content="post"
                @editPost="editPost"
                @deletePost="deletePost"
              />
            </v-col>
          </template>
        </v-row>
      </v-container>
      <PostAddEdit
        ref="modalAddEditPost"
        @savePost="savePost"
      />
    </v-main>
  </v-app>
</template>

<script>
import Post from '@/components/Post.vue'
import PostAddEdit from '@/components/PostAddEdit.vue'

export default {
  components: {
    Post,
    PostAddEdit
  },
  data () {
    return {
      search: '',
      posts: [
        {
          title: 'Title',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus corporis architecto nihil optio molestias quos explicabo suscipit ullam placeat quibusdam. Ducimus laborum architecto ipsum fuga dicta, iste sunt ab laudantium!',
          imgUrl: 'https://via.placeholder.com/250x200'
        }
      ]
    }
  },
  methods: {
    addPost () {
      this.$refs.modalAddEditPost.openModal()
    },
    savePost (post, indexOfPost) {
      const postAlreadyExists = indexOfPost >= 0
      if (postAlreadyExists) {
        this.posts.splice(indexOfPost, 1, post)
      } else {
        this.posts.unshift(post)
      }
    },
    deletePost (post) {
      const indexOfPost = this.posts.indexOf(post)
      this.posts.splice(indexOfPost, 1)
    },
    editPost (post) {
      const indexOfPost = this.posts.indexOf(post)
      this.$refs.modalAddEditPost.openModal(post, indexOfPost)
    }
  },
  computed: {
    filteredPosts () {
      return this.posts.filter(post => post.title.toLowerCase().includes(this.search.toLowerCase()))
    }
  }
}
</script>
