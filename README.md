# E-commerce — Padrões de Projeto

**Aluno:** Luis Felipe  
**Curso:** Análise e Desenvolvimento de Sistemas — SENAC Joinville  
**Disciplina:** Arquitetura de Software

---

## Sobre o projeto

Projeto desenvolvido para praticar os padrões de projeto em um sistema de e-commerce fictício.
Foram aplicados padrões Criacionais, Estruturais e Comportamentais ao longo de duas atividades.

---

## Estrutura do projeto

ecommerce-padroes/
│
├── src/
│   ├── Conexao.js      — Singleton
│   ├── Pagamento.js    — Factory Method
│   ├── Pedido.js       — Builder
│   ├── Adapter.js      — Adapter
│   ├── Decorator.js    — Decorator
│   ├── Facade.js       — Facade
│   ├── Strategy.js     — Strategy
│   ├── Observer.js     — Observer
│   └── Command.js      — Command
│
├── index.js
└── README.md

---

## Padrões utilizados

### Singleton — Conexao.js
Garante que só existe uma conexão com o banco de dados durante toda a execução.
Evita desperdício de recursos e conflitos ao abrir múltiplas conexões.

### Factory Method — Pagamento.js
Cria diferentes formas de pagamento (Cartão, PIX e Boleto) sem que o restante
do código precise conhecer as classes concretas. Para adicionar uma nova forma
de pagamento, basta criar uma nova classe e adicionar um caso na factory.

### Builder — Pedido.js
Monta um pedido por partes de forma encadeada. Garante que o pedido só seja
criado quando tiver itens, endereço e forma de pagamento definidos.

### Adapter — Adapter.js
Adapta o gateway de pagamento legado para funcionar com a interface que o
sistema já usa. O restante do sistema continua chamando processar() normalmente
sem saber que existe um legado por baixo.

### Decorator — Decorator.js
Adiciona comportamentos extras no pagamento sem alterar as classes existentes.
O LogDecorator registra a transação e o DescontoDecorator aplica um percentual
de desconto antes de processar. Os dois podem ser combinados.

### Facade — Facade.js
Simplifica o fluxo de finalização de compra. O controller chama apenas
finalizar() e a Facade orquestra internamente o estoque, pagamento, carrinho
e envio de e-mail.

### Strategy — Strategy.js
Permite trocar a estratégia de cálculo de frete em tempo de execução sem
alterar o Carrinho. Foram implementadas três estratégias: Correios, Jadlog
e Retirada em loja.

### Observer — Observer.js
Quando um pedido é confirmado, todos os observers registrados são notificados
automaticamente. Foram implementados EmailObserver, EstoqueObserver e
LogObserver. Novos observers podem ser adicionados sem alterar o Pedido.

### Command — Command.js
Encapsula as ações de cancelar pedido e atualizar endereço como objetos,
permitindo desfazer a última ação. O GerenciadorComandos mantém o histórico
de tudo que foi executado.

---

## Como rodar

Pré-requisito: ter o Node.js instalado.

node index.js

---

## Resultado esperado

=== SINGLETON ===
Conectado ao banco: ecommerce
Mesma instância? true

=== FACTORY METHOD ===
Pagamento de R$150 realizado no cartão de crédito
Pagamento de R$89.9 realizado via PIX
Boleto de R$200 gerado com sucesso

=== BUILDER ===
--- Pedido ---
Itens: [ 'Camiseta', 'Calça Jeans' ]
Endereço: Rua das Flores, 123 - Joinville/SC
Pagamento: PIX
--------------

=== ADAPTER ===
[Gateway Legado] Cobrando 350 em BRL

=== DECORATOR ===
[LOG] Iniciando transação de R$200
[DESCONTO] 10% aplicado — de R$200 para R$180.00
Pagamento de R$180 realizado via PIX

=== FACADE ===
[Checkout] Iniciando finalização do pedido...
[Estoque] Verificando estoque dos itens: Camiseta,Calça Jeans
[Pagamento] Processando pagamento via PIX
[Carrinho] Limpando carrinho do cliente
[Email] Enviando confirmação do pedido para o cliente
[Checkout] Pedido finalizado com sucesso!

=== STRATEGY ===
[Correios] Frete para 3kg: R$15.00
[Jadlog] Frete para 3kg: R$21.00
[Retirada] Sem custo de frete

=== OBSERVER ===
[Pedido] Status atualizado para: confirmado
[Email] Confirmação enviada para o cliente — itens: Tênis,Meia
[Estoque] Baixa realizada nos itens: Tênis,Meia
[Log] Pedido confirmado — status: confirmado

=== COMMAND ===
[Command] Pedido cancelado — status anterior: confirmado
Status atual: cancelado
[Command] Cancelamento desfeito — status restaurado: confirmado
Status atual: confirmado
[Command] Endereço atualizado para: Rua Nova, 789 - Joinville/SC
Endereço atual: Rua Nova, 789 - Joinville/SC
[Command] Endereço restaurado para: Av. Brasil, 456 - Joinville/SC
Endereço atual: Av. Brasil, 456 - Joinville/SC