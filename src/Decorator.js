// Padrão Decorator — adiciona comportamentos extras sem alterar as classes existentes

// Classe base do decorator — envolve qualquer pagamento
class PagamentoDecorator {
  constructor(pagamento) {
    // Guarda o pagamento que vai ser decorado
    this.pagamento = pagamento
  }

  processar(valor) {
    // Repassa a chamada pro pagamento original
    this.pagamento.processar(valor)
  }
}

// Decorator de log — registra o valor antes de processar
class LogDecorator extends PagamentoDecorator {
  processar(valor) {
    // Registra o log antes de processar
    console.log(`[LOG] Iniciando transação de R$${valor}`)
    // Chama o pagamento que está sendo decorado
    this.pagamento.processar(valor)
  }
}

// Decorator de desconto — reduz o valor antes de repassar
class DescontoDecorator extends PagamentoDecorator {
  constructor(pagamento, percentual) {
    super(pagamento)
    // Percentual de desconto a ser aplicado
    this.percentual = percentual
  }

  processar(valor) {
    // Calcula o valor com desconto
    const desconto = valor * (this.percentual / 100)
    const valorFinal = valor - desconto
    console.log(`[DESCONTO] ${this.percentual}% aplicado — de R$${valor} para R$${valorFinal.toFixed(2)}`)
    // Repassa o valor já com desconto
    this.pagamento.processar(valorFinal)
  }
}

// Exporta os decorators pra usar no index.js
module.exports = { LogDecorator, DescontoDecorator }