import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRightLeft, TrendingUp, AlertCircle, Coins } from 'lucide-react';
import { getFlagUrl, currencyToCountry } from './utils/flags';
import { convertCurrency } from './utils/api';
import './index.css';

const currencies = Object.keys(currencyToCountry).sort();

function App() {
  const [amount, setAmount] = useState('4');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvert = async (e) => {
    if (e) e.preventDefault();
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await convertCurrency(fromCurrency, toCurrency, amount);
      
      // JDE Orchestrator sometimes returns keys with trailing spaces
      // Let's create a normalized version of the data
      const normalizedData = {};
      Object.keys(data).forEach(key => {
        normalizedData[key.trim()] = data[key];
      });

      setResult(normalizedData);
    } catch (err) {
      console.error('Connection error:', err);
      setError(`Connection Failed: ${err.message}. Ensure Spring Boot is running on port 8080.`);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Auto convert on load
  useEffect(() => {
    handleConvert();
  }, []);

  return (
    <div className="glass-card">
      <h1>
        <Coins className="inline-block mr-2 text-gold-primary" style={{ verticalAlign: 'middle', marginBottom: '4px' }} />
        Currency Converter
      </h1>

      <form onSubmit={handleConvert}>
        <div className="input-group">
          <label className="label">Enter Amount</label>
          <div className="input-container">
            <input
              type="number"
              className="input-field"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="any"
            />
          </div>
        </div>

        <div className="converter-grid">
          <div className="select-container">
            <label className="label">From</label>
            <div className="currency-select">
              <img src={getFlagUrl(fromCurrency)} alt={fromCurrency} className="flag-icon" />
              <select 
                value={fromCurrency} 
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencies.map(curr => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="button" className="swap-btn" onClick={swapCurrencies} title="Swap Currencies">
            <ArrowRightLeft size={20} />
          </button>

          <div className="select-container">
            <label className="label">To</label>
            <div className="currency-select">
              <img src={getFlagUrl(toCurrency)} alt={toCurrency} className="flag-icon" />
              <select 
                value={toCurrency} 
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencies.map(curr => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="convert-btn" 
          disabled={loading}
        >
          {loading ? (
            <RefreshCw className="loading-spinner mx-auto" />
          ) : (
            'Convert'
          )}
        </button>
      </form>

      {error && (
        <div className="error-msg">
          <AlertCircle size={16} className="inline mr-2" />
          {error}
        </div>
      )}

      {result && !loading && !error && (
        <div className="result-container">
          <p className="result-label">Result</p>
          <div className="result-value">
            {result.ConversionResult ? (
              <span>{result.ConversionResult} {toCurrency}</span>
            ) : (
              <span>{parseFloat(amount * (result.RealtimeRate || 1)).toFixed(2)} {toCurrency}</span>
            )}
          </div>
          <p className="result-subtext">
            <TrendingUp size={14} className="inline mr-1" />
            Real-time market rates
          </p>
          {/* Debugging info if needed: <pre style={{fontSize: '10px', marginTop: '10px'}}>{JSON.stringify(result, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
}

export default App;
