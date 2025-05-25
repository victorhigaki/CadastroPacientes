export interface Paciente {
  id: string;
  nome: string;
  sobrenome: string;
  dataNascimento: Date;
  genero: number;
  cPF: string;
  rG: string;
  uFRG: number;
  email: string;
  celular: string;
  telefoneFixo: string;
  convenio: string;
  numeroCarteirinhaConvenio: number;
  validadeCarteirinha: Date;
}
