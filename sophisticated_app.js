/**
 * filename: sophisticated_app.js
 *
 * This code represents a sophisticated and elaborate JavaScript application
 * that simulates a virtual trading platform for financial assets.
 *  
 * DISCLAIMER: This code is for demonstration purposes only and should not be
 * used in a production environment. It does not handle real financial data
 * and lacks important security and error-handling measures.
 */

// Constants
const MIN_PRICE = 10; // Minimum price for an asset
const MAX_PRICE = 1000; // Maximum price for an asset
const ASSET_TYPES = ['Stock', 'Currency', 'Commodity']; // Available asset types
const TRADING_HOURS = { start: 9, end: 17 }; // Trading hours for the platform

// Classes
class Asset {
  constructor(type, symbol, price) {
    this.type = type;
    this.symbol = symbol;
    this.price = price;
  }

  getPriceChange() {
    return Math.random() * 0.1 - 0.05; // Returns random price change between -5% and +5%
  }
}

class Portfolio {
  constructor() {
    this.assets = [];
  }

  addAsset(asset) {
    this.assets.push(asset);
  }

  removeAsset(symbol) {
    this.assets = this.assets.filter(asset => asset.symbol !== symbol);
  }

  calculateTotalValue() {
    let totalValue = 0;
    for (let asset of this.assets) {
      totalValue += asset.price;
    }
    return totalValue;
  }
}

// Util functions
function generateRandomAsset() {
  const type = ASSET_TYPES[Math.floor(Math.random() * ASSET_TYPES.length)];
  const symbol = type.substring(0, 3) + Math.floor(Math.random() * 1000);
  const price = Math.random() * (MAX_PRICE - MIN_PRICE) + MIN_PRICE;
  return new Asset(type, symbol, price);
}

function simulateTrading() {
  const portfolio = new Portfolio();

  // Generate random assets
  for (let i = 0; i < 10; i++) {
    const asset = generateRandomAsset();
    portfolio.addAsset(asset);
  }

  // Simulate trading for one trading day
  const currentTime = new Date();
  console.log(`--- Trading simulation started at ${currentTime.toLocaleString()} ---`);

  while (currentTime.getHours() >= TRADING_HOURS.start && currentTime.getHours() < TRADING_HOURS.end) {
    for (let i = 0; i < portfolio.assets.length; i++) {
      const asset = portfolio.assets[i];
      const priceChange = asset.getPriceChange();
      asset.price += asset.price * priceChange;
      console.log(`[${asset.symbol}] ${asset.type} - Price: ${asset.price.toFixed(2)} (${(priceChange * 100).toFixed(2)}%)`);
    }

    currentTime.setMinutes(currentTime.getMinutes() + 15); // Increment time by 15 minutes
  }

  const totalValue = portfolio.calculateTotalValue();
  console.log(`\n--- End of trading simulation ---\nTotal Portfolio Value: $${totalValue.toFixed(2)}`);
}

// Main
simulateTrading();
