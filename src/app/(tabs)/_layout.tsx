import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';

import { colors } from '../../theme/colors';

type IconProps = ComponentProps<typeof Ionicons>;

function tabIcon(name: IconProps['name']) {
  return function TabIcon({ color, size }: { color: IconProps['color']; size: number }) {
    return <Ionicons name={name} color={color} size={size} />;
  };
}

// Abas do app. Para adicionar uma tela nova: crie o arquivo nesta pasta
// e registre aqui com um <Tabs.Screen>.
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Resumo', tabBarIcon: tabIcon('pie-chart') }} />
      <Tabs.Screen name="gastos" options={{ title: 'Gastos', tabBarIcon: tabIcon('cart') }} />
      <Tabs.Screen name="fixas" options={{ title: 'Fixas', tabBarIcon: tabIcon('repeat') }} />
      <Tabs.Screen name="renda" options={{ title: 'Renda', tabBarIcon: tabIcon('wallet') }} />
    </Tabs>
  );
}
