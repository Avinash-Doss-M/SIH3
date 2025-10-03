import AppShell from "@components/layout/AppShell";
import ApplicationChart from "@components/charts/ApplicationChart";

const PlacementCellDashboard = () => {
  // TODO: Fetch aggregated metrics from backend analytics endpoint.
  const overview = [
    { label: "CSE", applied: 24, interviews: 14, offers: 6, conversions: 5 },
    { label: "ECE", applied: 18, interviews: 9, offers: 4, conversions: 3 }
  ];

  return (
    <AppShell title="Placement Cell Analytics">
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Department Performance</h2>
        <ApplicationChart stats={overview} />
      </section>

      <section className="bg-white p-6 rounded shadow space-y-3 mt-6">
        <h2 className="text-lg font-semibold">Realtime Notifications</h2>
        <p className="text-sm text-gray-600">
          TODO: Subscribe to Supabase Realtime for application approvals and interview scheduling.
        </p>
        <ul className="text-sm text-gray-600 list-disc ml-5 space-y-2">
          <li>John Doe approved by mentor - awaiting placement cell decision.</li>
          <li>Interview scheduled for Backend Intern on 2024-10-16.</li>
        </ul>
      </section>
    </AppShell>
  );
};

export default PlacementCellDashboard;
