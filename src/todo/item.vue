<template>
    <div :class="['todo-item',todo.completed ? 'completed': '']">
        <input
                type="checkbox"
                class="toggle"
                v-model="todo.completed"
        >
        <label>{{todo.content}}</label>
        <button class="destory" @click="deleteTodo"></button>
    </div>
</template>
<script>
    export default {
      props: {
            todo: {
                type: Object,
                required: true
            }
        },
        methods: {
//            vm.$emit( event, arg )
//            $emit 绑定一个自定义事件event，当这个这个语句被执行到的时候，就会将参数arg传递给父组件，父组件通过@event监听并接收参数。
//            子组件点击动作执行方法deleteTodo，方法就触发执行了，数据改变，然后传递event---del  和 arg---this.todo.id,父组件是否监听及处理是父组件的事情
            deleteTodo(){
                this.$emit('del',this.todo.id)
            }
        }
    }


</script>
<style>
    .todo-item {
        position: relative;
        background-color: #fff;
        font-size: 24px;
        border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .todo-item:hover .destory:after {
        content: 'x';
    }
    .todo-item label {
        white-space: pre-line;
        word-break: break-all;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }
    .todo-item.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }
    .toggle {
        text-align: center;
        width: 50px;
        height: 30px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none;
        appearance: none;
        outline: none;
    }
    .toggle:after {
        content: url("../images/unChecked.svg");
    }
    .toggle:checked:after {
        content: url("../images/checked.svg");
    }
    .destory {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
        background-color: transparent;
        appearance: none;
        border-width: 0;
        cursor: pointer;
        outline: none;
    }

</style>
