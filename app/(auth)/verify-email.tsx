import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import H4 from '@/components/global/H4';
import MutedText from '@/components/global/MutedText';
import FormCentered from '@/components/form/FormCentered';
import Card from '@/components/global/Card';
import Button from '@/components/global/Button';
import Divider from '@/components/global/Divider';
import LinkText from '@/components/global/LinkText';

export default function VerifyEmail() {
  const { session } = useAuth();
  const [resendMessage, setResendMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleResend = async () => {
    setResendMessage('');
    setIsSending(true);

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: session?.user.email ?? '',
    });

    if (error) {
      setResendMessage(error.message);
    } else {
      setResendMessage('Verification email sent.');
    }

    setIsSending(false);
  };

  const handleSignIn = async () => {
    await supabase.auth.signOut();
    router.replace('/(auth)/sign-in');
  };

  return (
    <FormCentered>
      <Card>
        <H4 className='text-center mb-6'>VERIFY EMAIL</H4>

        <MutedText className='mb-4'>
          Please check your inbox and follow the link to verify your account.
        </MutedText>
        <Button
          title={isSending ? 'sending...' : 'RESEND EMAIL'}
          variant='black'
          onPress={handleResend}
          disabled={isSending}
        />
        {resendMessage !== '' && (
          <MutedText className='mt-4'>{resendMessage}</MutedText>
        )}
        
        <Divider text='OR' />

        <LinkText
          title='Sign in with a different account.'
          onPress={handleSignIn}
        />
      </Card>
    </FormCentered>
  );
}