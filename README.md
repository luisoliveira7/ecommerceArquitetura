# E-commerce — Padrões Criacionais

**Alunos:** Luis Felipe  
**Curso:** Análise e Desenvolvimento de Sistemas — SENAC Joinville  
**Disciplina:** Arquitetura de Software

---

## Sobre o projeto

Projeto desenvolvido para praticar os padrões criacionais de design em um sistema de e-commerce fictício. Foram aplicados três padrões: Singleton, Factory Method e Builder.

---

## Padrões utilizados

### Singleton — Conexao.js
Garante que só existe uma conexão com o banco de dados durante toda a execução. Evita desperdício de recursos e conflitos ao abrir múltiplas conexões.

### Factory Method — Pagamento.js
Cria diferentes formas de pagamento (Cartão de Crédito, PIX e Boleto) sem que o restante do código precise conhecer as classes concretas. Para adicionar uma nova forma de pagamento, basta criar uma nova classe e adicionar um caso na factory.

### Builder — Pedido.js
Monta um pedido por partes de forma encadeada. Garante que o pedido só seja criado quando tiver itens, endereço e forma de pagamento definidos.

---

## Como rodar

Pré-requisito: ter o Node.js instalado.

```bash
node index.js
```

---

## Resultado esperado

```
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
```