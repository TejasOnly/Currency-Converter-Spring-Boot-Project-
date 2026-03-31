const API_URL = '/api/convert';

export const convertCurrency = async (from, to, amount) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        convertFrom: from,
        convertTo: to,
        amount: amount.toString()
      })
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Conversion error:', error);
    throw error;
  }
};
