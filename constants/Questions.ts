import { Models } from "@/src/@types";

enum InputType {
  Text,
  Radio,
  TextWithRadio
}

type FormQuestions = {
  [k: number]: { category: string, instruction?: string, questions: Models.Question[], punctuation?: Models.PunctuationQuestion[] }
}

export const FormQuestions: FormQuestions = {
  1: {
    category: "Questões sobre o pertencimento",
    instruction: "LER A DECLARAÇÃO DE PERTENCIMENTO, que poderá trazer informações sobre pertencimento.",
    questions: [
      {
        field: "local-nascimento",
        question: "Onde você nasceu?",
        inputType: InputType.Text,
        type: "string"
      },
      {
        field: "local-criação",
        question: "Onde foi criado?",
        inputType: InputType.Text,
        type: "string"
      },
      // {
      //   field: "origem-pais",
      //   question: "De onde são seus pais?",
      //   inputType: InputType.Text,
      //   type: "string"
      // },
      // {
      //   field: "informacoes-comunidade",
      //   question: "Mora (ou morou) em uma comunidade tradicional?",
      //   inputType: InputType.Text,
      //   type: "string"
      // },
      // {
      //   field: "caracterizacao-comunidade",
      //   question: "Informações sobre a comunidade",
      //   inputType: InputType.Text,
      //   type: "string"
      // },
      // {
      //   field: "programa-social",
      //   question: "Participa de algum programa social? Qual?",
      //   inputType: InputType.TextWithRadio,
      //   type: "string",
      //   options: ["Sim", "Não"],
      // },
      // {
      //   field: "disponibilidade-tempo",
      //   question: "Qual a sua disponibilidade de tempo para fazer o curso pretendido?",
      //   inputType: InputType.Text,
      //   type: "string"
      // },
      // {
      //   field: "condicoes-moradia-local-curso",
      //   question: "Caso você seja aprovado no curso, quais as condições de morar no local onde o curso está sendo ofertado?",
      //   inputType: InputType.Text,
      //   type: "string"
      // },
    ],
    punctuation: [
      {
        field: "pontuacao-pertencimento",
        question: "a) Vínculo e a experiência do candidato com a comunidade tradicional.",
        placeholder: "Pontuação: 0,0 a 3,0 pts.",
        inputType: InputType.Text,
        type: "number",
        maxPontuaction: 3
      },
      {
        field: "pontuacao-vulnerabilidade-socioeconomica",
        question: "b) Condição de vulnerabilidade socioeconômica do candidato e da família.",
        placeholder: "Pontuação: 0,0 a 2,0 pts.",
        inputType: InputType.Text,
        type: "number",
        maxPontuaction: 2
      }
    ]
  },
  2: {
    category: "Trajetória Escolar do Candidato",
    questions: [
      {
        field: "local-ensino-medio",
        question: "Onde e como fez o Ensino Médio?",
        inputType: InputType.Text,
        type: "string",
      },
      {
        field: "dificuldades-enfrentadas",
        question: "Quais as dificuldades enfrentadas?",
        inputType: InputType.Text,
        type: "string",
      },
      // {
      //   field: "apoio-dificuldades",
      //   question: "Teve apoio para superá-las?",
      //   inputType: InputType.Radio,
      //   type: "string",
      //   options: ["Sim", "Não"],
      // },
      // {
      //   field: "sofreu-descriminacao",
      //   question: "Como procedeu sobre a discriminação?",
      //   inputType: InputType.TextWithRadio,
      //   type: "string",
      //   options: ["Sim", "Não"],
      // },
      // {
      //   field: "afinidade-disciplinas",
      //   question: "Quais disciplinas você tem/teve maior afinidade durante sua vida escolar.",
      //   inputType: InputType.Text,
      //   type: "string",
      // },
    ],
    punctuation: [
      {
        field: "pontuacao-dificuldades",
        question: "a) Dificuldades enfrentadas no percurso escolar. Analisar considerando o Histórico Escolar do Ensino Médio.",
        placeholder: "Pontuação: 0,0 a 1,0 pts.",
        inputType: InputType.Text,
        type: "number",
        maxPontuaction: 1
      },
      {
        field: "pontuacao-descriminação",
        question: "b) Dificuldades e presença de discriminações que agravem sua situação de vulnerabilidade.",
        placeholder: "Pontuação: 0,0 a 1,0 pts.",
        inputType: InputType.Text,
        type: "number",
        maxPontuaction: 1
      }
    ]
  },
  // 3: {
  //   category: "Experiência de Trabalho e de Participação em Atividades Junto à Comunidade Tradicional.",
  //   questions: [
  //     {
  //       field: "experiencia-trabalho",
  //       question: "Você tem alguma experiência de trabalho na família, em empresa ou instituição ligada à sua comunidade?",
  //       inputType: InputType.Radio,
  //       type: "string",
  //       options: ["Sim", "Não"]
  //     },
  //     {
  //       field: "acao-comunitaria",
  //       question: "Você participa e/ou participou em sua comunidade de algum tipo de ação comunitária junto a igreja, associações, clubes de mães, sindicatos etc.?",
  //       inputType: InputType.Radio,
  //       type: "string",
  //       options: ["Sim", "Não"]
  //     },
  //     {
  //       field: "participacao-familia",
  //       question: "Qual organização?",
  //       type: "string",
  //       inputType: InputType.TextWithRadio,
  //       options: ["Sim", "Não"],
  //     },
  //   ],
  //   punctuation: [
  //     {
  //       field: "pontuacao-experiencia-trabalho",
  //       question: "a) Possui experiência de trabalho em instituição ligada a povos ou comunidades tradicionais.",
  //       placeholder: "Pontuação: 0,0 a 1,0 pts.",
  //       inputType: InputType.Text,
  //       type: "number",
  //       maxPontuaction: 1
  //     },
  //     {
  //       field: "pontuacao-membro-comunidade",
  //       question: "b) Ter sido ou ser membro de organizações ligadas a povos ou comunidades tradicionais.",
  //       placeholder: "Pontuação: 0,0 a 1,0 pts.",
  //       inputType: InputType.Text,
  //       type: "number",
  //       maxPontuaction: 1
  //     }
  //   ]
  // },
  // 4: {
  //   category: "Motivações e Expectativas Quanto à Universidade e ao Curso Universitário.",
  //   questions: [
  //     {
  //       field: "reazoes-curso",
  //       question: "Indique as razões pelas quais você se interessou por fazer o curso?",
  //       inputType: InputType.Text,
  //       type: "string",
  //     },
  //     {
  //       field: "primeira-opcao-curso",
  //       question: "O curso escolhido foi sua primeira opção?",
  //       inputType: InputType.Radio,
  //       type: "string",
  //       options: ["Sim", "Não"]
  //     },
  //     {
  //       field: "conhecimento-profissao-escolhida",
  //       question: "O que você sabe sobre a profissão escolhida em termos de área de atuação, mercado de trabalho?",
  //       inputType: InputType.Text,
  //       type: "string",
  //     },
  //     {
  //       field: "expectativas-ingresso",
  //       question: "Quais as suas expectativas em relação ao seu ingresso na UFPA?",
  //       inputType: InputType.Text,
  //       type: "string",
  //     },
  //     {
  //       field: "beneficio-oferecido-comunidade",
  //       question: "Qual benefício / retorno poderá ser oferecido ao seu povo ou à comunidade tradicional a que você pertence?",
  //       inputType: InputType.Text,
  //       type: "string",
  //     },
  //     {
  //       field: "expectativa-futuro-profissional",
  //       question: "Quais as suas expectativas como futuro profissional após sua formação?",
  //       inputType: InputType.Text,
  //       type: "string",
  //     },
  //   ],
  //   punctuation: [
  //     {
  //       field: "pontuacao-entendimento-profissional",
  //       question: "a) Entendimento da relação entre sua escolha profissional e a as suas motivações, interesses pessoais e coletivos para indicação ao curso.",
  //       placeholder: "Pontuação: 0,0 a 0,5 pts.",
  //       inputType: InputType.Text,
  //       type: "number",
  //       maxPontuaction: 0.5
  //     },
  //     {
  //       field: "pontuacao-membro-comunidade",
  //       question: "b) Entendimento quanto aos benefícios/retorno a serem oportunizados aos povos e às comunidades tradicionais.",
  //       placeholder: "Pontuação: 0,0 a 0,5 pts.",
  //       inputType: InputType.Text,
  //       type: "number",
  //       maxPontuaction: 0.5
  //     }
  //   ]
  // }
}