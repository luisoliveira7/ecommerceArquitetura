// Padrão Observer — notifica automaticamente quando o pedido muda de status

// Observers — cada um reage à confirmação do pedido do seu jeito
class EmailObserver {
  atualizar(pedido) {
    // Simula o envio de e-mail ao cliente
    console.log(`[Email] Confirmação enviada para o cliente — itens: ${pedido.itens}`)
  }
}

class EstoqueObserver {
  atualizar(pedido) {
    // Simula a baixa no estoque dos itens do pedido
    console.log(`[Estoque] Baixa realizada nos itens: ${pedido.itens}`)
  }
}

class LogObserver {
  atualizar(pedido) {
    // Simula o registro de auditoria do pedido
    console.log(`[Log] Pedido confirmado — status: ${pedido.status}`)
  }
}

// Subject — o pedido mantém a lista de observers e os notifica
class PedidoObservavel {
  constructor(itens, endereco, pagamento) {
    // Dados do pedido
    this.itens = itens
    this.endereco = endereco
    this.pagamento = pagamento
    this.status = "pendente"
    // Lista de observers registrados
    this.observers = []
  }

  registrar(observer) {
    // Adiciona um observer na lista
    this.observers.push(observer)
  }

  notificar() {
    // Avisa todos os observers que o pedido mudou
    this.observers.forEach(observer => observer.atualizar(this))
  }

  confirmar() {
    // Muda o status e dispara as notificações
    this.status = "confirmado"
    console.log(`[Pedido] Status atualizado para: ${this.status}`)
    this.notificar()
  }
}

// Exporta as classes pra usar no index.js
module.exports = { PedidoObservavel, EmailObserver, EstoqueObserver, LogObserver }