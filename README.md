# E-commerce — Padrões de Projeto

**Aluno:** Luis Felipe e Lorenzo Bruno Bueno  
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

Pergunta: Por que faz sentido usar o Singleton aqui? Quais problemas ele resolve nesse contexto?

Resposta: Abrir uma nova conexão com o banco de dados em toda chamada do construtor gera um maior custo de tempo e recursos, além de que, utilizar uma única instância torna a o uso da conexão na aplicação consistente e evita o esgotamento de conexões com o banco de dados. O Singleton resolve esses problemas mantendo a conexão centralizada e única.

### Factory Method — Pagamento.js
Cria diferentes formas de pagamento (Cartão, PIX e Boleto) sem que o restante
do código precise conhecer as classes concretas. Para adicionar uma nova forma
de pagamento, basta criar uma nova classe e adicionar um caso na factory.

Pergunta: O que acontece quando precisamos adicionar uma nova forma de pagamento (ex: criptomoedas)? A sua solução facilita isso?

Resposta: Precisamos apenas adicionar uma nova subclasse com sua própria lógica e adiciona-lá aos possíveis tipos do método Factory. A solução facilita adição de novas formas de pagamento, centralizando a construção dos múltiplos tipos de pagamento. O Factory Method também gera desacoplamento e segue o princípio Open/Closed.

### Builder — Pedido.js
Monta um pedido por partes de forma encadeada. Garante que o pedido só seja
criado quando tiver itens, endereço e forma de pagamento definidos.

Pergunta: Por que Builder é mais adequado aqui do que um construtor com muitos parâmetros?

Resposta: O Builder melhora a legibilidade do código, através da nomenclatura descritiva dos métodos (exemplo: .setNome()) e evita objetos com muitos parâmetros. Além disso, com Builder permite que sejam adicionados apenas os parâmetros necessários, em um construtor os parâmetros são definidos na classe e mesmo quando nulos precisam ser inseridos, gerando objetos "sujos".

### Adapter — Adapter.js
Adapta o gateway de pagamento legado para funcionar com a interface que o
sistema já usa. O restante do sistema continua chamando processar() normalmente
sem saber que existe um legado por baixo.

Pergunta: Sem o Adapter, o que você teria que fazer para integrar o gateway legado? Como o Adapter preserva o pincípio Open/Closed?

Resposta: Sem o Adapter, seria necessário alterar o gateway legado diretamente, moldando-o para o formato atualmente necessário, gerando riscos de quebra e retrabalho. O Adapter preserva o princípio "Open/Closed" ao permitir que o gateway legado seja utilizado isoladamente, criando uma instância da classe origial e aplicando as modificações/validações necessárias, mas sem alterar a entidade base. Caso o gateway precisse ser utilizado em outro contexto, com um formato diferente, poderiamos criar outro Adapter para suprir a demanda, utlizando o mesmo gateway e mantendo sua estrutura

### Decorator — Decorator.js
Adiciona comportamentos extras no pagamento sem alterar as classes existentes.
O LogDecorator registra a transação e o DescontoDecorator aplica um percentual
de desconto antes de processar. Os dois podem ser combinados.

Pergunta: Como você adicionaria novos comportamentos (ex: envair SMS) sem tocar nas classes existentes? Compare essa abordagem com herança simples.

Resposta: Criaria uma nova classe decorator dentro do arquivo Decorator.js e depois chamaria os decorators desejados em cascata. ex:
    new enviarSMSDecorator(new newLogDecorator(new DescontoDecorator(pix, 10)))
Em herança simples, precisariamos criar uma nova subclasse para cada variação de resposta, se uma resposta necessita-se apenas de logs e desconto, precisaira criar uma outra subclasse logsdesconto para instânciar um objeto com esses comportamentos em específico. Quanto maior o número de variações de comportamentos, maior o número de classes que precisariam ser criadas para suprir a demanda. Além disso, o Decorator está alinhado com o princípio Open/Closed.

### Facade — Facade.js
Simplifica o fluxo de finalização de compra. O controller chama apenas
finalizar() e a Facade orquestra internamente o estoque, pagamento, carrinho
e envio de e-mail.

Pergunta: O que aconteceria com o controller se a Facade não existisse e um subsistema mudasse sua API? Como a Facade protege o código cliente de mudanças internas?

Resposta: Seria necessário alterar todas as importações e estruturas de requisição pelo código, com o Facade essa mudança aconteceria apenas dentro da classe Facade e seus métodos, a chamada do Facade continuaria igual por todo código. Quando o Facade é chamado, não se tem informação algum do que acontece dentro dele, disparando apenas um processo interno no Facade. 

### Strategy — Strategy.js
Permite trocar a estratégia de cálculo de frete em tempo de execução sem
alterar o Carrinho. Foram implementadas três estratégias: Correios, Jadlog
e Retirada em loja.

Pergunta: Como você adicionaria uma nova transportadora (ex: DHL) sem modificar a classe Carrinho? Que princípio SOLID o Strategy ajuda a respeitar?

Resposta: Criaria uma classe FreteDHL com a sua própria lógica, mas seguindo a interface implícita entre os fretes (método calcular), que seria apenas passada como parâmetro para o método setFrete da classe carrinho, criando assim uma nova estratégia de cobrança de frete, mas sem alterar a classe original carrinho. O strategy respeita o princípio Open/Closed, quando passa instâncias de outras classes para gerar resultados diferentes, sem alterar a classe original "Carrinho" 

### Observer — Observer.js
Quando um pedido é confirmado, todos os observers registrados são notificados
automaticamente. Foram implementados EmailObserver, EstoqueObserver e
LogObserver. Novos observers podem ser adicionados sem alterar o Pedido.

Pergunta: O que muda no código quando você precisa adicionar um novo Observer (ex: SMS)? Compare com uma implementação sem o padrão, onde Pedido chamaria cada serviço diretamente.

Resposta: Crio uma nova classe Observer implementando o método atualizar(pedido), depois adiciono ele na lista de observers do pedidoObservavel com o método registrar(observer). Sem o padrão, precisariamos criar um método dentro da classe Pedido que chamaria todos os serviços dentro, gerando acoplamento, caso queira chamar apenas alguns serviços, precisaria criar alguma estrutura de decisão dentro do método ou vários métodos, um para cada variação. Por outro lado, a implementação com Observer permite com que eu crie os observers isoladamente e adicione apenas os observers necessários, mantendo o mesmo pedidoObservavel, respeitando o princípio Open/Closed.

### Command — Command.js
Encapsula as ações de cancelar pedido e atualizar endereço como objetos,
permitindo desfazer a última ação. O GerenciadorComandos mantém o histórico
de tudo que foi executado.

Pergunta: Que vantagens o Command traz além do undo? Como você usaria esse padrão para implementar uma fila de tarefas assíncronas?

Resposta: Além do undo, o Command traz desacoplmaneto, armazenamento e agendamento das ações feitas. Os comandos assíncronos seriam enfileirados e processados em ordem na execução do "await gerenciador.executar()" 

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