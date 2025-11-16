/**
 * Copyright Enforcement Simulator - Game Logic
 * Manages demo state, user decisions, scoring, and AI recommendations
 */

class CopyrightDemo {
    constructor() {
        this.cases = [];
        this.currentCaseIndex = 0;
        this.currentCase = null;
        this.casesReviewed = 0;
        this.userCorrect = 0;
        this.aiCorrect = 0;
        this.falsePositives = 0;
        this.falseNegatives = 0;
        this.gameActive = false;

        // System parameters (affect AI decision-making)
        this.params = {
            sensitivity: 70,        // 1-100: higher = more likely to flag content
            fairUseThreshold: 50,   // 1-100: higher = more permissive
            modelType: 'balanced',  // fast, balanced, slow
            trainingData: 'moderate' // biased, moderate, diverse
        };

        this.aiDecision = null;
        this.userDecision = null;

        this.init();
    }

    async init() {
        // Load case data
        await this.loadCases();

        // Set up event listeners
        this.setupControls();
        this.setupButtons();
    }

    async loadCases() {
        try {
            const response = await fetch('assets/data/demo-cases.json');
            const data = await response.json();
            this.cases = data.cases;
            this.shuffleCases();
        } catch (error) {
            console.error('Error loading cases:', error);
            this.cases = this.getFallbackCases();
        }
    }

    shuffleCases() {
        // Fisher-Yates shuffle
        for (let i = this.cases.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cases[i], this.cases[j]] = [this.cases[j], this.cases[i]];
        }
    }

    setupControls() {
        // Sensitivity slider
        const sensitivity = document.getElementById('sensitivity');
        const sensitivityValue = document.getElementById('sensitivity-value');
        if (sensitivity && sensitivityValue) {
            sensitivity.addEventListener('input', (e) => {
                this.params.sensitivity = parseInt(e.target.value);
                sensitivityValue.textContent = this.params.sensitivity;
            });
        }

        // Fair use threshold slider
        const fairUse = document.getElementById('fairUse');
        const fairUseValue = document.getElementById('fairUse-value');
        if (fairUse && fairUseValue) {
            fairUse.addEventListener('input', (e) => {
                this.params.fairUseThreshold = parseInt(e.target.value);
                fairUseValue.textContent = this.params.fairUseThreshold;
            });
        }

        // Model type select
        const modelType = document.getElementById('modelType');
        if (modelType) {
            modelType.addEventListener('change', (e) => {
                this.params.modelType = e.target.value;
            });
        }

        // Training data select
        const trainingData = document.getElementById('trainingData');
        if (trainingData) {
            trainingData.addEventListener('change', (e) => {
                this.params.trainingData = e.target.value;
            });
        }

        // Reset parameters button
        const resetBtn = document.getElementById('resetParams');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetParameters());
        }
    }

    setupButtons() {
        const startBtn = document.getElementById('startDemo');
        const endBtn = document.getElementById('endDemo');
        const acceptBtn = document.getElementById('acceptBtn');
        const overrideBtn = document.getElementById('overrideBtn');
        const nextBtn = document.getElementById('nextCase');

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startDemo());
        }

        if (endBtn) {
            endBtn.addEventListener('click', () => this.endDemo());
        }

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAIRecommendation());
        }

        if (overrideBtn) {
            overrideBtn.addEventListener('click', () => this.showOverrideOptions());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.loadNextCase());
        }

        // Override option buttons
        const overrideChoices = document.querySelectorAll('.override-choice');
        overrideChoices.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.makeUserDecision(action);
            });
        });
    }

    resetParameters() {
        this.params = {
            sensitivity: 70,
            fairUseThreshold: 50,
            modelType: 'balanced',
            trainingData: 'moderate'
        };

        document.getElementById('sensitivity').value = 70;
        document.getElementById('sensitivity-value').textContent = '70';
        document.getElementById('fairUse').value = 50;
        document.getElementById('fairUse-value').textContent = '50';
        document.getElementById('modelType').value = 'balanced';
        document.getElementById('trainingData').value = 'moderate';
    }

    startDemo() {
        this.gameActive = true;
        this.currentCaseIndex = 0;
        this.casesReviewed = 0;
        this.userCorrect = 0;
        this.aiCorrect = 0;
        this.falsePositives = 0;
        this.falseNegatives = 0;

        // Hide start button, show end button
        document.getElementById('startDemo').style.display = 'none';
        document.getElementById('endDemo').style.display = 'inline-block';

        // Load first case
        this.loadNextCase();
    }

    loadNextCase() {
        if (this.currentCaseIndex >= this.cases.length) {
            this.endDemo();
            return;
        }

        this.currentCase = this.cases[this.currentCaseIndex];
        this.aiDecision = null;
        this.userDecision = null;

        // Reset UI
        document.getElementById('overrideOptions').style.display = 'none';
        document.getElementById('resultDisplay').style.display = 'none';
        document.getElementById('nextCase').style.display = 'none';
        document.getElementById('acceptBtn').style.display = 'inline-block';
        document.getElementById('overrideBtn').style.display = 'inline-block';

        // Display case information
        this.displayCase();

        // Generate AI recommendation
        this.generateAIRecommendation();
    }

    displayCase() {
        document.getElementById('caseTitle').textContent = this.currentCase.title;
        document.getElementById('caseDescription').textContent = this.currentCase.description;
        document.getElementById('contentType').textContent = this.currentCase.contentType;
        document.getElementById('uploadContext').textContent = this.currentCase.uploadContext;
    }

    generateAIRecommendation() {
        // Simulate AI decision-making based on parameters and case characteristics
        const baseAccuracy = this.getModelAccuracy();
        const bias = this.getTrainingDataBias();

        let recommendation = this.calculateRecommendation(this.currentCase, baseAccuracy, bias);

        this.aiDecision = recommendation;

        // Display recommendation
        this.displayAIRecommendation(recommendation);
    }

    getModelAccuracy() {
        switch (this.params.modelType) {
            case 'fast': return 0.70;
            case 'balanced': return 0.80;
            case 'slow': return 0.88;
            default: return 0.80;
        }
    }

    getTrainingDataBias() {
        switch (this.params.trainingData) {
            case 'biased': return 0.3;   // More prone to errors
            case 'moderate': return 0.15;
            case 'diverse': return 0.05;
            default: return 0.15;
        }
    }

    calculateRecommendation(caseData, accuracy, bias) {
        // Determine if AI makes correct decision based on accuracy
        const correctDecision = caseData.isInfringing;
        const random = Math.random();

        // Apply accuracy - will AI get it right?
        let aiPrediction = correctDecision;
        if (random > accuracy) {
            aiPrediction = !correctDecision; // AI makes an error
        }

        // Apply bias based on training data
        // Biased models tend to over-flag (false positives)
        if (Math.random() < bias && !correctDecision) {
            aiPrediction = true; // Bias toward flagging
        }

        // Sensitivity affects threshold
        const sensitivityFactor = this.params.sensitivity / 100;
        if (Math.random() < sensitivityFactor * 0.3 && !correctDecision) {
            aiPrediction = true; // High sensitivity increases false positives
        }

        // Fair use threshold affects decisions
        const fairUseFactor = this.params.fairUseThreshold / 100;
        if (caseData.transformative && Math.random() < fairUseFactor) {
            aiPrediction = false; // More permissive toward transformative uses
        }

        // Determine action
        let action;
        if (aiPrediction) {
            // Infringement detected - decide between takedown or claim
            action = Math.random() < 0.7 ? 'takedown' : 'claim';
        } else {
            action = 'allow';
        }

        // Calculate confidence (higher accuracy models have higher confidence)
        let confidence = 60 + (accuracy * 30) + (Math.random() * 15);
        confidence = Math.min(95, Math.max(55, confidence));

        // Generate reasoning
        const reasoning = this.generateReasoning(caseData, action, confidence);

        return {
            action: action,
            confidence: Math.round(confidence),
            reasoning: reasoning,
            isCorrect: (aiPrediction === correctDecision)
        };
    }

    generateReasoning(caseData, action, confidence) {
        const reasons = {
            takedown: [
                `Detected ${confidence > 80 ? 'strong' : 'possible'} match with copyrighted ${caseData.contentType.toLowerCase()} in database.`,
                `Content uses ${caseData.amountUsed === 'complete' ? 'complete' : 'substantial portions of'} copyrighted material.`,
                `Insufficient transformative elements detected.`
            ],
            claim: [
                `Partial match detected with copyrighted ${caseData.contentType.toLowerCase()}.`,
                `Recommending monetization claim rather than removal.`,
                `Content may have some transformative elements.`
            ],
            allow: [
                caseData.transformative ?
                    `Transformative use detected - appears to be commentary, criticism, or parody.` :
                    `No significant match with copyrighted content found.`,
                caseData.commercialUse ?
                    `Note: Commercial context detected.` :
                    `Non-commercial use context.`,
                confidence < 70 ?
                    `Low confidence - recommend human review.` :
                    `Appears to fall within fair use guidelines.`
            ]
        };

        return reasons[action].join(' ');
    }

    displayAIRecommendation(recommendation) {
        const actionText = {
            'takedown': 'TAKEDOWN - Remove Content',
            'claim': 'MONETIZATION CLAIM',
            'allow': 'ALLOW - No Infringement Detected'
        };

        document.getElementById('aiAction').textContent = actionText[recommendation.action];
        document.getElementById('aiAction').className = 'ai-action ' + recommendation.action;

        document.getElementById('confidenceLevel').style.width = recommendation.confidence + '%';
        document.getElementById('confidenceValue').textContent = recommendation.confidence + '%';

        document.getElementById('aiReasoning').textContent = recommendation.reasoning;
    }

    acceptAIRecommendation() {
        this.userDecision = this.aiDecision.action;
        this.evaluateDecision();
    }

    showOverrideOptions() {
        document.getElementById('overrideOptions').style.display = 'block';
        document.getElementById('acceptBtn').style.display = 'none';
        document.getElementById('overrideBtn').style.display = 'none';
    }

    makeUserDecision(action) {
        this.userDecision = action;
        this.evaluateDecision();
    }

    evaluateDecision() {
        this.casesReviewed++;

        const correctAction = this.currentCase.isInfringing ?
            (Math.random() < 0.7 ? 'takedown' : 'claim') : 'allow';

        // Check if user decision matches ground truth
        const userCorrectDecision = this.isCorrectDecision(this.userDecision, this.currentCase.isInfringing);
        const aiCorrectDecision = this.isCorrectDecision(this.aiDecision.action, this.currentCase.isInfringing);

        if (userCorrectDecision) this.userCorrect++;
        if (aiCorrectDecision) this.aiCorrect++;

        // Track false positives and negatives
        if (!this.currentCase.isInfringing && this.userDecision !== 'allow') {
            this.falsePositives++;
        }
        if (this.currentCase.isInfringing && this.userDecision === 'allow') {
            this.falseNegatives++;
        }

        // Update statistics
        this.updateStatistics();

        // Show result
        this.displayResult(userCorrectDecision);

        // Hide decision buttons, show next button
        document.getElementById('acceptBtn').style.display = 'none';
        document.getElementById('overrideBtn').style.display = 'none';
        document.getElementById('overrideOptions').style.display = 'none';
        document.getElementById('nextCase').style.display = 'inline-block';

        this.currentCaseIndex++;
    }

    isCorrectDecision(decision, isInfringing) {
        if (isInfringing) {
            return decision === 'takedown' || decision === 'claim';
        } else {
            return decision === 'allow';
        }
    }

    updateStatistics() {
        document.getElementById('casesReviewed').textContent = this.casesReviewed;

        const userAccuracy = this.casesReviewed > 0 ?
            Math.round((this.userCorrect / this.casesReviewed) * 100) : 0;
        document.getElementById('userAccuracy').textContent = userAccuracy + '%';

        const aiAccuracy = this.casesReviewed > 0 ?
            Math.round((this.aiCorrect / this.casesReviewed) * 100) : 0;
        document.getElementById('aiAccuracy').textContent = aiAccuracy + '%';

        document.getElementById('falsePositives').textContent = this.falsePositives;
        document.getElementById('falseNegatives').textContent = this.falseNegatives;
    }

    displayResult(isCorrect) {
        const resultDiv = document.getElementById('resultDisplay');
        resultDiv.style.display = 'block';
        resultDiv.className = 'result-display ' + (isCorrect ? 'correct' : 'incorrect');

        let html = `
            <h4>${isCorrect ? '✓ Correct Decision' : '✗ Incorrect Decision'}</h4>
            <p><strong>Your decision:</strong> ${this.userDecision.toUpperCase()}</p>
            <p><strong>AI recommendation:</strong> ${this.aiDecision.action.toUpperCase()}</p>
            <p><strong>Ground truth:</strong> ${this.currentCase.isInfringing ? 'INFRINGING' : 'NOT INFRINGING (Fair Use / Licensed)'}</p>
            <div class="explanation">
                <strong>Explanation:</strong>
                <p>${this.currentCase.explanation}</p>
            </div>
        `;

        if (!isCorrect) {
            if (!this.currentCase.isInfringing && this.userDecision !== 'allow') {
                html += `<p class="consequence"><strong>Consequence:</strong> False positive - legitimate content removed, potentially harming creator and suppressing lawful speech.</p>`;
            } else if (this.currentCase.isInfringing && this.userDecision === 'allow') {
                html += `<p class="consequence"><strong>Consequence:</strong> False negative - infringing content remains, potentially harming rights holder.</p>`;
            }
        }

        resultDiv.innerHTML = html;
    }

    endDemo() {
        this.gameActive = false;

        // Show final results
        const userAccuracy = this.casesReviewed > 0 ?
            Math.round((this.userCorrect / this.casesReviewed) * 100) : 0;
        const aiAccuracy = this.casesReviewed > 0 ?
            Math.round((this.aiCorrect / this.casesReviewed) * 100) : 0;

        const resultDiv = document.getElementById('resultDisplay');
        resultDiv.style.display = 'block';
        resultDiv.className = 'result-display';

        resultDiv.innerHTML = `
            <h3>Simulation Complete</h3>
            <h4>Final Results:</h4>
            <p><strong>Cases reviewed:</strong> ${this.casesReviewed}</p>
            <p><strong>Your accuracy:</strong> ${userAccuracy}% (${this.userCorrect}/${this.casesReviewed})</p>
            <p><strong>AI accuracy:</strong> ${aiAccuracy}% (${this.aiCorrect}/${this.casesReviewed})</p>
            <p><strong>False positives:</strong> ${this.falsePositives}</p>
            <p><strong>False negatives:</strong> ${this.falseNegatives}</p>

            <h4>Reflection:</h4>
            <p>How did your performance compare to the AI? What types of cases were most challenging?
            Consider how parameter choices affected outcomes and the real-world implications of automated decisions.</p>

            <button id="restartDemo" class="btn-primary" style="margin-top: 1rem;">Start New Simulation</button>
        `;

        // Add restart handler
        const restartBtn = document.getElementById('restartDemo');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.shuffleCases();
                this.startDemo();
            });
        }

        // Hide other buttons
        document.getElementById('endDemo').style.display = 'none';
        document.getElementById('nextCase').style.display = 'none';
        document.getElementById('acceptBtn').style.display = 'none';
        document.getElementById('overrideBtn').style.display = 'none';
        document.getElementById('startDemo').style.display = 'inline-block';
    }

    getFallbackCases() {
        // Fallback data in case JSON fails to load
        return [
            {
                id: 1,
                title: "Music Cover Example",
                description: "30-second acoustic cover of popular song",
                contentType: "Audio",
                uploadContext: "Personal channel",
                isInfringing: false,
                transformative: true,
                commercialUse: false,
                amountUsed: "partial",
                explanation: "Fair use - transformative cover, partial use, non-commercial."
            }
        ];
    }
}

// Initialize demo when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('startDemo')) {
        window.copyrightDemo = new CopyrightDemo();
    }
});
