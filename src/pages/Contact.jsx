import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, Clock, Building2, Linkedin, Twitter } from 'lucide-react';
import { LogoWithText } from '@/components/LogoPowalyze';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    country: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        country: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#020713]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
          <Link to="/">
            <LogoWithText className="h-8" />
          </Link>
          <div className="flex items-center gap-8">
            <Link to="/" className="text-sm font-light text-white/60 hover:text-white transition-colors duration-500">
              Home
            </Link>
            <Link to="/manifesto" className="text-sm font-light text-white/60 hover:text-white transition-colors duration-500">
              Manifesto
            </Link>
            <Link to="/login" className="px-6 py-2.5 bg-[#D4AF37] text-black text-sm font-light rounded-[2px] hover:bg-[#D4AF37]/90 transition-all duration-500">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-white/20" />
            <Mail className="w-6 h-6 text-[#D4AF37]" />
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-white/20" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-[0.02em]">
            Contact Us
          </h1>
          <p className="text-lg font-light text-white/50 max-w-2xl mx-auto">
            Get in touch with our team. We're here to help you achieve Swiss precision in your strategic governance.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Headquarters */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-8 hover:border-[#D4AF37]/30 transition-all duration-500 group">
              <div className="w-12 h-12 border border-white/10 rounded-[2px] flex items-center justify-center mb-6 group-hover:border-[#D4AF37]/30 transition-all duration-500">
                <Building2 className="w-6 h-6 text-white/60 group-hover:text-[#D4AF37] transition-colors duration-500" />
              </div>
              <h3 className="text-sm font-light text-white/40 mb-2 tracking-[0.2em] uppercase">Headquarters</h3>
              <p className="text-base font-light text-white leading-relaxed">
                Powalyze SA<br />
                Rue du Rhône 100<br />
                1204 Geneva<br />
                Switzerland
              </p>
            </div>

            {/* Email */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-8 hover:border-[#D4AF37]/30 transition-all duration-500 group">
              <div className="w-12 h-12 border border-white/10 rounded-[2px] flex items-center justify-center mb-6 group-hover:border-[#D4AF37]/30 transition-all duration-500">
                <Mail className="w-6 h-6 text-white/60 group-hover:text-[#D4AF37] transition-colors duration-500" />
              </div>
              <h3 className="text-sm font-light text-white/40 mb-2 tracking-[0.2em] uppercase">Email</h3>
              <p className="text-base font-light text-white leading-relaxed">
                <a href="mailto:contact@powalyze.com" className="hover:text-[#D4AF37] transition-colors duration-500">
                  contact@powalyze.com
                </a><br />
                <a href="mailto:contact@powalyze.ch" className="hover:text-[#D4AF37] transition-colors duration-500">
                  contact@powalyze.ch
                </a>
              </p>
            </div>

            {/* Phone */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-8 hover:border-[#D4AF37]/30 transition-all duration-500 group">
              <div className="w-12 h-12 border border-white/10 rounded-[2px] flex items-center justify-center mb-6 group-hover:border-[#D4AF37]/30 transition-all duration-500">
                <Phone className="w-6 h-6 text-white/60 group-hover:text-[#D4AF37] transition-colors duration-500" />
              </div>
              <h3 className="text-sm font-light text-white/40 mb-2 tracking-[0.2em] uppercase">Phone</h3>
              <p className="text-base font-light text-white leading-relaxed">
                Switzerland: <a href="tel:+33615767067" className="hover:text-[#D4AF37] transition-colors duration-500">+33 6 15 76 70 67</a><br />
                France: <a href="tel:+33615767067" className="hover:text-[#D4AF37] transition-colors duration-500">+33 6 15 76 70 67</a>
              </p>
            </div>

            {/* Business Hours */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-8 hover:border-[#D4AF37]/30 transition-all duration-500 group">
              <div className="w-12 h-12 border border-white/10 rounded-[2px] flex items-center justify-center mb-6 group-hover:border-[#D4AF37]/30 transition-all duration-500">
                <Clock className="w-6 h-6 text-white/60 group-hover:text-[#D4AF37] transition-colors duration-500" />
              </div>
              <h3 className="text-sm font-light text-white/40 mb-2 tracking-[0.2em] uppercase">Business Hours</h3>
              <p className="text-base font-light text-white leading-relaxed">
                Monday - Friday<br />
                9:00 AM - 6:00 PM<br />
                CET
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder & Form Section */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Google Maps iframe */}
            <div className="lg:col-span-2">
              <div className="sticky top-32 rounded-[2px] overflow-hidden border border-white/5 h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87380.40277107966!2d6.048632971875!3d46.20453070000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c7a99c86f0001%3A0x1234567890abcdef!2sGen%C3%A8ve%2C%20Suisse!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(30%) brightness(0.7)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Powalyze Geneva Office"
                ></iframe>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-xl font-light text-white mb-2">Geneva Office</h3>
                  <p className="text-sm text-white/60 font-light">Rue du Rhône 100, 1204 Geneva, Switzerland</p>
                  <div className="flex items-center justify-start gap-4 mt-4">
                    <a href="https://linkedin.com/company/powalyze" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/10 rounded-[2px] flex items-center justify-center hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all duration-500 group">
                      <Linkedin className="w-4 h-4 text-white/60 group-hover:text-[#D4AF37] transition-colors duration-500" />
                    </a>
                    <a href="https://twitter.com/powalyze" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/10 rounded-[2px] flex items-center justify-center hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all duration-500 group">
                      <Twitter className="w-4 h-4 text-white/60 group-hover:text-[#D4AF37] transition-colors duration-500" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-black/40 backdrop-blur-xl border border-[#D4AF37]/30 rounded-[2px] p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                  <h3 className="text-3xl font-extralight text-white mb-4">Message Sent!</h3>
                  <p className="text-base font-light text-white/60">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-12">
                  <h2 className="text-3xl font-extralight text-white mb-8">Send us a message</h2>
                  
                  {/* Name Row */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-light text-white/40 mb-2 tracking-[0.1em] uppercase">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2px] text-white font-light focus:border-[#D4AF37] focus:outline-none transition-all duration-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-white/40 mb-2 tracking-[0.1em] uppercase">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2px] text-white font-light focus:border-[#D4AF37] focus:outline-none transition-all duration-500"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-sm font-light text-white/40 mb-2 tracking-[0.1em] uppercase">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2px] text-white font-light focus:border-[#D4AF37] focus:outline-none transition-all duration-500"
                      placeholder="john.smith@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-6">
                    <label className="block text-sm font-light text-white/40 mb-2 tracking-[0.1em] uppercase">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2px] text-white font-light focus:border-[#D4AF37] focus:outline-none transition-all duration-500"
                      placeholder="+41 22 518 1000"
                    />
                  </div>

                  {/* Company & Role Row */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-light text-white/40 mb-2 tracking-[0.1em] uppercase">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2px] text-white font-light focus:border-[#D4AF37] focus:outline-none transition-all duration-500"
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-white/40 mb-2 tracking-[0.1em] uppercase">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2px] text-white font-light focus:border-[#D4AF37] focus:outline-none transition-all duration-500"
                        placeholder="CEO"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div className="mb-6">
                    <label className="block text-sm font-light text-white/40 mb-2 tracking-[0.1em] uppercase">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2px] text-white font-light focus:border-[#D4AF37] focus:outline-none transition-all duration-500"
                    >
                      <option value="">Select a country</option>
                      <option value="CH">Switzerland</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="UK">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div className="mb-6">
                    <label className="block text-sm font-light text-white/40 mb-2 tracking-[0.1em] uppercase">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2px] text-white font-light focus:border-[#D4AF37] focus:outline-none transition-all duration-500"
                      placeholder="Inquiry about your services"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-8">
                    <label className="block text-sm font-light text-white/40 mb-2 tracking-[0.1em] uppercase">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2px] text-white font-light focus:border-[#D4AF37] focus:outline-none transition-all duration-500 resize-none"
                      placeholder="Tell us about your project and how we can help..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="relative w-full px-8 py-4 bg-[#D4AF37] text-black text-sm font-light rounded-[2px] hover:bg-[#D4AF37]/90 transition-all duration-500 group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-sm font-light text-white/40">
            © 2025 Powalyze SA. Swiss Precision in Strategic Governance.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
