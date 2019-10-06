<template>
  <div id="elements">
    <div v-for="(e, i) in roullet_elements" :key="i" class="element flex flex-center">
      <div class="title flex flex-center">
        <div :style="{'background-color': e.color}" class="label"></div>
        <el-input v-if="e.isEdit" v-model="e.title" @keypress.enter.native="e.isEdit = false" type="text" size="mini"></el-input>
        <div v-else class="roboto">{{ e.title }}</div>
      </div>
      <div class="btn-area">
        <span @click="edit(i)" :class="['icon', edit_btn_class]"><i class="far fa-edit fa-lg"></i></span>
        <span @click="increase_weight(i)" :class="['icon', increase_btn_class]"><i class="far fa-arrow-alt-circle-up fa-lg"></i></span>
        <span @click="decrease_weight(i)" :class="['icon', decrease_btn_class(i)]"><i class="far fa-arrow-alt-circle-down fa-lg"></i></span>
        <span @click="delete_element(i)" :class="['icon', delete_btn_class]"><i class="far fa-trash-alt fa-lg"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['roullet_elements', 'isStart', 'colors'],

    data() {
      return {
        isEdit: false
      }
    },

    computed: {
      edit_btn_class() {
        return this.isStart ? 'unable' : ['edit', 'able-small']
      },

      increase_btn_class() {
        return this.isStart ? 'unable' : ['plus', 'able-small']
      },

      delete_btn_class() {
        return this.isStart ? 'unable' : ['delete', 'able-small']
      }
    },

    methods: {
      delete_element(index) {
        if (this.isStart) { return }
        const color = this.roullet_elements[index].color
        // 要素の削除
        this.roullet_elements.splice(index, 1)
        const len = this.roullet_elements.length
        // 削除する要素に使われている色を再度使えるようにする
        this.colors.unshift(color)

        if (len > 0) {
          // ルーレットを描画し直す
          // 最後の要素を削除するときはそのままにしておく
          this.redraw_roullet()
        }
      },

      edit(index) {
        if (this.isStart) { return }
        this.roullet_elements[index].isEdit = true
      },

      increase_weight(index) {
        if (this.isStart) { return }
        this.roullet_elements[index].weight ++
        this.redraw_roullet()
      },

      decrease_weight(index) {
        let weight = this.roullet_elements[index].weight
        if (this.isStart || weight <= 1) { return }
        if (weight > 1) {
          this.roullet_elements[index].weight --
        }
        this.redraw_roullet()
      },

      redraw_roullet() {
        this.$emit('elements-edited')
      },

      decrease_btn_class(index) {
        return this.isStart || this.roullet_elements[index].weight <= 1 ? 'unable' : ['minus', 'able-small']
      }
    },

  }
</script>

<style lang='scss'>
  li {
    list-style: none;
  }

  #elements {
    padding: 20px;
  }

  .element {
    padding: 5px 0;
    flex-wrap: wrap;
  }

  .label {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 10px;
    flex: none;
  }

  .title {
    font-size: 18px;
    letter-spacing: 0.5px;
    flex: auto;
    input {
      font-size: 15px;
      padding: 0 5px;
      letter-spacing: 0.5px;
      &:hover, &:focus {
        border: 1px solid #DDDDDD;
        box-shadow: 0 0 1px 1px #DDDDDD;
      }
    }
  }

  .btn-area {
    margin-left: auto;
    flex: none;
  }
</style>
