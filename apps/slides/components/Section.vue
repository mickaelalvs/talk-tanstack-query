<script setup>
defineProps({
    title: { type: String, required: true },
    icon: { type: String, required: true },
    variant: { type: String, default: 'default' } // default, concept, highlight
})
</script>

<template>
    <div class="section" :class="`section-${variant}`">
        <div class="section-header">
            <span class="section-icon">{{ icon }}</span>
            <h3>{{ title }}</h3>
        </div>
        <div class="section-content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.section {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid rgba(16, 24, 40, 0.08);
    box-shadow: 0 3px 8px rgba(16, 24, 40, 0.05);
    overflow: hidden;
    margin-bottom: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
}

.section-header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e5e7eb 100%);
    padding: 12px 16px;
    border-bottom: 1px solid rgba(16, 24, 40, 0.08);
    display: flex;
    align-items: center;
    gap: 8px;
}

.section-header h3 {
    font-size: 16px;
    font-weight: 700;
    color: #101828;
    margin: 0;
}

.section-icon {
    font-size: 18px;
}

.section-content {
    padding: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
}

/* Variant concept avec highlight spécial */
.section-concept .section-content {
    padding: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
}

.concept-highlight {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid #f59e0b;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.concept-label {
    font-size: 14px;
    font-weight: 600;
    color: #92400e;
}

.concept-name {
    font-size: 16px;
    font-weight: 700;
    color: #b45309;
    font-family: 'Fira Code', monospace;
}

.concept-description {
    font-size: 14px;
    line-height: 1.6;
    color: #374151;
}

/* Variant highlight pour les avantages */
.section-highlight .section-header {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-bottom-color: #0ea5e9;
}

.section-highlight .section-header h3 {
    color: #0c4a6e;
}

/* Responsive */
@media (max-width: 768px) {
    .section-content {
        padding: 16px;
    }

    .section-header {
        padding: 10px 14px;
    }

    .section-header h3 {
        font-size: 14px;
    }

    .section-icon {
        font-size: 16px;
    }
}
</style>
