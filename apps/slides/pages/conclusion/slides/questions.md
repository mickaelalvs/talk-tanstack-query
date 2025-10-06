---
title: "Questions ?"
layout: basic-title
transition: view-transition
mdc: true
---

::default::

<div class="questions-container">
  <div class="questions-content">
    <div class="main-question pop-in">
      <h2 class="question-title">À vos questions <span class="text-[var(--theme-color-copper)]">!</span></h2>
      <p class="question-subtitle">N'hésitez pas à partager vos retours</p>
    </div>
    <div class="feedback-section">
      <div class="qr-container pop-in-delay-1">
        <div class="qr-placeholder">
          <img src="../assets/openfeedback.png" alt="QR Code OpenFeedback" class="qr-code" />
        </div>
        <p class="qr-label">Scannez pour donner votre feedback 🗳️</p>
      </div>
      <div class="feedback-info">
        <div class="feedback-items-row">
          <div class="feedback-item pop-in-delay-2">
            <span class="feedback-icon">💬</span>
            <span class="feedback-text">Posez vos questions</span>
          </div>
          <div class="feedback-item pop-in-delay-3">
            <span class="feedback-icon">⭐</span>
            <span class="feedback-text">Donnez nous votre avis</span>
          </div>
        </div>
        <div class="contact-cards pop-in-delay-4">
          <div class="contact-card">
            <div class="contact-info">
              <img src="https://github.com/Slocaly.png" alt="Lucas Audart" class="contact-avatar" />
              <span class="contact-handle">@Slocaly</span>
            </div>
            <div class="contact-qr">
              <img src="../assets/lucas.png" alt="QR Code Lucas" class="qr-small" />
            </div>
          </div>
          <div class="contact-card">
            <div class="contact-info">
              <img src="https://github.com/CruuzAzul.png" alt="Mickaël Alves" class="contact-avatar" />
              <span class="contact-handle">@CruuzAzul</span>
            </div>
            <div class="contact-qr">
              <img src="../assets/micka.png" alt="QR Code Mickaël" class="qr-small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style scoped>
.questions-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem;
}

.questions-content {
  text-align: center;
  max-width: 900px;
  width: 100%;
  padding-top: 6rem;
}

.main-question {
  margin-bottom: 3rem;
}

.question-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--theme-color-cloudBurst);
  margin: 0 0 1rem 0;
}

.question-subtitle {
  font-size: 1.3rem;
  color: var(--theme-color-cloudBurst);
  font-weight: 600;
  margin: 0;
}

.feedback-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  margin: 3rem 0;
}

.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.qr-placeholder {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--theme-color-oasis);
}

.qr-code {
  width: 180px;
  height: 180px;
  object-fit: contain;
}

.qr-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--theme-color-cloudBurst);
  margin: 0;
}

.feedback-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feedback-items-row {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
}

.feedback-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.feedback-icon {
  font-size: 1.5rem;
  min-width: 2rem;
}

.feedback-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--theme-color-cloudBurst);
}

.contact-cards {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.contact-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  flex: 1;
  max-width: 300px;
  min-height: 60px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.contact-card .contact-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.contact-card .contact-handle {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--theme-color-cloudBurst);
  text-align: center;
}

.contact-qr {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  flex-shrink: 0;
}

.qr-small {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
}


.contact-info {
  padding: 1.5rem;
}

.contact-text {
  font-size: 1.1rem;
  color: var(--theme-color-cloudBurst);
  margin: 0;
}

.contact-text strong {
  color: var(--theme-color-oasis);
}

/* Animations pop-in */
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  50% {
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.pop-in {
  animation: popIn 0.6s ease-out;
  animation-fill-mode: both;
}

.pop-in-delay-1 {
  animation: popIn 0.6s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.pop-in-delay-2 {
  animation: popIn 0.6s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
}

.pop-in-delay-3 {
  animation: popIn 0.6s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;
}

.pop-in-delay-4 {
  animation: popIn 0.6s ease-out;
  animation-delay: 0.8s;
  animation-fill-mode: both;
}
</style>
