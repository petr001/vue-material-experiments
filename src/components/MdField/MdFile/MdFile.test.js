import { mount } from 'avoriaz'
import mountTemplate from 'test/utils/mountTemplate'
import MdField from '../MdField.vue'
import MdFile from './MdFile.vue'

test('should render the field', async () => {
  const template = '<md-field>Lorem ipsum</md-field>'
  const wrapper = await mountTemplate(MdField, template)

  expect(wrapper.hasClass('md-field')).toBe(true)
  expect(wrapper.text().trim()).toBe('Lorem ipsum')
})

test('should render the file field', async () => {
  const wrapperWithFile = mount(MdField, {
    slots: {
      default: [MdFile]
    }
  })

  const mdFile = wrapperWithFile.first(MdFile)

  expect(mdFile.hasClass('md-file')).toBe(true)
})

test('should render the input field inside the mdFile', async () => {
  const wrapperWithFile = mount(MdField, {
    slots: {
      default: [MdFile]
    }
  })

  const mdFile = wrapperWithFile.first(MdFile)
  const mdInput = mdFile.vm.$children[0]

  expect(mdFile.hasClass('md-file') && mdInput instanceof Object).toBe(true)
})

test('should render the file field', async () => {
  const wrapperWithFile = mount(MdField, {
    slots: {
      default: [MdFile]
    }
  })

  const file = wrapperWithFile.first(MdFile)
  const mdInput = file.vm.$children[0]
  const fileId = file.vm.$props.id.indexOf('md-file-') !== -1
  const inputId = mdInput.$props.id.indexOf('md-input-') !== -1

  expect(fileId && inputId).toBe(true)
})
