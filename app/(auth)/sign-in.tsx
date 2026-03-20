import { useState } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { signInSchema, SignInFormData } from '@/lib/schemas/auth';
import MutedText from '@/components/global/MutedText';
import H4 from '@/components/global/H4';
import FormCentered from '@/components/form/FormCentered';
import Card from '@/components/global/Card';
import Input from '@/components/form/Input';
import Button from '@/components/global/Button';
import Divider from '@/components/global/Divider';
import LinkText from '@/components/global/LinkText';

export default function SignIn() {
  const [serverError, setServerError] = useState('');

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    setServerError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    router.replace('/(tabs)');
  };

  return (
    <FormCentered>
      <Card>
        <H4 className='text-center mb-6'>SIGN IN</H4>

        {serverError !== '' && (
          <MutedText className='mb-4'>{serverError}</MutedText>
        )}

        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='email'
              autoFocus
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='password'
              autoCapitalize='none'
              secureToggle
              autoCorrect={false}
              keyboardType='email-address'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        <Button
          title={isSubmitting ? 'signing in...' : 'SIGN-IN'}
          variant='black'
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />

        <Divider text='OR' />

        <View className='items-center gap-3'>
          <LinkText
            title="Don't have an account? Sign up."
            onPress={() => router.push('/(auth)/sign-up')}
          />
          <LinkText
            title='Forgot password?'
            onPress={() => router.push('/(auth)/forgot-password')}
          />
        </View>
      </Card>
    </FormCentered>
  );
}