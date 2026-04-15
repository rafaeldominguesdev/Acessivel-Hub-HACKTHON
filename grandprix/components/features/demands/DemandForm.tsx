"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ChevronLeft, Save } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  titulo: z.string().min(10, {
    message: "O título deve ter pelo menos 10 caracteres.",
  }),
  descricao: z.string().min(20, {
    message: "A descrição deve ter pelo menos 20 caracteres.",
  }),
  categoriaId: z.string().min(1, "Selecione uma categoria."),
  tipoBarreiraId: z.string().min(1, "Selecione o tipo de barreira."),

  unidade: z.string().optional(),
});

export function DemandForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      unidade: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Aqui viria a chamada para o serviço/API
    alert("Demanda enviada com sucesso! (Simulação)");
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors w-fit">
        <Link href="/demandas" className="flex items-center gap-1 text-sm font-medium">
          <ChevronLeft className="w-4 h-4" />
          Voltar para listagem
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Nova Demanda</h1>
        <p className="text-slate-500 mt-1 uppercase tracking-widest text-[10px] font-bold">Registro de Acessibilidade</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Informações da Demanda
              </CardTitle>
              <CardDescription>
                Descreva detalhadamente a dificuldade ou sugestão de melhoria.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-slate-700">Título Sugestivo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Falta de rampa no Bloco C" {...field} className="bg-slate-50 border-slate-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="categoriaId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-slate-700">Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50 border-slate-200">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cat-1">Infraestrutura</SelectItem>
                          <SelectItem value="cat-2">Digital / Sistema</SelectItem>
                          <SelectItem value="cat-3">Comunicação</SelectItem>
                          <SelectItem value="cat-4">Atendimento</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipoBarreiraId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-slate-700">Tipo de Barreira</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50 border-slate-200">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bar-1">Arquitetônica</SelectItem>
                          <SelectItem value="bar-2">Comunicacional</SelectItem>
                          <SelectItem value="bar-3">Tecnológica</SelectItem>
                          <SelectItem value="bar-4">Atitudinal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-slate-700">Descrição Detalhada</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva aqui o que aconteceu, onde e como podemos melhorar..." 
                        className="min-h-[150px] bg-slate-50 border-slate-200"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Seja o mais específico possível para facilitar a análise.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-slate-700">Unidade / Local (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Escritório Central - Rio de Janeiro" {...field} className="bg-slate-50 border-slate-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Link 
              href="/demandas" 
              className={cn(
                buttonVariants({ variant: "outline" }), 
                "h-11 px-6 font-bold uppercase tracking-widest text-[10px]"
              )}
            >
              Cancelar
            </Link>
            <Button type="submit" className="h-11 px-8 gap-2 font-bold uppercase tracking-widest text-[10px]">
              <Save className="w-4 h-4" />
              Enviar Demanda
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
}
