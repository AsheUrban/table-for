import { TextInput, TextInputProps, View } from 'react-native';
import Text from './Text';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function Input({ label, error, ...rest }: InputProps) {
  return (
    <View className='mb-4'>
      <Text className='text-[11px] uppercase opacity-60 mb-1.5'>
        {label}
      </Text>
      <TextInput
        {...rest}
        className='border border-black bg-neutral-50 px-2.5 py-2.5 font-mono text-[13px]'
      />
      {error && (
        <Text className='text-[11px] opacity-60 mt-1'>
          {error}
        </Text>
      )}
    </View>
  ); 
}