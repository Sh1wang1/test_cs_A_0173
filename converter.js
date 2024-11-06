async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const result = document.getElementById("result");
    const errorMessage = document.getElementById("error-message");

    result.textContent = "";
    errorMessage.textContent = "";

    try {
       
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates.");
        }
        
        const data = await response.json();
        const rate = data.rates[toCurrency];
        
        if (rate) {
            const convertedAmount = (amount * rate).toFixed(2);
          
            result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            errorMessage.textContent = "Conversion rate not available.";
        }
    } catch (error) {
        errorMessage.textContent = "Error fetching conversion data. Please try again later.";
    }

    return false; 
}
