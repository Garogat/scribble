<template>
  <div class="board">
    <div id="whiteboard"></div>
    <ToolBar></ToolBar>
  </div>
</template>

<script>
import api from '@/api';
import ToolBar from '@/components/game/ToolBar';

export default {
  name: 'whiteboard',
  components: {
    ToolBar,
  },
  data () {
    return {
      width: 0,
      height: 0,
      mouse: null,
      isDrawing: false,
      points: [],
      ctx: null,
      brushSize: 5,
      brushColor: "#df4b26",
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
      canvas.addEventListener('mouseleave', this.handleMouseLeave);

      this.width = canvas.width;
      this.height = canvas.height;

      div.appendChild(canvas);

      this.ctx = canvas.getContext('2d');
      this.ctx.translate(0.5, 0.5);
      this.ctx.imageSmoothingEnabled = false;

      this.ctx.strokeStyle = "#df4b26";
      this.ctx.lineWidth = 5;
      this.ctx.lineJoin = "round";
    },
    getMouseCoordinates(event) {
      let canvas = document.getElementById('canvas');
      let boundings = canvas.getBoundingClientRect();
      return {
        x: event.clientX - boundings.left,
        y: event.clientY - boundings.top,
      };
    },
    drawPoint(x, y, mode) {
      this.points.push({
        x: x,
        y: y,
        size: this.brushSize,
        color: this.brushColor,
        mode: mode,
      });

      if (mode === "begin") {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
      } else if (mode === "move") {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      } else {
        this.ctx.closePath();
      }
    },
    redrawAll() {
      if (this.points.length == 0) {
        return;
      }
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (var i = 0; i < this.points.length; i++) {
          var pt = this.points[i];
          var begin = false;
          if (this.ctx.lineWidth !== pt.size) {
            this.ctx.lineWidth = pt.size;
            begin = true;
          }
          if (this.ctx.strokeStyle !== pt.color) {
            this.ctx.strokeStyle = pt.color;
            begin = true;
          }
          if (pt.mode === 'begin' || begin) {
            this.ctx.beginPath();
            this.ctx.moveTo(pt.x, pt.y);
          }
          this.ctx.lineTo(pt.x, pt.y);
          if (pt.mode === 'end' || (i == this.points.length - 1)) {
            this.ctx.stroke();
          }
      }
      this.ctx.stroke();
    },
    undo() {
      while (true) {
        if (this.points[this.points.length - 1].mode === 'begin') {
          break;
        }
        this.points.pop();
      }
      this.redrawAll();
    },
    handleMouseDown(event) {
      const { x, y } = this.getMouseCoordinates(event);
      this.isDrawing = true;
      this.drawPoint(x, y, 'begin');
      api.send('draw:point', { x, y, mode: 'begin' });
    },
    handleMouseUp(event) {
      const { x, y } = this.getMouseCoordinates(event);
      this.isDrawing = false;
      this.drawPoint(x, y, 'end');
      api.send('draw:point', { x, y, mode: 'end' });
    },
    handleMouseLeave(event) {
      const { x, y } = this.getMouseCoordinates(event);
      this.isDrawing = false;
      this.drawPoint(x, y, 'end');
      api.send('draw:point', { x, y, mode: 'end' });
    },
    handleMouseMove(event) {
      const { x, y } = this.getMouseCoordinates(event);
      if (this.isDrawing) {
        this.drawPoint(x, y, 'move');
        api.send('draw:point', { x, y, mode: 'move' });
      }
    },
    handleKeyDown(event) {
      // ctrl-z for undo
      if (event.keyCode === 90 && event.ctrlKey) {
        this.undo();
        api.send('draw:undo');
      }

      if (event.altKey) {
        this.redrawAll();
      }
    },
  },
  mounted() {
    this.loadCanvas('whiteboard');
    api.on('draw:point', ({ x, y, mode}) => {
      this.drawPoint(x, y, mode);
    });

    api.on('draw:undo', ({ x, y, mode}) => {
      this.undo();
    });

    let lastDownTarget;
    document.addEventListener('mousedown', (event) => {
      lastDownTarget = event.target;
    }, false);

    document.addEventListener('keydown', (event) => {
      if(lastDownTarget === canvas) {
        this.handleKeyDown(event);
      }
    }, false);
  },
}
</script>

<style>
.board {
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
}

#whiteboard {
  flex-grow: 1;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}
</style>
