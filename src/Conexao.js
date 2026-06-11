// Padrão Singleton — garante que só existe uma conexão com o banco

class Conexao {

  constructor() {
    // Dados da conexão com o banco
    this.host = "localhost"
    this.banco = "ecommerce"
    console.log("Conectado ao banco:", this.banco)
  }

  static getInstance() {
    // Verifica se já existe uma instância criada
    if (!Conexao._instancia) {
      // Se não existir, cria uma nova
      Conexao._instancia = new Conexao()
    }

    // Retorna sempre a mesma instância
    return Conexao._instancia
  }

  query(sql) {
    // Simula a execução de uma query no banco
    console.log("Query executada:", sql)
  }
}

// Exporta a classe pra usar no index.js
module.exports = Conexao