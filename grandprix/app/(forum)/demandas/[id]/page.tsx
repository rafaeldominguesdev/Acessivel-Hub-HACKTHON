import { mockDemandas } from '@/lib/mock-data';
import { DemandDetail } from '@/components/features/demands/DemandDetail';
import { notFound } from 'next/navigation';

interface DemandaDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DemandaDetailPage({ params }: DemandaDetailPageProps) {
  const { id } = await params;
  const demanda = mockDemandas.find((d) => d.id === id);

  if (!demanda) {
    notFound();
  }

  return <DemandDetail demanda={demanda} />;
}

