import { useEffect } from 'react';
import { Stack, Redirect } from 'expo-router';
import { AuthProvider, useAuth } from '../lib/auth-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  CourierPrime_400Regular,
  CourierPrime_400Regular_Italic,
  CourierPrime_700Bold
} from '@expo-google-fonts/courier-prime';
import '../global.css';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

function AuthGate() {
  const { session, loading } = useAuth();

  if (loading) return null;

  return (
    <>
      <Stack>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
      {session ? <Redirect href='/(tabs)' /> : <Redirect href='/(auth)/sign-in' />}
      <StatusBar style='auto' />
    </>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    CourierPrime_400Regular,
    CourierPrime_400Regular_Italic,
    CourierPrime_700Bold,
    Rosaline: require('../assets/fonts/rosalinedemo.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
