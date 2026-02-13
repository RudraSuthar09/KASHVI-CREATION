import { apiBaseUrl } from './api';

/**
 * Configuration Check Component
 * 
 * This component displays the current API configuration
 * to help debug deployment issues.
 * 
 * Usage: Add to your main App.jsx or a debug page
 */
export function ConfigCheck() {
  const isProduction = import.meta.env.MODE === 'production';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const isConfigured = !!backendUrl;

  return (
    <div style={{
      position: 'fixed',
      bottom: 10,
      right: 10,
      padding: '15px',
      backgroundColor: isConfigured ? '#d4edda' : '#f8d7da',
      border: `2px solid ${isConfigured ? '#28a745' : '#dc3545'}`,
      borderRadius: '8px',
      maxWidth: '400px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>
        {isConfigured ? '✅ API Configuration' : '⚠️ API Configuration Error'}
      </div>
      
      <div style={{ marginBottom: '5px' }}>
        <strong>Mode:</strong> {import.meta.env.MODE}
      </div>
      
      <div style={{ marginBottom: '5px' }}>
        <strong>Backend URL:</strong> {apiBaseUrl || '(empty - using proxy/relative URLs)'}
      </div>
      
      <div style={{ marginBottom: '5px' }}>
        <strong>Configured:</strong> {isConfigured ? 'Yes ✅' : 'No ❌'}
      </div>

      {isProduction && !isConfigured && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px', 
          backgroundColor: '#fff', 
          border: '1px solid #dc3545',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#dc3545' }}>⚠️ CRITICAL ERROR</strong>
          <div style={{ marginTop: '5px', fontSize: '11px' }}>
            VITE_BACKEND_URL is not set!
            <br />
            The app will NOT work in production.
            <br />
            <br />
            <strong>Fix:</strong>
            <br />
            1. Go to Vercel Dashboard
            <br />
            2. Settings → Environment Variables
            <br />
            3. Add: VITE_BACKEND_URL = https://kashvi-creation-1.onrender.com
            <br />
            4. Redeploy
          </div>
        </div>
      )}

      {isConfigured && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px', 
          backgroundColor: '#fff', 
          border: '1px solid #28a745',
          borderRadius: '4px'
        }}>
          <div style={{ fontSize: '11px', color: '#28a745' }}>
            ✅ Configuration looks good!
            <br />
            API calls will go to: {backendUrl}
          </div>
        </div>
      )}

      <div style={{ 
        marginTop: '10px', 
        fontSize: '10px', 
        opacity: 0.7,
        borderTop: '1px solid rgba(0,0,0,0.1)',
        paddingTop: '5px'
      }}>
        This panel is for debugging. Remove ConfigCheck component in production.
      </div>
    </div>
  );
}

/**
 * Simple version for console logging only
 */
export function logApiConfig() {
  const config = {
    mode: import.meta.env.MODE,
    backendUrl: import.meta.env.VITE_BACKEND_URL || '(not set)',
    apiBaseUrl: apiBaseUrl || '(empty)',
    isConfigured: !!import.meta.env.VITE_BACKEND_URL
  };

  if (import.meta.env.MODE === 'production' && !import.meta.env.VITE_BACKEND_URL) {
    console.error('%c⚠️ CRITICAL: VITE_BACKEND_URL not set!', 'color: red; font-size: 16px; font-weight: bold;');
    console.error('Set environment variable in Vercel: VITE_BACKEND_URL=https://kashvi-creation-1.onrender.com');
  } else {
    console.log('%c✅ API Configuration:', 'color: green; font-weight: bold;', config);
  }

  return config;
}
