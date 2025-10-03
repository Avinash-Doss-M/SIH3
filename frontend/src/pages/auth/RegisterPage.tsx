import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@lib/supabaseClient";
import { Role } from "@types/index";

const roles: { label: string; value: Role }[] = [
  { label: "Student", value: "student" },
  { label: "Mentor", value: "mentor" },
  { label: "Employer", value: "employer" },
  { label: "Placement Cell", value: "placement_cell" }
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "student" as Role
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.full_name,
          role: form.role
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email: form.email,
        full_name: form.full_name,
        role: form.role
      });
    }

    setLoading(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/5">
      <form onSubmit={onSubmit} className="w-full max-w-lg bg-white p-8 rounded shadow space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-center">Create an account</h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            Choose your role to access tailored dashboards.
          </p>
        </div>

        {error && <p className="rounded bg-red-100 text-red-700 px-3 py-2 text-sm">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input
              required
              className="mt-1 w-full rounded border px-3 py-2"
              value={form.full_name}
              onChange={(e) => setForm((prev) => ({ ...prev, full_name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className="mt-1 w-full rounded border px-3 py-2"
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value as Role }))}
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link className="text-primary hover:underline" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
