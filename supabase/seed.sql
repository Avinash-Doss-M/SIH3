-- Seed data for local development. Run via `supabase db seed`.
insert into dashboard_stats (role, label, value_numeric, value_text, delta, trend)
values
  ('student', 'Applications', 12, null, '+3', 'up'),
  ('student', 'Interviews', 4, null, '+1', 'up'),
  ('student', 'Offers', 2, null, '+2', 'up'),
  ('student', 'Profile Views', 89, null, '+15', 'up'),
  ('mentor', 'Assigned Students', 18, null, '+3', 'up'),
  ('mentor', 'Active Sessions', 5, null, '2 today', 'neutral'),
  ('mentor', 'Reviews Completed', 42, null, '+6', 'up'),
  ('mentor', 'Avg Progress', null, '74%', '+2%', 'up'),
  ('employer', 'Job Posts', 8, null, '+2', 'up'),
  ('employer', 'Applications', 156, null, '+24', 'up'),
  ('employer', 'Shortlisted', 32, null, '+8', 'up'),
  ('employer', 'Hired', 12, null, '+4', 'up'),
  ('placement', 'Active Students', 320, null, '+12', 'up'),
  ('placement', 'Placed Students', 142, null, '+9', 'up'),
  ('placement', 'Avg Package', null, '6.2 LPA', '+0.4', 'up'),
  ('placement', 'Upcoming Drives', 5, null, '2 this week', 'neutral'),
  ('admin', 'Total Users', 1250, null, '+45', 'up'),
  ('admin', 'Active Sessions', 89, null, '+12', 'up'),
  ('admin', 'System Health', null, '99.2%', '+0.1%', 'up'),
  ('admin', 'Data Usage', null, '2.4 GB', '+0.3 GB', 'neutral')
on conflict (role, label) do update set
  value_numeric = excluded.value_numeric,
  value_text = excluded.value_text,
  delta = excluded.delta,
  trend = excluded.trend,
  updated_at = timezone('utc', now());

insert into placement_drives (company, stage, drive_date, location, notes)
values
  ('TechCorp', 'Round 1', '2025-02-14', 'Auditorium A', 'Aptitude + Technical'),
  ('DataWorks', 'Aptitude', '2025-02-17', 'Hall B', 'Bring calculators'),
  ('CloudNova', 'Registration', '2025-02-21', 'Online', 'Complete resume review before 18 Feb')
on conflict (company, drive_date) do update set
  stage = excluded.stage,
  location = excluded.location,
  notes = excluded.notes,
  updated_at = timezone('utc', now());
