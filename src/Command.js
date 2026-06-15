// Padrão Command — encapsula ações como objetos, permitindo desfazer

// Comando de cancelar pedido
class CancelarPedidoComando {
  constructor(pedido) {
    // Guarda o pedido que vai ser cancelado
    this.pedido = pedido
    // Guarda o status anterior pra poder desfazer
    this.statusAnterior = null
  }

  executar() {
    // Salva o status atual antes de cancelar
    this.statusAnterior = this.pedido.status
    // Muda o status para cancelado
    this.pedido.status = "cancelado"
    console.log(`[Command] Pedido cancelado — status anterior: ${this.statusAnterior}`)
  }

  desfazer() {
    // Restaura o status anterior
    this.pedido.status = this.statusAnterior
    console.log(`[Command] Cancelamento desfeito — status restaurado: ${this.pedido.status}`)
  }
}

// Comando bônus — atualiza o endereço do pedido
class AtualizarEnderecoComando {
  constructor(pedido, novoEndereco) {
    // Guarda o pedido e o novo endereço
    this.pedido = pedido
    this.novoEndereco = novoEndereco
    // Guarda o endereço anterior pra poder desfazer
    this.enderecoAnterior = null
  }

  executar() {
    // Salva o endereço atual antes de atualizar
    this.enderecoAnterior = this.pedido.endereco
    // Atualiza o endereço
    this.pedido.endereco = this.novoEndereco
    console.log(`[Command] Endereço atualizado para: ${this.pedido.endereco}`)
  }

  desfazer() {
    // Restaura o endereço anterior
    this.pedido.endereco = this.enderecoAnterior
    console.log(`[Command] Endereço restaurado para: ${this.pedido.endereco}`)
  }
}

// Gerenciador — mantém histórico e permite desfazer a última ação
class GerenciadorComandos {
  constructor() {
    // Histórico de comandos executados
    this.historico = []
  }

  executar(comando) {
    // Executa o comando e salva no histórico
    comando.executar()
    this.historico.push(comando)
  }

  desfazer() {
    // Pega o último comando do histórico
    const comando = this.historico.pop()
    if (comando) {
      comando.desfazer()
    } else {
      console.log("[Command] Nenhuma ação para desfazer")
    }
  }
}

// Exporta as classes pra usar no index.js
module.exports = { CancelarPedidoComando, AtualizarEnderecoComando, GerenciadorComandos }