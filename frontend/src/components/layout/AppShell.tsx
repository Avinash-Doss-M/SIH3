import { ReactNode } from "react";
import Sidebar from "@components/navigation/Sidebar";
import { useAuth } from "@context/AuthContext";

interface AppShellProps {
  title: string;
  children: ReactNode;
}

const AppShell = ({ title, children }: AppShellProps) => {
  const { signOut, profile } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">Welcome back, {profile?.full_name}</p>
          </div>
          <button
            onClick={signOut}
            className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark transition"
          >
            Sign Out
          </button>
        </header>
        <section>{children}</section>
      </main>
    </div>
  );
};

export default AppShell;
