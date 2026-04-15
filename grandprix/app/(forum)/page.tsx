import { mockDemandas } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from "lucide-react";
import Link from "next/link";
import { DemandTable } from "@/components/features/demands/DemandTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForumPage() {
  // Simular demandas do usuário logado (Ana Paula Souza - ID: 1)
  const userDemands = mockDemandas.filter(d => d.autor.id === '1');
  
  const stats = [
    {
      title: "Minhas Demandas",
      value: userDemands.length,
      icon: PlusCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Em Andamento",
      value: userDemands.filter(d => d.status === 'EM_ANDAMENTO').length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Resolvidas",
      value: userDemands.filter(d => d.status === 'RESOLVIDA').length,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Em Análise",
      value: userDemands.filter(d => d.status === 'EM_ANALISE').length,
      icon: AlertCircle,
      color: "text-slate-600",
      bg: "bg-slate-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard de Acessibilidade</h1>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[10px] font-bold">Resumo das suas contribuições</p>
        </div>
        <Link href="/nova-demanda">
          <Button className="h-11 px-6 gap-2 font-bold uppercase tracking-widest text-[10px] shadow-sm">
            <PlusCircle className="w-4 h-4" />
            Nova Demanda
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-slate-200 shadow-sm overflow-hidden group hover:border-primary/20 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-1">
                <ArrowUpRight className="w-3 h-3" />
                <span>Atualizado hoje</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Minhas Postagens Recentes
            <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">
              {userDemands.length}
            </span>
          </h2>
          <Button variant="link" className="text-xs font-bold text-primary uppercase tracking-widest p-0">
            Ver todas
          </Button>
        </div>
        
        <DemandTable data={userDemands} />
      </div>

      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl text-center md:text-left">
          <h3 className="text-lg font-bold text-primary">Como funciona este fórum?</h3>
          <p className="text-sm text-slate-600 mt-1">
            Cada relato seu é transformado em uma demanda acionável para a gestão. 
            Você receberá notificações aqui mesmo quando um administrador responder.
          </p>
        </div>
        <Button variant="outline" className="border-primary/20 bg-white text-primary font-bold uppercase tracking-widest text-[10px] px-6 h-10 hover:bg-primary/5 transition-colors">
          Saiba Mais
        </Button>
      </div>
    </div>
  );
}
