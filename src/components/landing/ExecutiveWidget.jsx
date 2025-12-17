import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { TrendingUp, ShieldAlert, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const data = [
  { m: 'M1', v: 62 },
  { m: 'M2', v: 66 },
  { m: 'M3', v: 69 },
  { m: 'M4', v: 70 },
  { m: 'M5', v: 74 },
  { m: 'M6', v: 78 },
  { m: 'M7', v: 81 },
  { m: 'M8', v: 83 },
];

const KPI = ({ icon: Icon, value, label, trend }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-md backdrop-blur-sm">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-sm bg-[#BFA76A]/15 border border-[#BFA76A]/30 flex items-center justify-center">
        <Icon className="text-[#BFA76A]" size={18} />
      </div>
      <div>
        <div className="text-xl font-semibold text-white leading-none">{value}</div>
        <div className="text-xs text-gray-400 mt-1">{label}</div>
      </div>
    </div>
    {trend && (
      <div className="text-emerald-400 text-xs">{trend}</div>
    )}
  </div>
);

const Timeline = ({ steps, current }) => (
  <div className="p-4 bg-white/5 border border-white/10 rounded-md backdrop-blur-sm">
    <div className="flex items-center justify-between">
      {steps.map((s, i) => {
        const active = i <= current;
        return (
          <div key={s} className="flex-1 first:flex-none last:flex-none">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${active ? 'bg-[#BFA76A]' : 'bg-white/20'} ring-2 ${active ? 'ring-[#BFA76A]/40' : 'ring-white/10'}`}></div>
              <span className={`text-xs ${active ? 'text-white' : 'text-gray-400'}`}>{s}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const ExecutiveWidget = () => {
  const { t } = useLanguage();
  const steps = [
    t('home.heroWidget.timeline.discovery'),
    t('home.heroWidget.timeline.design'),
    t('home.heroWidget.timeline.build'),
    t('home.heroWidget.timeline.deploy'),
  ];

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
      <div className="lg:col-span-2 p-4 bg-white/5 border border-white/10 rounded-md backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-300">{t('home.heroWidget.title')}</div>
          <div className="text-xs text-gray-400">{t('home.heroWidget.lastUpdate')}</div>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="goldLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BFA76A" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#BFA76A" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="m" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide domain={[50, 90]} />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6 }}
                       labelStyle={{ color: '#aaa' }} itemStyle={{ color: '#fff' }} />
              <Line type="monotone" dataKey="v" stroke="url(#goldLine)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-rows-2 gap-4">
        <KPI icon={CheckCircle2} value="82%" label={t('home.heroWidget.kpis.onTrack')} trend={t('home.heroWidget.kpis.trendUp')} />
        <KPI icon={TrendingUp} value="+18%" label={t('home.heroWidget.kpis.roi')} />
      </div>
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <KPI icon={ShieldAlert} value="6" label={t('home.heroWidget.kpis.risks')} />
          <Timeline steps={steps} current={1} />
        </div>
      </div>
    </div>
  );
};

export default ExecutiveWidget;
