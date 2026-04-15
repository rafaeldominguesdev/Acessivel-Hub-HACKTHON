"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  FileText, 
  PlusCircle, 
  Settings, 
  Users, 
  LayoutDashboard,
  MessageSquare,
  Accessibility
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Usuário",
    items: [
      {
        title: "Início",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        title: "Minhas Demandas",
        href: "/demandas",
        icon: FileText,
      },
      {
        title: "Nova Demanda",
        href: "/nova-demanda",
        icon: PlusCircle,
      },
    ],
  },
  {
    title: "Gestão (Admin)",
    items: [
      {
        title: "Painel de Controle",
        href: "/admin/dashboard",
        icon: BarChart3,
      },
      {
        title: "Todas as Demandas",
        href: "/admin/demandas",
        icon: MessageSquare,
      },
      {
        title: "Usuários",
        href: "/admin/usuarios",
        icon: Users,
      },
      {
        title: "Configurações",
        href: "/admin/configuracoes",
        icon: Settings,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 sidebar-bg h-screen fixed left-0 top-0 overflow-y-auto flex flex-col">
      <div className="p-6 flex items-center gap-2">
        <div className="bg-primary p-2 rounded-lg">
          <Accessibility className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight">Acesso Livre</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Fórum Corporativo</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4">
        {sidebarItems.map((section, idx) => (
          <div key={idx} className="mb-8 last:mb-0">
            <h2 className="px-3 mb-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all group",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Icon className={cn(
                      "w-4 h-4",
                      isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                    )} />
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 mt-auto bg-slate-100/50">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
            RC
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold truncate">Rafael Caldeira</p>
            <p className="text-[10px] text-muted-foreground truncate">Colaborador</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
