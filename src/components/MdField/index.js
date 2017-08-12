import MdField from './MdField'
import MdFile from './MdFile'
import MdInput from './MdInput'
import MdTextarea from './MdTextarea'

export default Vue => {
  Vue.use(MdInput)
  Vue.use(MdFile)
  Vue.use(MdTextarea)
  Vue.component(MdField.name, MdField)
}
