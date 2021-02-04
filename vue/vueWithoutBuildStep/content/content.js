const template = `
  <section>

    <label>
      {{ message }}
    </label>

    <div>
      <button @click="click()">OK</button>
    </div>

  </section>
`

export default {
  template,

  data () {
    return {
      clickCount: 0,
      clickedAt: null
    }
  },

  computed: {
    message () {
      const { clickCount, clickedAt } = this
      return clickedAt
        ? `#${clickCount}, last click at ${clickedAt.toLocaleTimeString()}`
        : 'Click OK please ...'
    }
  },

  methods: {
    click () {
      this.clickCount++
      this.clickedAt = new Date()
    }
  },

  mounted () {
    console.log('Content component mounted.')
  }
}