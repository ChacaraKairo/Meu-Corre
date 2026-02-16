import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('meucorre.db');

export const DatabaseInit = () => {
  try {
    db.execSync(`
      PRAGMA journal_mode = WAL;
      
      CREATE TABLE IF NOT EXISTS perfil_usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        foto_uri TEXT,
        meta_diaria REAL DEFAULT 0,
        data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS veiculos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT CHECK(tipo IN ('moto', 'carro')) NOT NULL,
    marca TEXT,
    modelo TEXT NOT NULL,
    ano INTEGER,
    motor TEXT, -- Alterado de potencia para motor
    placa TEXT NOT NULL UNIQUE,
    km_atual INTEGER DEFAULT 0,
    ativo INTEGER DEFAULT 0
  );

      -- Mantendo as demais tabelas (postos, registros, manutencao) conforme seu código anterior
      CREATE TABLE IF NOT EXISTS postos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE,
        bandeira TEXT,
        data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS registros_financeiros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        veiculo_id INTEGER,
        posto_id INTEGER,
        tipo TEXT CHECK(tipo IN ('ganho', 'despesa')) NOT NULL,
        valor REAL NOT NULL,
        quantidade_litros REAL,
        categoria TEXT NOT NULL,
        data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
        observacao TEXT,
        FOREIGN KEY (veiculo_id) REFERENCES veiculos (id),
        FOREIGN KEY (posto_id) REFERENCES postos (id)
      );

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
    console.log('Banco de dados pronto para o corre!');
  } catch (error) {
    console.error('Erro ao inicializar o banco:', error);
  }
};

export default db;
