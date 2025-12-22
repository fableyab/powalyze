import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", budget: 8000, progress: 5, planned: 7 },
  { month: "Feb", budget: 15000, progress: 12, planned: 14 },
  { month: "Mar", budget: 22000, progress: 18, planned: 20 },
  { month: "Apr", budget: 30000, progress: 25, planned: 28 },
  { month: "May", budget: 38000, progress: 32, planned: 35 },
  { month: "Jun", budget: 48000, progress: 38, planned: 42 },
];

export default function BudgetProgressLineChart() {
  return (
    <div className="w-full bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">
        Budget vs Progression
      </h2>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#1e3a8a" />
            <YAxis stroke="#1e3a8a" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend />

            {/* Budget consommé */}
            <Line
              type="monotone"
              dataKey="budget"
              stroke="#d97706"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Budget consommé (CHF)"
            />

            {/* Avancement réel */}
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#1e3a8a"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Avancement réel (%)"
            />

            {/* Avancement prévu */}
            <Line
              type="monotone"
              dataKey="planned"
              stroke="#10b981"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ r: 4 }}
              name="Avancement prévu (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
