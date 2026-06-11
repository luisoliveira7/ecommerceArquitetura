// Padrão Builder — monta um pedido por partes de forma organizada

class Pedido {
  constructor(itens, endereco, pagamento) {
    // Recebe tudo pronto do Builder
    this.itens = itens
    this.endereco = endereco
    this.pagamento = pagamento
  }

  // Mostra o resumo do pedido
  resumo() {
    console.log("--- Pedido ---")
    console.log("Itens:", this.itens)
    console.log("Endereço:", this.endereco)
    console.log("Pagamento:", this.pagamento)
    console.log("--------------")
  }
}

// -- O Builder --

class PedidoBuilder {
  constructor() {
    // Começa com tudo vazio
    this.itens = []
    this.endereco = null
    this.pagamento = null
  }

  adicionarItem(item) {
    // Adiciona um item na lista
    this.itens.push(item)
    // Retorna o próprio builder pra permitir o encadeamento
    return this
  }

  setEndereco(endereco) {
    // Define o endereço de entrega
    this.endereco = endereco
    // Retorna o próprio builder pra permitir o encadeamento
    return this
  }

  setPagamento(pagamento) {
    // Define a forma de pagamento
    this.pagamento = pagamento
    // Retorna o próprio builder pra permitir o encadeamento
    return this
  }

  build() {
    // Validação — não permite pedido sem itens
    if (this.itens.length === 0) {
      throw new Error("O pedido precisa ter pelo menos um item")
    }

    // Validação — não permite pedido sem endereço
    if (!this.endereco) {
      throw new Error("O pedido precisa ter um endereço de entrega")
    }

    // Validação — não permite pedido sem forma de pagamento
    if (!this.pagamento) {
      throw new Error("O pedido precisa ter uma forma de pagamento")
    }

    // Tudo certo — cria e retorna o pedido finalizado
    return new Pedido(this.itens, this.endereco, this.pagamento)
  }
}

// Exporta o builder pra usar no index.js
module.exports = { PedidoBuilder }