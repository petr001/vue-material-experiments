<template>
  <input
    v-bind="{ type, id, disabled, required, placeholder, readonly, maxlength }"
    v-model="content"
    class="md-input"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
    @keydown.up="onInput"
    @keydown.down="onInput">
</template>

<script>
  import MdComponent from 'core/MdComponent'
  import MdUuid from 'core/MdUuid'
  import MdFieldMixin from '../MdFieldMixin'

  export default new MdComponent({
    name: 'MdInput',
    mixins: [MdFieldMixin],
    inject: ['MdField'],
    props: {
      id: {
        type: String,
        default () {
          return 'md-input-' + MdUuid()
        }
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    computed: {
      toggleType () {
        return this.MdField.togglePassword
      }
    },
    watch: {
      type (type) {
        this.setPassword()
      },
      toggleType (toggle) {
        if (toggle) {
          this.setTypeText()
        } else {
          this.setTypePassword()
        }
      }
    },
    methods: {
      setPassword () {
        this.MdField.password = this.type === 'password'
      },
      setTypePassword () {
        this.$el.type = 'password'
      },
      setTypeText () {
        this.$el.type = 'text'
      }
    },
    created () {
      this.setPassword()
    }
  })
</script>
