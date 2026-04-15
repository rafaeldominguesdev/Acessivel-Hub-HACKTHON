import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Demanda } from "@/types/demanda";
import { DemandBadge } from "./DemandBadge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { ChevronRight, MessageSquare } from "lucide-react";

interface DemandTableProps {
  data: Demanda[];
  isAdmin?: boolean;
}

export function DemandTable({ data, isAdmin }: DemandTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="w-[400px]">Título da Demanda</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Categoria</TableHead>
            {isAdmin && <TableHead>Autor</TableHead>}
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isAdmin ? 6 : 5} className="h-32 text-center text-muted-foreground">
                Nenhuma demanda encontrada.
              </TableCell>
            </TableRow>
          ) : (
            data.map((demanda) => (
              <TableRow key={demanda.id} className="table-row-hover group">
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                      {demanda.titulo}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {demanda.descricao}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DemandBadge status={demanda.status} />
                </TableCell>
                <TableCell>
                  <span className="text-sm text-slate-600">
                    {demanda.categoria.nome}
                  </span>
                </TableCell>
                {isAdmin && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {demanda.autor.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{demanda.autor.name}</span>
                    </div>
                  </TableCell>
                )}
                <TableCell>
                  <span className="text-sm text-slate-500">
                    {format(new Date(demanda.createdAt), "dd MMM, yyyy", { locale: ptBR })}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {demanda.respostas.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-primary font-medium mr-2">
                        <MessageSquare className="w-3 h-3" />
                        {demanda.respostas.length}
                      </div>
                    )}
                    <Link href={`/demandas/${demanda.id}`}>
                      <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
