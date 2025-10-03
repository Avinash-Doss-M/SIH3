import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "@lib/supabaseClient";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword(form);

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const redirect = (location.state as { from?: Location })?.from?.pathname ?? "/dashboard";
    navigate(redirect, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/5">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-8 rounded shadow space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-center">Campus Portal Login</h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            Access your internship & placement workspace.
          </p>
        </div>

        {error && <p className="rounded bg-red-100 text-red-700 px-3 py-2 text-sm">{error}</p>}

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
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Need an account?{" "}
          <Link className="text-primary hover:underline" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
