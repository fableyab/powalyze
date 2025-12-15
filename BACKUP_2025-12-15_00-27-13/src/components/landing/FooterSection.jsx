
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useLanguage } from '@/context/LanguageContext';

const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 text-card-foreground">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <Logo />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services/strategic-pmo" className="text-muted-foreground hover:text-primary text-sm transition-colors">Strategic PMO</Link></li>
              <li>
                <a href="https://powalyze.ch/pmo-demo" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  PMO Demo
                </a>
              </li>
              <li><Link to="/executive-dashboard" className="text-muted-foreground hover:text-primary text-sm transition-colors">Executive Dashboard</Link></li>
              <li><Link to="/financial-report" className="text-muted-foreground hover:text-primary text-sm transition-colors">Financial Report</Link></li>
              <li><Link to="/interactive-preview" className="text-muted-foreground hover:text-primary text-sm transition-colors">Interactive Preview</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6 uppercase tracking-wider text-sm">Légal & Aide</h4>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary text-sm transition-colors">FAQ</Link></li>
              <li><Link to="/rgpd" className="text-muted-foreground hover:text-primary text-sm transition-colors">RGPD / Privacy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">CGU / Terms</Link></li>
              <li><Link to="/confidentialite" className="text-muted-foreground hover:text-primary text-sm transition-colors">Confidentialité</Link></li>
              <li><Link to="/legal-notice" className="text-muted-foreground hover:text-primary text-sm transition-colors">Mentions Légales</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin size={16} className="text-primary mt-1 shrink-0" />
                <span className="flex flex-col">
                  <span>Genève, Suisse</span>
                  <span>Lausanne, Suisse</span>
                </span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+33615767067" className="hover:text-foreground transition-colors">+33(0) 6 15 76 70 67</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:contact@powalyze.ch" className="hover:text-foreground transition-colors">contact@powalyze.ch</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">© 2025 Powalyze. All rights reserved.</p>
          <p className="text-muted-foreground/80 text-xs">Swiss Excellence. Global Reach.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
