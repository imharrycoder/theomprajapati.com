import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Check, Zap } from 'lucide-react';
import { apiFetch } from '../utils/api';
import RazorpayCheckout from '../components/RazorpayCheckout';

const plan = {
  id: 'PREMIUM',
  name: 'Premium Access',
  originalPrice: 299,
  price: 99,
  period: 'per month',
  description: 'The ultimate experience for dedicated learners. Get full access to everything.',
  features: [
    'Access to all premium blog posts',
    'Exclusive content library',
    'Community access',
    'Priority email support',
    'Exclusive downloadable resources',
    '1-on-1 Q&A sessions monthly'
  ],
  glow: 'neon-glow-cyan',
  badge: 'EARLY JOINER OFFER'
};

function Pricing() {
  const [activePlan, setActivePlan] = useState(null);
  const [activePlanDetails, setActivePlanDetails] = useState(null);
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user subscription if logged in
    const token = localStorage.getItem('userToken');
    if (token) {
      apiFetch('/api/subscriptions/status')
        .then((res) => {
          if (res.isActive) {
            setActivePlan(res.plan);
            setActivePlanDetails(res);
          }
        })
        .catch(console.error);
    }
  }, []);

  const handleSubscribe = (planId) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.info('Please login to subscribe');
      navigate('/login', { state: { returnTo: '/pricing' } });
      return;
    }
    setCheckoutPlan(planId);
  };

  const isCurrentPlan = activePlan === plan.id || activePlan === 'STANDARD' || activePlan === 'EARLY_JOINER';

  return (
    <div className="section-band relative py-20 min-h-screen flex items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-cyan opacity-5 blur-[150px] rounded-[100%] pointer-events-none" />
      
      <div className="shell relative z-10 max-w-3xl w-full mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[var(--neon-cyan)] mb-4" data-aos="fade-up">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--text)] mb-6" data-aos="fade-up" data-aos-delay="100">
            Choose Your Access Level
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Unlock premium content, exclusive resources, and direct support to accelerate your journey.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {isCurrentPlan ? (
            <div 
              className="neon-card neon-glow-cyan p-8 lg:p-12 relative flex flex-col border-[var(--neon-cyan)] shadow-[0_0_30px_rgba(0,243,255,0.15)] items-center text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="mb-6 h-20 w-20 rounded-full bg-[var(--surface-3)] border border-[var(--neon-cyan)] flex items-center justify-center text-[var(--neon-cyan)] shadow-glow">
                <Check size={40} />
              </div>
              <h3 className="text-3xl font-black text-[var(--text)] mb-4">You have Premium Access</h3>
              <p className="text-lg text-[var(--muted)] mb-8">
                Your subscription is active and you have full access to all premium content.
              </p>
              
              {activePlanDetails?.expiresAt && (
                <div className="bg-[var(--surface-2)] border border-[var(--line)] rounded-lg p-4 w-full">
                  <p className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">Subscription Expires On</p>
                  <p className="text-xl font-bold text-[var(--text)]">
                    {new Date(activePlanDetails.expiresAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div 
              className={`neon-card ${plan.glow} p-8 lg:p-12 relative flex flex-col border-[var(--neon-cyan)] shadow-[0_0_30px_rgba(0,243,255,0.15)]`}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className={`tag bg-[var(--surface-3)] border-[var(--line)] text-xs text-[var(--text)] px-4 py-1.5 shadow-lg`}>
                  <Zap size={14} className="mr-1 inline text-[var(--neon-pink)]" />
                  {plan.badge}
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-[var(--text)] mb-2 text-center">{plan.name}</h3>
              <p className="text-sm text-[var(--muted)] mb-8 text-center">{plan.description}</p>
              
              <div className="mb-8 text-center flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-[var(--muted)] line-through decoration-red-500 decoration-2">₹{plan.originalPrice}</span>
                <span className="text-6xl font-black text-[var(--text)] text-shadow-glow">₹{plan.price}</span>
                <span className="text-[var(--muted)] font-medium mt-4">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-[var(--surface-3)] rounded-full p-1 border border-[var(--line)]">
                      <Check size={14} className="text-[var(--neon-lime)]" />
                    </div>
                    <span className="text-sm text-[var(--text)] leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleSubscribe(plan.id)}
                className="w-full btn-primary pulse-neon"
              >
                Subscribe to {plan.name}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {checkoutPlan && (
        <RazorpayCheckout 
          plan={checkoutPlan} 
          onSuccess={() => {
            setActivePlan(checkoutPlan);
            setCheckoutPlan(null);
            toast.success('Subscription activated successfully!');
          }} 
          onClose={() => setCheckoutPlan(null)} 
        />
      )}
    </div>
  );
}

export default Pricing;
