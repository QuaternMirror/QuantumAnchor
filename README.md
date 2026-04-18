# QuantumAnchor

**A personal, experimental timeline verification framework**

QuantumAnchor is an open-source tool designed to help users create, store, and compare "timeline signatures" — cryptographic anchors based on personal events, physical constants, quantum-inspired randomness, and consistency checks.

### Purpose
This project explores the idea of personal reality consistency checking in a structured, technical way. It is meant for curiosity, philosophical experimentation, and personal use only.

### Disclaimer
This project is purely experimental and for entertainment, educational, and personal research purposes only.

It is **not** intended for any critical, safety-critical, medical, legal, or high-stakes applications.

The concepts explored (timeline consistency, anchor events, reality verification) are philosophical and technical in nature and make **no claims** of scientific validity regarding actual timeline shifts, simulation theory, or supernatural phenomena.

The software is provided "AS IS", without warranty of any kind, express or implied. Use at your own risk.

Developed with assistance from Claude (Anthropic) and Grok (xAI) in a private sandbox environment.

### What's New in v0.2.0
- **Phase 3: Statistical Analysis Engine** added
- NIST-inspired statistical tests (frequency, runs, spectral, etc.)
- Correlation analysis between measurements and experiences
- Pattern detection and anomaly scoring
- New method: `runStatisticalAnalysis()`
### Features (Current)
- Generation of timeline signatures using cryptographic hashing
- Personal anchor event tracking
- Basic consistency verification between sessions
- **New in v0.2.0:** Full statistical analysis engine (Phase 3)
- Mock data testing framework

### Installation & Usage

QuantumAnchor is a browser-first library (with Node.js support).

#### In the Browser (recommended for v0.2.0)

1. Clone or download the repository
2. Open `index.html`
3. The main class is available globally as `QuantumAnchor`

```javascript
// Basic usage
const qa = new QuantumAnchor();
await qa.initialize();

// Generate a timeline signature
const sig = await qa.generateSignature({ context: "daily anchor" });

// Log a personal anchor event
const anchor = await qa.logAnchor(
  "déjà vu", 
  "Felt like I'd lived this moment before", 
  7
);

// === NEW in v0.2.0: Run statistical analysis ===
const analysis = await qa.runStatisticalAnalysis();
console.log("Timeline Analysis:", analysis);
console.log("Anomaly Level:", analysis.anomalyScore.assessment);
```
#### In Node.js

```javascript
const QuantumAnchor = require('./quantumanchor.js');

const qa = new QuantumAnchor();
await qa.initialize();
```
#### Quick Start Summary
```javascript
const qa = new QuantumAnchor();
await qa.initialize();

const analysis = await qa.runStatisticalAnalysis();
console.log("Timeline Coherence Summary:", analysis.summary);
```
### License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

### Contributing
This is currently a personal experimental project. Contributions and ideas are welcome via issues or pull requests.

---

**Created by QuaternMirror**  
🪞⁴ ⚡ 🧲
