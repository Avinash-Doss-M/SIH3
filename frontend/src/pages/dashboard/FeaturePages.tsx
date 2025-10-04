import { Link } from 'react-router-dom';
import {
  Briefcase,
  CalendarClock,
  ClipboardCheck,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getDashboardRoute } from '../../types/auth';

interface HighlightCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface CallToAction {
  label: string;
  to: string;
  icon?: LucideIcon;
}

interface FeatureTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  highlights: HighlightCard[];
  cta?: CallToAction[];
}

function FeatureTemplate({ title, subtitle, description, highlights, cta }: FeatureTemplateProps) {
  return (
    <div className="space-y-8 fade-in">
      <div className="glass-card p-6 border border-white/10 dark:border-white/5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <Sparkles className="text-emerald-400" size={20} />
              <span className="text-sm uppercase tracking-[0.3em] opacity-60">Campus Portal</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-3">{title}</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">{subtitle}</p>
          </div>
          {cta && cta.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {cta.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    to={action.to}
                    className="btn-modern inline-flex items-center gap-2 text-sm px-4 py-2"
                  >
                    {Icon ? <Icon size={16} /> : null}
                    {action.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {highlights.map(({ icon: Icon, title: cardTitle, description: cardDescription }) => (
          <div key={cardTitle} className="glass-card p-6 border border-white/5 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <span className="p-3 rounded-xl glass">
                <Icon size={20} />
              </span>
              <h2 className="text-lg font-semibold">{cardTitle}</h2>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">{cardDescription}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 border border-white/5">
        <h2 className="text-xl font-semibold mb-3">What&apos;s coming next?</h2>
        <p className="text-sm opacity-70 leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>
    </div>
  );
}

export function StudentApplicationsPage() {
  return (
    <FeatureTemplate
      title="Application Tracker"
      subtitle="Stay ahead of every internship and placement opportunity with a unified workflow."
      description="We&apos;re working on live integrations with Supabase tables so you can filter, follow up, and export student application data seamlessly."
      highlights={[
        {
          icon: ClipboardCheck,
          title: 'Progress Timeline',
          description: 'Track every milestone from applied to offer with automatic reminders and mentor nudges.',
        },
        {
          icon: CalendarClock,
          title: 'Interview Schedule',
          description: 'Centralised calendar view with reminders, agendas, and quick links to virtual meeting rooms.',
        },
        {
          icon: Target,
          title: 'Smart Recommendations',
          description: 'Get personalised role suggestions driven by competency scores and recruiter interest.',
        },
      ]}
      cta={[{ label: 'Update Profile', to: '/dashboard/profile', icon: User }]}
    />
  );
}

export function PlacementApplicationsPage() {
  return (
    <FeatureTemplate
      title="Applications Command Centre"
      subtitle="Monitor applications across batches, filter by status, and unblock students proactively."
      description="Soon you&apos;ll be able to drill into cohorts, export reports, and trigger mentor escalations directly from this workspace."
      highlights={[
        {
          icon: Briefcase,
          title: 'Role Coverage',
          description: 'Visualise how many students applied to each company and identify low-engagement roles quickly.',
        },
        {
          icon: Users,
          title: 'Support Queue',
          description: 'See which students are stuck at which stage so mentors can intervene before deadlines expire.',
        },
        {
          icon: LineChart,
          title: 'Conversion Analytics',
          description: 'Compare interview-to-offer ratios across recruiters to fine-tune preparation plans.',
        },
      ]}
      cta={[{ label: 'View Students', to: '/dashboard/placement/students', icon: GraduationCap }]}
    />
  );
}

export function MentorMentorshipPage() {
  return (
    <FeatureTemplate
      title="Mentorship Hub"
      subtitle="Coordinate sessions, share resources, and track mentee progress from one dashboard."
      description="Automated session summaries, shared notes, and Supabase-backed progress logs are on the roadmap to help mentors focus on coaching."
      highlights={[
        {
          icon: CalendarClock,
          title: 'Upcoming Sessions',
          description: 'Sync calendars and provide structured agendas so students arrive prepared.',
        },
        {
          icon: Users,
          title: 'Cohort Snapshot',
          description: 'See preparedness scores, resume status, and pending tasks for every student you guide.',
        },
        {
          icon: Sparkles,
          title: 'Resource Library',
          description: 'Recommended interview kits, mock questions, and feedback templates at your fingertips.',
        },
      ]}
      cta={[{ label: 'Open Student List', to: '/dashboard/mentor/students', icon: GraduationCap }]}
    />
  );
}

export function PlacementMentorshipPage() {
  return (
    <FeatureTemplate
      title="Mentor Coordination"
      subtitle="Assign mentors, balance workloads, and make sure every student receives the right support at the right time."
      description="We&apos;re adding mentor allocation tools, automated rotation suggestions, and centralised feedback capture powered by Supabase."
      highlights={[
        {
          icon: Users,
          title: 'Allocation Matrix',
          description: 'Match students to mentors based on skills, availability, and performance trends.',
        },
        {
          icon: ClipboardCheck,
          title: 'Session Health',
          description: 'Monitor attendance, satisfaction scores, and outstanding action items across mentors.',
        },
        {
          icon: Target,
          title: 'Intervention Alerts',
          description: 'Set up triggers when students fall behind on preparation plans so intervention is proactive.',
        },
      ]}
      cta={[{ label: 'Assign Mentors', to: '/dashboard/placement/students', icon: GraduationCap }]}
    />
  );
}

export function MentorStudentsPage() {
  return (
    <FeatureTemplate
      title="Student Roster"
      subtitle="Curated list of mentees with their latest achievements, blockers, and follow-ups."
      description="Once Supabase tables are connected, you&apos;ll be able to drill into progress charts, upload feedback, and sync action plans."
      highlights={[
        {
          icon: GraduationCap,
          title: 'Profile Cards',
          description: 'All essential student information—current status, strengths, and focus areas—in one glance.',
        },
        {
          icon: CalendarClock,
          title: 'Next Steps',
          description: 'Auto-generated to-do lists aligned with upcoming interview schedules and application deadlines.',
        },
        {
          icon: Users,
          title: 'Collaboration Tools',
          description: 'Loop in placement officers or co-mentors instantly for escalations and mock interviews.',
        },
      ]}
      cta={[{ label: 'Schedule Session', to: '/dashboard/mentor/mentorship', icon: CalendarClock }]}
    />
  );
}

export function PlacementStudentsPage() {
  return (
    <FeatureTemplate
      title="Student Success Desk"
      subtitle="Live dashboards to monitor readiness, placement status, and training attendance across batches."
      description="Soon you&apos;ll manage resume approvals, batch-level communications, and recruiter pairing directly from here."
      highlights={[
        {
          icon: LineChart,
          title: 'Batch Performance',
          description: 'Compare mock scores, skill assessments, and interview outcomes by branch or cohort.',
        },
        {
          icon: Users,
          title: 'Support Flags',
          description: 'Identify students needing additional mentoring, resume reviews, or last-mile preparation.',
        },
        {
          icon: CalendarClock,
          title: 'Drive Readiness',
          description: 'See who has completed prerequisites before major drives and send targeted nudges.',
        },
      ]}
      cta={[{ label: 'Plan Drive', to: '/dashboard/placement/insights', icon: Briefcase }]}
    />
  );
}

export function AdminStudentsPage() {
  return (
    <FeatureTemplate
      title="Institution Analytics"
      subtitle="A unified view of admissions, placements, and stakeholder engagement for administrators."
      description="Role-based dashboards with secure Supabase policies will help you slice data across departments while maintaining compliance."
      highlights={[
        {
          icon: LineChart,
          title: 'KPI Monitoring',
          description: 'Track key indicators like placement percentage, average package, and recruiter satisfaction.',
        },
        {
          icon: Users,
          title: 'Stakeholder Mapping',
          description: 'Understand which departments or cohorts require additional focus or resources.',
        },
        {
          icon: Target,
          title: 'Strategic Planning',
          description: 'Inform leadership decisions with accurate, real-time dashboards powered by Supabase.',
        },
      ]}
      cta={[{ label: 'Download Report', to: '/dashboard/admin', icon: LineChart }]}
    />
  );
}

export function EmployerInsightsPage() {
  return (
    <FeatureTemplate
      title="Recruiter Insights"
      subtitle="Track hiring funnels, share talent pools, and collaborate with placement officers."
      description="We&apos;re bringing in Supabase analytics to show pipeline health, candidate shortlists, and hiring velocity in real time."
      highlights={[
        {
          icon: Briefcase,
          title: 'Open Roles',
          description: 'Snapshot of active job postings, required skills, and application velocity.',
        },
        {
          icon: Users,
          title: 'Talent Pools',
          description: 'Build dynamic shortlists, filter by skill tags, and coordinate interviews easily.',
        },
        {
          icon: LineChart,
          title: 'Offer Trends',
          description: 'Compare offers made vs accepted to fine-tune employer branding and compensation. ',
        },
      ]}
      cta={[{ label: 'Upcoming Drives', to: '/dashboard/placement/applications', icon: CalendarClock }]}
    />
  );
}

export function PlacementInsightsPage() {
  return (
    <FeatureTemplate
      title="Recruiter Collaboration"
      subtitle="Understand hiring demand, share candidate pipelines, and nurture recruiter partnerships."
      description="We&apos;re adding recruiter scorecards, SLA tracking, and engagement analytics so you know where to focus relationship building."
      highlights={[
        {
          icon: Briefcase,
          title: 'Company Pipeline',
          description: 'Monitor which recruiters are interviewing, extending offers, or need additional nudges.',
        },
        {
          icon: CalendarClock,
          title: 'Drive Calendar',
          description: 'All upcoming drives, interview days, and recruiter visits in one shared roadmap.',
        },
        {
          icon: Users,
          title: 'Feedback Loop',
          description: 'Capture recruiter feedback instantly to improve candidate readiness and future drives.',
        },
      ]}
      cta={[{ label: 'Plan Drive', to: '/dashboard/placement', icon: Compass }]}
    />
  );
}

export function ProfilePage() {
  const { role } = useAuth();
  const dashboardLink = role ? getDashboardRoute(role) : '/';
  return (
    <FeatureTemplate
      title="Profile & Preferences"
      subtitle="Keep your personal information, security settings, and communication preferences up to date."
      description="We&apos;re rolling out editable Supabase-backed profiles, notification preferences, and document uploads so you can manage everything from one place."
      highlights={[
        {
          icon: User,
          title: 'Personal Details',
          description: 'Review your contact information and make sure mentors and recruiters can reach you.',
        },
        {
          icon: ShieldCheck,
          title: 'Security Controls',
          description: 'Manage MFA, session activity, and connected devices to stay secure.',
        },
        {
          icon: Sparkles,
          title: 'Personalisation',
          description: 'Choose dashboard themes, notification channels, and upcoming feature previews.',
        },
      ]}
      cta={[{ label: 'Return to Dashboard', to: dashboardLink, icon: LayoutDashboard }]}
    />
  );
}
