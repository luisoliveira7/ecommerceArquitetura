// Arquivo principal — junta e testa todos os padrões

const { PagamentoFactory } = require("./src/Pagamento")
const { PedidoBuilder } = require("./src/Pedido")
const Conexao = require("./src/Conexao")

console.log("=== SINGLETON ===")
const c1 = Conexao.getInstance()
const c2 = Conexao.getInstance()
console.log("Mesma instância?", c1 === c2)

console.log("\n=== FACTORY METHOD ===")
const pagCartao = PagamentoFactory.criar("cartao")
pagCartao.processar(150.00)

const pagPix = PagamentoFactory.criar("pix")
pagPix.processar(89.90)

const pagBoleto = PagamentoFactory.criar("boleto")
pagBoleto.processar(200.00)

console.log("\n=== BUILDER ===")
const pedido = new PedidoBuilder()
  .adicionarItem("Camiseta")
  .adicionarItem("Calça Jeans")
  .setEndereco("Rua das Flores, 123 - Joinville/SC")
  .setPagamento("PIX")
  .build()

pedido.resumo()