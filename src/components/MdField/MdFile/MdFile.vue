<template>
  <div class="md-file"
    @click="openPicker">
    <md-input
      readonly
      v-model="content"
      v-bind="{ required, placeholder, disabled }"
      ref="textInput">
    </md-input>

    <input
      type="file"
      v-bind="{ id, name, disabled, multiple, accept }"
      @change="onFileSelected"
      ref="fileInput">
  </div>
</template>

<script>
  import MdComponent from 'core/MdComponent'
  import MdUuid from 'core/MdUuid'
  import MdFieldMixin from '../MdFieldMixin'
  import MdInput from '../MdInput/MdInput.vue'

  export default new MdComponent({
    name: 'MdFile',
    mixins: [MdFieldMixin],
    inject: ['MdField'],
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
    // data () {
    //   return {
    //     fileName: this.content
    //   }
    // },
    components: {
      MdInput
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
        this.content = this.getFileName(files, $event)
        this.$emit('change', files || $event.target.value)
        this.$emit('input', this.content)
      }
    }
  })
</script>
