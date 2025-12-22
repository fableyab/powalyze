export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-yellow-600/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-black text-yellow-500">FF</div>
            <div>
              <div className="font-bold text-lg">FABRICE FAYS</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">PMO Senior & Data Analyst</div>
            </div>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#accueil" className="text-sm hover:text-yellow-500 transition">Accueil</a>
            <a href="#services" className="text-sm hover:text-yellow-500 transition">Services</a>
            <a href="#expertise" className="text-sm hover:text-yellow-500 transition">Expertise</a>
            <a href="#contact" className="text-sm hover:text-yellow-500 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-6 py-3 mb-8">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wider">🇨🇭 Expertise Franco-Suisse</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Pilotage de Projets IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">& Data Analytics</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Expert PMO et analyste Power BI basé en Haute-Savoie. Je transforme vos données en décisions stratégiques et pilote vos projets critiques avec rigueur et excellence.
          </p>

          <div className="flex gap-6 justify-center flex-wrap mb-16">
            <a href="#contact" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
              📞 Discutons de votre projet
            </a>
            <a href="#services" className="border-2 border-yellow-500 text-yellow-500 px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 hover:text-black transition-all">
              🔍 Découvrir mes services
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-black text-yellow-500 mb-2">15+</div>
              <div className="text-sm text-gray-400 uppercase">Années d'Expérience</div>
            </div>
            <div>
              <div className="text-4xl font-black text-yellow-500 mb-2">200+</div>
              <div className="text-sm text-gray-400 uppercase">Projets Pilotés</div>
            </div>
            <div>
              <div className="text-4xl font-black text-yellow-500 mb-2">95%</div>
              <div className="text-sm text-gray-400 uppercase">Taux de Réussite</div>
            </div>
            <div>
              <div className="text-4xl font-black text-yellow-500 mb-2">🇫🇷🇨🇭</div>
              <div className="text-sm text-gray-400 uppercase">Zone Transfrontalière</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Mes <span className="text-yellow-500">Services</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Expert en pilotage de projets IT et analyse de données, je vous accompagne dans vos transformations digitales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/60 transition-all hover:scale-105">
              <div className="text-5xl mb-6">📊</div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">PMO & Pilotage</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Pilotage stratégique de vos projets IT critiques. Mise en place de PMO, gouvernance de portefeuille et suivi de la performance.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ Mise en place PMO</li>
                <li>✓ Gouvernance projet</li>
                <li>✓ Gestion des risques</li>
                <li>✓ Reporting exécutif</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/60 transition-all hover:scale-105">
              <div className="text-5xl mb-6">📈</div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Power BI & Analytics</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transformation de vos données en tableaux de bord interactifs Power BI. Visualisation avancée et insights actionnables.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ Dashboards Power BI</li>
                <li>✓ Modélisation de données</li>
                <li>✓ KPIs & métriques métier</li>
                <li>✓ Formation utilisateurs</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/60 transition-all hover:scale-105">
              <div className="text-5xl mb-6">💼</div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Missions Temporaires</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Intervention en renfort sur vos projets critiques. Management de transition et expertise ponctuelle à forte valeur ajoutée.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ Chef de projet IT</li>
                <li>✓ PMO Senior</li>
                <li>✓ Analyste de données</li>
                <li>✓ Consultant BI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Pourquoi <span className="text-yellow-500">Me Choisir</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Une expertise franco-suisse unique au service de vos projets stratégiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-yellow-500">Vision Stratégique</h3>
                <p className="text-gray-400">15 ans d'expérience en pilotage de projets complexes et transformation digitale</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-yellow-500">Réactivité Maximale</h3>
                <p className="text-gray-400">Disponibilité immédiate pour vos urgences et projets critiques</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">🌍</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-yellow-500">Zone Transfrontalière</h3>
                <p className="text-gray-400">Mobilité Haute-Savoie / Genève / Suisse Romande</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-yellow-500">Expertise Technique</h3>
                <p className="text-gray-400">Maîtrise complète Power BI, MS Project, Azure DevOps, Jira</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Parlons de <span className="text-yellow-500">Votre Projet</span>
          </h2>
          <p className="text-lg text-gray-400 mb-12">
            Vous avez un projet IT, besoin d'un PMO ou d'expertise Power BI ? Contactons-nous.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="text-3xl mb-3">📧</div>
              <div className="font-bold text-yellow-500 mb-2">Email</div>
              <a href="mailto:fabrice.fays@outlook.fr" className="text-gray-300 hover:text-yellow-500">fabrice.fays@outlook.fr</a>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="text-3xl mb-3">📱</div>
              <div className="font-bold text-yellow-500 mb-2">LinkedIn</div>
              <a href="#" className="text-gray-300 hover:text-yellow-500">Fabrice Fays</a>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="text-3xl mb-3">📍</div>
              <div className="font-bold text-yellow-500 mb-2">Localisation</div>
              <div className="text-gray-300">Haute-Savoie / Genève</div>
            </div>
          </div>

          <a href="mailto:fabrice.fays@outlook.fr" className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
            ✉️ M'envoyer un email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/20 py-8 px-6">
        <div className="container mx-auto max-w-6xl text-center text-gray-400">
          <p>© 2025 Fabrice Fays - Expert PMO & Data Analyst - Haute-Savoie / Genève</p>
          <p className="text-sm mt-2">Consulting IT • Pilotage de Projets • Power BI • Data Analytics</p>
        </div>
      </footer>
    </div>
  );
}
