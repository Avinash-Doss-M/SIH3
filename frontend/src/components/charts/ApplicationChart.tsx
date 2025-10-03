import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ApplicationStats } from "@types/index";

const ApplicationChart = ({ stats }: { stats: ApplicationStats[] }) => (
  <ResponsiveContainer width="100%" height={320}>
    <BarChart data={stats}>
      <XAxis dataKey="label" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="applied" fill="#2563eb" />
      <Bar dataKey="interviews" fill="#f59e0b" />
      <Bar dataKey="offers" fill="#10b981" />
      <Bar dataKey="conversions" fill="#7c3aed" />
    </BarChart>
  </ResponsiveContainer>
);

export default ApplicationChart;
