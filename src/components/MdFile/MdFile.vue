<template>
  <div class="md-file"
    @click="openPicker">
    <md-input
      readonly
      v-model="filename"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      ref="textInput">
    </md-input>

    <input
      type="file"
      :id="id"
      :name="name"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      @change="onFileSelected"
      ref="fileInput">
  </div>
</template>

<script>
  import MdUuid from 'core/MdUuid'
  export default {
    name: 'MdFile',
    props: {
      value: String,
      id: {
        type: String,
        default () {
          return 'md-file-' + MdUuid()
        }
      },
      name: String,
      disabled: Boolean,
      required: Boolean,
      placeholder: String,
      accept: String,
      multiple: Boolean
    },
    data () {
      return {
        filename: this.value
      }
    },
    watch: {
      value () {
        this.filename = this.value
      }
    },
    methods: {
      getMultipleName (files) {
        let names = [];
        [...files].forEach((file) => {
          names.push(file.name)
        })
        return names.join(', ')
      },
      openPicker () {
        if (!this.disabled) {
          this.resetFile()
          this.$refs.fileInput.click()
          this.$refs.textInput.$el.focus()
        }
      },
      resetFile () {
        this.$refs.fileInput.value = ''
      },
      getFileName (files, event) {
        if (!files) {
          return event.target.value.split('\\').pop()
        }
        if (files.length > 1) {
          return this.getMultipleName(files)
        }
        if (files.length === 1) {
          return files[0].name
        }
        return null
      },
      onFileSelected ($event) {
        const files = $event.target.files || $event.dataTransfer.files
        this.filename = this.getFileName(files, $event)
        // this.$emit('selected', files || $event.target.value)
        this.$emit('change', files || $event.target.value)
        this.$emit('input', this.filename)
      }
    }
  }
</script>
