import { mockDemandas } from '@/lib/mock-data';
import { DemandTable } from '@/components/features/demands/DemandTable';
import { DemandFilters } from '@/components/features/demands/DemandFilters';
import { Button } from '@/components/ui/button';
import { Download, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function AdminDemandasListPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Gerenciamento de Demandas</h1>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[10px] font-bold">Listagem completa e filtros avançados</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="h-11 px-6 gap-2 font-bold uppercase tracking-widest text-[10px] border-slate-200">
              <LayoutDashboard className="w-4 h-4" />
              Painel Geral
            </Button>
          </Link>
          <Button className="h-11 px-8 gap-2 font-bold uppercase tracking-widest text-[10px] shadow-sm">
            <Download className="w-4 h-4" />
            Exportar Dados
          </Button>
        </div>
      </div>

      <DemandFilters />

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Exibindo {mockDemandas.length} Resultados
          </h2>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Ordenar por:</span>
            <Button variant="ghost" className="h-8 text-[10px] font-bold uppercase tracking-widest py-0 px-2 h-7">Data</Button>
            <Button variant="ghost" className="h-8 text-[10px] font-bold uppercase tracking-widest py-0 px-2 h-7 text-muted-foreground">Prioridade</Button>
          </div>
        </div>
        
        <DemandTable data={mockDemandas} isAdmin />
      </div>

      <div className="flex items-center justify-center py-4">
        <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
          <Button variant="ghost" size="sm" disabled className="h-8 w-8 p-0">
            &lt;
          </Button>
          <Button size="sm" className="h-8 w-8 p-0 font-bold text-xs bg-primary text-white">
            1
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold text-xs text-slate-600">
            2
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
