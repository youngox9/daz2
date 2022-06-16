
<script>
import fit from "fit.js";
import Vue from "vue";
import VuePlyr from "vue-plyr";
// import "vue-plyr/dist/vue-plyr.css";

Vue.use(VuePlyr);

export default {
  components: {
    VuePlyr
  },
  render(createElement) {
    const config = {
      loop: {
        active: this.loop ? true : false
      },
      rel: false,
      autoplay: false,
      muted: false,
      playsinline: false,
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        // "captions",
        // "settings",
        // "pip",
        // "airplay",
        "fullscreen"
      ],
      events: {
        onReady() {
          console.log("ready");
        }
      }
    };
    const getVideo = () => {
      return createElement(
        "div",
        {
          class: "video-item",
          ref: "container"
        },
        [
          createElement(
            "plyr",
            {
              ref: "video",
              props: {
                video: this.src,
                poster: "",
                crossorigin: true
              },
              options: {
                ...config
              }
            },
            [
              createElement("video", {
                attrs: {
                  src: this.src,
                  type: "video/mp4"
                }
              })
            ]
          )
        ]
      );
    };
    const getYoutube = () => {
      return createElement(
        "div",
        {
          class: "video-item",
          ref: "container"
        },
        [
          createElement("plyr-youtube", {
            ref: "video",
            props: {
              timeupdate: this.onTimeUpdate,
              id: this.src,
              options: {
                ...config
              }
            }
          })
        ]
      );
    };
    switch (this.type) {
      case "youtube":
        return getYoutube();
      case "video":
        return getVideo();
      default:
        return getVideo();
    }
  },
  props: [
    "active",
    "src",
    "type",
    "cover",
    "play",
    "autoplay",
    "loop",
    "muted"
  ],
  methods: {
    onTimeUpdate() {}
  },
  data() {
    return {};
  },
  mounted() {
    this.video = this.$refs.video;
    this.player = this.$refs.video.player;
    this.container = this.$refs.container;
    this.parent = this.$refs.container.parentNode;
    console.log(this);
    if (this.cover) {
      this.parent.style.overflow = "hidden";
      fit(this.container, this.parent, {
        cover: true,
        watch: true,
        apply: true
      });
    }
    this.$on("play", () => {
      this.player.play();
    });
    this.$on("stop", () => {
      this.player.stop();
    });
  },
  watch: {
    active: {
      handler(val, oldVal) {
        console.log(val);
        if (this.player) {
          if (val) {
            this.player.play();
          } else {
            this.player.stop();
          }
        }
      },
      immediate: true,
      deep: true
    },
    src(val, oldval) {
      this.reload = true;
      this.src = val;
      if (this.player) {
        if (this.type === "youtube") {
          this.player.embed.loadVideoById(val);
        } else {
        }
      }
    }
  }
};
</script>

<style scoped>
.plyr {
  min-width: 0px;
  overflow: hidden;
  margin-bottom: -1px;
}
</style>