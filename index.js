const Redux = require ('redux')

const criarContrato = (nome, taxa) => {

  return {
    type: "CRIAR_CONTRATO",
    dados: {
      nome, taxa
    }
  }
}

const cancelarContrato = (nome) => {
  return {
    type: "CANCELAR_CONTRATO",
    dados: {
    nome
    }
  }
}

 const solicitarCashback = (nome, valor) => {
  //esse JSON que ela devolve é uma ação
    return {
      type: "CASHBACK",
      dados: {
      nome, valor
    }
  }
}

const historicoDePedidosDeCashback = (historicoDePedidosDeCashbackAtual = [], acao) => {
  if (acao.type === "CASHBACK"){
    return [
      ...historicoDePedidosDeCashbackAtual,
      acao.dados
    ]
  }
  return historicoDePedidosDeCashbackAtual
}

const caixa = (dinheiroEmCaixa = 0, acao) => {
  if (acao.type === "CASHBACK"){
    dinheiroEmCaixa -= acao.dados.valor
  }
  else if (acao.type === "CRIAR_CONTRATO"){
    dinheiroEmCaixa += acao.dados.taxa
  }
  return dinheiroEmCaixa
}

const contratos = (listaDeContratosAtual = [], acao) => {
  if (acao.type === "CRIAR_CONTRATO")
    return [...listaDeContratosAtual, acao.dados]
  if (acao.type === "CANCELAR_CONTRATO")
    return listaDeContratosAtual.filter(c => c.nome !== acao.dados.nome)
  return listaDeContratosAtual
}

const { createStore, combineReducers } = Redux

const todosOsReducers = combineReducers({
  historicoDePedidosDeCashback,
  caixa,
  contratos
})

const store = createStore(todosOsReducers)
const acaoContratoJose = criarContrato('José', 50)
store.dispatch(acaoContratoJose)
console.log(store.getState())
const acaoContratoMaria = criarContrato ('Maria', 50)
store.dispatch(acaoContratoMaria)
console.log(store.getState())
const acaoCashbackMaria = solicitarCashback('Maria', 10)
store.dispatch(acaoCashbackMaria)
console.log(store.getState())
const acaoCashbackJose = solicitarCashback('José', 20)
store.dispatch(acaoCashbackJose)
console.log(store.getState())
const acaoCancelaContratoMaria = cancelarContrato ('Maria')
store.dispatch(acaoCancelaContratoMaria)
console.log(store.getState())