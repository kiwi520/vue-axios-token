<template>
  <div>
    <h1>Dashboard Page</h1>
    <div>
      <h6>My Todos</h6>
      <div>
        <div>
          <a-button type="primary" @click="showModal">
            添加
          </a-button>
          <a-modal v-model="visible" title="新增数据" @ok="handleOk">
            <a-form :form="form">
              <a-form-item
                  :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 15 }"
                  label="标题"
              >
                <a-input placeholder="请输入标题" v-model="title"
                />
              </a-form-item>
              <a-form-item
                  :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 15 }"
                  label="内容"
              >
                <a-textarea placeholder="请输入内容" v-model="content"
                />
              </a-form-item>
            </a-form>
          </a-modal>
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="show()">Show Todos</button>
      <ul>
        <li v-for="(t, index) in gettersAllTodos" :key="index">
          {{ t }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "Dashboard",
  data() {
    return {
      title:'',
      content:"",
      checkNick: false,
      visible: false,
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
    };
  },
  computed: {
    ...mapGetters({
      gettersAuthData: 'getAuthData',
      gettersAllTodos:"getAllTodos"
    })
  },
  methods:{
    ...mapActions({
      actionsGetAllTodos:'getAllTodos',
      actionsCreateTodo:'createTodo'
    }),
    async show(){
      await this.actionsGetAllTodos();
    },
    showModal() {
      this.visible = true;
    },
    async handleOk() {
      await this.actionsCreateTodo(JSON.stringify({title: this.title, content: this.content}));
      this.visible = false;
    },
  }
}
</script>

<style scoped>

</style>