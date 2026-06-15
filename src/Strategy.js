// Padrão Strategy — estratégias de cálculo de frete intercambiáveis

// Estratégias concretas — cada uma calcula o frete do seu jeito
class FreteCorreios {
  calcular(peso) {
    // Correios cobra R$5 por kg
    const valor = peso * 5
    console.log(`[Correios] Frete para ${peso}kg: R$${valor.toFixed(2)}`)
    return valor
  }
}

class FreteJadlog {
  calcular(peso) {
    // Jadlog cobra R$7 por kg
    const valor = peso * 7
    console.log(`[Jadlog] Frete para ${peso}kg: R$${valor.toFixed(2)}`)
    return valor
  }
}

class FreteRetirada {
  calcular(peso) {
    // Retirada em loja — sem custo de frete
    console.log(`[Retirada] Sem custo de frete`)
    return 0
  }
}

// Carrinho — recebe a estratégia e delega o cálculo pra ela
class Carrinho {
  constructor() {
    // Começa sem estratégia definida
    this.estrategia = null
  }

  setFrete(estrategia) {
    // Permite trocar a estratégia em tempo de execução
    this.estrategia = estrategia
  }

  calcularFrete(peso) {
    // Verifica se tem uma estratégia definida
    if (!this.estrategia) {
      throw new Error("Nenhuma estratégia de frete definida")
    }
    // Delega o cálculo pra estratégia atual
    return this.estrategia.calcular(peso)
  }
}

// Exporta as classes pra usar no index.js
module.exports = { Carrinho, FreteCorreios, FreteJadlog, FreteRetirada }