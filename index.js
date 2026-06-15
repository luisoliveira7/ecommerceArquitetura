// Arquivo principal — testa todos os padrões criacionais, estruturais e comportamentais

const Conexao = require("./src/Conexao")
const { PagamentoFactory } = require("./src/Pagamento")
const { PedidoBuilder } = require("./src/Pedido")
const { GatewayAdapter } = require("./src/Adapter")
const { LogDecorator, DescontoDecorator } = require("./src/Decorator")
const { CheckoutFacade } = require("./src/Facade")
const { Carrinho, FreteCorreios, FreteJadlog, FreteRetirada } = require("./src/Strategy")
const { PedidoObservavel, EmailObserver, EstoqueObserver, LogObserver } = require("./src/Observer")
const { CancelarPedidoComando, AtualizarEnderecoComando, GerenciadorComandos } = require("./src/Command")

// ===============================
console.log("=== SINGLETON ===")
// ===============================
const c1 = Conexao.getInstance()
const c2 = Conexao.getInstance()
console.log("Mesma instância?", c1 === c2)

// ===============================
console.log("\n=== FACTORY METHOD ===")
// ===============================
const pagCartao = PagamentoFactory.criar("cartao")
pagCartao.processar(150.00)

const pagPix = PagamentoFactory.criar("pix")
pagPix.processar(89.90)

const pagBoleto = PagamentoFactory.criar("boleto")
pagBoleto.processar(200.00)

// ===============================
console.log("\n=== BUILDER ===")
// ===============================
const pedido = new PedidoBuilder()
  .adicionarItem("Camiseta")
  .adicionarItem("Calça Jeans")
  .setEndereco("Rua das Flores, 123 - Joinville/SC")
  .setPagamento("PIX")
  .build()

pedido.resumo()

// ===============================
console.log("\n=== ADAPTER ===")
// ===============================
const gateway = new GatewayAdapter()
gateway.processar(350.00)

// ===============================
console.log("\n=== DECORATOR ===")
// ===============================
const pix = PagamentoFactory.criar("pix")

// Log em cima de desconto em cima de PIX
const pagamentoDecorado = new LogDecorator(new DescontoDecorator(pix, 10))
pagamentoDecorado.processar(200.00)

// ===============================
console.log("\n=== FACADE ===")
// ===============================
const facade = new CheckoutFacade()
facade.finalizar(pedido)

// ===============================
console.log("\n=== STRATEGY ===")
// ===============================
const carrinho = new Carrinho()

// Testando com Correios
carrinho.setFrete(new FreteCorreios())
carrinho.calcularFrete(3)

// Trocando pra Jadlog em tempo de execução
carrinho.setFrete(new FreteJadlog())
carrinho.calcularFrete(3)

// Trocando pra Retirada em tempo de execução
carrinho.setFrete(new FreteRetirada())
carrinho.calcularFrete(3)

// ===============================
console.log("\n=== OBSERVER ===")
// ===============================
const pedidoObservavel = new PedidoObservavel(
  ["Tênis", "Meia"],
  "Rua das Flores, 123 - Joinville/SC",
  "Cartão"
)

// Registra os observers
pedidoObservavel.registrar(new EmailObserver())
pedidoObservavel.registrar(new EstoqueObserver())
pedidoObservavel.registrar(new LogObserver())

// Confirma o pedido — dispara todos os observers
pedidoObservavel.confirmar()

// ===============================
console.log("\n=== COMMAND ===")
// ===============================
const pedidoCommand = new PedidoObservavel(
  ["Notebook"],
  "Av. Brasil, 456 - Joinville/SC",
  "PIX"
)
pedidoCommand.status = "confirmado"

const gerenciador = new GerenciadorComandos()

// Executa o cancelamento
gerenciador.executar(new CancelarPedidoComando(pedidoCommand))
console.log("Status atual:", pedidoCommand.status)

// Desfaz o cancelamento
gerenciador.desfazer()
console.log("Status atual:", pedidoCommand.status)

// Executa a atualização de endereço
gerenciador.executar(new AtualizarEnderecoComando(pedidoCommand, "Rua Nova, 789 - Joinville/SC"))
console.log("Endereço atual:", pedidoCommand.endereco)

// Desfaz a atualização de endereço
gerenciador.desfazer()
console.log("Endereço atual:", pedidoCommand.endereco)