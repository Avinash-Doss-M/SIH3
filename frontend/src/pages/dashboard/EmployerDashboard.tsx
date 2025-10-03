import AppShell from "@components/layout/AppShell";

const EmployerDashboard = () => {
  return (
    <AppShell title="Employer Dashboard">
      <section className="bg-white p-6 rounded shadow space-y-4">
        <header>
          <h2 className="text-lg font-semibold">Interview Schedule</h2>
          <p className="text-sm text-gray-500">
            TODO: Consume Realtime interview updates via Supabase `interviews` channel.
          </p>
        </header>
        <div className="space-y-3">
          <article className="border rounded p-4">
            <h3 className="font-medium">AI/ML Intern - Interview Slot</h3>
            <ul className="text-sm text-gray-600 list-disc ml-5 mt-2 space-y-1">
              <li>Date: 2024-10-14 14:00 IST</li>
              <li>Candidate: Jane Doe</li>
              <li>Mentor: Dr. Smith</li>
            </ul>
            <button className="mt-3 px-3 py-1 rounded bg-primary text-white text-sm">
              Join Meeting
            </button>
          </article>
        </div>
      </section>

      <section className="bg-white p-6 rounded shadow mt-6 space-y-3">
        <header>
          <h2 className="text-lg font-semibold">Submit Feedback</h2>
          <p className="text-sm text-gray-500">
            TODO: Post feedback to `/api/feedback/` and trigger certificate generation.
          </p>
        </header>
        <textarea className="w-full border rounded px-3 py-2 min-h-[120px]" placeholder="Feedback..." />
        <button className="px-4 py-2 rounded bg-green-600 text-white">Submit Feedback</button>
      </section>
    </AppShell>
  );
};

export default EmployerDashboard;
