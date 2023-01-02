<template>
  <v-dialog v-model="show">
    <v-form ref="form">
      <v-container>
        <v-card>
          <v-card-title class="pa-4">
            <v-icon>mdi-pencil</v-icon>
            <span class="text-h5 font-weight-bold">
              {{ title }}
            </span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col
                md="6"
                cols="12"
              >
                <v-text-field
                  label="Title"
                  counter="50"
                  :rules="[rules.required, rules.maxLength(50)]"
                  v-model.trim="model.title"
                  required
                />
              </v-col>
              <v-col
                md="6"
                cols="12"
              >
                <v-text-field
                  label="Image URL"
                  counter="150"
                  :rules="[
                    rules.required,
                    rules.minLength(20),
                    rules.maxLength(250),
                    rules.validImage
                  ]"
                  v-model.trim="model.imgUrl"
                  required
                />
              </v-col>
              <v-col>
                <v-textarea
                  label="Description"
                  counter="500"
                  :rules="[rules.required, rules.maxLength(500)]"
                  v-model.trim="model.description"
                  required
                  no-resize
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="closeModal()"
              size="large"
            >
              Close
            </v-btn>
            <v-btn
              @click="savePost()"
              size="large"
              color="primary"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      model: {},
      hasPost: false,
      rules: {
        maxLength (max) {
          return v => v.length <= max || `Max ${max} characters`
        },
        minLength (min) {
          return v => v.length >= min || `Minimum ${min} characters`
        },
        required: v => !!v || 'Field is required',
        validImage: async url => {
          const img = new Image()
          img.src = url
          const validImage = await new Promise(resolve => {
            if (img.complete)
              resolve(true)
            img.onload = () => resolve(true)
            img.onerror = () => resolve(false)
          })
          if (!validImage)
            return 'Url must be a valid image'
          if (img.width < 250)
            return 'Image width must be at least 250px'
          if (img.height < 200)
            return 'Image height must be at least 200px'
          if (img.width > 1500)
            return 'Image width cannot be larger than 1500px'
          if (img.height > 1250)
            return 'Image height cannot be larger than 1250px'
          return true
        }
      }
    }
  },
  computed: {
    title () {
      return this.hasPost ? 'Edit Post' : 'Add Post'
    }
  },
  methods: {
    openModal (post, indexOfPost) {
      this.hasPost = !!post
      if (this.hasPost) {
        this.model = { ...post }
        this.indexOfPost = indexOfPost
      } else {
        this.model = {}
        this.indexOfPost = -1
      }
      this.show = true
    },
    closeModal () {
      this.show = false
    },
    async savePost () {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return
      this.$emit('savePost', this.model, this.indexOfPost)
      this.closeModal()
    }
  }
}
</script>
