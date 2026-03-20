import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import MutedText from '../global/MutedText';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  note?: string;
  secureToggle?: boolean;
};

export default function Input({ label, error, note, secureToggle, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className='mb-4'>
      {label && (
        <MutedText className='uppercase mb-1.5'>{label}</MutedText>
      )}
      <View className='relative'>
        <TextInput
          {...rest}
          secureTextEntry={secureToggle ? !showPassword : rest.secureTextEntry}
          className={`border border-black bg-neutral-50 px-2.5 py-2.5 font-mono text-[14px]${secureToggle ? ' pr-10' : ''}`}
        />
        {secureToggle && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className='absolute right-2.5 top-0 bottom-0 justify-center'
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color='rgba(0, 0, 0, 0.4)'
            />
          </Pressable>
        )}
      </View>
      {note && (
        <MutedText className='mt-1'>{note}</MutedText>
      )}
      {error && (
        <MutedText className='mt-1'>{error}</MutedText>
      )}
    </View>
  ); 
}