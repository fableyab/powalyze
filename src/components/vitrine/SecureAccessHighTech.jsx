import React from 'react';
import { Lock, Shield, Eye, UserCheck, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SecureAccessHighTech() {
  const { t } = useTranslation('landing');
  const securitySteps = [
    { icon: Lock, title: "Encryption SSL/TLS", desc: "Données chiffrées en transit" },
    { icon: Shield, title: "Hébergement Sécurisé", desc: "Infrastructure certifiée ISO 27001" },
    { icon: Eye, title: "Accès Contrôlé", desc: "Authentification multi-facteurs" },
    { icon: UserCheck, title: "Permissions Granulaires", desc: "Droits d'accès par rôle" },
    { icon: Database, title: "Backups Automatiques", desc: "Sauvegarde quotidienne sécurisée" }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0A1A2F]">
      <div className="max-w-7xl mx-auto px-6 animate-fadeIn">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('security.title', 'Sécurité & Conformité')}
          </h2>
          <p className="text-[#4A9EFF] text-lg md:text-xl">
            {t('security.subtitle', 'Vos données stratégiques protégées au plus haut niveau')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {securitySteps.map((step, i) => (
            <div
              key={i}
              className="p-6 bg-black/40 backdrop-blur-xl border border-[#4A9EFF]/20 rounded-xl hover:border-[#4A9EFF]/40 transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4A9EFF]/10 flex items-center justify-center">
                <step.icon className="w-8 h-8 text-[#4A9EFF]" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/70 text-sm">
            {t('security.compliance', 'Conforme RGPD · SOC 2 Type II · ISO 27001 · Hébergement Europe')}
          </p>
        </div>
      </div>
    </section>
  );
}
