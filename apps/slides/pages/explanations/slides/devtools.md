---
title: "🛠️ DevTools - Meilleure DevX"
layout: basic-title
transition: fade
mdc: true
---

::title::
🛠️ DevTools - Meilleure DevEx

::default::

<div class="images-container">
  <div class="image-stack">
    <img src="../assets/devtools.png" alt="DevTools Vue d'ensemble" class="stacked-image image-1" v-click="1" />
    <img src="../assets/floating-devtools.png" alt="DevTools Détail query" class="stacked-image image-2" v-click="1" />
  </div>
</div>

<style scoped>
.images-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 2rem;
  padding-top: 10rem;
}

.image-stack {
  position: relative;
  width: 600px;
  height: 400px;
}

.stacked-image {
  position: absolute;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  max-width: 500px;
  height: auto;
}

.image-1 {
  top: 0;
  left: -100px;
  z-index: 3;
}

.image-2 {
  top: 60px;
  left: 200px;
  z-index: 2;
  transform: rotate(2deg);
}
</style>
