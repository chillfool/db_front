import Vue from 'vue'
import InfoComponent from './components/Info.vue'

const Info = Vue.extend(InfoComponent)

Info.install = function (options,type) {

  if (typeof options === 'string' || typeof options === 'number') {
    options = {
      content: options,
      type:type?type:'ok'
    }
  }

  let instance = new Info({
    data: options
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.show = true
  })
}

export default Info
