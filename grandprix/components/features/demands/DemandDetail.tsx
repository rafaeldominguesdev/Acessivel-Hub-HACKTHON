import { Demanda } from "@/types/demanda";
import { DemandBadge } from "./DemandBadge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Calendar, 
  MapPin, 
  ArrowLeft, 
  MessageSquare, 
  ShieldCheck, 
  History,
  Tag,
  Eye,
  MoreVertical
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DemandDetailProps {
  demanda: Demanda;
}

export function DemandDetail({ demanda }: DemandDetailProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Voltar e Ações */}
      <div className="flex items-center justify-between">
        <Link href="/demandas" className="bg-white border border-slate-200 p-2 rounded-lg hover:bg-slate-50 transition-colors group shadow-sm">
          <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-primary" />
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 px-4 gap-2 font-bold uppercase tracking-widest text-[10px] border-slate-200">
            <Eye className="w-3.5 h-3.5" />
            Visto por {demanda.visualizacoes}
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200">
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <DemandBadge status={demanda.status} />
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md">
                <Tag className="w-3 h-3" />
                {demanda.categoria.nome}
              </div>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {demanda.titulo}
            </h1>
          </div>

          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Descrição da Demanda
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 py-8">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg">
                {demanda.descricao}
              </p>
              
              {demanda.tags && demanda.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {demanda.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção de Respostas */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 px-2 text-slate-800">
              <MessageSquare className="w-5 h-5 text-primary" />
              Respostas e Acompanhamento
            </h2>
            
            <div className="space-y-4">
              {demanda.respostas.length === 0 ? (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-8 text-center">
                  <p className="text-slate-500 text-sm italic">
                    Nenhuma resposta registrada até o momento. Nossa equipe está analisando seu relato.
                  </p>
                </div>
              ) : (
                demanda.respostas.map((resposta) => (
                  <Card key={resposta.id} className={cn(
                    "border-slate-200 shadow-sm overflow-hidden",
                    resposta.isAdminResponse && "border-primary/20 bg-primary/2"
                  )}>
                    <CardHeader className="flex flex-row items-center gap-3 py-4 border-b border-slate-100/50">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn(
                          "text-[10px] font-bold",
                          resposta.isAdminResponse ? "bg-primary text-white" : "bg-slate-200 text-slate-600"
                        )}>
                          {resposta.autor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{resposta.autor.name}</span>
                          {resposta.isAdminResponse && (
                            <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              ADMINISTRAÇÃO
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          {format(new Date(resposta.createdAt), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="py-6 px-12">
                      <p className="text-slate-700 leading-relaxed text-sm">
                        {resposta.conteudo}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Coluna Lateral / Detalhes Meta */}
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Informações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <div className="p-4 flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Criado em</p>
                    <p className="text-sm font-bold text-slate-700">
                      {format(new Date(demanda.createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <MapPin className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Localização</p>
                    <p className="text-sm font-bold text-slate-700">{demanda.unidade || "Não informada"}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <Accessibility className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Tipo de Barreira</p>
                    <p className="text-sm font-bold text-slate-700">{demanda.tipoBarreira.nome}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <History className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Prioridade</p>
                    <p className={cn(
                      "text-sm font-bold",
                      demanda.prioridade === 'URGENTE' ? "text-red-600" : 
                      demanda.prioridade === 'ALTA' ? "text-amber-600" : "text-slate-700"
                    )}>{demanda.prioridade}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Autor do Relato
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {demanda.autor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-slate-900">{demanda.autor.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{demanda.autor.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Aux helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

import { Accessibility } from "lucide-react";
