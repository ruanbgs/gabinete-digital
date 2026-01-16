// Interfaces TypeScript
export interface Gabinete {
  id: string;
  nome: string;
  slug: string;
  nome_politico: string;
  cidade: string;
  estado: string;
  whatsapp_numero: string;
  logo_url?: string;
}

export interface Usuario {
  id: string;
  gabinete_id: string;
  nome: string;
  email: string;
  role: 'owner' | 'coord' | 'atendente' | 'leitura';
}

export interface Cidadao {
  id: string;
  gabinete_id: string;
  nome_completo: string;
  data_nascimento: string; // ISO string
  cpf: string;
  telefone: string;
  email?: string;
  endereco: string;
  cep: string;
  bairro: string;
  cidade: string;
  ultimo_contato_at: string; // ISO string
  origem: 'whatsapp' | 'manual' | 'importacao';
}

export interface Demanda {
  id: string;
  gabinete_id: string;
  cidadao_id: string;
  protocolo: string;
  tipo_demanda: 'Saúde' | 'Infraestrutura' | 'Limpeza urbana' | 'Iluminação pública' | 'Projeto de lei' | 'Requerimento';
  descricao: string;
  endereco: string;
  cep: string;
  bairro: string;
  status: 'produzida_no_dia' | 'em_andamento' | 'finalizada';
  documento_url: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

export interface HistoricoStatus {
  id: string;
  demanda_id: string;
  status: 'produzida_no_dia' | 'em_andamento' | 'finalizada';
  observacao_interna: string;
  changed_by_user_id?: string;
  created_at: string; // ISO string
}

// Mock Data
export const gabinetes: Gabinete[] = [
  {
    id: 'gabinete_demo_1',
    nome: 'Gabinete Digital Demo',
    slug: 'gabinete-digital-demo',
    nome_politico: 'Vereador João Silva',
    cidade: 'Brasília',
    estado: 'DF',
    whatsapp_numero: '5561999999999',
    logo_url: undefined,
  },
  {
    id: 'gabinete_demo_2',
    nome: 'Gabinete Municipal',
    slug: 'gabinete-municipal',
    nome_politico: 'Vereadora Maria Santos',
    cidade: 'São Paulo',
    estado: 'SP',
    whatsapp_numero: '5511988888888',
    logo_url: undefined,
  },
];

export const usuarios: Usuario[] = [
  {
    id: 'user_1',
    gabinete_id: 'gabinete_demo_1',
    nome: 'João Silva',
    email: 'joao@gabinete.com',
    role: 'owner',
  },
  {
    id: 'user_2',
    gabinete_id: 'gabinete_demo_1',
    nome: 'Ana Costa',
    email: 'ana@gabinete.com',
    role: 'coord',
  },
  {
    id: 'user_3',
    gabinete_id: 'gabinete_demo_1',
    nome: 'Carlos Mendes',
    email: 'carlos@gabinete.com',
    role: 'atendente',
  },
  {
    id: 'user_4',
    gabinete_id: 'gabinete_demo_1',
    nome: 'Patricia Lima',
    email: 'patricia@gabinete.com',
    role: 'atendente',
  },
  {
    id: 'user_5',
    gabinete_id: 'gabinete_demo_2',
    nome: 'Maria Santos',
    email: 'maria@gabinete.com',
    role: 'owner',
  },
  {
    id: 'user_6',
    gabinete_id: 'gabinete_demo_2',
    nome: 'Roberto Alves',
    email: 'roberto@gabinete.com',
    role: 'coord',
  },
  {
    id: 'user_7',
    gabinete_id: 'gabinete_demo_2',
    nome: 'Fernanda Souza',
    email: 'fernanda@gabinete.com',
    role: 'atendente',
  },
  {
    id: 'user_8',
    gabinete_id: 'gabinete_demo_1',
    nome: 'Lucas Oliveira',
    email: 'lucas@gabinete.com',
    role: 'leitura',
  },
];

// Helper para gerar datas ISO
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const today = new Date();
const thisYear = today.getFullYear();

export const cidadaos: Cidadao[] = [
  // Gabinete 1 - 10 cidadãos
  {
    id: 'cid_1',
    gabinete_id: 'gabinete_demo_1',
    nome_completo: 'Pedro Henrique Oliveira',
    data_nascimento: `${thisYear - 35}-03-15T00:00:00.000Z`,
    cpf: '123.456.789-00',
    telefone: '(61) 99999-1111',
    email: 'pedro@email.com',
    endereco: 'Rua das Flores, 123',
    cep: '70000-000',
    bairro: 'Asa Norte',
    cidade: 'Brasília',
    ultimo_contato_at: daysAgo(5), // Verde
    origem: 'whatsapp',
  },
  {
    id: 'cid_2',
    gabinete_id: 'gabinete_demo_1',
    nome_completo: 'Mariana Costa Silva',
    data_nascimento: `${thisYear - 28}-07-22T00:00:00.000Z`,
    cpf: '234.567.890-11',
    telefone: '(61) 99999-2222',
    email: 'mariana@email.com',
    endereco: 'Quadra 205, Bloco A, Apto 101',
    cep: '70000-000',
    bairro: 'Asa Sul',
    cidade: 'Brasília',
    ultimo_contato_at: daysAgo(45), // Amarelo
    origem: 'manual',
  },
  {
    id: 'cid_3',
    gabinete_id: 'gabinete_demo_1',
    nome_completo: 'Roberto Almeida',
    data_nascimento: `${thisYear - 52}-11-08T00:00:00.000Z`,
    cpf: '345.678.901-22',
    telefone: '(61) 99999-3333',
    endereco: 'Rua 15, Lote 5',
    cep: '70000-000',
    bairro: 'Taguatinga',
    cidade: 'Brasília',
    ultimo_contato_at: daysAgo(120), // Vermelho
    origem: 'whatsapp',
  },
  {
    id: 'cid_4',
    gabinete_id: 'gabinete_demo_1',
    nome_completo: 'Juliana Ferreira',
    data_nascimento: `${thisYear - 31}-01-14T00:00:00.000Z`,
    cpf: '456.789.012-33',
    telefone: '(61) 99999-4444',
    email: 'juliana@email.com',
    endereco: 'Avenida Central, 456',
    cep: '70000-000',
    bairro: 'Ceilândia',
    cidade: 'Brasília',
    ultimo_contato_at: daysAgo(20), // Verde
    origem: 'importacao',
  },
  {
    id: 'cid_5',
    gabinete_id: 'gabinete_demo_1',
    nome_completo: 'Fernando Santos',
    data_nascimento: `${thisYear - 42}-09-30T00:00:00.000Z`,
    cpf: '567.890.123-44',
    telefone: '(61) 99999-5555',
    endereco: 'Rua do Comércio, 789',
    cep: '70000-000',
    bairro: 'Samambaia',
    cidade: 'Brasília',
    ultimo_contato_at: daysAgo(55), // Amarelo
    origem: 'whatsapp',
  },
  {
    id: 'cid_6',
    gabinete_id: 'gabinete_demo_1',
    nome_completo: 'Amanda Rodrigues',
    data_nascimento: `${thisYear - 25}-05-18T00:00:00.000Z`,
    cpf: '678.901.234-55',
    telefone: '(61) 99999-6666',
    email: 'amanda@email.com',
    endereco: 'Quadra 301, Conjunto 2',
    cep: '70000-000',
    bairro: 'Gama',
    cidade: 'Brasília',
    ultimo_contato_at: daysAgo(10), // Verde
    origem: 'manual',
  },
  {
    id: 'cid_7',
    gabinete_id: 'gabinete_demo_1',
    nome_completo: 'Ricardo Lima',
    data_nascimento: `${thisYear - 38}-12-25T00:00:00.000Z`,
    cpf: '789.012.345-66',
    telefone: '(61) 99999-7777',
    endereco: 'Rua das Palmeiras, 321',
    cep: '70000-000',
    bairro: 'Planaltina',
    cidade: 'Brasília',
    ultimo_contato_at: daysAgo(95), // Vermelho
    origem: 'whatsapp',
  },
  {
    id: 'cid_8',
    gabinete_id: 'gabinete_demo_1',
    nome_completo: 'Camila Barbosa',
    data_nascimento: `${thisYear - 29}-08-03T00:00:00.000Z`,
    cpf: '890.123.456-77',
    telefone: '(61) 99999-8888',
    email: 'camila@email.com',
    endereco: 'Avenida Principal, 654',
    cep: '70000-000',
    bairro: 'Sobradinho',
    cidade: 'Brasília',
    ultimo_contato_at: daysAgo(25), // Verde
    origem: 'importacao',
  },
  {
    id: 'cid_9',
    gabinete_id: 'gabinete_demo_1',
    nome_completo: 'Lucas Martins',
    data_nascimento: `${thisYear - 33}-04-12T00:00:00.000Z`,
    cpf: '901.234.567-88',
    telefone: '(61) 99999-9999',
    endereco: 'Rua Nova, 987',
    cep: '70000-000',
    bairro: 'Santa Maria',
    cidade: 'Brasília',
    ultimo_contato_at: daysAgo(65), // Amarelo
    origem: 'manual',
  },
  {
    id: 'cid_10',
    gabinete_id: 'gabinete_demo_1',
    nome_completo: 'Patricia Gomes',
    data_nascimento: `${thisYear - 47}-10-20T00:00:00.000Z`,
    cpf: '012.345.678-99',
    telefone: '(61) 99999-0000',
    email: 'patricia@email.com',
    endereco: 'Quadra 102, Bloco B',
    cep: '70000-000',
    bairro: 'Brazlândia',
    cidade: 'Brasília',
    ultimo_contato_at: daysAgo(110), // Vermelho
    origem: 'whatsapp',
  },
  // Gabinete 2 - 10 cidadãos
  {
    id: 'cid_11',
    gabinete_id: 'gabinete_demo_2',
    nome_completo: 'Sergio Pereira',
    data_nascimento: `${thisYear - 40}-02-14T00:00:00.000Z`,
    cpf: '111.222.333-44',
    telefone: '(11) 98888-1111',
    email: 'sergio@email.com',
    endereco: 'Rua Augusta, 100',
    cep: '01305-100',
    bairro: 'Consolação',
    cidade: 'São Paulo',
    ultimo_contato_at: daysAgo(15), // Verde
    origem: 'whatsapp',
  },
  {
    id: 'cid_12',
    gabinete_id: 'gabinete_demo_2',
    nome_completo: 'Beatriz Nunes',
    data_nascimento: `${thisYear - 26}-06-07T00:00:00.000Z`,
    cpf: '222.333.444-55',
    telefone: '(11) 98888-2222',
    endereco: 'Avenida Paulista, 2000',
    cep: '01310-100',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    ultimo_contato_at: daysAgo(50), // Amarelo
    origem: 'manual',
  },
  {
    id: 'cid_13',
    gabinete_id: 'gabinete_demo_2',
    nome_completo: 'Marcos Vieira',
    data_nascimento: `${thisYear - 55}-11-19T00:00:00.000Z`,
    cpf: '333.444.555-66',
    telefone: '(11) 98888-3333',
    endereco: 'Rua da Consolação, 500',
    cep: '01302-000',
    bairro: 'Consolação',
    cidade: 'São Paulo',
    ultimo_contato_at: daysAgo(100), // Vermelho
    origem: 'whatsapp',
  },
  {
    id: 'cid_14',
    gabinete_id: 'gabinete_demo_2',
    nome_completo: 'Larissa Moura',
    data_nascimento: `${thisYear - 30}-03-25T00:00:00.000Z`,
    cpf: '444.555.666-77',
    telefone: '(11) 98888-4444',
    email: 'larissa@email.com',
    endereco: 'Rua Haddock Lobo, 300',
    cep: '01414-000',
    bairro: 'Cerqueira César',
    cidade: 'São Paulo',
    ultimo_contato_at: daysAgo(8), // Verde
    origem: 'importacao',
  },
  {
    id: 'cid_15',
    gabinete_id: 'gabinete_demo_2',
    nome_completo: 'Thiago Rocha',
    data_nascimento: `${thisYear - 36}-09-11T00:00:00.000Z`,
    cpf: '555.666.777-88',
    telefone: '(11) 98888-5555',
    endereco: 'Avenida Rebouças, 1500',
    cep: '05402-000',
    bairro: 'Pinheiros',
    cidade: 'São Paulo',
    ultimo_contato_at: daysAgo(40), // Amarelo
    origem: 'whatsapp',
  },
  {
    id: 'cid_16',
    gabinete_id: 'gabinete_demo_2',
    nome_completo: 'Vanessa Araujo',
    data_nascimento: `${thisYear - 27}-01-30T00:00:00.000Z`,
    cpf: '666.777.888-99',
    telefone: '(11) 98888-6666',
    email: 'vanessa@email.com',
    endereco: 'Rua dos Três Irmãos, 200',
    cep: '05436-070',
    bairro: 'Butantã',
    cidade: 'São Paulo',
    ultimo_contato_at: daysAgo(12), // Verde
    origem: 'manual',
  },
  {
    id: 'cid_17',
    gabinete_id: 'gabinete_demo_2',
    nome_completo: 'Diego Carvalho',
    data_nascimento: `${thisYear - 44}-07-05T00:00:00.000Z`,
    cpf: '777.888.999-00',
    telefone: '(11) 98888-7777',
    endereco: 'Rua Vergueiro, 800',
    cep: '01504-000',
    bairro: 'Vila Mariana',
    cidade: 'São Paulo',
    ultimo_contato_at: daysAgo(85), // Vermelho
    origem: 'whatsapp',
  },
  {
    id: 'cid_18',
    gabinete_id: 'gabinete_demo_2',
    nome_completo: 'Isabela Freitas',
    data_nascimento: `${thisYear - 32}-12-08T00:00:00.000Z`,
    cpf: '888.999.000-11',
    telefone: '(11) 98888-8888',
    email: 'isabela@email.com',
    endereco: 'Avenida Faria Lima, 2000',
    cep: '01452-000',
    bairro: 'Jardim Paulistano',
    cidade: 'São Paulo',
    ultimo_contato_at: daysAgo(30), // Verde (limite)
    origem: 'importacao',
  },
  {
    id: 'cid_19',
    gabinete_id: 'gabinete_demo_2',
    nome_completo: 'Gabriel Dias',
    data_nascimento: `${thisYear - 39}-05-22T00:00:00.000Z`,
    cpf: '999.000.111-22',
    telefone: '(11) 98888-9999',
    endereco: 'Rua dos Ciprestes, 400',
    cep: '04538-000',
    bairro: 'Vila Olímpia',
    cidade: 'São Paulo',
    ultimo_contato_at: daysAgo(58), // Amarelo
    origem: 'manual',
  },
  {
    id: 'cid_20',
    gabinete_id: 'gabinete_demo_2',
    nome_completo: 'Renata Lopes',
    data_nascimento: `${thisYear - 34}-08-15T00:00:00.000Z`,
    cpf: '000.111.222-33',
    telefone: '(11) 98888-0000',
    email: 'renata@email.com',
    endereco: 'Rua Bela Cintra, 600',
    cep: '01415-000',
    bairro: 'Consolação',
    cidade: 'São Paulo',
    ultimo_contato_at: daysAgo(105), // Vermelho
    origem: 'whatsapp',
  },
];

// Helper para gerar protocolo
const generateProtocolo = (ano: number, sequencial: number): string => {
  return `${ano}-${String(sequencial).padStart(6, '0')}`;
};

const hoje = new Date();
const hojeISO = hoje.toISOString();
const ontemISO = daysAgo(1);
const semanaAtrasISO = daysAgo(7);
const mesAtrasISO = daysAgo(30);
const doisMesesAtrasISO = daysAgo(60);

export const demandas: Demanda[] = [
  // Gabinete 1 - 13 demandas
  {
    id: 'dem_1',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_1',
    protocolo: generateProtocolo(2026, 1),
    tipo_demanda: 'Saúde',
    descricao: 'Solicitação de médico na UBS do bairro',
    endereco: 'Rua das Flores, 123',
    cep: '70000-000',
    bairro: 'Asa Norte',
    status: 'produzida_no_dia',
    documento_url: '/documentos/dem_1.pdf',
    created_at: hojeISO,
    updated_at: hojeISO,
  },
  {
    id: 'dem_2',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_2',
    protocolo: generateProtocolo(2026, 2),
    tipo_demanda: 'Infraestrutura',
    descricao: 'Buraco na rua precisa de reparo urgente',
    endereco: 'Quadra 205, Bloco A, Apto 101',
    cep: '70000-000',
    bairro: 'Asa Sul',
    status: 'em_andamento',
    documento_url: '/documentos/dem_2.pdf',
    created_at: semanaAtrasISO,
    updated_at: ontemISO,
  },
  {
    id: 'dem_3',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_3',
    protocolo: generateProtocolo(2026, 3),
    tipo_demanda: 'Limpeza urbana',
    descricao: 'Coleta de lixo irregular no bairro',
    endereco: 'Rua 15, Lote 5',
    cep: '70000-000',
    bairro: 'Taguatinga',
    status: 'finalizada',
    documento_url: '/documentos/dem_3.pdf',
    created_at: mesAtrasISO,
    updated_at: semanaAtrasISO,
  },
  {
    id: 'dem_4',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_4',
    protocolo: generateProtocolo(2026, 4),
    tipo_demanda: 'Iluminação pública',
    descricao: 'Poste queimado na avenida principal',
    endereco: 'Avenida Central, 456',
    cep: '70000-000',
    bairro: 'Ceilândia',
    status: 'produzida_no_dia',
    documento_url: '/documentos/dem_4.pdf',
    created_at: hojeISO,
    updated_at: hojeISO,
  },
  {
    id: 'dem_5',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_5',
    protocolo: generateProtocolo(2026, 5),
    tipo_demanda: 'Saúde',
    descricao: 'Falta de medicamentos na farmácia popular',
    endereco: 'Rua do Comércio, 789',
    cep: '70000-000',
    bairro: 'Samambaia',
    status: 'em_andamento',
    documento_url: '/documentos/dem_5.pdf',
    created_at: semanaAtrasISO,
    updated_at: ontemISO,
  },
  {
    id: 'dem_6',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_6',
    protocolo: generateProtocolo(2026, 6),
    tipo_demanda: 'Projeto de lei',
    descricao: 'Projeto para criação de praça no bairro',
    endereco: 'Quadra 301, Conjunto 2',
    cep: '70000-000',
    bairro: 'Gama',
    status: 'em_andamento',
    documento_url: '/documentos/dem_6.pdf',
    created_at: doisMesesAtrasISO,
    updated_at: semanaAtrasISO,
  },
  {
    id: 'dem_7',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_7',
    protocolo: generateProtocolo(2026, 7),
    tipo_demanda: 'Requerimento',
    descricao: 'Requerimento de informações sobre obras',
    endereco: 'Rua das Palmeiras, 321',
    cep: '70000-000',
    bairro: 'Planaltina',
    status: 'finalizada',
    documento_url: '/documentos/dem_7.pdf',
    created_at: mesAtrasISO,
    updated_at: semanaAtrasISO,
  },
  {
    id: 'dem_8',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_8',
    protocolo: generateProtocolo(2026, 8),
    tipo_demanda: 'Infraestrutura',
    descricao: 'Pavimentação de rua sem asfalto',
    endereco: 'Avenida Principal, 654',
    cep: '70000-000',
    bairro: 'Sobradinho',
    status: 'produzida_no_dia',
    documento_url: '/documentos/dem_8.pdf',
    created_at: hojeISO,
    updated_at: hojeISO,
  },
  {
    id: 'dem_9',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_9',
    protocolo: generateProtocolo(2026, 9),
    tipo_demanda: 'Limpeza urbana',
    descricao: 'Lixo acumulado em terreno baldio',
    endereco: 'Rua Nova, 987',
    cep: '70000-000',
    bairro: 'Santa Maria',
    status: 'em_andamento',
    documento_url: '/documentos/dem_9.pdf',
    created_at: semanaAtrasISO,
    updated_at: ontemISO,
  },
  {
    id: 'dem_10',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_10',
    protocolo: generateProtocolo(2026, 10),
    tipo_demanda: 'Iluminação pública',
    descricao: 'Falta de iluminação em via pública',
    endereco: 'Quadra 102, Bloco B',
    cep: '70000-000',
    bairro: 'Brazlândia',
    status: 'finalizada',
    documento_url: '/documentos/dem_10.pdf',
    created_at: mesAtrasISO,
    updated_at: semanaAtrasISO,
  },
  {
    id: 'dem_11',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_1',
    protocolo: generateProtocolo(2026, 11),
    tipo_demanda: 'Saúde',
    descricao: 'Nova solicitação de atendimento médico',
    endereco: 'Rua das Flores, 123',
    cep: '70000-000',
    bairro: 'Asa Norte',
    status: 'produzida_no_dia',
    documento_url: '/documentos/dem_11.pdf',
    created_at: hojeISO,
    updated_at: hojeISO,
  },
  {
    id: 'dem_12',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_2',
    protocolo: generateProtocolo(2026, 12),
    tipo_demanda: 'Requerimento',
    descricao: 'Solicitação de documentos públicos',
    endereco: 'Quadra 205, Bloco A, Apto 101',
    cep: '70000-000',
    bairro: 'Asa Sul',
    status: 'em_andamento',
    documento_url: '/documentos/dem_12.pdf',
    created_at: semanaAtrasISO,
    updated_at: ontemISO,
  },
  {
    id: 'dem_13',
    gabinete_id: 'gabinete_demo_1',
    cidadao_id: 'cid_3',
    protocolo: generateProtocolo(2026, 13),
    tipo_demanda: 'Projeto de lei',
    descricao: 'Projeto para melhoria de transporte público',
    endereco: 'Rua 15, Lote 5',
    cep: '70000-000',
    bairro: 'Taguatinga',
    status: 'finalizada',
    documento_url: '/documentos/dem_13.pdf',
    created_at: doisMesesAtrasISO,
    updated_at: mesAtrasISO,
  },
  // Gabinete 2 - 12 demandas
  {
    id: 'dem_14',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_11',
    protocolo: generateProtocolo(2026, 14),
    tipo_demanda: 'Saúde',
    descricao: 'Falta de médicos especialistas no posto',
    endereco: 'Rua Augusta, 100',
    cep: '01305-100',
    bairro: 'Consolação',
    status: 'produzida_no_dia',
    documento_url: '/documentos/dem_14.pdf',
    created_at: hojeISO,
    updated_at: hojeISO,
  },
  {
    id: 'dem_15',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_12',
    protocolo: generateProtocolo(2026, 15),
    tipo_demanda: 'Infraestrutura',
    descricao: 'Calçada quebrada precisa de reparo',
    endereco: 'Avenida Paulista, 2000',
    cep: '01310-100',
    bairro: 'Bela Vista',
    status: 'em_andamento',
    documento_url: '/documentos/dem_15.pdf',
    created_at: semanaAtrasISO,
    updated_at: ontemISO,
  },
  {
    id: 'dem_16',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_13',
    protocolo: generateProtocolo(2026, 16),
    tipo_demanda: 'Limpeza urbana',
    descricao: 'Coleta seletiva não está funcionando',
    endereco: 'Rua da Consolação, 500',
    cep: '01302-000',
    bairro: 'Consolação',
    status: 'finalizada',
    documento_url: '/documentos/dem_16.pdf',
    created_at: mesAtrasISO,
    updated_at: semanaAtrasISO,
  },
  {
    id: 'dem_17',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_14',
    protocolo: generateProtocolo(2026, 17),
    tipo_demanda: 'Iluminação pública',
    descricao: 'Lâmpada queimada na rua',
    endereco: 'Rua Haddock Lobo, 300',
    cep: '01414-000',
    bairro: 'Cerqueira César',
    status: 'produzida_no_dia',
    documento_url: '/documentos/dem_17.pdf',
    created_at: hojeISO,
    updated_at: hojeISO,
  },
  {
    id: 'dem_18',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_15',
    protocolo: generateProtocolo(2026, 18),
    tipo_demanda: 'Projeto de lei',
    descricao: 'Projeto para ciclovia no bairro',
    endereco: 'Avenida Rebouças, 1500',
    cep: '05402-000',
    bairro: 'Pinheiros',
    status: 'em_andamento',
    documento_url: '/documentos/dem_18.pdf',
    created_at: doisMesesAtrasISO,
    updated_at: semanaAtrasISO,
  },
  {
    id: 'dem_19',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_16',
    protocolo: generateProtocolo(2026, 19),
    tipo_demanda: 'Requerimento',
    descricao: 'Solicitação de informações sobre licenças',
    endereco: 'Rua dos Três Irmãos, 200',
    cep: '05436-070',
    bairro: 'Butantã',
    status: 'finalizada',
    documento_url: '/documentos/dem_19.pdf',
    created_at: mesAtrasISO,
    updated_at: semanaAtrasISO,
  },
  {
    id: 'dem_20',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_17',
    protocolo: generateProtocolo(2026, 20),
    tipo_demanda: 'Saúde',
    descricao: 'Falta de vacinas no posto de saúde',
    endereco: 'Rua Vergueiro, 800',
    cep: '01504-000',
    bairro: 'Vila Mariana',
    status: 'produzida_no_dia',
    documento_url: '/documentos/dem_20.pdf',
    created_at: hojeISO,
    updated_at: hojeISO,
  },
  {
    id: 'dem_21',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_18',
    protocolo: generateProtocolo(2026, 21),
    tipo_demanda: 'Infraestrutura',
    descricao: 'Drenagem de água da chuva',
    endereco: 'Avenida Faria Lima, 2000',
    cep: '01452-000',
    bairro: 'Jardim Paulistano',
    status: 'em_andamento',
    documento_url: '/documentos/dem_21.pdf',
    created_at: semanaAtrasISO,
    updated_at: ontemISO,
  },
  {
    id: 'dem_22',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_19',
    protocolo: generateProtocolo(2026, 22),
    tipo_demanda: 'Limpeza urbana',
    descricao: 'Lixo em via pública',
    endereco: 'Rua dos Ciprestes, 400',
    cep: '04538-000',
    bairro: 'Vila Olímpia',
    status: 'finalizada',
    documento_url: '/documentos/dem_22.pdf',
    created_at: mesAtrasISO,
    updated_at: semanaAtrasISO,
  },
  {
    id: 'dem_23',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_20',
    protocolo: generateProtocolo(2026, 23),
    tipo_demanda: 'Iluminação pública',
    descricao: 'Melhoria da iluminação na rua',
    endereco: 'Rua Bela Cintra, 600',
    cep: '01415-000',
    bairro: 'Consolação',
    status: 'produzida_no_dia',
    documento_url: '/documentos/dem_23.pdf',
    created_at: hojeISO,
    updated_at: hojeISO,
  },
  {
    id: 'dem_24',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_11',
    protocolo: generateProtocolo(2026, 24),
    tipo_demanda: 'Projeto de lei',
    descricao: 'Projeto para parque no bairro',
    endereco: 'Rua Augusta, 100',
    cep: '01305-100',
    bairro: 'Consolação',
    status: 'em_andamento',
    documento_url: '/documentos/dem_24.pdf',
    created_at: doisMesesAtrasISO,
    updated_at: semanaAtrasISO,
  },
  {
    id: 'dem_25',
    gabinete_id: 'gabinete_demo_2',
    cidadao_id: 'cid_12',
    protocolo: generateProtocolo(2026, 25),
    tipo_demanda: 'Requerimento',
    descricao: 'Solicitação de documentos',
    endereco: 'Avenida Paulista, 2000',
    cep: '01310-100',
    bairro: 'Bela Vista',
    status: 'finalizada',
    documento_url: '/documentos/dem_25.pdf',
    created_at: mesAtrasISO,
    updated_at: semanaAtrasISO,
  },
];

// Helper Functions
export function getActiveGabinete(): Gabinete {
  return gabinetes[0]; // gabinete_demo_1
}

export function getCidadaosByGabinete(gabineteId: string): Cidadao[] {
  return cidadaos.filter((c) => c.gabinete_id === gabineteId);
}

export function getDemandasByGabinete(gabineteId: string): Demanda[] {
  return demandas.filter((d) => d.gabinete_id === gabineteId);
}

export function getCidadaoById(id: string): Cidadao | undefined {
  return cidadaos.find((c) => c.id === id);
}

export function getDemandaById(id: string): Demanda | undefined {
  return demandas.find((d) => d.id === id);
}
