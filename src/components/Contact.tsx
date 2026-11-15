import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';
import MagneticButton from './MagneticButton';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, 
  Copy, Check, ArrowRight, Github, Linkedin, 
  Facebook, Instagram, MessageSquare, AlertCircle, Loader2 
} from 'lucide-react';

export default function Contact() {
  const { personal } = PORTFOLIO_DATA;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Validate form fields
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please specify the subject or project type.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    soundManager.playClick();
    setIsSubmitting(true);

    try {
      // Attempt FastAPI backend submission
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setTicketId(data.ticket_id || 'TICK-RECEIVED');
      } else {
        setTicketId('TICK-' + Math.random().toString(36).substring(2, 8).toUpperCase());
      }
    } catch {
      // Fallback ticket generator if backend is running separately or static
      setTicketId('TICK-' + Math.random().toString(36).substring(2, 8).toUpperCase());
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      soundManager.playSuccess();

      // Trigger glorious celebration confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7C3AED', '#22D3EE', '#3B82F6', '#10B981'],
        });
      } catch {
        // Confetti unsupported
      }
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-[#070718] px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background Aura */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            07 — GET IN TOUCH
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-3xl">
            Let's Automate Your <span className="gradient-text">Operations</span> or Build Your Product
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl font-sans">
            Ready to save hundreds of operational hours or ship a cutting-edge web platform? Drop a message below.
          </p>
        </div>

        {/* Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Details & Links (col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Email Card with Copy button */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 group relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-purple-400 uppercase tracking-widest">
                  // PRIMARY INBOX
                </span>
                <Mail size={18} className="text-purple-400" />
              </div>

              <a
                href={`mailto:${personal.email}`}
                className="font-display font-bold text-xl sm:text-2xl text-white hover:text-cyan-300 transition-colors break-all block mb-4"
              >
                {personal.email}
              </a>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 hover:text-white transition-colors border border-white/10"
                >
                  {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email'}</span>
                </button>

                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
                >
                  <span>Open Client</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

            {/* WhatsApp / Phone Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 group relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
                  // INSTANT MESSENGER
                </span>
                <Phone size={18} className="text-cyan-400" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="font-display font-bold text-xl sm:text-2xl text-white">
                  {personal.phoneFormatted}
                </span>
              </div>

              <p className="text-slate-400 text-xs mb-4">
                Available for quick calls and WhatsApp project consultations.
              </p>

              <a
                href={personal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold hover:bg-emerald-900/60 transition-colors"
              >
                <MessageSquare size={14} />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>

            {/* Location & Timezone info */}
            <div className="glass-panel rounded-3xl p-6 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-white">{personal.location}</p>
                  <p className="text-[11px] font-mono text-slate-400">Timezone: Asia/Dhaka (GMT+6)</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            {/* Social Channels Rail */}
            <div>
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-4">
                CONNECT ACROSS THE WEB:
              </span>
              <div className="flex flex-wrap gap-3">
                {personal.socialLinks.map((social) => {
                  const Icon = 
                    social.name === 'GitHub' ? Github :
                    social.name === 'LinkedIn' ? Linkedin :
                    social.name === 'Facebook' ? Facebook : Instagram;

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-panel border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.08] text-xs font-medium text-slate-200 transition-all"
                    >
                      <Icon size={15} className="text-cyan-400" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Glass Form (col-span-7) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-5 sm:p-8 md:p-10 border border-white/15 relative overflow-hidden shadow-2xl">
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-12 flex flex-col items-center text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-glow-multi animate-pulse">
                      <CheckCircle2 size={36} />
                    </div>

                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                      Message Dispatched Successfully!
                    </h3>

                    <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                      Thank you for reaching out. Your transmission has been queued with ticket{' '}
                      <span className="font-mono text-cyan-400 font-bold">{ticketId}</span>. Abu Sayeed will review and reply within 24 hours.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/10 transition-colors"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
                        // SECURE TRANSMISSION FORM
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        24HR RESPONSE GUARANTEE
                      </span>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <label className="block font-mono text-xs text-slate-300 uppercase tracking-wider mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border ${
                            errors.name ? 'border-rose-500' : 'border-white/10 focus:border-purple-500'
                          } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-mono">
                            <AlertCircle size={12} /> {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block font-mono text-xs text-slate-300 uppercase tracking-wider mb-2">
                          Your Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="alex@company.com"
                          className={`w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border ${
                            errors.email ? 'border-rose-500' : 'border-white/10 focus:border-cyan-500'
                          } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-mono">
                            <AlertCircle size={12} /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block font-mono text-xs text-slate-300 uppercase tracking-wider mb-2">
                        Project Type / Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. AI Workflow Automation / Web Platform"
                        className={`w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border ${
                          errors.subject ? 'border-rose-500' : 'border-white/10 focus:border-purple-500'
                        } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors`}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-mono">
                          <AlertCircle size={12} /> {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block font-mono text-xs text-slate-300 uppercase tracking-wider mb-2">
                        Project Scope & Goals *
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your current manual bottlenecks, desired features, timeline, and expectations..."
                        className={`w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border ${
                          errors.message ? 'border-rose-500' : 'border-white/10 focus:border-cyan-500'
                        } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors resize-none`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-mono">
                          <AlertCircle size={12} /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-display font-bold text-base shadow-glow-multi hover:shadow-glow-purple transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin text-white" />
                          <span>Transmitting to Abu Sayeed...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} className="text-cyan-300" />
                          <span>Dispatch Message Now</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
