import * as SQLite from 'expo-sqlite';

/**
 * DATABASE INITIALIZATION - V2
 * Responsável por criar e estruturar o banco de dados local do MeuCorre.
 * Alterações:
 * - Adicionados campos 'icone_id' e 'cor' à tabela 'categorias_financeiras'.
 * - Garantia de persistência para a identidade visual escolhida no Onboarding.
 */
const db = SQLite.openDatabaseSync('meucorre.db');

export const DatabaseInit = () => {
  try {
    db.execSync(`
      PRAGMA journal_mode = WAL;
      
      -- TABELA DE PERFIL: Dados do utilizador e metas
      CREATE TABLE IF NOT EXISTS perfil_usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        senha TEXT,
        foto_uri TEXT,
        meta_diaria REAL DEFAULT 0,
        data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- TABELA DE VEÍCULOS: Frota do utilizador
      CREATE TABLE IF NOT EXISTS veiculos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT CHECK(tipo IN ('moto', 'carro')) NOT NULL,
        marca TEXT,
        modelo TEXT NOT NULL,
        ano INTEGER,
        motor TEXT, 
        placa TEXT NOT NULL UNIQUE,
        km_atual INTEGER DEFAULT 0,
        combustivel_padrao TEXT DEFAULT 'flex',
        ativo INTEGER DEFAULT 0
      );

      -- TABELA DE CATEGORIAS: Origens de ganhos ou tipos de gastos (Identidade Visual)
      CREATE TABLE IF NOT EXISTS categorias_financeiras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE,
        tipo TEXT CHECK(tipo IN ('ganho', 'despesa')) NOT NULL,
        icone_id TEXT, -- Armazena a string do ícone (ex: 'Car', 'Smartphone')
        cor TEXT       -- Armazena o código Hexadecimal da cor
      );

      -- TABELA DE REGISTOS FINANCEIROS: Ganhos e Despesas
      CREATE TABLE IF NOT EXISTS registros_financeiros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        veiculo_id INTEGER,
        tipo TEXT CHECK(tipo IN ('ganho', 'despesa')) NOT NULL,
        valor REAL NOT NULL,
        quantidade_litros REAL,
        tipo_combustivel TEXT,
        preco_litro REAL,
        categoria_id INTEGER, -- Relacionamento com a tabela de categorias
        data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
        observacao TEXT,
        FOREIGN KEY (veiculo_id) REFERENCES veiculos (id),
        FOREIGN KEY (categoria_id) REFERENCES categorias_financeiras (id)
      );

      -- TABELA DE HISTÓRICO DE KM: Registo diário de rodagem
      CREATE TABLE IF NOT EXISTS historico_quilometragem (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        veiculo_id INTEGER,
        km_registrado INTEGER NOT NULL,
        data_registro DATE DEFAULT (date('now', 'localtime')),
        FOREIGN KEY (veiculo_id) REFERENCES veiculos (id),
        UNIQUE(veiculo_id, data_registro)
      );

      -- TABELA DE MANUTENÇÃO: Status de peças e serviços
      CREATE TABLE IF NOT EXISTS manutencao_status (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        veiculo_id INTEGER,
        item_nome TEXT NOT NULL,
        intervalo_km INTEGER NOT NULL,
        alerta_km INTEGER DEFAULT 500,
        km_ultimo_reset INTEGER NOT NULL,
        data_ultimo_reset DATETIME DEFAULT CURRENT_TIMESTAMP,
        valor_ultimo_gasto REAL,
        observacoes TEXT,
        prioridade TEXT DEFAULT 'media',
        FOREIGN KEY (veiculo_id) REFERENCES veiculos (id)
      );
    `);
    console.log(
      '[BANCO] Estrutura atualizada: Suporte a ícones e cores nas categorias ativado.',
    );
  } catch (error) {
    console.error(
      '[ERRO] Falha ao atualizar a estrutura do banco:',
      error,
    );
  }
};

export default db;
