export const initiatePayment = (amount, onSuccess) => {
    // TODO: Replace with Razorpay / Stripe logic
    // For now we simulate payment success
    alert(`Simulated payment of ₹${amount}. Integrate Razorpay here.`);
    onSuccess();
  };