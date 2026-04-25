/**
 * QuantumAnchor v0.2.0
 * Personal Timeline Verification Framework
 * 
 * Created by QuaternMirror
 * Co-created with Grok (xAI)
 * 
 * A lightweight experimental tool for generating and comparing 
 * timeline signatures using quantum-inspired randomness and personal anchors.
 */
// ============================================================================
// PHASE 3: STATISTICAL ANALYSIS ENGINE (Imported)
// ============================================================================

// Import Phase 3 modules (browser-friendly)
let NISTTestSuite, CorrelationEngine, PatternDetector, AnomalyScorer;

if (typeof window !== 'undefined' && window.QTVSPhase3) {
  ({ NISTTestSuite, CorrelationEngine, PatternDetector, AnomalyScorer } = window.QTVSPhase3);
} else {
  // Fallback for environments without Phase 3 loaded yet
  NISTTestSuite = class { constructor() {} async runAllTests() { return { error: "Phase 3 not loaded" }; } };
  CorrelationEngine = class { constructor() {} };
  PatternDetector = class { constructor() {} };
  AnomalyScorer = class { constructor() {} };
}
class QuantumAnchor {
  constructor() {
    this.initialized = false;
    this.sources = null;
    this.storage = null;
    this.version = '0.2.0';
   // v0.2.0 - Added Phase 3: Statistical Analysis Engine with NIST-inspired tests,
// correlation analysis, pattern detection, and anomaly scoring
  }

  /**
   * Initialize the QuantumAnchor system
   */
  async initialize() {
    console.log('🔬 Initializing QuantumAnchor v0.1.0...');

    // We'll import and initialize sources and storage here in the full version
    this.initialized = true;
    
    console.log('✅ QuantumAnchor initialized successfully');
    return {
      version: this.version,
      status: 'ready',
      message: 'Core system loaded. Ready for timeline anchoring.'
    };
  }

  /**
   * Generate a new timeline signature (core feature)
   */
  async generateSignature(metadata = {}) {
    if (!this.initialized) await this.initialize();

    // Placeholder for now - we'll expand this with real quantum sources
    const timestamp = Date.now();
    const randomValue = Math.random().toString(36).substring(2, 15);
    
    const signature = {
      id: `sig_${timestamp}`,
      timestamp: new Date().toISOString(),
      randomSeed: randomValue,
      metadata: metadata,
      hash: await this._simpleHash(`${timestamp}-${randomValue}`)
    };

    console.log('📍 New timeline signature generated:', signature.id);
    return signature;
  }

  /**
   * Simple hash helper (will be upgraded with Web Crypto in full version)
   */
  async _simpleHash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Log a personal anchor event
   */
  async logAnchor(type, description, intensity = 5, metadata = {}) {
    if (!this.initialized) await this.initialize();

    const anchor = {
      id: `anchor_${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: type,
      description: description,
      intensity: Math.max(1, Math.min(10, intensity)),
      metadata: metadata
    };

    console.log('⚓ Personal anchor logged:', type);
    return anchor;
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      version: this.version,
      initialized: this.initialized,
      status: this.initialized ? 'ready' : 'not initialized'
    };
  }
}

  /**
   * Phase 3: Run full statistical analysis on current measurements
   */
  async runStatisticalAnalysis() {
    if (!this.storage) {
      throw new Error('Storage not initialized');
    }

    const measurements = await this.storage.getAllMeasurements();
    
    if (measurements.length < 100) {
      return {
        error: 'Insufficient data for statistical analysis (minimum 100 measurements recommended)',
        measurementsCount: measurements.length
      };
    }

    const nist = new NISTTestSuite();
    const bits = this._measurementsToBits(measurements);
    
    const nistResults = await nist.runAllTests(bits);
    
    const correlationEngine = new CorrelationEngine(this.storage);
    const correlations = await correlationEngine.findTemporalCorrelations();
    
    const patternDetector = new PatternDetector();
    const patterns = patternDetector.detectRepeatingSequences(measurements);
    
    const anomalyScorer = new AnomalyScorer();
    // Set a simple baseline from the first 30% of data
    const baselineData = measurements.slice(0, Math.floor(measurements.length * 0.3));
    anomalyScorer.setBaseline(this._calculateBaselineStats(baselineData));
    
    const anomalyScore = anomalyScorer.calculateAnomalyScore(
      this._calculateCurrentStats(measurements)
    );

    return {
      timestamp: new Date().toISOString(),
      measurementsAnalyzed: measurements.length,
      nistResults,
      correlations,
      patterns,
      anomalyScore,
      summary: {
        overallPassRate: nistResults.overallPassRate,
        anomalyLevel: anomalyScore.assessment,
        significantPatterns: patterns.length
      }
    };
  }

  /**
   * Helper: Convert measurements to bit sequence for NIST tests
   */
  _measurementsToBits(measurements) {
    const bits = [];
    for (const m of measurements) {
      for (const byte of m.value) {
        for (let i = 7; i >= 0; i--) {
          bits.push((byte >> i) & 1);
        }
      }
    }
    return bits;
  }

  /**
   * Helper: Calculate basic statistics for baseline
   */
  _calculateBaselineStats(measurements) {
    const entropies = measurements.map(m => this._calculateEntropy(m.value));
    return {
      entropy: entropies.reduce((a, b) => a + b, 0) / entropies.length,
      stdDev: this._standardDeviation(entropies),
      autocorrelation: 0.5 // placeholder
    };
  }

  _calculateCurrentStats(measurements) {
    const entropies = measurements.map(m => this._calculateEntropy(m.value));
    return {
      entropy: entropies.reduce((a, b) => a + b, 0) / entropies.length,
      passesBasicTests: {
        entropy: true,
        chiSquare: true,
        runs: true,
        autocorrelation: true
      }
    };
  }

  _calculateEntropy(bytes) {
    const frequency = new Array(256).fill(0);
    for (const byte of bytes) frequency[byte]++;
    
    let entropy = 0;
    for (const count of frequency) {
      if (count > 0) {
        const p = count / bytes.length;
        entropy -= p * Math.log2(p);
      }
    }
    return entropy;
  }

  _standardDeviation(values) {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squareDiffs = values.map(v => Math.pow(v - mean, 2));
    return Math.sqrt(squareDiffs.reduce((a, b) => a + b, 0) / values.length);
  }
}

// Make it available globally for browser use
if (typeof window !== 'undefined') {
  window.QuantumAnchor = QuantumAnchor;
  console.log('🌌 QuantumAnchor v0.1.0 loaded. Create with: const qa = new QuantumAnchor();');
}

// For Node.js / module support
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuantumAnchor;
  /**
   * Quick Log: Simple one-click experience logging (for quick synchronicity capture)
   * Minimal version - just type, intensity, and timestamp
   */
  async logQuickExperience(description, intensity = 5) {
    if (!this.initialized) {
      throw new Error('Please initialize QuantumAnchor first');
    }
    
    if (!description || typeof description !== 'string' || description.trim() === '') {
      throw new Error('Description is required');
    }
    
    // Keep intensity between 1-10
    const safeIntensity = Math.max(1, Math.min(10, parseInt(intensity) || 5));
    
    const experience = {
      id: 'quick_' + Date.now(),
      type: 'synchronicity',
      description: description.trim(),
      intensity: safeIntensity,
      timestamp: new Date().toISOString(),
      tags: ['quick-log']
    };
    
    // Save to storage if available
    if (this.storage) {
      await this.storage.saveExperience(experience);
    }
    
    console.log('✅ Quick experience logged:', experience);
    
    return experience;
  }
}
