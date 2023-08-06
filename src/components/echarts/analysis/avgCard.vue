<template>
  <div
    style="
      display: flex;
      text-align: left;
      margin-top: 19px;
      justify-content: space-around;
    "
  >
    <div class="blog-card">
      <div class="meta">
        <div
          class="photo"
          style="
            background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg);
          "
        ></div>
      </div>
      <div class="description">
        <h1>平均销售额</h1>
        <h2>采取策略前</h2>
        <p style="text-align: left; font-size: 30px" v-loading="before_after[2]">
          {{ parseFloat(before_after[0]).toFixed(2) }}RMB
        </p>
      </div>
    </div>
    <div class="blog-card alt">
      <div class="meta">
        <div
          class="photo"
          style="
            background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg);
          "
        ></div>
      </div>
      <div class="description">
        <h1>平均销售额</h1>
        <h2>采取策略后</h2>
        <p style="text-align: left; font-size: 30px" v-loading="before_after[2]">
          {{ parseFloat(before_after[1]).toFixed(2) }}RMB
        </p>
      </div>
    </div>
  </div>
  <div  style="
      display: flex;
      text-align: left;
      margin-top: 19px;
      justify-content: space-around;
    ">
    <div class="blog-card">
      <div class="meta">
        <div
          class="photo"
          style="
            background-image: url(/img/895.jpg);
          "
        ></div>
      </div>
      <div class="description">
        <h1>平均间隔</h1>
        <h2>采取策略前</h2>
        <p style="text-align: left; font-size: 30px" v-loading="before_after_diff[2]">
          {{ parseFloat(before_after_diff[0]).toFixed(0) }}日
        </p>
      </div>
    </div>
    <div class="blog-card alt">
      <div class="meta">
        <div
          class="photo"
          style="
            background-image: url(/img/987.jpg);
          "
        ></div>
      </div>
      <div class="description">
        <h1>平均间隔</h1>
        <h2>采取策略后</h2>
        <p style="text-align: left; font-size: 30px" v-loading="before_after_diff[2]">
          {{ parseFloat(before_after_diff[1]).toFixed(0) }}日
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  before_after: {
    type: Array,
    default: [0, 0,true],
  },
  before_after_diff: {
    type: Array,
    default: [0, 0,true],
  },
});
</script>

<style scope>
@charset "UTF-8";

.blog-card {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.6%;
  background: #fff;
  line-height: 1.4;
  font-family: sans-serif;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;
  width: 590px;
}
.blog-card a {
  color: inherit;
}
.blog-card a:hover {
  color: #5ad67d;
}
.blog-card:hover .photo {
  transform: scale(1.3) rotate(3deg);
}
.blog-card .meta {
  position: relative;
  z-index: 0;
  height: 200px;
}
.blog-card .photo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.2s;
}

.blog-card .description {
  padding: 1rem;
  background: #fff;
  position: relative;
  z-index: 1;
}
.blog-card .description h1,
.blog-card .description h2 {
  font-family: Poppins, sans-serif;
}
.blog-card .description h1 {
  line-height: 1;
  margin: 0;
  font-size: 1.7rem;
}
.blog-card .description h2 {
  font-size: 1rem;
  font-weight: 300;
  text-transform: uppercase;
  color: #a2a2a2;
  margin-top: 5px;
}
.blog-card .description .read-more {
  text-align: right;
}
.blog-card .description .read-more a {
  color: #5ad67d;
  display: inline-block;
  position: relative;
}
.blog-card .description .read-more a:after {
  content: "";
  font-family: FontAwesome;
  margin-left: -10px;
  opacity: 0;
  vertical-align: middle;
  transition: margin 0.3s, opacity 0.3s;
}
.blog-card .description .read-more a:hover:after {
  margin-left: 5px;
  opacity: 1;
}
.blog-card p {
  position: relative;
  margin: 1rem 0 0;
}
.blog-card p:first-of-type {
  margin-top: 1.25rem;
}
.blog-card p:first-of-type:before {
  content: "";
  position: absolute;
  height: 5px;
  background: #5ad67d;
  width: 35px;
  top: -0.75rem;
  border-radius: 3px;
}
.blog-card:hover .details {
  left: 0%;
}
@media (min-width: 640px) {
  .blog-card {
    flex-direction: row;
    max-width: 700px;
  }
  .blog-card .meta {
    flex-basis: 40%;
    height: auto;
  }
  .blog-card .description {
    flex-basis: 60%;
  }
  .blog-card .description:before {
    transform: skewX(-3deg);
    content: "";
    background: #fff;
    width: 30px;
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
  .blog-card.alt {
    flex-direction: row-reverse;
  }
  .blog-card.alt .description:before {
    left: inherit;
    right: -10px;
    transform: skew(3deg);
  }
  .blog-card.alt .details {
    padding-left: 25px;
  }
}
</style>