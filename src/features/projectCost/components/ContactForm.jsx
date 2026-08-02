import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building2 } from 'lucide-react';

function ContactForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const fields = [
    { key: 'name', label: 'Full Name', icon: User, type: 'text', required: true, placeholder: 'Enter your full name' },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email', required: true, placeholder: 'your@email.com' },
    { key: 'phone', label: 'Phone / WhatsApp', icon: Phone, type: 'tel', required: true, placeholder: '+91 XXXXXXXXXX' },
    { key: 'company', label: 'Company Name (optional)', icon: Building2, type: 'text', required: false, placeholder: 'Your company name' },
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-lg space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-[var(--text)]">Almost there!</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Enter your details to receive your personalized project estimate
        </p>
      </div>

      {fields.map(({ key, label, icon: Icon, type, required, placeholder }) => (
        <div key={key}>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-bold text-[var(--text)]">
            <Icon size={14} className="text-[var(--accent)]" />
            {label}
          </label>
          <input
            type={type}
            value={form[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            required={required}
            placeholder={placeholder}
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5 text-[var(--text)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
          />
        </div>
      ))}

      <motion.button
        type="submit"
        disabled={loading || !form.name || !form.email || !form.phone}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary pulse-neon mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Analyzing your project...' : 'Get My Project Estimate'}
      </motion.button>
    </motion.form>
  );
}

export default ContactForm;
