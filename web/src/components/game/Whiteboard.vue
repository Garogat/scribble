<template>
  <div id='whiteboard'></div>
</template>

<script>
export default {
  name: 'whiteboard',
  data () {
    return {
      mouse: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: 0,
          y: 0
        },
        down: false
      },
      ctx: null,
    }
  },
  computed: {
    currentMouse: function () {
      let c = document.getElementById('canvas');
      let rect = c.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top
      }
    }
  },
  methods: {
    loadCanvas(id) {
      let div = document.getElementById(id);
      let canvas = document.createElement('canvas');

      canvas.id     = 'canvas';
      canvas.width  = div.offsetWidth;
      canvas.height = div.offsetHeight;
      canvas.addEventListener('mouseup', this.handleMouseUp);
      canvas.addEventListener('mousedown', this.handleMouseDown);
      canvas.addEventListener('mousemove', this.handleMouseMove);

      div.appendChild(canvas);

      this.ctx = canvas.getContext('2d');
      this.ctx.translate(0.5, 0.5);
      this.ctx.imageSmoothingEnabled = false;
    },
    draw(event) {
      // requestAnimationFrame(this.draw);
      if (this.mouse.down) {
        this.ctx.clearRect(0, 0, 800, 800);

        this.ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
        this.ctx.strokeStyle = '#F63E02';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      }
    },
    handleMouseDown(event) {
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      }

      this.ctx.moveTo(this.currentMouse.x, this.currentMouse.y)
    },
    handleMouseUp() {
      this.mouse.down = false;
    },
    handleMouseMove(event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      }

      this.draw(event);
    }
  },
  mounted() {
    this.loadCanvas('whiteboard');
  },
}
</script>

<style>
#whiteboard {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}
</style>
