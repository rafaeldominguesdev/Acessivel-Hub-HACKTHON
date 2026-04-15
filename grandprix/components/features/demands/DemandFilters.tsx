"use client";

import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DemandFilters() {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
      <div className="relative flex-1 min-w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input 
          placeholder="Filtrar por título, ID ou autor..." 
          className="pl-10 bg-slate-50 border-slate-200"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select>
          <SelectTrigger className="w-[150px] bg-slate-50 border-slate-200">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NOVA">Nova</SelectItem>
            <SelectItem value="EM_ANALISE">Em Análise</SelectItem>
            <SelectItem value="RESPONDIDA">Respondida</SelectItem>
            <SelectItem value="RESOLVIDA">Resolvida</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[150px] bg-slate-50 border-slate-200">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INFRA">Infraestrutura</SelectItem>
            <SelectItem value="DIGITAL">Digital</SelectItem>
            <SelectItem value="COM">Comunicação</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[150px] bg-slate-50 border-slate-200">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALTA">Alta</SelectItem>
            <SelectItem value="MEDIA">Média</SelectItem>
            <SelectItem value="BAIXA">Baixa</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" className="text-slate-500">
          <Filter className="w-4 h-4" />
        </Button>

        <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-slate-400 gap-1 h-9">
          <X className="w-3 h-3" />
          Limpar
        </Button>
      </div>
    </div>
  );
}
