const template = `
  <header :style="{ 'background-color': bgColor }">
    {{ text }}
  </header>
`

export default {
  template,

  props: {
    bgColor: {
      type: String,
      default: '#dde1f3'
    }
  },

  data () {
    return {
      text: 'Welcome to Minimalistic Vue JS example'
    }
  },

  mounted () {
    console.log('Header component mounted.')
  }
}
