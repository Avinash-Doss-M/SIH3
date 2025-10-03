import { useEffect, useState } from "react";
import AppShell from "@components/layout/AppShell";
import ApplicationChart from "@components/charts/ApplicationChart";
import StudentProfileForm from "@forms/StudentProfileForm";
import { supabase } from "@lib/supabaseClient";
import { InternshipPosting, ApplicationStats } from "@types/index";

const StudentDashboard = () => {
  const [internships, setInternships] = useState<InternshipPosting[]>([]);
  const [stats, setStats] = useState<ApplicationStats[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: internshipData } = await supabase
        .from("internships_view")
        .select("*")
        .limit(10);
      setInternships((internshipData ?? []) as InternshipPosting[]);

      // TODO: Replace demo data with analytics endpoint call.
      setStats([
        { label: "This Month", applied: 5, interviews: 3, offers: 1, conversions: 1 },
        { label: "Last Month", applied: 8, interviews: 4, offers: 2, conversions: 1 }
      ]);
    };

    fetchData();

    const subscription = supabase
      .channel("internship-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "internships" },
        (payload) => {
          setInternships((prev) => [payload.new as InternshipPosting, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <AppShell title="Student Dashboard">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Application Analytics</h2>
            <ApplicationChart stats={stats} />
          </section>

          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Recommended Internships</h2>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {internships.map((internship) => (
                <article key={internship.id} className="border rounded p-4">
                  <h3 className="font-medium text-primary-dark">{internship.title}</h3>
                  <p className="text-sm text-gray-600">
                    Department: {internship.department} • Stipend: ₹{internship.stipend}
                  </p>
                  <p className="text-xs text-gray-500">
                    Conversion Chance: {internship.conversion_chance}%
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {internship.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs rounded bg-primary/10 text-primary-dark">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="mt-3 px-3 py-1 rounded bg-primary text-white text-sm hover:bg-primary-dark">
                    Apply
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
        <div className="space-y-6">
          <StudentProfileForm />
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">AI Career Assistant</h2>
            <p className="text-sm text-gray-600">
              TODO: Integrate ChatterBot chatbot via backend `/api/chatbot/respond/`.
            </p>
            <button className="mt-3 px-3 py-2 rounded border border-primary text-primary hover:bg-primary/10">
              Open Chatbot
            </button>
          </section>
        </div>
      </div>
    </AppShell>
  );
};

export default StudentDashboard;
