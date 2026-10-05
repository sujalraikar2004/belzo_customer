import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.surface },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="restaurant/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ presentation: 'card' }} />
        <Stack.Screen name="order/success" options={{ gestureEnabled: false }} />
        <Stack.Screen name="order/track" options={{ headerShown: false }} />
        <Stack.Screen name="chat/driver" options={{ headerShown: false }} />
        <Stack.Screen name="rating/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="favorites" options={{ headerShown: false }} />
        <Stack.Screen name="coupons" options={{ presentation: 'modal' }} />
        <Stack.Screen name="onboarding/location" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
