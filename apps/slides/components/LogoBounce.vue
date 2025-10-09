<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const dvdRef = ref<HTMLElement>()

const Logo = {
    angle: 45, // degrees
    speed: 150, // px/sec
    lastTimestamp: 0,
    color: 0, // int in range [0, 3]
    position: {
        x: 0,
        y: 0,
    },
    min: {
        x: 0,
        y: 0,
    },
    max: {
        x: 0,
        y: 0,
    },
    roll(min = 0, max = 1) {
        return Math.random() * (max - min + 1) + min;
    },
    init() {
        if (!dvdRef.value) return

        const padding = 0;
        const element = dvdRef.value
        const screen = element.parentElement

        if (!screen) return

        console.log(element.offsetWidth, screen.offsetWidth);

        console.log(element.offsetHeight, screen.offsetHeight);

        // Randomize position.
        this.min.x = 0;
        this.max.x = 980 - element.offsetWidth;
        this.min.y = 0;
        this.max.y = 552 - element.offsetHeight;

        // Set initial location of element.
        this.position.x = this.roll(this.min.x, this.max.x);
        this.position.y = this.roll(this.min.y, this.max.y);
        this.updateGraphic();

        // Begin first frame of animation.
        this.gameLoop();
    },
    gameLoop(currTimestamp?: number) {
        if (typeof currTimestamp !== 'number') {
            currTimestamp = performance.now();
        }

        // Get delta time (curr vs. last timestamp).
        if (!this.lastTimestamp) {
            this.lastTimestamp = currTimestamp;
        }
        let deltaTime = (currTimestamp - this.lastTimestamp) / 1000; // ms to sec

        // Update previous timestamp for next frame.
        this.lastTimestamp = currTimestamp;

        // Perform per-frame updates (i.e. animate movement of graphic).
        if (!this.position.x) return;
        this.updateGame(deltaTime);

        // Request the next frame.
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    },
    updateGame(deltaTime: number) {
        if (!this.position.x) return;

        const angleRadians = this.angle * (Math.PI / 180);

        // Get velocity.
        const velocityX = this.speed * Math.cos(angleRadians);
        const velocityY = this.speed * Math.sin(angleRadians);

        // Get logo's next coordinate.
        const newX = this.position.x + (velocityX * deltaTime);
        const newY = this.position.y + (velocityY * deltaTime);

        // Detect collision with edge (or a corner???).
        // Bounced off vertical edge?
        if (newX < this.min.x || newX > this.max.x) {
            // Reflect angle along vertical axis.
            this.angle = 180 - this.angle;
            this.normalizeAngle();
            this.cycleColor();
            this.updateGame(deltaTime);
            return;
        }

        // Bounced off horizontal edge?
        if (newY < this.min.y || newY > this.max.y) {
            // Reflect angle along horizontal axis.
            this.angle = -this.angle;
            this.normalizeAngle();
            this.cycleColor();
            this.updateGame(deltaTime);
            return;
        }

        // All is well, so just move graphic to next X/Y coord.
        this.position.x = newX;
        this.position.y = newY;
        this.updateGraphic();
    },
    // Ensure angle is in range [0, 360).
    normalizeAngle() {
        // No less than 0.
        if (this.angle < 0) this.angle += 360;
        // No more than 360.
        this.angle %= 360;
    },
    // Set element's left/top according to its X/Y position.
    updateGraphic() {
        if (!dvdRef.value) return

        dvdRef.value.style.left = this.position.x.toFixed(2) + 'px';
        dvdRef.value.style.top = this.position.y.toFixed(2) + 'px';

        // Apply color using CSS custom properties
        const colors = [
            'var(--theme-color-copper)',
            'var(--theme-color-persianRed)',
            'var(--theme-color-peachOrange)',
            'var(--theme-color-oasis)'
        ];

        dvdRef.value.style.color = colors[this.color];
        dvdRef.value.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
    },
    cycleColor() {
        this.color++;
        if (this.color > 3) {
            this.color = 0;
        }
    },
};

onMounted(() => {
    // Attendre que le DOM soit complètement rendu
    setTimeout(() => {
        Logo.init();
    }, 100);
})

onBeforeUnmount(() => {
    // Pas besoin de cancelAnimationFrame car on utilise la méthode de l'objet Logo
})
</script>

<template>
    <div class="bouncing-logo" ref="dvdRef">
        <p class="text-3xl font-black inline-flex gap-2 "><span class="text-black">TANSTACK</span> <span>QUERY</span>
        </p>
    </div>
</template>

<style scoped>
.bouncing-logo {
    position: absolute;
    width: 250px;
    height: 30px;
    left: 0;
    top: 0;
}

.logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    transition: filter 0.3s ease;
}
</style>