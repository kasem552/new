import React, { useState } from 'react';
import { Send, Mail, Phone, MessageCircle, Loader2 } from 'lucide-react';
import SplineBackground from '../components/SplineBackground';
import { useTranslation } from '../hooks/useTranslation';
import { createMessage } from '../lib/firebase/collections/messages';

export default function Contact() {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      setSubmitting(true);
      await createMessage({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        tiktokHandle: formData.get('tiktok') as string,
        message: formData.get('message') as string
      });
      
      setSuccess(true);
      form.reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex-grow">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <SplineBackground />
        
        <div className="relative z-10 w-full py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-gradient-shine backdrop-blur-xl bg-gradient-to-br from-black/40 via-primary/40 to-accent/20 rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                  <h1 className="text-4xl font-bold text-white mb-6">{t.contact.title}</h1>
                  <p className="text-white/80 mb-8">
                    {t.contact.subtitle}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1">
                          {t.contact.form.name}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder={t.contact.form.namePlaceholder}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
                          {t.contact.form.email}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder={t.contact.form.emailPlaceholder}
                        />
                      </div>
                      <div>
                        <label htmlFor="tiktok" className="block text-sm font-medium text-white/90 mb-1">
                          {t.contact.form.tiktokHandle}
                        </label>
                        <input
                          type="text"
                          id="tiktok"
                          name="tiktok"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder={t.contact.form.tiktokHandlePlaceholder}
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1">
                          {t.contact.form.message}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                          placeholder={t.contact.form.messagePlaceholder}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          {t.contact.form.submit}
                        </>
                      )}
                    </button>

                    {success && (
                      <div className="text-center text-green-400 mt-4">
                        Message sent successfully!
                      </div>
                    )}
                  </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">{t.contact.info.title}</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <Mail className="text-accent" size={20} />
                        </div>
                        <div>
                          <p className="text-white/90 font-medium">{t.contact.info.email}</p>
                          <a href="mailto:info@canaanmedia.vip" className="text-accent hover:text-accent-hover">
                            info@canaanmedia.vip
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <Phone className="text-accent" size={20} />
                        </div>
                        <div>
                          <p className="text-white/90 font-medium">{t.contact.info.phone}</p>
                          <a href="tel:+905539444779" className="text-accent hover:text-accent-hover">
                            +90 553 944 47 79
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="text-accent" size={20} />
                        </div>
                        <div>
                          <p className="text-white/90 font-medium">{t.contact.info.whatsapp}</p>
                          <a 
                            href="https://wa.me/905539444779" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent-hover"
                          >
                            {t.contact.info.whatsappText}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">{t.contact.info.location}</h2>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                      <p className="text-white/90">
                        {t.contact.info.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}