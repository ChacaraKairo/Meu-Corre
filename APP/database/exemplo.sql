-- 1. Tabela de Perfil: Armazena dados de onboarding e configuração da moto
CREATE TABLE IF NOT EXISTS perfil_usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,                -- Nome do utilizador
    foto_uri TEXT,                     -- Caminho local da imagem
    moto_modelo TEXT NOT NULL,         -- Modelo da moto
    moto_ano INTEGER,                  -- Ano da moto
    moto_placa TEXT NOT NULL,          -- Placa (Mercosul ou Antiga)
    meta_diaria REAL DEFAULT 0,        -- Meta de lucro opcional
    moto_km_atual INTEGER DEFAULT 0,   -- Último KM registado no dashboard
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP --
);

-- 2. Tabela Financeira: Registo detalhado de todas as entradas e saídas
CREATE TABLE IF NOT EXISTS registros_financeiros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT CHECK(tipo IN ('ganho', 'despesa')) NOT NULL, --
    valor REAL NOT NULL,               -- Valor monetário
    categoria TEXT NOT NULL,           -- Ex: Uber, iFood, Combustível, Lanche
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP, --
    observacao TEXT                    -- Notas rápidas opcionais
);

-- 3. Tabela de Manutenção: Controlo do estado das peças baseada em quilometragem
CREATE TABLE IF NOT EXISTS manutencao_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_nome TEXT NOT NULL,           -- Ex: Óleo, Pneu, Relação
    intervalo_km INTEGER NOT NULL,     -- Intervalo de segurança (ex: 3000)
    km_ultimo_reset INTEGER NOT NULL,  -- KM da moto quando foi feita a última troca
    data_ultimo_reset DATETIME DEFAULT CURRENT_TIMESTAMP --
);

-- 4. Inserção dos itens padrão de manutenção para o MVP
INSERT INTO manutencao_status (item_nome, intervalo_km, km_ultimo_reset) VALUES 
('Troca de Óleo', 3000, 0),
('Kit Relação', 15000, 0),
('Pneus', 20000, 0),
('Pastilhas de Freio', 10000, 0),
('Vela de Ignição', 12000, 0);

-- 5. Índices para melhorar a performance de busca no histórico
CREATE INDEX IF NOT EXISTS idx_financeiro_data ON registros_financeiros(data_registro);