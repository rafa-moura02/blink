import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

import { colors } from '../theme/colors';

// HTML base da versão web (PWA). Só é usado no navegador, não no app nativo.
// Precisa bater com "experiments.baseUrl" do app.json.
const BASE = '/blink';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* viewport-fit=cover respeita o notch; maximum-scale evita zoom ao tocar nos campos */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <title>Blink</title>
        <meta name="description" content="Controle de renda, despesas fixas e gastos do mês." />
        <meta name="theme-color" content={colors.background} />

        {/* Faz abrir em tela cheia quando adicionado à Tela de Início do iPhone */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Blink" />
        <link rel="apple-touch-icon" href={`${BASE}/apple-touch-icon.png`} />
        <link rel="manifest" href={`${BASE}/manifest.json`} />

        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const pageStyles = `
body {
  background-color: ${colors.background};
  overscroll-behavior: none;
  -webkit-tap-highlight-color: transparent;
}`;
