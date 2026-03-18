import { useState } from 'react';
import { Ionicons  } from '@expo/vector-icons';
import { TextInput, TextInputProps, View, Pressable } from 'react-native';
import Text from './Text';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
  secureToggle?: boolean;
};

export default function Input({ label, error, secureToggle, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className='mb-4'>
      <Text className='text-[11px] uppercase opacity-60 mb-1.5'>
        {label}
      </Text>
      <View className='relative'>
        <TextInput
          {...rest}
          secureTextEntry={secureToggle ? !showPassword : rest.secureTextEntry}
          className={`border border-black bg-neutral-50 px-2.5 py-2.5 font-mono text-[13px]${secureToggle ? ' pr-10' : ''}`}
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
      {error && (
        <Text className='text-[11px] opacity-60 mt-1'>
          {error}
        </Text>
      )}
    </View>
  ); 
}