// import Vue from 'vue'
// import { mount } from 'avoriaz'
import mountTemplate from 'test/utils/mountTemplate'
import MdField from '../MdField.vue'
// import MdFile from './MdFile.vue'

test('should render the field', async () => {
  const template = '<md-field>Lorem ipsum</md-field>'
  const wrapper = await mountTemplate(MdField, template)

  expect(wrapper.hasClass('md-field')).toBe(true)
  expect(wrapper.text().trim()).toBe('Lorem ipsum')
})

// test('should render the file field', async () => {
//   const wrapperWithFile = mount(MdField, {
//     slots: {
//       default: [MdFile]
//     }
//   })

//   const file = wrapperWithFile.find(MdFile)[0]
//   const fileId = file.vm.$props.id

//   expect(file.hasAttribute('id', fileId)).toBe(true)
//   // expect(inputLabel.hasAttribute('for', inputId)).toBe(true)
// })
