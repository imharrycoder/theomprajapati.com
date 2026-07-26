import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

function RazorpayCheckout({ plan, onSuccess, onClose }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Razorpay Script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      initiatePayment();
    };
    script.onerror = () => {
      toast.error('Failed to load Razorpay SDK. Are you online?');
      onClose();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initiatePayment = async () => {
    try {
      // 1. Create subscription on backend
      const res = await apiFetch('/api/subscriptions/create-subscription', {
        method: 'POST',
        body: JSON.stringify({ plan })
      });

      if (!res.subscription) throw new Error('Subscription creation failed');

      // 2. Initialize Razorpay options for AutoPay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'dummy_key',
        name: 'The Om Prajapati',
        description: `AutoPay Subscription: ${plan} Plan`,
        subscription_id: res.subscription.id,
        handler: async function (response) {
          try {
            setIsLoading(true);
            // 3. Verify payment on backend
            await apiFetch('/api/subscriptions/verify-payment', {
              method: 'POST',
              body: JSON.stringify({
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            onSuccess();
          } catch (err) {
            toast.error('Payment verification failed.');
            onClose();
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#3B82F6' // Neon cyan
        },
        modal: {
          ondismiss: function () {
            onClose();
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error(`Payment Failed: ${response.error.description}`);
      });
      rzp.open();
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error initiating payment');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {isLoading && (
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 size={40} className="animate-spin text-[var(--neon-cyan)]" />
          <p className="font-bold tracking-widest uppercase">Initializing Secure Checkout...</p>
        </div>
      )}
    </div>
  );
}

export default RazorpayCheckout;
