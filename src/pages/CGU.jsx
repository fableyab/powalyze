
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CGU = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-32 pb-20 px-6 container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Conditions Générales d'Utilisation (CGU)</h1>
        <p className="text-slate-400 mb-8">Dernière mise à jour : 04 Janvier 2026</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (ci-après "CGU") ont pour objet de définir les modalités et conditions dans lesquelles la société Powalyze AG (ci-après "l'Éditeur") met à la disposition des utilisateurs (ci-après "les Utilisateurs") les sites powalyze.ch et powalyze.com (ci-après "le Site") et les services disponibles sur le Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Acceptation des CGU</h2>
            <p>
              L'accès et l'utilisation du Site sont soumis à l'acceptation et au respect des présentes CGU. L'Éditeur se réserve le droit de modifier, à tout moment et sans préavis, le Site et des services ainsi que les présentes CGU, notamment pour s'adapter aux évolutions du site par la mise à disposition de nouvelles fonctionnalités ou la suppression ou la modification de fonctionnalités existantes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Accès au Site</h2>
            <p>
              L'Éditeur s'efforce de permettre l'accès au Site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d'un événement hors du contrôle de l'Éditeur, et sous réserve des éventuelles pannes et interventions de maintenance nécessaires au bon fonctionnement du Site et des services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Propriété Intellectuelle</h2>
            <p>
              La structure générale du Site powalyze.ch et powalyze.com, ainsi que les textes, graphiques, images, sons et vidéos la composant, sont la propriété de l'Éditeur ou de ses partenaires. Toute représentation et/ou reproduction et/ou exploitation partielle ou totale des contenus et services proposés par le Site, par quelque procédé que ce soit, sans l'autorisation préalable et par écrit de Powalyze AG est strictement interdite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Données Personnelles</h2>
            <p>
              Powalyze AG s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site powalyze.ch, soient conformes au règlement général sur la protection des données (RGPD) et à la loi fédérale sur la protection des données (LPD).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Droit Applicable</h2>
            <p>
              Les présentes CGU sont régies par le droit suisse. En cas de litige, et à défaut d'accord amiable, la compétence exclusive est attribuée aux tribunaux de Zürich, Suisse.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CGU;
