<template>
  <section class="real-app">
    <input
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下去要做什么?"
        @keyup.enter="addTodo"
    >
    <Item
        :todo="todo"
        v-for="todo in filteredTodos"
        :key="todo.id"
        @del="delTodo"/>
    <!--关于@del = delTodo :父组件监听：父组件通过@del 来获取子组件参数，怎么处理还需要通过父组件定义的方法delTodo来。-->
    <Tabs :filter="filter"
          :todos="todos"
          @togole = "togoleFilter"

    ></Tabs>
  </section>
</template>
<script>
  import Item from './item.vue'
  import Tabs from './tabs.vue'

  let id = 0;
  export default {
    data() {
      return {
        todos: [],
        filter: 'all'
      }
    },
    components: {
      Item,
      Tabs
    },
    computed: {
      filteredTodos(){
        if(this.filter === 'all'){
          return this.todos
        }
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    methods: {
      addTodo(e) {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        })
        e.target.value = ''
      },
      delTodo(id) {
        // () => return 'hello'
        // (a, b) => a + b
        //
        // (a) => {
        //   a = a + 1
        //   return a
        // }
        // es6 ：箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种只包含一个表达式，省略掉了连{ ... }和return。还有一种可以包含多条语句，这时候就不能省略{ ... }和return
//                this.todos.splice(this.todos.findIndex(todo => todo.id == id),1)
        this.todos.splice(this.todos.findIndex(todo => todo.id == id), 1)
      },
      togoleFilter(state){
        this.filter = state
      },
    },

  }

</script>
<style>
  .real-app {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
  }

  .add-input {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: none;
    outline: none;
    color: inherit;
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 36px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }

</style>


