import * as SQLite from 'expo-sqlite';

/**
 * DATABASE INITIALIZATION - V3
 * Adiciona lógica de migração para garantir que colunas novas sejam criadas
 * em instalações existentes sem perder dados.
 */
const db = SQLite.openDatabaseSync('meucorre.db');

export const DatabaseInit = () => {
  try {
    // 1. Criação das tabelas base
    db.execSync(`
      PRAGMA journal_mode = WAL;
      
      CREATE TABLE IF NOT EXISTS perfil_usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        senha TEXT,
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
        motor TEXT, 
        placa TEXT NOT NULL UNIQUE,
        km_atual INTEGER DEFAULT 0,
        combustivel_padrao TEXT DEFAULT 'flex',
        ativo INTEGER DEFAULT 0
      );
    `);

    // 2. MIGRACAO: Adicionar colunas de meta se não existirem
    // SQLite não suporta IF NOT EXISTS no ALTER TABLE, por isso usamos um try/catch para cada coluna
    try {
      db.execSync(
        "ALTER TABLE perfil_usuario ADD COLUMN tipo_meta TEXT DEFAULT 'diaria';",
      );
      console.log(
        '[MIGRAÇÃO] Coluna tipo_meta adicionada.',
      );
    } catch (e) {
      /* Coluna já existe */
    }

    try {
      db.execSync(
        'ALTER TABLE perfil_usuario ADD COLUMN meta_semanal REAL DEFAULT 0;',
      );
      console.log(
        '[MIGRAÇÃO] Coluna meta_semanal adicionada.',
      );
    } catch (e) {
      /* Coluna já existe */
    }

    // 3. Outras tabelas (Manutenção, etc)
    db.execSync(`
      CREATE TABLE IF NOT EXISTS registros_manutencao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        veiculo_id INTEGER NOT NULL,
        descricao TEXT NOT NULL,
        valor REAL DEFAULT 0,
        km_no_servico INTEGER,
        data_servico DATE DEFAULT (date('now', 'localtime')),
        FOREIGN KEY (veiculo_id) REFERENCES veiculos (id)
      );

      CREATE TABLE IF NOT EXISTS categorias_financeiras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE,
        tipo TEXT CHECK(tipo IN ('ganho', 'despesa')) NOT NULL,
        icone_id TEXT, 
        cor TEXT       
      );
    `);

    console.log(
      '[BANCO] Sistema pronto e tabelas verificadas.',
    );
  } catch (error) {
    console.error(
      '[ERRO] Falha crítica na inicialização do banco:',
      error,
    );
  }
};

export default db;
