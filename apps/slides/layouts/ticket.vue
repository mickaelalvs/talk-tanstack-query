<script setup>
import Background from '../components/Background.vue'
import TanstackCorner from '../components/decorations/TanstackCorner.vue'

const props = defineProps({
    name: { type: String, required: true },
    meta: { type: String, default: '' },
    photo: { type: String, default: 'https://placehold.co/80x80?text=Avatar' },
    message: { type: String, required: true },
    problem: { type: String, required: true },
    ticketNumber: { type: String, default: () => `#${Math.floor(Math.random() * 9000) + 1000}` }
})
</script>

<template>
    <Background />
    <div class="ticket-root">
        <div class="ticket-container">
            <div class="ticket-header">
                <div class="ticket-title">
                    <h1 class="ticket-title-text">🎫 Ticket Support TanStack Query</h1>
                    <div class="ticket-number">{{ ticketNumber }}</div>
                </div>
                <div class="client-info-header">
                    <img class="client-avatar-header" :src="photo" :alt="`Photo de ${name}`" />
                    <div class="client-details-header">
                        <div class="client-name-header">{{ name }}</div>
                        <div class="client-meta-header">{{ meta }}</div>
                    </div>
                </div>
            </div>

            <div class="ticket-content">
                <div class="message-section">
                    <div class="section-header">
                        <span class="section-icon">💬</span>
                        <h3>Message du client</h3>
                    </div>
                    <div class="message-content">
                        <blockquote class="client-message">
                            <slot name="message" />
                        </blockquote>
                    </div>
                </div>

                <div class="problem-section">
                    <div class="section-header">
                        <span class="section-icon">🔍</span>
                        <h3>Problématique identifiée</h3>
                    </div>
                    <div class="problem-content">
                        <p class="problem-text">
                            <slot name="problem" />
                        </p>
                    </div>
                </div>
            </div>

            <div class="ticket-footer">
                <div class="ticket-timestamp">
                    <span class="timestamp-icon">🕒</span>
                    <span>Créé le {{ new Date().toLocaleDateString('fr-FR') }}</span>
                </div>
                <div class="ticket-assignee">
                    <span class="assignee-icon">👨‍💻</span>
                    <span>Assigné à l'équipe TanStack Query</span>
                </div>
            </div>
        </div>
    </div>
    <PhoneCorner class="z-10 !h-[160px] !right--10" />
</template>

<style scoped>
.ticket-root {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
}

.ticket-container {
    width: 100%;
    max-width: 1000px;
    height: 480px;
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

/* Header du ticket */
.ticket-header {
    background: linear-gradient(135deg, #C73321 0%, #FB3535 100%);
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    position: relative;
}

.ticket-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    opacity: 0.3;
}

.ticket-title {
    position: relative;
    display: flex;
    gap: 1rem;
    z-index: 1;
}

.ticket-title-text {
    font-size: 15px;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.ticket-number {
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
}

.client-info-header {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
}

.client-avatar-header {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.client-details-header {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.client-name-header {
    font-size: 14px;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}

.client-meta-header {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}

/* Contenu principal */
.ticket-content {
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    overflow-y: auto;
}


/* Sections message et problème */
.message-section,
.problem-section {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid rgba(16, 24, 40, 0.08);
    box-shadow: 0 3px 8px rgba(16, 24, 40, 0.05);
    overflow: hidden;
    flex: 1;
    min-height: 0;
}

.section-header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e5e7eb 100%);
    padding: 8px 16px;
    border-bottom: 1px solid rgba(16, 24, 40, 0.08);
    display: flex;
    align-items: center;
    gap: 8px;
}

.section-header h3 {
    font-size: 14px;
    font-weight: 700;
    color: #101828;
    margin: 0;
}

.section-icon {
    font-size: 16px;
}

.message-content,
.problem-content {
    padding: 16px;
    min-height: 80px;
    display: flex;
    align-items: flex-start;
    flex: 1;
}

.client-message {
    font-size: 12px;
    line-height: 1.6;
    color: #374151;
    margin: 0;
    padding: 0;
    border: none;
    font-style: italic;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    padding: 16px;
    border-radius: 8px;
    border-left: 3px solid #C73321;
    box-shadow: inset 0 1px 2px rgba(16, 24, 40, 0.05);
    width: 100%;
}

.problem-text {
    font-size: 14px;
    line-height: 1.6;
    color: #374151;
    margin: 0;
    font-weight: 700;
    background: linear-gradient(135deg, #fef3c7 0%, #fef7cd 100%);
    padding: 16px;
    border-radius: 8px;
    border-left: 3px solid #FE9503;
    box-shadow: inset 0 1px 2px rgba(16, 24, 40, 0.05);
    width: 100%;
}

/* Footer du ticket */
.ticket-footer {
    background: linear-gradient(135deg, #f8f9fa 0%, #e5e7eb 100%);
    padding: 5px 24px;
    border-top: 1px solid rgba(16, 24, 40, 0.08);
    display: flex;
    justify-content: start;
    gap: 1rem;
    align-items: center;
    font-size: 8px;
    color: #6b7280;
}

.ticket-timestamp,
.ticket-assignee {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
}

.timestamp-icon,
.assignee-icon {
    font-size: 12px;
}

/* Responsive */
@media (max-width: 768px) {
    .ticket-root {
        padding: 40px 0;
    }

    .ticket-container {
        height: 500px;
        margin: 0 20px;
    }

    .ticket-header {
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }

    .ticket-badges {
        flex-wrap: wrap;
        justify-content: center;
    }

    .client-section {
        flex-direction: column;
        text-align: center;
    }

    .ticket-footer {
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }
}
</style>