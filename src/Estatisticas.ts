import countBy, { CountList } from "./countBy.js";

type TransacaoValor = Transacao & { valor: number };

function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

// Interface
interface Semana {
  Domingo: number;
  Segunda: number;
  Terça: number;
  Quarta: number;
  Quinta: number;
  Sexta: number;
  Sábado: number;
}

export default class Estatisticas {
  private transacoes: Transacao[];
  public total: number;
  public pagamento: CountList;
  public status: CountList;
  public semana: Semana;
  public melhorDia: [string, number];

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
    this.semana = this.setSemana();
    this.melhorDia = this.setMelhorDia();
  }

  private setTotal(): number {
    const filtrado = this.transacoes
      .filter(filtrarValor)
      .reduce((acc, item) => {
        return acc + item.valor;
      }, 0);

    return filtrado;
  }

  private setPagamento(): CountList {
    return countBy(this.transacoes.map(({ pagamento }) => pagamento));
  }

  private setStatus(): CountList {
    return countBy(this.transacoes.map(({ status }) => status));
  }

  private setSemana(): Semana {
    const semana = {
      ["Domingo"]: 0,
      ["Segunda"]: 0,
      ["Terça"]: 0,
      ["Quarta"]: 0,
      ["Quinta"]: 0,
      ["Sexta"]: 0,
      ["Sábado"]: 0,
    };
    for (let i = 0; i < this.transacoes.length; i++) {
      const day = this.transacoes[i].data.getDay();
      if (day === 0) semana["Domingo"]++;
      if (day === 1) semana["Segunda"]++;
      if (day === 2) semana["Terça"]++;
      if (day === 3) semana["Quarta"]++;
      if (day === 4) semana["Quinta"]++;
      if (day === 5) semana["Sexta"]++;
      if (day === 6) semana["Sábado"]++;
    }

    return semana;
  }

  private setMelhorDia(): [string, number] {
    return Object.entries(this.semana).sort((a, b) => b[1] - a[1])[0];
  }
}
