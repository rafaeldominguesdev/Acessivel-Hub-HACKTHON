"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import { mockDemandas } from "@/lib/mock-data";
import { DemandDetail } from "@/components/features/demands/DemandDetail";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  History,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Lock
} from "lucide-react";

interface AdminDemandaDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AdminDemandaDetailPage({ params }: AdminDemandaDetailPageProps) {
  const { id } = use(params);
  const demanda = mockDemandas.find((d) => d.id === id);
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!demanda) {
    notFound();
  }

  const handleResponseSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setResponse("");
      alert("Resposta enviada com sucesso!");
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Administrar Demanda</h1>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[10px] font-bold">Painel de Resposta e Gestão de Status</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-slate-200 h-11 px-6 font-bold text-[10px] uppercase tracking-widest">
            <Trash2 className="mr-2 h-4 w-4" /> 
            Moderar Relato
          </Button>
          <Button className="h-11 px-8 font-bold text-[10px] uppercase tracking-widest shadow-sm">
            <CheckCircle2 className="mr-2 h-4 w-4" /> 
            Concluir Atendimento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold">Modo de Gestão Ativo</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Acesso Administrativo - Canal de Escuta</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Lock className="w-3 h-3" />
                <span>Auditoria Ativada</span>
              </div>
            </div>
          </div>

          <DemandDetail demanda={demanda} />
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm overflow-hidden sticky top-24">
            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Responder Demanda
              </CardTitle>
              <CardDescription className="text-xs">Sua resposta será notificada ao autor.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Alterar Status</label>
                    <Select defaultValue={demanda.status}>
                      <SelectTrigger className="w-full bg-slate-50 border-slate-200">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NOVA">Nova</SelectItem>
                        <SelectItem value="EM_ANALISE">Em Análise</SelectItem>
                        <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                        <SelectItem value="RESOLVIDA">Resolvida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Prioridade</label>
                    <Select defaultValue={demanda.prioridade}>
                      <SelectTrigger className="w-full bg-slate-50 border-slate-200">
                        <SelectValue placeholder="Prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALTA">Alta</SelectItem>
                        <SelectItem value="MEDIA">Média</SelectItem>
                        <SelectItem value="BAIXA">Baixa</SelectItem>
                        <SelectItem value="URGENTE">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Mensagem Oficial</label>
                  <Textarea
                    placeholder="Descreva as medidas tomadas..."
                    className="min-h-[150px] bg-slate-50 border-slate-200 resize-none text-sm"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full h-11 font-bold text-[10px] uppercase tracking-widest shadow-sm gap-2"
                  onClick={handleResponseSubmit}
                  disabled={!response || isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : (
                    <>
                      Enviar Resposta
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <History className="h-4 w-4" /> 
                Histórico de Alterações
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { action: "Status: Em Andamento", user: "Mariana C.", date: "Há 2 dias" },
                  { action: "Prioridade: Alta", user: "IA / Automático", date: "Há 5 dias" },
                  { action: "Registro Criado", user: demanda.autor.name, date: "Há 5 dias" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-3 relative pb-4 last:pb-0">
                    {i !== 2 && <div className="absolute left-1.5 top-5 w-[1px] h-full bg-slate-100" />}
                    <div className="h-3 w-3 rounded-full bg-primary/20 border-2 border-primary shrink-0 mt-1 z-10" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-none mb-1">{log.action}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{log.user} • {log.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
