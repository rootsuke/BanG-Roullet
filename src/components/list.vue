<template>
  <div id="elements">
    <div v-for="(e, i) in roullet_elements" :key="i" class="element flex flex-center">
      <div :style="{'background-color': e.color}" class="label"></div>
      <div class="title">
        <el-input v-if="e.isEdit" v-model="e.title" @keypress.enter.native="e.isEdit = false" type="text" size="mini"></el-input>
        <div v-else class="title">{{ e.title }}</div>
      </div>
      <div v-if="!isStart" class="btn-area">
        <span @click="e.isEdit = true" class="icon edit"><i class="far fa-edit fa-lg"></i></span>
        <span @click="delete_element(i)" class="icon delete"><i class="far fa-trash-alt fa-lg"></i></span>
        <span @click="increase_weight(i)" class="icon plus"><i class="far fa-arrow-alt-circle-up fa-lg"></i></span>
        <span v-if="e.weight > 1" @click="decrease_weight(i)" class="icon minus"><i class="far fa-arrow-alt-circle-down fa-lg"></i></span>
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

      increase_weight(index) {
        this.roullet_elements[index].weight ++
        this.redraw_roullet()
      },

      decrease_weight(index) {
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
  .icon {
    margin-left: 5px;
    cursor: pointer;
    :hover {
      color: aqua;
    }
  }

  

  li {
    list-style: none;
  }

  #elements {
    margin-top: 10px;
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
