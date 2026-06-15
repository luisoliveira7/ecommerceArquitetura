// Padrão Facade — simplifica o acesso a múltiplos subsistemas

// Subsistemas — cada um cuida de uma parte do processo
class EstoqueService {
  verificar(pedido) {
    // Simula a verificação de estoque dos itens do pedido
    console.log(`[Estoque] Verificando estoque dos itens:`, pedido.itens)
  }
}

class PagamentoService {
  processar(pedido) {
    // Simula o processamento do pagamento do pedido
    console.log(`[Pagamento] Processando pagamento via ${pedido.pagamento}`)
  }
}

class CarrinhoService {
  limpar(pedido) {
    // Simula a limpeza do carrinho após o pedido
    console.log(`[Carrinho] Limpando carrinho do cliente`)
  }
}

class EmailService {
  enviar(pedido) {
    // Simula o envio do e-mail de confirmação
    console.log(`[Email] Enviando confirmação do pedido para o cliente`)
  }
}

// Facade — orquestra todos os subsistemas em um único método
class CheckoutFacade {
  constructor() {
    // Cria uma instância de cada subsistema
    this.estoque = new EstoqueService()
    this.pagamento = new PagamentoService()
    this.carrinho = new CarrinhoService()
    this.email = new EmailService()
  }

  finalizar(pedido) {
    // Chama cada subsistema na ordem correta
    console.log("[Checkout] Iniciando finalização do pedido...")
    this.estoque.verificar(pedido)
    this.pagamento.processar(pedido)
    this.carrinho.limpar(pedido)
    this.email.enviar(pedido)
    console.log("[Checkout] Pedido finalizado com sucesso!")
  }
}

// Exporta a facade pra usar no index.js
module.exports = { CheckoutFacade }