<script setup>
import { useSlots } from 'vue'
import Background from '../components/Background.vue'
import TanstackCorner from '../components/decorations/TanstackCorner.vue'
import Section from '../components/Section.vue'

const props = defineProps({
    ticketNumber: { type: String, default: () => `#${Math.floor(Math.random() * 9000) + 1000}` },
    solutionTitle: { type: String, required: true },
    concept: { type: String, required: true },
    priority: { type: String, default: 'medium' },
    status: { type: String, default: 'resolved' }
})

const slots = useSlots()
</script>

<template>
    <Background />
    <div class="solution-root">
        <div class="solution-container card">
            <div class="solution-header">
                <div class="solution-title-section">
                    <h1 class="solution-title">✅ Solution TanStack Query</h1>
                    <div class="ticket-reference">
                        <span class="ticket-icon">🎫</span>
                        <span>{{ ticketNumber }}</span>
                    </div>
                </div>
                <div class="solution-status">
                    <div class="status-badge" :class="`status-${status}`">
                        <span class="status-icon">✅</span>
                        <span>{{ status === 'resolved' ? 'Résolu' : status }}</span>
                    </div>
                </div>
            </div>

            <div class="solution-title-main">
                <h2 class="main-title">{{ solutionTitle }}</h2>
            </div>

            <div class="solution-content">
                <slot name="content" />
            </div>

            <div class="solution-footer">
                <div class="solution-timestamp">
                    <span class="timestamp-icon">🕒</span>
                    <span>Solution fournie le {{ new Date().toLocaleDateString('fr-FR') }}</span>
                </div>
                <div class="solution-team">
                    <span class="team-icon">👨‍💻</span>
                    <span>Équipe TanStack Query</span>
                </div>
            </div>
        </div>
    </div>
    <TanstackCorner class="z-10" />
</template>

<style scoped>
.card {
    view-transition-name: card;
}

.solution-root {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
}

.solution-container {
    width: 100%;
    max-width: 1000px;
    height: 490px;
    margin: 0 100px;
    background: linear-gradient(135deg, rgba(248, 249, 250, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%);
    border-radius: 20px;
    box-shadow:
        0 20px 40px rgba(16, 24, 40, 0.15),
        0 8px 16px rgba(16, 24, 40, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(16, 24, 40, 0.12);
    overflow: hidden;
    font-family: 'League Spartan', sans-serif;
    backdrop-filter: blur(10px);
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
}

/* Header de la solution */
.solution-header {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    padding: 10px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    position: relative;
}

.solution-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    opacity: 0.3;
}

.solution-title-section {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 1;
}

.solution-title {
    font-size: 15px;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.ticket-reference {
    font-size: 12px;
    font-weight: 500;
    opacity: 0.9;
    margin-top: 2px;
    font-family: 'Fira Code', monospace;
    background: rgba(255, 255, 255, 0.15);
    padding: 2px 8px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.ticket-icon {
    font-size: 10px;
}

.solution-status {
    position: relative;
    z-index: 1;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.status-resolved {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
}

.status-icon {
    font-size: 10px;
}

/* Titre principal de la solution */
.solution-title-main {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    padding: 10px 14px;
    border-bottom: 1px solid rgba(16, 24, 40, 0.08);
}

.main-title {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
    text-align: center;
}

/* Contenu principal */
.solution-content {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    overflow-y: auto;
}

/* Footer de la solution */
.solution-footer {
    background: linear-gradient(135deg, #f8f9fa 0%, #e5e7eb 100%);
    padding: 8px 24px;
    border-top: 1px solid rgba(16, 24, 40, 0.08);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    align-items: center;
    font-size: 10px;
    color: #6b7280;
}

.solution-timestamp,
.solution-team {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
}

.timestamp-icon,
.team-icon {
    font-size: 12px;
}

/* Responsive */
@media (max-width: 768px) {
    .solution-root {
        padding: 40px 0;
    }

    .solution-container {
        height: 400px;
        margin: 0 20px;
    }

    .solution-header {
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }

    .main-title {
        font-size: 20px;
    }

    .solution-content {
        padding: 16px;
    }

    .solution-footer {
        flex-direction: column;
        gap: 8px;
        text-align: center;
    }
}
</style>
