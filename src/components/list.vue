<template>
  <div id="elements">
      <div v-for="(e, i) in roullet_elements" :key="i" class="element flex flex-center">
        <div :style="{'background-color': e.color}" class="label"></div>
        <div class="title">
          <input v-if="e.isEdit" v-model="e.title" @keypress.enter="e.isEdit = false" type="text">
          <div v-else class="title">{{ e.title }}</div>
        </div>
        <div v-if="!isStart" class="btn-area">
          <button @click="e.isEdit = true">編集</button>
          <button @click="delete_element(i)">削除</button>
          <button @click="increase_weight(i)"> + </button>
          <button v-if="e.weight > 1" @click="decrease_weight(i)"> - </button>
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
        const color = this.roullet_elements[index].color;
        // 要素の削除
        this.roullet_elements.splice(index, 1);
        const len = this.roullet_elements.length;

        if (len > 0) {
          // 削除する要素に使われている色を再度使えるようにする
          this.colors.push(color);
          // ルーレットを描画し直す
          this.redraw_roullet();
        } else if (len == 0) {
          // 最後の要素を削除するときはルーレットの表示だけはそのままにする
          // 最後の要素に使われていた色から始まるようにする
          this.colors.unshift(color);
        }
      },

      increase_weight(index) {
        this.roullet_elements[index].weight ++;
        this.redraw_roullet();
      },

      decrease_weight(index) {
        let weight = this.roullet_elements[index].weight;
        if (weight > 1) {
          this.roullet_elements[index].weight --;
        }
        this.redraw_roullet();
      },

      redraw_roullet() {
        this.$emit('elements-edited');
      }
    },

  }
</script>

<style>
  li {
    list-style: none;
  }

  #elements {
    margin-top: 20px;
    width: 400px;
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
    width: 40%;
  }

  .btn-area {
    margin-left: 20px;
  }
</style>
