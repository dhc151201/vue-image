import Vimage from './vue.image.vue'

let vueImage = {}

vueImage.install = function (Vue, options) {
  Vue.prototype.$msg = 'Hello I am image vue plugin, coon huaicheng151201@163.com'
  Vue.component(Vimage.name, Vimage)
}
export default vueImage
