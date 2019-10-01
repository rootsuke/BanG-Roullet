<template>
  <div id="elements">
    <div v-for="(e, i) in roullet_elements" :key="i" class="element flex flex-center">
      <div :style="{'background-color': e.color}" class="label"></div>
      <div class="title">
        <el-input v-if="e.isEdit" v-model="e.title" @keypress.enter.native="e.isEdit = false" type="text" size="mini"></el-input>
        <div v-else class="title">{{ e.title }}</div>
      </div>
      <div class="btn-area" :class="{ disable: isStart }">
        <span @click="edit(i)" class="icon pointer edit"><i class="far fa-edit fa-lg"></i></span>
        <span @click="increase_weight(i)" class="icon pointer plus"><i class="far fa-arrow-alt-circle-up fa-lg"></i></span>
        <span @click="decrease_weight(i)" class="icon" :class="e.weight > 1 ? ['minus', 'pointer'] : 'disable'"><i class="far fa-arrow-alt-circle-down fa-lg"></i></span>
        <span @click="delete_element(i)" class="icon pointer delete"><i class="far fa-trash-alt fa-lg"></i></span>
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
        if (this.isStart || this.roullet_elements[index].weight <= 1) { return }
        let weight = this.roullet_elements[index].weight
        if (weight > 1) {
          this.roullet_elements[index].weight --
        }
        this.redraw_roullet()
      },

      redraw_roullet() {
        this.$emit('elements-edited')
      }
    },

  }
</script>

<style lang='scss'>
  .edit {
    color: #FFC3DD;
  }

  .plus {
    color: #7FBBEE;
  }

  .minus {
    color: #FFE588;
  }

  .delete {
    color: #F67F90;
  }

  li {
    list-style: none;
  }

  #elements {
    padding: 20px;
    .el-input {
      width: 100%;
    }
  }

  .flex-center {
    align-items: center;
  }

  .element {
    height: 25px;
  }

  .label {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }

  .title {
    width: 50%;
  }

  .btn-area {
    margin-left: auto;
  }
</style>
