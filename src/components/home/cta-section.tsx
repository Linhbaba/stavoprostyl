'use client';

import { useState } from 'react';

export interface CtaData {
  heading?: string
  subtitle?: string
}

export interface CtaContact {
  phone: string
  email: string
}

interface CtaSectionProps {
  data?: CtaData
  contact?: CtaContact
}

const DEFAULT_CONTACT: CtaContact = {
  phone: '+420 777 888 999',
  email: 'info@stavoprostyl.cz',
}

export function CtaSection({ data, contact }: CtaSectionProps) {
  const heading = data?.heading || 'Máte stavební projekt v hlavě? Nechte to na nás – postavíme Vaše sny.';
  const subtitle = data?.subtitle || 'Jsme připraveni přeměnit vaše představy ve skutečnost. Vyplňte jednoduchý formulář a my vás budeme kontaktovat.';
  const phone = contact?.phone || DEFAULT_CONTACT.phone;
  const email = contact?.email || DEFAULT_CONTACT.email;
  const phoneHref = `tel:${phone.replace(/\s/g, '')}`;

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setSubmitError('Při odesílání došlo k chybě. Zkuste to prosím znovu později.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="py-20 md:py-32 bg-dark-blue text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <div className="text-sm font-bold text-primary-red uppercase tracking-wider mb-4">Kontaktujte nás</div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-6 leading-tight">{heading}</h2>
            <p className="text-xl text-white/80 font-subheading leading-relaxed mb-10">{subtitle}</p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold font-heading mb-1">E-mail</h4>
                <a href={`mailto:${email}`} className="text-white/80 hover:text-primary-red transition-colors">{email}</a>
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading mb-1">Telefon</h4>
                <a href={phoneHref} className="text-white/80 hover:text-primary-red transition-colors">{phone}</a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white text-dark-blue p-8 md:p-12 shadow-2xl">
              {submitSuccess ? (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-6">
                  <strong className="font-bold block text-lg mb-2">Děkujeme za zprávu!</strong>
                  <p>Ozveme se vám co nejdříve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 mb-6">{submitError}</div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider mb-2">Vaše jméno *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-red focus:border-transparent transition-colors outline-none" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider mb-2">E-mail *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-red focus:border-transparent transition-colors outline-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-wider mb-2">Telefon</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-red focus:border-transparent transition-colors outline-none" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider mb-2">Vaše zpráva *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={4} spellCheck={false} className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-red focus:border-transparent transition-colors outline-none resize-y" />
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold font-heading uppercase transition-all duration-200 bg-primary-red hover:bg-primary-red-dark text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red focus-visible:ring-offset-2 active:scale-95 w-full md:w-auto">
                      {isSubmitting ? 'Odesílám...' : 'Nezávazně poptat stavbu'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
