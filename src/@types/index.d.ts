export namespace Models {
  export type Question = {
    field: string;
    question: string;
    placeholder?: string;
    inputType: InputType;
    type: "string" | "number" | "boolean"
    options?: string[];
    disabled?: boolean;
    readOnly?: boolean;
  };

  export type Interview = {
    "nome-candidato": string;
    "numero-inscricao": string;
    "pontuacao-total": number;
  };

  export type PunctuationQuestion = Question & { maxPontuaction: number }
}