<template>
<div class="water-background" ref="container">
</div>
</template>
<script>
import * as PIXI from "pixi.js";
import { TweenMax, Power2, TimelineLite } from "gsap/umd/TweenMax";
import fit from "fit.js";
const loader = new PIXI.loaders.Loader();

export default {
  props: {
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 1334
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
    }
  },
  data() {
    return {
      maskFilter: [],
      ripples: []
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    setBackground(bgSize, inputSprite, type, forceSize) {
      const sprite = inputSprite;
      const bgContainer = new PIXI.Container();
      const mask = new PIXI.Graphics()
        .beginFill(0x8bc5ff)
        .drawRect(0, 0, bgSize.x, bgSize.y)
        .endFill();
      bgContainer.mask = mask;
      bgContainer.addChild(mask);
      bgContainer.addChild(sprite);

      let sp = {
        x: sprite.width,
        y: sprite.height
      };
      if (forceSize) sp = forceSize;
      const winratio = bgSize.x / bgSize.y;
      const spratio = sp.x / sp.y;
      let scale = 1;
      const pos = new PIXI.Point(0, 0);
      if (type == "cover" ? winratio > spratio : winratio < spratio) {
        scale = bgSize.x / sp.x;
        pos.y = -(sp.y * scale - bgSize.y) / 2;
      } else {
        scale = bgSize.y / sp.y;
        pos.x = -(sp.x * scale - bgSize.x) / 2;
      }
      sprite.scale = new PIXI.Point(scale, scale);
      sprite.position = pos;

      return sprite;
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
      this.initBackground();
      this.initWave();
    },
    initBackground() {
      const _self = this;
      this.container_1 = new PIXI.Container();

      const bgTexture = loader.resources["background"].texture;
      const bg = new PIXI.Sprite(bgTexture);
      this.con;
      var slide = this.setBackground(
        {
          x: this.width,
          y: this.height
        },
        bg,
        "contain"
      );
      this.container_1.scale.set(1.05);
      this.container_1.position.set(-10, -50);
      this.container_1.addChild(slide);
      this.stage.addChild(this.container_1);
      this.updateCanvas();

      $(window).bind("click touchstart", e => {
        const left = this.$refs.container.getBoundingClientRect().left;
        const top = this.$refs.container.getBoundingClientRect().top;
        var x, y;
        if (e.type === "touchstart" || e.type === "touchmove") {
          x = (e.originalEvent.touches[0].pageX - left) * 1;
          y = (e.originalEvent.touches[0].pageY - top) * 1.8;
        } else {
          x = (e.clientX - left) * 0.5;
          y = e.clientY - top;
        }
        this.onTouch({
          clientX: x,
          clientY: y
        });
      });
    },
    initWave() {
      const _self = this;
      class Wave {
        constructor() {
          this.sprite = new PIXI.Sprite(loader.resources["wave"].texture);
          this.sprite = _self.setBackground(
            {
              x: _self.width,
              y: _self.height
            },
            this.sprite,
            "cover"
          );
          this.sprite.scale.set(1.5);
          this.sprite.anchor.set(0.5);
          this.sprite.position.set(_self.width / 2, _self.height / 2);
          _self.container_1.addChild(this.sprite);
          this.filter = new PIXI.filters.DisplacementFilter(this.sprite);
          _self.updateCanvas();
        }
        start() {
          const _this = this;
          const tl = TweenMax;
          _self.maskFilter.push(_this.filter);
          _self.container_1.filters = [..._self.maskFilter, ..._self.ripples];
          tl.to(this.sprite, 3600, {
            rotation: 360,
            yoyo: true,
            repeat: -1,
            onUpdate: _self.updateCanvas,
            onComplete() {
              _self.renderer.render(_self.stage);
            }
          });
          tl.to(this.sprite.scale, 10, {
            x: 5,
            y: 5,
            yoyo: true,
            repeat: -1,
            onUpdate: _self.updateCanvas,
            onComplete() {
              _self.renderer.render(_self.stage);
            }
          });
          _self.updateCanvas();
        }
      }
      const wave = new Wave();
      wave.start();
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
          const tl = TweenMax;
          if (_self.ripples.length > 2) {
            return;
          }
          _self.ripples.push(ripple.filter);
          _self.container_1.filters = [..._self.maskFilter, ..._self.ripples];
          tl.to(this.sprite.scale, 10, {
            x: 5,
            y: 5,
            onUpdate: _self.updateCanvas,
            onComplete() {
              _this.sprite.visible = false;
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
        .add("background", "img/bk.jpg")
        .add("ripple", "img/ripple.png")
        .add("wave", "img/wave.jpg")
        .load(this.setup);

      this.$refs.container.appendChild(this.renderer.view);
      const watching = fit(this.renderer.view, this.$refs.container, {
        cover: true,
        watch: true,
        vAlign: fit.BOTTOM
      });
      $(window).on("orientationchange", e => {
        setTimeout(() => {
          watching.trigger();
        }, 600);
      });
    }
  }
};
</script>
<style lang="scss">
.water-background {
  position: relative;
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 768px;
  z-index: -1;
  pointer-events: none;
  canvas {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    background-color: transparent;
    transform-origin: center;
  }
}
</style>