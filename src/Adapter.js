// Padrão Adapter — adapta o gateway legado para funcionar com o sistema atual

// Simula o gateway de terceiros — não pode ser alterado
class GatewayLegado {
  // O legado usa um método diferente, com nome e parâmetros diferentes
  efetuarCobranca(quantia, moeda) {
    console.log(`[Gateway Legado] Cobrando ${quantia} em ${moeda}`)
  }
}

// Adapter — implementa a interface Pagamento e adapta a chamada pro legado
class GatewayAdapter {
  constructor() {
    // Cria uma instância do gateway legado internamente
    this.gateway = new GatewayLegado()
  }

  // Implementa o método processar() que o sistema já conhece
  processar(valor) {
    // Converte a chamada do sistema para o formato que o legado entende
    this.gateway.efetuarCobranca(valor, "BRL")
  }
}

// Exporta o adapter pra usar no index.js
module.exports = { GatewayAdapter }