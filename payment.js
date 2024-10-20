document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get("amount") || "0.00";
    const paymentFormContainer = document.getElementById("payment-form-container");
    const paymentCompleteContainer = document.getElementById("payment-complete");
    const returnBtn = document.getElementById("return-btn");
  
    document.getElementById("total-amount").innerText = `$${amount}`;
  
    // Simulate currency conversion and charges
    const convertedAmount = (parseFloat(amount) * 0.85).toFixed(2); // Assume 1 USD = 0.85 EUR
    const charges = (parseFloat(amount) * 0.05).toFixed(2); // Assume 5% charge
  
    document.getElementById("converted-amount").innerText = `€${convertedAmount}`;
    document.getElementById("charges").innerText = `$${charges}`;
  
    const paymentForm = document.getElementById("payment-form");
  
    const merchantWalletUrl = "https://ilp.interledger-test.dev/seller";
    const privateKey = "private.key";
    const keyId = "58924d06-6ee4-49a3-8178-c4d733dae2e4";
  
    const openPaymentsProcessor = new OpenPaymentsProcessor(merchantWalletUrl, privateKey, keyId);
  
    paymentForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const buyerWalletUrl = document.getElementById("wallet-address").value;
      
      try {
        console.log("Starting Open Payments Checkout...");
  
        const paymentResult = await openPaymentsProcessor.processPayment(buyerWalletUrl, parseFloat(amount) * 100);
  
        console.log("Payment result:", paymentResult);
  
        if (paymentResult && paymentResult.redirectUrl) {
          // Simulate redirect and payment completion
          setTimeout(() => {
            paymentFormContainer.style.display = 'none';
            paymentCompleteContainer.style.display = 'block';
            document.getElementById("transaction-id").innerText = `OP-${Date.now()}`;
            document.getElementById("amount-paid").innerText = `$${amount}`;
          }, 2000);
        } else {
          throw new Error('Invalid payment result');
        }
  
      } catch (error) {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
      }
    });
  
    returnBtn.addEventListener("click", () => {
      // Simulate return to shop
      paymentCompleteContainer.style.display = 'none';
      paymentFormContainer.style.display = 'block';
      document.getElementById("wallet-address").value = '';
    });
  });