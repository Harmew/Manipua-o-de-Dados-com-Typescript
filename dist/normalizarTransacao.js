import moedaParaNumero from "./moedaParaNumero.js";
import stringParaData from "./stringParaData.js";
export default function normalizarTransacao(transacao) {
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
//# sourceMappingURL=normalizarTransacao.js.map