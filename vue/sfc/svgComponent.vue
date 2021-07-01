<template>
  <div id="app">
    <div>
      <svg :viewBox="`0 0 30 ${tasks.length * 50}`"
           xmlns="http://www.w3.org/2000/svg" 
           width="30" 
           stroke="currentColor" 
           fill="white"
           aria-labelledby="timeline"
           role="presentation">
        <title id="timeline">timeline element</title>
        <line x1="10" x2="10" :y1="num2" :y2="tasks.length * num1 - num2" />
        <circle 
          @click="selectThis(i)" 
          v-for="(task, i) in tasks"
          :key="task.name"
          cx="10"
          :cy="i * num1 + num2" r="4"
          :fill="task.done ? 'currentColor' : 'white'"
          class="select"/>
      </svg>
    </div>
    
    <div>
      <div 
        @click="selectThis(i)"
        v-for="(task, i) in tasks"
        :key="task.name"
        class="select">
        {{ task.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num1: 32,
      num2: 15,
      tasks: [
        {
          name: 'thing',
          done: false
        },
        {
          name: 'other thing',
          done: false
        },
        {
          name: 'tacos',
          done: false
        },
        {
          name: 'yaya',
          done: false
        },
         {
          name: 'more things',
          done: false
        },
        {
          name: 'tada',
          done: false
        },
      ]
    };
  },
  methods: {
    selectThis(index) {
      this.tasks[index].done = !this.tasks[index].done
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 60px 120px;
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 1fr;
  height: 400px;
  width: 400px;
  line-height: 2;
}
  
svg {
  margin-top: 3px;
}
  
.select {
  cursor: pointer;
}
</style>
