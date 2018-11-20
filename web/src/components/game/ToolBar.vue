<template>
  <div class="toolbar">
    <div class="colors">
      <div v-for="i in colors" @click="setColor(i)" :class="getClasses('color', i, i === color)">{{ i }}</div>
    </div>
    <div class="tools">
      <div v-for="i in tools" @click="setTool(i)" :class="getClasses('tool', i, i === tool)">{{ i }}</div>
    </div>
    <div class="sizes">
      <div v-for="i in sizes" @click="setSize(i)" :class="getClasses('size', i, i === size)">{{ i }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toolbar',
  components: {
  },
  data () {
    return {
      color: null,
      tool: null,
      size: null,
      colors: ['red', 'blue', 'green', 'yellow', 'black'],
      tools: ['brush', 'fill', 'erase', 'clear'],
      sizes: ['small', 'normal', 'large'],
    }
  },
  methods: {
    setColor(color) {
      this.color = color;
    },
    setTool(tool) {
      this.tool = tool;
    },
    setSize(size) {
      this.size = size;
    },
    getClasses(type, option, selected) {
      const classes = {
        selected
      };
      classes[type] = true;
      classes[type + '-' + option] = true;
      return classes;
    },
  },
  beforeMount() {
    this.color = this.colors[0];
    this.tool = this.tools[0];
    this.size = this.sizes[0];
  },
}
</script>

<style>
.toolbar {
  display: flex;
  flex-flow: row;
  width: 100%;
  padding: .5rem 2rem;
  border-top: 1px solid #ccc;
  background: #fff;
  justify-content: space-between;
}

.toolbar .colors,
.toolbar .tools,
.toolbar .sizes {
  display: flex;
  flex-direction: row;
}

.toolbar .tools {
  margin: 0 2rem;
}

.toolbar .colors .color,
.toolbar .tools .tool,
.toolbar .sizes .size {
  margin: 0 .5rem;
  cursor: pointer;
}

.toolbar .colors .color.selected,
.toolbar .tools .tool.selected,
.toolbar .sizes .size.selected {
  border: 1px solid #ccc;
}
</style>
