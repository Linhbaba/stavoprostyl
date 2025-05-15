'use client';

import { useState } from 'react';

export function CtaSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
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
      // Simulace odeslání formuláře - v produkci nahradit skutečným API voláním
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Odeslaná data:', formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitError('Při odesílání došlo k chybě. Zkuste to prosím znovu později.');
      console.error('Chyba při odesílání formuláře:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-light-blue">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* CTA Text a formulář - centrovaný */}
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-dark-blue">
            Máte stavební projekt v hlavě? Nechte to na nás – postavíme Vaše sny.
          </h2>
          <p className="text-lg mb-8 text-dark-blue/80">
            Jsme připraveni přeměnit vaše představy ve skutečnost. Vyplňte jednoduchý formulář a my vás budeme kontaktovat.
          </p>
          
          {/* Kontaktní formulář */}
          {submitSuccess ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 w-full max-w-xl">
              <strong className="font-bold">Děkujeme za zprávu!</strong>
              <p>Ozveme se vám co nejdříve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white/90 p-6 rounded-md shadow-lg w-full max-w-xl">
              {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                  {submitError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-dark-blue mb-1 text-sm font-medium">Vaše jméno *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md text-dark-blue bg-soft-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-dark-blue mb-1 text-sm font-medium">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md text-dark-blue bg-soft-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-dark-blue mb-1 text-sm font-medium">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md text-dark-blue bg-soft-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-dark-blue mb-1 text-sm font-medium">Vaše zpráva *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  spellCheck={false}
                  data-ms-editor="false"
                  className="w-full px-3 py-2 border rounded-md text-dark-blue bg-soft-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-bold font-heading uppercase transition-all duration-200 bg-primary-red hover:bg-primary-red-dark text-white focus:ring-2 focus:ring-primary-red focus:ring-offset-2 active:scale-95"
                >
                  {isSubmitting ? 'Odesílám...' : 'Nezávazně poptat stavbu'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
} 