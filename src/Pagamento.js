// Padrão Factory Method — cria diferentes formas de pagamento

// Classe base — define o contrato que todos os pagamentos devem seguir
class Pagamento {
  processar(valor) {
    // Cada forma de pagamento vai implementar esse método do seu jeito
    throw new Error("O método processar() precisa ser implementado")
  }
}

// -- Implementações concretas --

class CartaoCredito extends Pagamento {
  processar(valor) {
    // Processa o pagamento via cartão de crédito
    console.log(`Pagamento de R$${valor} realizado no cartão de crédito`)
  }
}

class Pix extends Pagamento {
  processar(valor) {
    // Processa o pagamento via PIX
    console.log(`Pagamento de R$${valor} realizado via PIX`)
  }
}

class Boleto extends Pagamento {
  processar(valor) {
    // Processa o pagamento via boleto
    console.log(`Boleto de R$${valor} gerado com sucesso`)
  }
}

// -- A Factory --

class PagamentoFactory {
  // Recebe o tipo desejado e devolve o objeto certo
  static criar(tipo) {
    if (tipo === "cartao") {
      return new CartaoCredito()
    } else if (tipo === "pix") {
      return new Pix()
    } else if (tipo === "boleto") {
      return new Boleto()
    } else {
      // Se passar um tipo que não existe, avisa o erro
      throw new Error(`Forma de pagamento "${tipo}" não encontrada`)
    }
  }
}

// Exporta a factory pra usar no index.js
module.exports = { PagamentoFactory }