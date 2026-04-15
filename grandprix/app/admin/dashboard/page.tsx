import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { mockDemandas } from '@/lib/mock-data';
import { DemandTable } from '@/components/features/demands/DemandTable';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const total = mockDemandas.length;
  const novas = mockDemandas.filter(d => d.status === 'NOVA').length;
  const emAndamento = mockDemandas.filter(d => d.status === 'EM_ANDAMENTO').length;
  const resolvidas = mockDemandas.filter(d => d.status === 'RESOLVIDA').length;

  const stats = [
    { label: "Total Geral", value: total, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Novas", value: novas, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Em Resolução", value: emAndamento, icon: Clock, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Resolvidas", value: resolvidas, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Painel de Controle Admin
          </h1>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[10px] font-bold">Gestão Global de Demandas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 px-6 font-bold uppercase tracking-widest text-[10px] border-slate-200">
            Exportar CSV
          </Button>
          <Button className="h-11 px-8 font-bold uppercase tracking-widest text-[10px] shadow-sm">
            Relatório Completo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-slate-200 shadow-sm overflow-hidden group hover:border-primary/20 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+5% este mês</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Demandas Recentes</h2>
            <Link href="/admin/demandas">
              <Button variant="link" className="text-xs font-bold text-primary uppercase tracking-widest p-0">
                Ver toda a lista
              </Button>
            </Link>
          </div>
          <DemandTable data={mockDemandas.slice(0, 5)} isAdmin />
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Alertas do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-900">3 Critérios Urgentes</p>
                    <p className="text-xs text-red-700/80 mt-1">Demandas sem resposta há mais de 24h.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-blue-900">Pico de Acesso</p>
                    <p className="text-xs text-blue-700/80 mt-1">Aumento de 20% no registro de barreiras tecnológicas.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white rounded-2xl overflow-hidden relative group border-none shadow-lg">
            <CardContent className="p-8 relative z-10">
              <h3 className="text-xl font-bold tracking-tight">Análise de IA</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                As principais dificuldades relatadas este mês estão relacionadas a **Acessibilidade Digital**.
              </p>
              <Button className="mt-6 bg-white text-slate-900 hover:bg-slate-100 w-full font-bold uppercase tracking-widest text-[10px]">
                Gerar Insight Completo
              </Button>
            </CardContent>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/30 transition-colors" />
          </Card>
        </div>
      </div>
    </div>
  );
}
