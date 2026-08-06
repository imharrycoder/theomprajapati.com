import { useEffect, useState } from 'react';
import { ArrowRight, Code, MonitorSmartphone, Server, Shield, Database, Cpu, X, Bot, MessageCircle } from 'lucide-react';
import { apiFetch } from '../utils/api.js';
import { services as staticServices } from '../data/content.js';
import { useNavigate } from 'react-router-dom';

const getServiceIcon = (index) => {
  const icons = [Code, MonitorSmartphone, Server, Shield, Database, Cpu];
  const Icon = icons[index % icons.length];
  return <Icon size={32} className="mb-4 text-[var(--text)] opacity-80" />;
};

const glowClasses = ['neon-glow-cyan', 'neon-glow-purple', 'neon-glow-pink', 'neon-glow-lime', 'neon-glow-yellow'];
const WHATSAPP_NUMBER = '919770051199';

function ServicesPage() {
  const [services, setServices] = useState(staticServices);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all services (no ?home=true filter)
    apiFetch('/services')
      .then((data) => {
        // Handle pagination response or raw array
        const items = data.data ? data.data : data;
        if (Array.isArray(items) && items.length) setServices(items);
      })
      .catch(() => setServices(staticServices));
  }, []);

  const handleGetQuote = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleAiPlanner = () => {
    // Navigate to project-cost, optionally we could pass state, but the prompt just said redirect
    navigate('/project-cost');
  };

  const handleWhatsApp = () => {
    const message = `Hi, I am interested in getting a quote for: ${selectedService?.title || 'your services'}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    closeModal();
  };

  return (
    <div className="pt-24 pb-16 min-h-screen relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple opacity-[0.15] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-cyan opacity-10 blur-[150px] rounded-full pointer-events-none" />

      <div className="shell relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-[var(--text)]">Our Services</h1>
          <p className="text-lg text-[var(--muted)]">
            From modern web applications to scalable digital infrastructure, I provide the expertise to build, launch, and grow your vision.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article 
              key={service.id ?? service.title} 
              className={`neon-card ${glowClasses[index % glowClasses.length]} p-6 flex flex-col`}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
            >
              {getServiceIcon(index)}
              {service.category && (
                <span className="tag mb-3 self-start text-xs border-[var(--line)] bg-[var(--surface-3)] text-[var(--text)]">
                  {service.category}
                </span>
              )}
              <h3 className="mt-2 text-xl font-black text-[var(--text)]">{service.title}</h3>
              <p className="mt-3 mb-6 text-sm leading-7 text-[var(--muted)] flex-grow">{service.description}</p>
              
              <button 
                onClick={() => handleGetQuote(service)}
                className="mt-auto w-full btn-primary justify-center flex items-center gap-2"
              >
                Get Quote
                <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Quote Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className="bg-[var(--surface-1)] border border-[var(--line)] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative"
            data-aos="zoom-in"
            data-aos-duration="200"
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-black mb-4 pr-6 text-[var(--text)]">Get an Estimate</h2>
            <p className="text-[var(--muted)] mb-8 leading-relaxed">
              Would you like to get a precise, instant estimate using our AI Project Planner first, or continue directly to chat on WhatsApp?
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleAiPlanner}
                className="w-full flex items-center justify-center gap-3 bg-[var(--surface-3)] hover:bg-[var(--surface-4)] text-[var(--text)] border border-[var(--line)] rounded-xl px-4 py-3 font-semibold transition-all"
              >
                <Bot className="text-neon-cyan" size={20} />
                Use AI Planner
              </button>
              
              <button 
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl px-4 py-3 font-semibold transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle size={20} />
                Continue to WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesPage;
