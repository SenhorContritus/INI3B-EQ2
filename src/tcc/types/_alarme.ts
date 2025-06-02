type _Alarme = {
  id?: number; // opcional, porque só existe depois de inserido no banco
  nome: string;
  dias: boolean[]; // 7 posições, cada uma representa um dia da semana
  somAtivo: string;
  vibracaoAtiva: string;
  adiarAtivo: number;
};

export default _Alarme;