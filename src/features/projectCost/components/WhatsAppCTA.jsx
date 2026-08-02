import { motion } from 'framer-motion';
import { MessageCircle, Download } from 'lucide-react';
import { apiFetch } from '../../../utils/api.js';

function WhatsAppCTA({ report, contactInfo, leadId }) {
  const whatsappNumber = '919924115353'; // The Om Prajapati WhatsApp

  const handleWhatsApp = async () => {
    const message = buildWhatsAppMessage(report, contactInfo);
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Track the click
    if (leadId) {
      try {
        await apiFetch(`/project-cost/leads/${leadId}/track`, {
          method: 'PUT',
          body: JSON.stringify({ whatsappClicked: true }),
          suppressToast: true,
        });
      } catch { /* ignore */ }
    }

    window.open(url, '_blank');
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : 'https://api.theomprajapati.com')}/project-cost/pdf`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ report, contactInfo }),
        }
      );

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'project-estimate-the-om-prajapati.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Track the download
      if (leadId) {
        try {
          await apiFetch(`/project-cost/leads/${leadId}/track`, {
            method: 'PUT',
            body: JSON.stringify({ pdfDownloaded: true }),
            suppressToast: true,
          });
        } catch { /* ignore */ }
      }
    } catch (err) {
      console.error('PDF download failed:', err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent-3)]/5 p-8">
      <h4 className="text-center text-lg font-bold text-[var(--text)]">
        Ready to bring your project to life?
      </h4>
      <p className="max-w-md text-center text-sm text-[var(--muted)]">
        Get a detailed quotation and discuss your project requirements with our team.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleWhatsApp}
          className="btn-primary pulse-neon flex items-center gap-2 !bg-[#25D366] !border-[#25D366] !text-white !shadow-[0_0_20px_rgba(37,211,102,0.4)]"
        >
          <MessageCircle size={18} />
          Get Final Quote on WhatsApp
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleDownloadPDF}
          className="btn-secondary flex items-center gap-2"
        >
          <Download size={18} />
          Download Estimate PDF
        </motion.button>
      </div>
    </div>
  );
}

function buildWhatsAppMessage(report, contactInfo) {
  return `Hi,

I used your AI Project Cost Planner.

${contactInfo?.name ? `Name: ${contactInfo.name}` : ''}
${contactInfo?.company ? `Company: ${contactInfo.company}` : ''}

Project Type:
${report.projectType}

Estimated Cost:
₹${report.totalCost.toLocaleString('en-IN')}

Timeline:
${report.timeline.total} Working Days

Complexity:
${report.complexityLabel}

I'd like to discuss my project and receive a detailed quotation.

Thank you.`;
}

export default WhatsAppCTA;
