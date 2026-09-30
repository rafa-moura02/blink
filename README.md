# Blink — Finanças pessoais

App de iPhone para controlar renda, despesas fixas e gastos do dia a dia,
mostrando quanto ainda dá para gastar com extras no mês.
Sem login: tudo fica salvo no próprio celular.

Feito com **Expo (React Native) + TypeScript**.

## Como rodar no iPhone

1. Instale o app **Expo Go** no iPhone (App Store).
2. No computador, dentro desta pasta:
   ```bash
   npm start
   ```
3. Aponte a câmera do iPhone para o QR code que aparece no terminal.
   O celular e o computador precisam estar na mesma rede Wi‑Fi.

Toda vez que você salvar um arquivo, o app atualiza sozinho no celular.

## Onde fica cada coisa

```
src/
├── app/                      ← TELAS (cada arquivo = uma tela)
│   ├── _layout.tsx           navegação principal
│   └── (tabs)/
│       ├── _layout.tsx       abas da barra inferior (nomes e ícones)
│       ├── index.tsx         aba "Resumo"
│       ├── gastos.tsx        aba "Gastos" (gastos do dia a dia)
│       ├── fixas.tsx         aba "Fixas" (contas mensais)
│       └── renda.tsx         aba "Renda" (quanto você ganha)
│
├── features/finance/         ← REGRAS DO NEGÓCIO
│   ├── types.ts              formato dos dados + nomes das categorias
│   ├── store.ts              onde os dados ficam salvos (adicionar/apagar)
│   └── calculations.ts       contas: limite de extras, sobra, gasto por dia
│
├── components/               ← PEÇAS VISUAIS reutilizáveis
│   ├── Screen.tsx            container de tela (rolagem + teclado)
│   ├── Card.tsx              caixa branca com título
│   ├── EntryForm.tsx         formulário descrição + valor, e os "chips"
│   ├── EntryList.tsx         lista de lançamentos (segurar = apagar)
│   └── ProgressBar.tsx       barra de quanto do limite já foi usado
│
├── theme/colors.ts           ← CORES e espaçamentos do app inteiro
└── utils/
    ├── currency.ts           formatar/ler valores em R$
    └── date.ts               datas e meses
```

### Guia rápido: "quero mudar…"

| Quero mudar…                         | Arquivo                                   |
| ------------------------------------ | ----------------------------------------- |
| Uma cor do app                       | `src/theme/colors.ts`                     |
| As categorias de gasto               | `src/features/finance/types.ts`           |
| Como calcula o que sobra para gastar | `src/features/finance/calculations.ts`    |
| Uma aba (nome/ícone) ou criar outra  | `src/app/(tabs)/_layout.tsx`              |
| O visual de uma tela                 | o arquivo da tela em `src/app/(tabs)/`    |

## Como o cálculo funciona

```
Renda do mês  − Despesas fixas  = Limite para extras
Limite para extras − Gastos do mês = Sobra
Sobra ÷ dias que faltam no mês   = Quanto posso gastar por dia
```

Valores são guardados em **centavos** (R$ 12,50 = `1250`) para não ter erro de arredondamento.

## Comandos úteis

```bash
npm start            # abre o servidor para testar no Expo Go
npm run typecheck    # confere erros de tipo no código
npm run lint         # confere padrões de código
```

## Publicar na App Store (mais tarde)

Não precisa de Mac: o build é feito na nuvem pelo EAS.
Precisa de uma conta Apple Developer (US$ 99/ano).

```bash
npx eas-cli@latest build --platform ios
npx eas-cli@latest submit --platform ios
```
