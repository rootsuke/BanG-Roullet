<template>
  <div id="elements">
      <div v-for="(e, i) in roullet_elements" :key="i" class="element flex">
        <div :style="{'background-color': e.color}" class="label"></div>
        <div v-if="!e.isEdit" class="title">{{ e.title }}</div>
        <input v-if="e.isEdit" v-model="e.title" @keypress.enter="e.isEdit = false" type="text">
        <div v-if="!isStart" class="btn-area">
          <button @click="e.isEdit = true">編集</button>
          <button @click="delete_element(i)">削除</button>
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
          this.$emit('delete-element');
        } else if (len == 0) {
          // 最後の要素を削除するときはルーレットの表示だけはそのままにする
          // 最後の要素に使われていた色から始まるようにする
          this.colors.unshift(color);
        }
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
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .element {
    width: 300px;
    height: 25px;
  }

  .label {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }

  .btn-area {
    margin-left: auto;
  }
</style>
