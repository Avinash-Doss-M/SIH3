import { useEffect, useState } from "react";
import AppShell from "@components/layout/AppShell";
import { supabase } from "@lib/supabaseClient";
import { InternshipPosting } from "@types/index";

const MentorDashboard = () => {
  const [pendingApplications, setPendingApplications] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("mentor_pending_applications")
        .select("*");
      setPendingApplications(data ?? []);
    };
    load();
  }, []);

  return (
    <AppShell title="Mentor Dashboard">
      <section className="bg-white p-6 rounded shadow space-y-4">
        <header>
          <h2 className="text-lg font-semibold">Pending Approvals</h2>
          <p className="text-sm text-gray-500">
            Review student applications before they reach the placement cell.
          </p>
        </header>
        <div className="space-y-3">
          {pendingApplications.length === 0 && (
            <p className="text-sm text-gray-600">No pending applications.</p>
          )}
          {pendingApplications.map((application) => (
            <article key={application.id} className="border rounded p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{application.student_name}</h3>
                  <p className="text-sm text-gray-600">{application.internship_title}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-green-600 text-white text-sm">
                    Approve
                  </button>
                  <button className="px-3 py-1 rounded bg-red-500 text-white text-sm">
                    Reject
                  </button>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                TODO: Wire approval/rejection to backend `/api/applications/{id}/mentor-action/`.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">Your Internship Postings</h2>
        <p className="text-sm text-gray-600">
          TODO: Fetch mentor-owned postings from `/api/internships/?mentor=current`.
        </p>
      </section>
    </AppShell>
  );
};

export default MentorDashboard;
