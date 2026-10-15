import { View } from 'react-native';
import { cssInterop } from 'nativewind';
import { KeyboardAwareScrollView, KeyboardToolbar } from 'react-native-keyboard-controller';

const FormScrollView = cssInterop(KeyboardAwareScrollView, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

type FormProps = {
  children: React.ReactNode;
  contentContainerClassName?: string;
};

export default function Form({ children, contentContainerClassName }: FormProps) {
  return (
    <>
      <FormScrollView
        className='flex-1'
        contentContainerClassName={`flex-grow p-6 ${contentContainerClassName || ''}`}
      >
        <View className='w-full max-w-form self-center'>
          {children}
        </View>
      </FormScrollView>
      <KeyboardToolbar />
    </>
  );
}
