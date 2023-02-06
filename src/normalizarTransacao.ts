import moedaParaNumero from "./moedaParaNumero.js";

import stringParaData from "./stringParaData.js";

// Types
declare global {
  type TransacaoPagamento = "Cartão de Crédito" | "Boleto";

  type TransacaoStatus =
    | "Paga"
    | "Recusada pela operadora de cartão"
    | "Aguardando pagamento"
    | "Estornada";

  // Interface
  interface TransacaoAPI {
    ID: number;
    Nome: string;
    Email: string;
    Data: string;
    Status: TransacaoStatus;
    ["Valor (R$)"]: string;
    ["Cliente Novo"]: number;
    ["Forma de Pagamento"]: TransacaoPagamento;
  }

  interface Transacao {
    id: number;
    nome: string;
    email: string;
    data: Date;
    status: TransacaoStatus;
    moeda: string;
    valor: number | null;
    pagamento: TransacaoPagamento;
    novo: boolean;
  }
}

export default function normalizarTransacao(
  transacao: TransacaoAPI
): Transacao {
  return {
    id: transacao.ID,
    nome: transacao.Nome,
    email: transacao.Email,
    data: stringParaData(transacao.Data),
    status: transacao.Status,
    moeda: transacao["Valor (R$)"],
    valor: moedaParaNumero(transacao["Valor (R$)"]),
    pagamento: transacao["Forma de Pagamento"],
    novo: Boolean(transacao["Cliente Novo"]),
  };
}
