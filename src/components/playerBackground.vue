<template>
  <div class="player-background" :width="width" :height="height" ref="container" ></div>
</template>
<script>
import * as PIXI from "pixi.js";
import { TweenMax, Power2, TimelineLite } from "gsap/umd/TweenMax";
const tl = TweenMax;
const loader = new PIXI.loaders.Loader();

export default {
  props: {
    width: {
      type: Number,
      default: 1366
    },
    height: {
      type: Number,
      default: 768
    },
    maskImage: {
      type: String,
      default: ""
    },
    backgroundImage: {
      type: String,
      default: ""
    },
    rippleImage: {
      type: String,
      default: ""
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      maskFilter: [],
      ripples: [],
      w: 0,
      h: 0
    };
  },
  watch: {
    active(val) {
      this.togglePlayer(val);
    }
  },
  created() {},
  mounted() {
    this.w = this.width;
    this.h = this.height;
    this.init();
  },
  methods: {
    togglePlayer(val) {
      const toggle = () => {
        if (val) {
          tl.to(this.container_2, 1.2, {
            alpha: 1,
            y: 0,
            ease: Bounce.easeOut,
            onUpdate: this.updateCanvas
          });
        } else {
          tl.to(this.container_2, 1.4, {
            alpha: 0,
            y: -200,
            ease: Elastic.easeOut,
            onUpdate: this.updateCanvas
          });
        }
      };
      const timer = setInterval(() => {
        if (this.container_2) {
          clearInterval(timer);
          toggle();
          return;
        }
      }, 300);
    },
    setImage(obj, w, x, y, anchor) {
      if (anchor) {
        obj.anchor.set(anchor.x, anchor.y);
      } else {
        obj.anchor.set(0.5);
      }
      const base = obj.texture.baseTexture;
      const ww = this.width * w;
      const hh = ww * base.realHeight / base.realWidth;
      const scaleX = ww / base.realWidth;
      const scaleY = hh / base.realHeight;
      const anchorX = anchor ? anchor.x : 0.5;
      const anchorY = anchor ? anchor.y : 0.5;
      obj.x = this.width * x + ww * anchorX;
      obj.y = this.height * y + hh * anchorY;
      obj.rotation = 0;
      obj.scale.set(scaleX, scaleY);
    },
    setup() {
      const _self = this;
      this.initPlayer();
      this.updateCanvas();
    },
    initPlayer() {
      const _self = this;
      class Player {
        constructor() {
          this.sprite = new PIXI.Sprite(loader.resources["player"].texture);

          _self.setImage(this.sprite, 1, 0, -0.09);
        }
      }
      class Spin {
        constructor() {
          this.sprite = new PIXI.Sprite(loader.resources["spin"].texture);
          _self.setImage(this.sprite, 0.34, 0.275, 0.04, { x: 0.9, y: 0.12 });
          this.start();
        }
        start() {
          tl.to(this.sprite, 6, {
            rotation: 0.12,
            ease: Power1.easeIn,
            repeat: -1,
            yoyo: true,
            onUpdate: this.updateCanvas
          });
        }
      }
      class Record {
        constructor() {
          this.sprite = new PIXI.Sprite(loader.resources["record"].texture);
          _self.setImage(this.sprite, 0.4, 0.18, 0.015);
          this.sprite.interactive = true;
          this.sprite.buttonMode = true;
          this.start();
          this.sprite.on("pointerdown", this.break.bind(this));
        }
        start() {
          tl.to(this.sprite, 100, {
            rotation: "+=360",
            ease: Power1.easeIn,
            onUpdate: _self.updateCanvas,
            onComplete: this.go.bind(this)
          });
        }
        go() {
          tl.to(this.sprite, 100, {
            rotation: "+=360",
            ease: Linear.easeNone,
            repeat: -1,
            onUpdate: _self.updateCanvas
          });
        }
        break() {
          const _this = this;
          if (!this.isBreak) {
            this.isBreak = true;

            tl.to(this.sprite, 1.2, {
              rotation: this.sprite.rotation * 0.89,
              ease: Elastic.easeOut,
              onUpdate: this.updateCanvas,
              onComplete() {
                _this.isBreak = false;
                _this.start();
              }
            });
          }
        }
      }

      const rec = new Record().sprite;
      const spin = new Spin().sprite;
      const player = new Player().sprite;
      this.container_2 = new PIXI.Container();
      this.container_2.alpha = 1;
      this.container_2.addChild(player, rec, spin);
      this.togglePlayer(this.active);
      this.stage.addChild(this.container_2);
    },

    onTouch(ev) {
      const _self = this;
      class Ripple {
        constructor(x, y) {
          this.sprite = new PIXI.Sprite(loader.resources["ripple"].texture);
          this.sprite.anchor.set(0.5);
          this.sprite.position.set(x, y);
          this.sprite.scale.set(0);
          _self.container_1.addChild(this.sprite);
          this.filter = new PIXI.filters.DisplacementFilter(this.sprite);
        }
        start() {
          const _this = this;

          if (_self.ripples.length > 2) {
            return;
          }
          _self.ripples.push(ripple.filter);
          _self.container_1.filters = [..._self.maskFilter, ..._self.ripples];
          tl.to(this.sprite.scale, 4, {
            x: 5,
            y: 5,
            onUpdate: _self.updateCanvas,
            onComplete() {
              _this.sprite.scale.set(0, 0);
              _self.ripples.splice(0, 1);
              _self.renderer.render(_self.stage);
            }
          });
          _self.updateCanvas();
        }
      }
      const ripple = new Ripple(ev.clientX, ev.clientY);
      ripple.start();
    },
    updateCanvas() {
      const _self = this;
      _self.renderer.render(_self.stage);
    },
    init() {
      this.stage = new PIXI.Container();
      this.renderer = PIXI.autoDetectRenderer(this.width, this.height, {
        transparent: true
      });

      loader
        .add("player", "img/r_box02.png")
        .add("record", "img/record.png")
        .add("spin", "img/r_box01.png")
        .load(this.setup);
      this.$refs.container.appendChild(this.renderer.view);
    }
  }
};
</script>
<style  lang="scss">
.player-background {
  position: absolute;
  top: 0;
  left: 0;
  left: 0;
  top: 0;
  overflow: visible;
  canvas {
    display: block;
    width: 100%;
    height: 100%;
    transform-origin: center -5%;
    transform: scale(1.2);
  }
}
</style>