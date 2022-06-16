<script>
import $ from "jquery";
import Vue from "vue";
import Flickity from "vue-flickity";

export default {
  props: ["index", "onchange", "active", "autoplay", "width"],
  components: {
    Flickity
  },
  render(createElement) {
    if (!this.$slots.default) {
      return;
    }
    const children =
      this.$slots && this.$slots.default.length
        ? this.$slots.default.filter((vnode, i) => {
            // if (!vnode.componentOptions) {
            //   vnode.componentOptions = {
            //     propsData: {}
            //   };
            // }
            // vnode.componentOptions.propsData.active = this.activeIndex === i;
            return vnode.tag;
          })
        : [];
    const carousel = createElement(
      "flickity",
      {
        ref: "flickity",
        class: `flickity ${this.isDrag ? "is-drag" : ""}`,
        props: {
          options: this.flickityOptions
        }
      },
      [
        children.map((slot, i) => {
          return createElement(
            "div",
            {
              class: "carousel-cell",
              style: {
                width: this.width
              }
            },
            [slot]
          );
        })
      ]
    );
    if (children.length <= 0) {
      return null;
    }
    return carousel;
  },
  data() {
    return {
      isDrag: false,
      activeIndex: 0,
      flickityOptions: {
        wrapAround: true,
        initialIndex: 0,
        fullscreen: true,
        autoPlay: 3000,
        adaptiveHeight: true,
        on: {
          change: this.onSlideChange,
          dragStart: this.onDragStart,
          dragEnd: this.onDragEnd
        }
      }
    };
  },
  created() {},
  mounted() {
    if (this.$refs.flickity) {
      this.$flickity = this.$refs.flickity;
      this.flickity = this.$flickity.$flickity;
      if (this.autoplay) {
        this.flickity.playPlayer();
      } else {
        this.flickity.stopPlayer();
      }
    }
  },
  updated() {
    if (this.$refs.flickity) {
      this.flickity.reloadCells();
    }
  },
  methods: {
    videoEvent(video, event) {
      if (video) {
        switch (video.tagName.toLowerCase()) {
          case "video":
            event === "play" ? video.play() : video.pause();
            break;
          case "iframe":
            video.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: event === "play" ? "playVideo" : "pauseVideo"
              }),
              "*"
            );
            break;
        }
      }
    },
    playSlideVideo(index) {
      const $element = $(this.flickity.element);
      const $target = $(this.flickity.selectedElement);
      const videoElems = $target.find("video,iframe");
      const otherElems = $element.find("video,iframe").not(videoElems);
      videoElems.each((index, video) => {
        this.videoEvent(video, "play");
      });
      otherElems.each((index, video) => {
        this.videoEvent(video, "pause");
      });
    },
    onDragStart(e) {
      this.isDrag = true;
    },
    onDragEnd(e) {
      this.isDrag = false;
    },
    onSlideChange(index) {
      this.flickity.reloadCells();
      this.playSlideVideo();
      if (typeof this.onchange === "function") {
        this.onchange(index);
      }
    }
  },
  watch: {
    index(val, oldval) {
      this.flickity.select(val);
    },
    active(val, oldval) {
      if (val) {
        this.flickity.stopPlayer();
        this.flickity.playPlayer();
      } else {
        this.flickity.select(0);
        this.flickity.stopPlayer();
      }
    }
  }
};
</script>


<style lang="scss">
.carousel-cell {
  width: 100%;
}

.flickity {
  position: relative;
  &.is-drag {
    pointer-events: none;
    iframe,
    video {
      pointer-events: none;
    }
  }
}

.flickity-viewport {
  transition: 0.3s ease height;
}

.flickity-page-dots {
  position: absolute;
  bottom: 2%;
  .dot {
    transition: 0.3s ease all;
    background-color: #c0ccd8;
    &.is-selected {
      transform: scale(1.2);
      background-color: #6e83a0;
    }
  }
}
</style>