import { useState } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { signUpSchema, SignUpFormData } from '@/lib/schemas/auth';
import MutedText from '@/components/global/MutedText';
import H4 from '@/components/global/H4';
import FormCentered from '@/components/form/FormCentered';
import Card from '@/components/global/Card';
import Input from '@/components/form/Input';
import Button from '@/components/global/Button';
import Divider from '@/components/global/Divider';
import LinkText from '@/components/global/LinkText';

export default function SignUp() {
  const [serverError, setServerError] = useState('');

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpFormData) => {
    setServerError('');

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      setServerError(authError.message);
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      setServerError('Something went wrong. Please try again.');
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: userId, username: data.username, email: data.email });

    if (profileError) {
      setServerError(profileError.message);
      return;
    }

    router.replace('/(auth)/verify-email');
  };

  return (
    <FormCentered>
      <Card>
        <H4 className='text-center mb-6'>CREATE ACCOUNT</H4>

        {serverError !== '' && (
          <MutedText className='mb-4'>{serverError}</MutedText>
        )}

        <Controller
          control={control}
          name='username'
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='username'
              autoFocus
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.username?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='email'
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.email?.message}
              note='Email is only collected for verification and account recovery purposes.'
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
          title={isSubmitting ? 'signing up...' : 'SIGN-UP'}
          variant='black'
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />

        <Divider text='OR' />

        <View className='items-center'>
          <LinkText
            title='Already have an account? Sign in.'
            onPress={() => router.push('/(auth)/sign-in')}
          />
        </View>
      </Card>
    </FormCentered>
  );
} 