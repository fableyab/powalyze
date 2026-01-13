/**
 * PAGE PORTFOLIO PRÉVISIONS
 * Courbes d'atterrissage budgétaire et prévisions
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TrendingDown, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';
import ForecastCurve from '@/components/ForecastCurve';
import KPICard from '@/components/KPICard';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getForecastData } from '@/lib/portfolioService';

export default function PortfolioForecast() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    loadForecastData();
  }, [workspaceId]);

  const loadForecastData = async () => {
    try {
      setLoading(true);
      const data = await getForecastData(workspaceId);
      setForecastData(data);
    } catch (error) {
      console.error('Erreur chargement prévisions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Chargement des prévisions...</div>
      </div>
    );
  }

  const forecasts = forecastData?.forecasts || [];
  const overBudget = forecasts.filter(f => f.variance_vs_budget > 0);
  const underBudget = forecasts.filter(f => f.variance_vs_budget < 0);
  const totalVariance = forecasts.reduce((sum, f) => sum + (f.variance_vs_budget || 0), 0);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Prévisions <span className="text-[#D4AF37]">Budgétaires</span>
          </h1>
          <p className="text-gray-400 font-light">
            Courbes d'atterrissage et écarts vs budget initial
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard
            title="Variance totale"
            value={Math.abs(totalVariance)}
            unit="€"
            icon={DollarSign}
            color={totalVariance > 0 ? 'red' : 'green'}
            trend={{
              value: totalVariance,
              direction: totalVariance > 0 ? 'up' : 'down'
            }}
            description={totalVariance > 0 ? 'Dépassement' : 'Économies'}
          />
          <KPICard
            title="Projets hors budget"
            value={overBudget.length}
            icon={TrendingUp}
            color="red"
            description="Dépassement prévu"
          />
          <KPICard
            title="Projets sous budget"
            value={underBudget.length}
            icon={TrendingDown}
            color="green"
            description="Économies prévues"
          />
          <KPICard
            title="Total initiatives"
            value={forecasts.length}
            icon={AlertCircle}
            color="blue"
            description="Avec prévisions"
          />
        </div>

        {/* Courbe globale */}
        <div>
          <h2 className="text-2xl font-light mb-4">Courbe d'atterrissage globale</h2>
          <ForecastCurve forecasts={forecasts} type="budget" />
        </div>

        {/* Top dépassements */}
        {overBudget.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-4">
              Top <span className="text-[#D4AF37]">{Math.min(5, overBudget.length)}</span> dépassements prévus
            </h2>
            <div className="space-y-3">
              {overBudget
                .sort((a, b) => b.variance_vs_budget - a.variance_vs_budget)
                .slice(0, 5)
                .map((forecast, index) => (
                  <div
                    key={forecast.initiative_id}
                    className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-light text-[#D4AF37]">#{index + 1}</span>
                          <h3 className="text-white font-light">{forecast.initiative_name}</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Budget initial</p>
                            <p className="text-white font-light">
                              {new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                                notation: 'compact'
                              }).format(forecast.initial_budget || 0)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Prévision</p>
                            <p className="text-white font-light">
                              {new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                                notation: 'compact'
                              }).format(forecast.forecast_cost || 0)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Écart</p>
                            <p className="text-red-400 font-light flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              +{new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                                notation: 'compact'
                              }).format(forecast.variance_vs_budget || 0)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Top économies */}
        {underBudget.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-4">
              Top <span className="text-[#D4AF37]">{Math.min(5, underBudget.length)}</span> économies prévues
            </h2>
            <div className="space-y-3">
              {underBudget
                .sort((a, b) => a.variance_vs_budget - b.variance_vs_budget)
                .slice(0, 5)
                .map((forecast, index) => (
                  <div
                    key={forecast.initiative_id}
                    className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-light text-[#D4AF37]">#{index + 1}</span>
                          <h3 className="text-white font-light">{forecast.initiative_name}</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Budget initial</p>
                            <p className="text-white font-light">
                              {new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                                notation: 'compact'
                              }).format(forecast.initial_budget || 0)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Prévision</p>
                            <p className="text-white font-light">
                              {new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                                notation: 'compact'
                              }).format(forecast.forecast_cost || 0)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Économie</p>
                            <p className="text-emerald-400 font-light flex items-center gap-1">
                              <TrendingDown className="h-4 w-4" />
                              {new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                                notation: 'compact'
                              }).format(Math.abs(forecast.variance_vs_budget || 0))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {forecasts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <AlertCircle className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500 font-light">Aucune prévision disponible</p>
          </div>
        )}
      </div>
    </div>
  );
}
