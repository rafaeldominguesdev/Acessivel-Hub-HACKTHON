import { cn } from "@/lib/utils";
import { StatusDemanda } from "@/types/demanda";

interface DemandBadgeProps {
  status: StatusDemanda;
  className?: string;
}

const statusConfig: Record<StatusDemanda, { label: string; className: string }> = {
  NOVA: {
    label: "Nova",
    className: "badge-nova",
  },
  EM_ANALISE: {
    label: "Em Análise",
    className: "badge-analise",
  },
  EM_ANDAMENTO: {
    label: "Em Andamento",
    className: "badge-andamento",
  },
  RESOLVIDA: {
    label: "Resolvida",
    className: "badge-resolvida",
  },
  RESPONDIDA: {
    label: "Respondida",
    className: "badge-respondida",
  },
};

export function DemandBadge({ status, className }: DemandBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
