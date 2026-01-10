import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

export default function LandingPage() {
  const [roiInput, setRoiInput] = useState(100000);

  return (
    <div className="relative bg-white">
      
      {/* Apple-style Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            <Link to="/" className="text-xl font-semibold text-black">
              Powalyze
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm">
              <a href="#features" className="text-gray-600 hover:text-black transition-colors">Fonctionnalités</a>
              <a href="#roi" className="text-gray-600 hover:text-black transition-colors">ROI</a>
              <a href="#solution" className="text-gray-600 hover:text-black transition-colors">Solution</a>
              <Link to="/login" className="text-blue-600 hover:text-blue-700 transition-colors">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Apple Style */}
      <section className="relative pt-16 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-black mb-6 tracking-tight leading-none">
            La gouvernance stratégique.
            <br />
            <span className="text-gray-600">Réinventée.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-normal">
            Pilotez vos portefeuilles de projets avec l'intelligence artificielle qui prédit avant que vous décidiez.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              to="/demo-mode"
              className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              Essayer gratuitement
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#demo"
              className="px-8 py-3 text-blue-600 text-lg font-medium hover:text-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Voir la démo
            </a>
          </div>
        </div>

        {/* Hero Visual - Product Screenshot */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black p-1">
            <div className="bg-black rounded-2xl overflow-hidden">
              {/* Mock Dashboard Interface */}
              <div className="aspect-[16/9] bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
                <div className="grid grid-cols-3 gap-6 h-full">
                  {/* Left: Stats */}
                  <div className="space-y-4">
                    <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                      <div className="text-3xl font-bold text-white mb-2">€2.8M</div>
                      <div className="text-sm text-gray-400">Budget Total</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                      <div className="text-3xl font-bold text-[#D4AF37] mb-2">847</div>
                      <div className="text-sm text-gray-400">Projets Actifs</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                      <div className="text-3xl font-bold text-blue-500 mb-2">94.7%</div>
                      <div className="text-sm text-gray-400">Taux de Réussite</div>
                    </div>
                  </div>

                  {/* Center: Chart */}
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                    <div className="h-full flex items-end justify-around gap-2">
                      <div className="w-full bg-gradient-to-t from-[#D4AF37] to-blue-500 rounded-t-lg" style={{height: '60%'}}></div>
                      <div className="w-full bg-gradient-to-t from-[#D4AF37] to-blue-500 rounded-t-lg" style={{height: '80%'}}></div>
                      <div className="w-full bg-gradient-to-t from-[#D4AF37] to-blue-500 rounded-t-lg" style={{height: '45%'}}></div>
                      <div className="w-full bg-gradient-to-t from-[#D4AF37] to-blue-500 rounded-t-lg" style={{height: '90%'}}></div>
                      <div className="w-full bg-gradient-to-t from-[#D4AF37] to-blue-500 rounded-t-lg" style={{height: '70%'}}></div>
                      <div className="w-full bg-gradient-to-t from-[#D4AF37] to-blue-500 rounded-t-lg" style={{height: '55%'}}></div>
                    </div>
                  </div>

                  {/* Right: Live Alerts */}
                  <div className="space-y-3">
                    <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-400">TEMPS RÉEL</span>
                      </div>
                      <p className="text-sm text-white">Projet ALPHA validé</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-400">PRÉDICTION IA</span>
                      </div>
                      <p className="text-sm text-white">Budget optimisé +12%</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-400">ALERTE</span>
                      </div>
                      <p className="text-sm text-white">Risque détecté Projet B</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 1 - Image Left */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl aspect-square flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] to-blue-600">
                    327%
                  </div>
                  <div className="text-2xl text-gray-600 mt-4">Retour sur Investissement</div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-6xl font-semibold text-black mb-6 leading-tight">
                Un ROI qui parle<br />de lui-même.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Nos clients réalisent en moyenne 327% de retour sur investissement en moins de 4 mois. 
                Chaque décision est optimisée par l'IA pour maximiser vos résultats.
              </p>
              <a href="#roi" className="text-blue-600 text-lg font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                Calculer votre ROI
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 - Image Right */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-semibold text-black mb-6 leading-tight">
                L'IA qui anticipe<br />vos décisions.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Notre moteur prédictif analyse en temps réel des milliers de données pour vous alerter 
                avant qu'un problème ne survienne. Vous gardez toujours une longueur d'avance.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-black mb-1">Alertes prédictives</div>
                    <div className="text-gray-600">Détection des risques avant qu'ils n'impactent vos projets</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-black mb-1">Optimisation automatique</div>
                    <div className="text-gray-600">Recommandations IA pour améliorer vos performances</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-black mb-1">Temps réel garanti</div>
                    <div className="text-gray-600">Toutes vos données actualisées à la seconde</div>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl aspect-square flex items-center justify-center p-8">
                <div className="w-full space-y-4">
                  {[85, 92, 78, 95, 88].map((value, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-blue-500 rounded-full"
                          style={{width: `${value}%`}}
                        ></div>
                      </div>
                      <span className="text-white font-semibold text-lg w-12 text-right">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3 - Full Width */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-semibold text-black mb-6 leading-tight">
            Tout votre écosystème.<br />
            <span className="text-gray-600">Unifié.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Connectez tous vos outils existants en un seul tableau de bord. Jira, Azure DevOps, Power BI, Excel... 
            Powalyze s'intègre à votre workflow.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-blue-600 rounded-2xl mb-6 flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">Intégrations natives</h3>
              <p className="text-gray-600">
                Plus de 50 connecteurs prêts à l'emploi pour synchroniser vos données en temps réel.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">API ouverte</h3>
              <p className="text-gray-600">
                Développez vos propres connecteurs avec notre API REST documentée et nos SDK.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl mb-6 flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">Sécurité enterprise</h3>
              <p className="text-gray-600">
                Certifications SOC2, ISO 27001. Vos données restent dans votre région Azure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="py-32 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
            Calculez votre retour<br />sur investissement.
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
            Estimez en quelques secondes les économies réalisables avec Powalyze.
          </p>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
            <div className="mb-12">
              <label className="block text-left mb-4 text-lg text-gray-300">
                Budget annuel de vos projets
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="50000"
                  max="10000000"
                  step="50000"
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #D4AF37 0%, #4A9EFF ${((roiInput - 50000) / 9950000) * 100}%, rgba(255,255,255,0.1) ${((roiInput - 50000) / 9950000) * 100}%)`
                  }}
                  onChange={(e) => setRoiInput(Number(e.target.value))}
                  value={roiInput}
                />
                <div className="mt-4 text-center">
                  <span className="text-4xl font-bold">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(roiInput)}
                  </span>
                  <span className="text-gray-400 ml-2">/ an</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-sm text-gray-400 mb-2">Économies estimées (an 1)</div>
                <div className="text-3xl font-bold text-[#D4AF37]">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(roiInput * 0.27)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Rentabilité</div>
                <div className="text-3xl font-bold text-green-500">3.7 mois</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Valeur sur 5 ans</div>
                <div className="text-3xl font-bold text-blue-500">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(roiInput * 3.27)}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link
                to="/demo-mode"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Apple Style */}
      <section className="py-32 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-semibold text-black mb-8 leading-tight">
            Prêt à transformer<br />votre gouvernance ?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Rejoignez les 847 organisations qui pilotent leurs projets avec Powalyze.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo-mode"
              className="px-10 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              Essayer gratuitement
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 border-2 border-blue-600 text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Parler à un expert
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Apple Minimal */}
      <footer className="border-t border-gray-200 py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-black mb-4">Produit</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#features" className="hover:text-black transition-colors">Fonctionnalités</a></li>
                <li><a href="#roi" className="hover:text-black transition-colors">Tarifs</a></li>
                <li><Link to="/demo-mode" className="hover:text-black transition-colors">Démo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/solutions/pmo" className="hover:text-black transition-colors">PMO</Link></li>
                <li><Link to="/solutions/executive" className="hover:text-black transition-colors">Direction</Link></li>
                <li><Link to="/solutions/data" className="hover:text-black transition-colors">Data & BI</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Entreprise</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/about" className="hover:text-black transition-colors">À propos</Link></li>
                <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-black transition-colors">CGU</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
            <p>© 2026 Powalyze. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
