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
                v-for="todo in todos"
                :key="todo.id"
                @del="delTodo"/>
        <!--关于@del = delTodo :父组件监听：父组件通过@del 来获取子组件参数，通过父组件定义的方法delTodo来处理获取的参数。数据处理在父组件中做 -->
        <Tabs :todo = "todo"></Tabs>
    </section>
</template>
<script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'
    let id  = 0;
    export default  {
        data() {
            return {
                todos:[
                ]
            }
        },
        methods: {
            addTodo(e){
               this.todos.unshift({
                   id: id++,
                   content: e.target.value.trim(),
                   completed: false
               })
               e.target.value = ''
            },
            delTodo(id){
//                this.todos.splice(this.todos.findIndex(todo => todo.id == id),1)
                this.todos.splice(this.todos.findIndex(todo => todo.id == id),1)
            },
        },
        components:{
            Item,
            Tabs
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
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }

</style>


