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
import { KeyboardProvider } from 'react-native-keyboard-controller';

SplashScreen.preventAutoHideAsync();

function AuthGate() {
  const { session, profile, loading } = useAuth();

  if (loading) return null;

  const getRedirect = () => {
    if (!session) {
      return '/(auth)/sign-in';
    }

    if (!session.user.email_confirmed_at) {
      return '/(auth)/verify-email';
    }

    if (!profile?.has_onboarded) {
      return '/(auth)/onboarding';
    }

    return ('/(tabs)');
  }

  return (
    <>
      <Stack>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
      <Redirect href={getRedirect()} />
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
      <KeyboardProvider>
        <AuthGate />
      </KeyboardProvider>
    </AuthProvider>
  );
}
