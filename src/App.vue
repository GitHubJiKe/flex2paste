<template>
  <div id="app">
    <h2 style="text-align:center;">Flex2Paste</h2>
    <div class="options">
      <div class="options-inner">
        <h3>flex-direction</h3>
        <option-item v-for="item in directions" :item="item" :key="item.value" :onClick="setStyle"/>
      </div>
      <div class="options-inner">
        <h3>flex-wrap</h3>
        <option-item v-for="item in wraps" :item="item" :key="item.value" :onClick="setStyle"/>
      </div>
      <div class="options-inner">
        <h3>justify-content</h3>
        <option-item
          v-for="item in justifyContents"
          :item="item"
          :key="item.value"
          :onClick="setStyle"
        />
      </div>
      <div class="options-inner">
        <h3>align-items</h3>
        <option-item v-for="item in alignItems" :item="item" :key="item.value" :onClick="setStyle"/>
      </div>
      <div class="options-inner">
        <h3>align-content</h3>
        <option-item
          v-for="item in alignContents"
          :item="item"
          :key="item.value"
          :onClick="setStyle"
        />
      </div>
    </div>
    <div class="btns">
      <button
        @click="copyCode"
        id="copyBtn"
        data-clipboard-action="copy"
        data-clipboard-target="pre"
      >copy code</button>
      <button @click="resetStyle">reset</button>
      <button @click="addItem">add item</button>
      <button @click="removeItem">remove item</button>
    </div>
    <div class="content">
      <pre class="mycode">{{targetStyleStr}}</pre>
      <div class="view" :style="targetStyleObj">
        <Item v-for="v in itemsObj" :key="v.index" :value="v.index"/>
      </div>
    </div>
    <modal2vue/>
  </div>
</template>

<script>
import Item from './components/Item.vue'
import OptionItem from './components/OptionItem.vue'
import ClipboardJS from "clipboard";
export default {
  name: 'app',
  data() {
    return {
      directions: [
        {
          name: 'flex-direction',
          value: 'row'
        },
        {
          name: 'flex-direction',
          value: 'row-reverse'
        },
        {
          name: 'flex-direction',
          value: 'column'
        },
        {
          name: 'flex-direction',
          value: 'column-reverse'
        }
      ],
      wraps: [
        {
          name: 'flex-wrap',
          value: 'nowrap'
        },
        {
          name: 'flex-wrap',
          value: 'wrap-reverse'
        },
        {
          name: 'flex-wrap',
          value: 'wrap'
        }
      ],
      justifyContents: [
        {
          name: 'justify-content',
          value: 'flex-start'
        },
        {
          name: 'justify-content',
          value: 'flex-end'
        },
        {
          name: 'justify-content',
          value: 'center'
        },
        {
          name: 'justify-content',
          value: 'space-between'
        },
        {
          name: 'justify-content',
          value: 'space-around'
        },
        {
          name: 'justify-content',
          value: 'space-evenly'
        },
      ],
      alignItems: [
        {
          name: 'align-items',
          value: 'flex-start'
        },
        {
          name: 'align-items',
          value: 'flex-end'
        },
        {
          name: 'align-items',
          value: 'center'
        },
        {
          name: 'align-items',
          value: 'baseline'
        },
        {
          name: 'align-items',
          value: 'stretch'
        },
      ],
      alignContents: [
        {
          name: 'align-content',
          value: 'flex-start'
        },
        {
          name: 'align-content',
          value: 'flex-end'
        },
        {
          name: 'align-content',
          value: 'center'
        },
        {
          name: 'align-content',
          value: 'space-between'
        },
        {
          name: 'align-content',
          value: 'space-around'
        },
        {
          name: 'align-content',
          value: 'stretch'
        },
      ],
      targetStyle: {},
      items: 3
    }
  },
  components: {
    Item,
    OptionItem
  },
  methods: {
    setStyle(style) {
      this.targetStyle = { ...this.targetStyle, ...style };
    },
    addItem() {
      if (this.items > 20) {
        return $modal2vue.onopen({
          title: "Warning",
          message: 'already to Max num!',
          type: 'warning'
        });
      }
      this.items++;
    },
    removeItem() {
      if (this.items === 1) {
        return $modal2vue.onopen({
          title: "Warning",
          message: "alreay to Min num",
          type: 'warning'
        });
      }
      this.items--;
    },
    copyCode() {
      new ClipboardJS("#copyBtn")
      $modal2vue.onopen({
        title: "Success",
        message: "Already copied!",
        type: 'success',
        showCancel: false
      });
    },
    resetStyle() {
      this.targetStyle = {};
    }
  },
  computed: {
    targetStyleStr() {
      return JSON.stringify(this.targetStyle, null, "\t");
    },
    targetStyleObj() {
      let obj = {};
      Object.keys(this.targetStyle).forEach(key => {
        const [pre, end] = key.split("-");
        const upperCase = end[0].toUpperCase();
        const _key = `${pre}${upperCase}${end.substr(1, end.length)}`;
        obj[_key] = this.targetStyle[key];
      });
      return obj;
    },
    itemsObj() {
      let obj = [];
      for (let index = 0; index < this.items; index++) {
        obj.push({ index })
      }
      return obj;
    }
  }
}
</script>

<style>
#app {
  padding: 20px;
  background-color: #fff1f0;
}
.options {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
}
.options-inner {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: stretch;
}
.content {
  position: relative;
  top: 20px;
  width: 100%;
  min-height: 400px;
  border: 1px solid #bbbbbb;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.mycode {
  flex: 2;
  background-color: #595959;
  color: white;
  margin: 0;
  padding: 10px;
  font-size: 15pt;
}
.view {
  flex: 4;
  border-left: 1px solid #bbbbbb;
  display: flex;
  background-color: #283137;
  color: white;
}
.btns {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.btns button {
  width: 200px;
  height: 40px;
  border: 1px solid #1890ff;
  background-color: #1890ff;
  color: white;
  border-radius: 5px;
  font-size: 15pt;
}
</style>
