/**
 * sources.js - Quantum Random Sources for QuantumAnchor
 * Part of QuantumAnchor v0.1.0
 * Created by QuaternMirror
 */

class QuantumRandomSource {
  constructor(name, priority, isQuantum = true) {
    this.name = name;
    this.priority = priority;
    this.isQuantum = isQuantum;
    this.isAvailable = false;
    this.lastError = null;
  }

  async checkAvailability() {
    throw new Error("checkAvailability() must be implemented by subclass");
  }

  async generateBytes(byteCount) {
    throw new Error("generateBytes() must be implemented by subclass");
  }

  async generateInteger(min, max) {
    const range = max - min + 1;
    const bytes = await this.generateBytes(Math.ceil(Math.log2(range) / 8));
    
    let value = 0;
    for (let i = 0; i < bytes.length; i++) {
      value = (value << 8) | bytes[i];
    }
    
    return min + (value % range);
  }

  getMetadata() {
    return {
      name: this.name,
      priority: this.priority,
      isQuantum: this.isQuantum,
      isAvailable: this.isAvailable,
      lastError: this.lastError
    };
  }
}

/**
 * Web Crypto API Source (most reliable fallback)
 */
class WebCryptoSource extends QuantumRandomSource {
  constructor() {
    super('WebCrypto', 80, false);
  }

  async checkAvailability() {
    this.isAvailable = typeof window !== 'undefined' && 
                      window.crypto && 
                      typeof window.crypto.getRandomValues === 'function';
    return this.isAvailable;
  }

  async generateBytes(byteCount) {
    const bytes = new Uint8Array(byteCount);
    window.crypto.getRandomValues(bytes);
    return bytes;
  }
}

/**
 * ANU Quantum Random Number Generator (true quantum source)
 */
class ANUQuantumSource extends QuantumRandomSource {
  constructor() {
    super('ANU_QRNG', 90, true);
    this.baseURL = 'https://qrng.anu.edu.au/API/jsonI.php';
  }

  async checkAvailability() {
    try {
      const response = await fetch(`${this.baseURL}?length=1&type=uint8`, {
        signal: AbortSignal.timeout(5000)
      });
      this.isAvailable = response.ok;
      return this.isAvailable;
    } catch (e) {
      this.lastError = e.message;
      this.isAvailable = false;
      return false;
    }
  }

  async generateBytes(byteCount) {
    const response = await fetch(
      `${this.baseURL}?length=${byteCount}&type=uint8`,
      { signal: AbortSignal.timeout(10000) }
    );

    if (!response.ok) throw new Error(`ANU API error: ${response.status}`);

    const data = await response.json();
    if (!data.success) throw new Error('ANU API returned unsuccessful response');

    return new Uint8Array(data.data);
  }
}

/**
 * Quantum Source Manager
 */
class QuantumSourceManager {
  constructor() {
    this.sources = [];
    this.activeSource = null;
  }

  registerSource(source) {
    this.sources.push(source);
    this.sources.sort((a, b) => b.priority - a.priority);
  }

  async initialize() {
    for (const source of this.sources) {
      await source.checkAvailability().catch(() => {});
    }

    this.activeSource = this.sources.find(s => s.isAvailable);
    
    if (!this.activeSource) {
      console.warn('No preferred sources available. Using fallback.');
      this.activeSource = this.sources[this.sources.length - 1];
    }

    console.log(`Active quantum source: ${this.activeSource.name}`);
    return this.activeSource.getMetadata();
  }

  async generateBytes(byteCount = 32) {
    if (!this.activeSource) await this.initialize();
    return await this.activeSource.generateBytes(byteCount);
  }

  async generateInteger(min, max) {
    if (!this.activeSource) await this.initialize();
    return await this.activeSource.generateInteger(min, max);
  }
}

// Export for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuantumSourceManager, WebCryptoSource, ANUQuantumSource };
} else if (typeof window !== 'undefined') {
  window.QuantumSourceManager = QuantumSourceManager;
  window.WebCryptoSource = WebCryptoSource;
  window.ANUQuantumSource = ANUQuantumSource;
}
