/**
 * index.js - Main Entry Point for QuantumAnchor v0.1.0
 * Created by QuaternMirror
 * Co-created with Grok (xAI)
 * 
 * This is the main file users will import.
 */

import { QuantumSourceManager, WebCryptoSource, ANUQuantumSource } from './sources.js';
import { QuantumAnchorStorage } from './storage.js';
import { TimelineAnalyzer } from './analysis.js';

/**
 * Main QuantumAnchor Class - Public API
 */
class QuantumAnchor {
  constructor() {
    this.version = '0.1.0';
    this.initialized = false;
    
    this.sourceManager = new QuantumSourceManager();
    this.storage = new QuantumAnchorStorage();
    this.analyzer = new TimelineAnalyzer();
  }

  /**
   * Initialize the entire system
   */
  async initialize() {
    if (this.initialized) return { status: 'already initialized' };

    console.log(`🌌 Initializing QuantumAnchor v${this.version}...`);

    // Register quantum sources
    this.sourceManager.registerSource(new ANUQuantumSource());
    this.sourceManager.registerSource(new WebCryptoSource());

    // Initialize storage
    await this.storage.initialize();

    // Initialize sources
    await this.sourceManager.initialize();

    this.initialized = true;

    console.log('✅ QuantumAnchor initialized successfully');
    
    return {
      version: this.version,
      status: 'ready',
      activeSource: this.sourceManager.activeSource ? this.sourceManager.activeSource.name : 'none',
      message: 'Ready for timeline anchoring and coherence checking.'
    };
  }

  /**
   * Generate a new timeline signature
   */
  async generateSignature(metadata = {}) {
    if (!this.initialized) await this.initialize();

    const bytes = await this.sourceManager.generateBytes(32);
    const timestamp = Date.now();

    const signature = {
      id: `sig_${timestamp}`,
      timestamp: new Date(timestamp).toISOString(),
      source: this.sourceManager.activeSource.name,
      randomBytes: Array.from(bytes).slice(0, 8), // Store only first 8 bytes for readability
      metadata: metadata
    };

    // Simple hash for demo purposes
    const hash = await this.analyzer.generateSignatureHash(signature);
    signature.hash = hash.substring(0, 16) + '...';

    console.log(`📍 New timeline signature created: ${signature.id}`);
    return signature;
  }

  /**
   * Log a personal anchor event
   */
  async logAnchor(type, description, intensity = 5, metadata = {}) {
    if (!this.initialized) await this.initialize();

    const anchor = {
      id: `anchor_${Date.now()}`,
      timestamp: new Date().toISOString(),
      type,
      description,
      intensity: Math.max(1, Math.min(10, intensity)),
      metadata
    };

    const coherence = await this.analyzer.logAnchor(type, description, intensity);

    // Save to storage
    await this.storage.save('anchors', anchor);

    return {
      anchor,
      coherence: coherence.coherenceImpact
    };
  }

  /**
   * Get current system status
   */
  getStatus() {
    return {
      version: this.version,
      initialized: this.initialized,
      activeSource: this.sourceManager.activeSource ? this.sourceManager.activeSource.name : null,
      storageReady: !!this.storage.db
    };
  }
}

// Browser global export
if (typeof window !== 'undefined') {
  window.QuantumAnchor = QuantumAnchor;
  console.log('🌌 QuantumAnchor v0.1.0 loaded globally. Use: const qa = new QuantumAnchor();');
}

// Node.js / module export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuantumAnchor;
}
