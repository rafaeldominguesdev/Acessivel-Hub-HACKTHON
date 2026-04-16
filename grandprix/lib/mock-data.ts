import { Demanda, User, Resposta } from '@/types';
import { DemandaStatus, TipoBarreira } from '@/lib/constants';

// Mapeamento de Unidade para Estado (Sigla para combinar com GeoJSON)
export const UNIT_TO_STATE: Record<string, string> = {
  "EDISE - Rio de Janeiro": "RJ",
  "CENPES - Rio": "RJ",
  "REDUC - Duque de Caxias": "RJ",
  "Refinaria REPLAN": "SP",
  "RPBC - Cubatão": "SP",
  "RECAP - Capuava": "SP",
  "REVAP - São José dos Campos": "SP",
  "REGAP - Betim": "MG",
  "RLAM - Mataripe": "BA",
  "REPAR - Araucária": "PR",
  "RNEST - Abreu e Lima": "PE",
  "LUBNOR - Fortaleza": "CE",
  "REFAP - Canoas": "RS",
  "REMAN - Manaus": "AM",
  "Urucu - Coari": "AM",
  "Polo Onshore RN": "RN",
  "Terminais ES": "ES",
  "Terminais SC": "SC",
  "Polo Logístico PA": "PA",
  "UO-SEAL": "SE",
};

const UNIT_LOCATIONS: Record<string, [number, number]> = {
  "EDISE - Rio de Janeiro": [-22.9068, -43.1729],
  "CENPES - Rio": [-22.8596, -43.2323],
  "REDUC - Duque de Caxias": [-22.7153, -43.2797],
  "Refinaria REPLAN": [-22.7610, -47.1539],
  "RPBC - Cubatão": [-23.8906, -46.4258],
  "RECAP - Capuava": [-23.6333, -46.5000],
  "REVAP - São José dos Campos": [-23.1791, -45.8872],
  "REGAP - Betim": [-19.9702, -44.1534],
  "RLAM - Mataripe": [-12.6953, -38.5632],
  "REPAR - Araucária": [-25.5947, -49.3875],
  "RNEST - Abreu e Lima": [-8.4042, -34.9667],
  "LUBNOR - Fortaleza": [-3.7166, -38.4831],
  "REFAP - Canoas": [-29.9167, -51.1833],
  "REMAN - Manaus": [-3.1347, -59.9431],
  "Urucu - Coari": [-4.8667, -65.0333],
  "Polo Onshore RN": [-5.1878, -37.3444],
  "Terminais ES": [-20.3155, -40.3128],
  "Terminais SC": [-26.2425, -48.6369],
  "Polo Logístico PA": [-1.4558, -48.4902],
  "UO-SEAL": [-10.9472, -37.0731],
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Paula Souza',
    email: 'ana.souza@petrobras.com.br',
    role: 'USER',
    department: 'Recursos Humanos',
    unit: 'Sede Rio de Janeiro (EDISE)',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Carlos Eduardo Lima',
    email: 'carlos.lima@petrobras.com.br',
    role: 'USER',
    department: 'Tecnologia da Informação',
    unit: 'Refinaria REPLAN',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '3',
    name: 'Mariana Costa',
    email: 'mariana.costa@petrobras.com.br',
    role: 'ADMIN',
    department: 'Sustentabilidade e Acessibilidade',
    unit: 'Sede Rio de Janeiro (EDISE)',
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2023-11-01'),
  },
  {
    id: '4',
    name: 'Rafael Caldeira',
    email: 'rafael.caldeira@petrobras.com.br',
    role: 'USER',
    department: 'Design & UX',
    unit: 'CENPES - Rio',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: '5',
    name: 'Ricardo Mendes',
    email: 'ricardo.mendes@petrobras.com.br',
    role: 'ADMIN',
    department: 'Engenharia e Infraestrutura',
    unit: 'Refinaria REPLAN',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '6',
    name: 'Juliana Rocha',
    email: 'juliana.rocha@petrobras.com.br',
    role: 'USER',
    department: 'TI / Acessibilidade Digital',
    unit: 'RPBC - Cubatão',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: '7',
    name: 'Felipe Soares',
    email: 'felipe.soares@petrobras.com.br',
    role: 'ADMIN',
    department: 'Segurança e Saúde (SMS)',
    unit: 'REGAP - Betim',
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2023-12-15'),
  },
];

export const mockRespostas: Resposta[] = [
  {
    id: 'r1',
    conteudo: 'Prezada Ana, seu relato foi recebido pela Gerência de Infraestrutura. Uma equipe técnica foi enviada ao local para realizar o nivelamento da rampa e instalar o corrimão conforme as normas de acessibilidade (ABNT NBR 9050).',
    autor: mockUsers[2],
    isAdminResponse: true,
    demandaId: '1',
    createdAt: new Date('2024-04-02'),
    updatedAt: new Date('2024-04-02'),
  },
];

// Gerar demandas extras simulando a triagem de IA
const generateMockDemandas = (): Demanda[] => {
  const base: Demanda[] = [];

  // 1. CRÍTICOS (RED, 10+ demandas) -> RJ e SP
  // RJ (EDISE + CENPES) = 15
  for (let i = 1; i <= 15; i++) {
    base.push({
      id: `rj-${i}`,
      titulo: `Inconsistência de Acessibilidade RJ #${i}`,
      descricao: 'Barreira identificada durante monitoramento de rotina na unidade.',
      status: DemandaStatus.EM_ANDAMENTO,
      prioridade: 'ALTA',
      categoria: { id: 'c3', nome: 'Cultura e Liderança' },
      tipoBarreira: { id: 'b3', slug: TipoBarreira.COMUNICACIONAL, nome: 'Atitudinal (Comportamental)' },
      unidade: i % 2 === 0 ? 'EDISE - Rio de Janeiro' : 'CENPES - Rio',
      autor: mockUsers[3], // Rafael Caldeira (ID 4)
      respostas: [],
      votos: Math.floor(Math.random() * 20),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      coordinates: UNIT_LOCATIONS[i % 2 === 0 ? 'EDISE - Rio de Janeiro' : 'CENPES - Rio'],
      aiAnalysis: { suggestedArea: 'Gestão de Pessoas', confidence: 0.9 }
    });
  }

  // SP (REPLAN + RPBC) = 12
  for (let i = 1; i <= 12; i++) {
    base.push({
      id: `sp-${i}`,
      titulo: `Barreira de Infraestrutura SP #${i}`,
      descricao: 'Necessidade de adequação física conforme NBR 9050.',
      status: DemandaStatus.NOVA,
      prioridade: 'ALTA',
      categoria: { id: 'c0', nome: 'Infraestrutura' },
      tipoBarreira: { id: 'b1', slug: TipoBarreira.ARQUITETONICA, nome: 'Arquitetônica' },
      unidade: i % 2 === 0 ? 'Refinaria REPLAN' : 'RPBC - Cubatão',
      autor: mockUsers[1],
      respostas: [],
      votos: Math.floor(Math.random() * 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      coordinates: UNIT_LOCATIONS[i % 2 === 0 ? 'Refinaria REPLAN' : 'RPBC - Cubatão'],
      aiAnalysis: { suggestedArea: 'Infraestrutura', confidence: 0.95 }
    });
  }

  // 2. ATENÇÃO (YELLOW, 2-9 demandas) -> BA e PR
  // BA (RLAM) = 5
  for (let i = 1; i <= 5; i++) {
    base.push({
      id: `ba-${i}`,
      titulo: `Evento de Treinamento BA #${i}`,
      descricao: 'Demanda de capacitação em acessibilidade solicitada pela unidade.',
      status: DemandaStatus.NOVA,
      prioridade: 'MEDIA',
      categoria: { id: 'c1', nome: 'Treinamentos' },
      tipoBarreira: { id: 'b3', slug: TipoBarreira.COMUNICACIONAL, nome: 'Comunicacional' },
      unidade: 'RLAM - Mataripe',
      autor: mockUsers[2],
      respostas: [],
      votos: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      coordinates: UNIT_LOCATIONS['RLAM - Mataripe'],
      aiAnalysis: { suggestedArea: 'Treinamento', confidence: 0.85 }
    });
  }

  // PR (REPAR) = 4
  for (let i = 1; i <= 4; i++) {
    base.push({
      id: `pr-${i}`,
      titulo: `Ajuste de Software PR #${i}`,
      descricao: 'Melhoria de usabilidade reportada em sistema interno.',
      status: DemandaStatus.NOVA,
      prioridade: 'BAIXA',
      categoria: { id: 'c2', nome: 'Sistemas Digitais' },
      tipoBarreira: { id: 'b2', slug: TipoBarreira.TECNOLOGICA, nome: 'Tecnológica' },
      unidade: 'REPAR - Araucária',
      autor: mockUsers[0],
      respostas: [],
      votos: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      coordinates: UNIT_LOCATIONS['REPAR - Araucária'],
      aiAnalysis: { suggestedArea: 'TI', confidence: 0.88 }
    });
  }

  // 3. ESTÁVEIS (GREEN, 0-1 demanda) -> MG, CE, RS, AM
  // MG (REGAP) = 1
  base.push({
    id: `mg-1`,
    titulo: 'Pequeno Ajuste REGAP',
    descricao: 'Ajuste de sinalização em rampa lateral.',
    status: DemandaStatus.RESOLVIDA,
    prioridade: 'BAIXA',
    categoria: { id: 'c0', nome: 'Infraestrutura' },
    tipoBarreira: { id: 'b1', slug: TipoBarreira.ARQUITETONICA, nome: 'Arquitetônica' },
    unidade: 'REGAP - Betim',
    autor: mockUsers[0],
    respostas: [],
    votos: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    coordinates: UNIT_LOCATIONS['REGAP - Betim'],
    aiAnalysis: { suggestedArea: 'Infraestrutura', confidence: 0.99 }
  });

  // CE (LUBNOR) = 1
  base.push({
    id: `ce-1`,
    titulo: 'Consulta de Normativa LUBNOR',
    descricao: 'Esclarecimento sobre política de inclusão.',
    status: DemandaStatus.RESOLVIDA,
    prioridade: 'BAIXA',
    categoria: { id: 'c3', nome: 'Cultura' },
    tipoBarreira: { id: 'b3', slug: TipoBarreira.INSTITUCIONAL, nome: 'Institucional' },
    unidade: 'LUBNOR - Fortaleza',
    autor: mockUsers[1],
    respostas: [],
    votos: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    coordinates: UNIT_LOCATIONS['LUBNOR - Fortaleza'],
  });

  // PE (RNEST) = 6 (AMARELO)
  for (let i = 1; i <= 6; i++) {
    base.push({
      id: `pe-${i}`,
      titulo: `Monitoramento RNEST #${i}`,
      descricao: 'Acompanhamento de conformidade na Refinaria Abreu e Lima.',
      status: DemandaStatus.NOVA,
      prioridade: 'MEDIA',
      categoria: { id: 'c0', nome: 'Infraestrutura' },
      tipoBarreira: { id: 'b1', slug: TipoBarreira.ARQUITETONICA, nome: 'Arquitetônica' },
      unidade: 'RNEST - Abreu e Lima',
      autor: mockUsers[2],
      respostas: [],
      votos: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      coordinates: UNIT_LOCATIONS['RNEST - Abreu e Lima'],
      aiAnalysis: { suggestedArea: 'Infraestrutura', confidence: 0.92 }
    });
  }

  // AM (Urucu) = 1 (VERDE)
  base.push({
    id: `am-1`,
    titulo: 'Logística Urucu',
    descricao: 'Melhoria de sinalização no polo de extração.',
    status: DemandaStatus.RESOLVIDA,
    prioridade: 'BAIXA',
    categoria: { id: 'c0', nome: 'Infraestrutura' },
    tipoBarreira: { id: 'b1', slug: TipoBarreira.ARQUITETONICA, nome: 'Arquitetônica' },
    unidade: 'Urucu - Coari',
    autor: mockUsers[0],
    respostas: [],
    votos: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    coordinates: UNIT_LOCATIONS['Urucu - Coari'],
    aiAnalysis: { suggestedArea: 'Operações', confidence: 0.99 }
  });

  // RN (Polo Onshore) = 1 (VERDE)
  base.push({
    id: `rn-1`,
    titulo: 'Acessibilidade Onshore RN',
    descricao: 'Revisão de rotas acessíveis em campos terrestres.',
    status: DemandaStatus.NOVA,
    prioridade: 'MEDIA',
    categoria: { id: 'c0', nome: 'Infraestrutura' },
    tipoBarreira: { id: 'b1', slug: TipoBarreira.ARQUITETONICA, nome: 'Arquitetônica' },
    unidade: 'Polo Onshore RN',
    autor: mockUsers[1],
    respostas: [],
    votos: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    coordinates: UNIT_LOCATIONS['Polo Onshore RN'],
    aiAnalysis: { suggestedArea: 'Infraestrutura', confidence: 0.85 }
  });

  // ES e SC = 1 cada (VERDE)
  [
    { unit: 'Terminais ES', area: 'ES' },
    { unit: 'Terminais SC', area: 'SC' }
  ].forEach((item, idx) => {
    base.push({
      id: `unit-ext-${idx}`,
      titulo: `Padrão de Segurança - ${item.unit}`,
      descricao: 'Verificação periódica de dispositivos de acessibilidade.',
      status: DemandaStatus.RESOLVIDA,
      prioridade: 'BAIXA',
      categoria: { id: 'c4', nome: 'Segurança / SMS' },
      tipoBarreira: { id: 'b5', slug: TipoBarreira.INSTITUCIONAL, nome: 'Institucional' },
      unidade: item.unit,
      autor: mockUsers[0],
      respostas: [],
      votos: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      coordinates: UNIT_LOCATIONS[item.unit],
      aiAnalysis: { suggestedArea: 'SMS', confidence: 0.98 }
    });
  });

  return base;
};

export const mockDemandas = generateMockDemandas();
