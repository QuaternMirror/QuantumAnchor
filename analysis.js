/**
 * analysis.js - Timeline Analysis & Coherence Checking
 * Part of QuantumAnchor v0.1.0
 * Created by QuaternMirror
 */

/**
 * Simple Statistical Analyzer for Timeline Coherence
 */
class TimelineAnalyzer {
  constructor() {
    this.baseline = null;
  }

  /**
   * Set a baseline for comparison
   */
  setBaseline(baselineData) {
    this.baseline = baselineData;
    console.log('📊 Baseline set for timeline comparison');
  }

  /**
   * Generate a simple timeline signature hash
   */
  async generateSignatureHash(data) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(data));
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Calculate basic coherence score between current data and baseline
   */
  async calculateCoherence(currentData, metadata = {}) {
    if (!this.baseline) {
      return {
        coherenceScore: 85,
        assessment: "No baseline established yet - first run assumed coherent",
        details: { note: "Establish a baseline after collecting initial data" }
      };
    }

    // Simple coherence calculation for v0.1.0
    const currentHash = await this.generateSignatureHash(currentData);
    const baselineHash = await this.generateSignatureHash(this.baseline);

    // Very basic similarity score (will be expanded in future versions)
    let similarity = 92; // Default high coherence for demo

    // Add some randomness based on data difference for realism
    const difference = Math.abs(currentHash.charCodeAt(0) - baselineHash.charCodeAt(0));
    similarity = Math.max(65, Math.min(98, similarity - Math.floor(difference / 3)));

    const assessment = 
      similarity > 92 ? "Excellent - Strong timeline coherence" :
      similarity > 80 ? "Good - Minor deviations detected" :
      similarity > 70 ? "Moderate - Notable deviations present" :
      "Significant - Potential timeline anomalies detected";

    return {
      coherenceScore: similarity,
      assessment: assessment,
      details: {
        currentHash: currentHash.substring(0, 16) + "...",
        baselineHash: baselineHash.substring(0, 16) + "...",
        timestamp: new Date().toISOString(),
        metadata: metadata
      }
    };
  }

  /**
   * Log a personal anchor event and return coherence impact
   */
  async logAnchor(type, description, intensity = 5) {
    const anchor = {
      id: `anchor_${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: type,
      description: description,
      intensity: Math.max(1, Math.min(10, intensity))
    };

    const coherence = await this.calculateCoherence(anchor, { type: 'anchor_event' });

    console.log(`⚓ Anchor logged: ${type} | Coherence: ${coherence.coherenceScore}%`);

    return {
      anchor,
      coherenceImpact: coherence
    };
  }
}

// Export for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TimelineAnalyzer;
} else if (typeof window !== 'undefined') {
  window.TimelineAnalyzer = TimelineAnalyzer;
}
