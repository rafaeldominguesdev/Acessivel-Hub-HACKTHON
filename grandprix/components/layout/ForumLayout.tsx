import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function ForumLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Sidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-8 animate-in fade-in duration-500">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
