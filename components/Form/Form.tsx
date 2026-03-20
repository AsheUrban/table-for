import { ViewStyle } from 'react-native';
import { KeyboardAwareScrollView, KeyboardToolbar } from 'react-native-keyboard-controller';

type FormProps = {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
};

export default function Form({ children, contentContainerStyle }: FormProps) {
  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
          ...contentContainerStyle,
        }}
      >
        {children}
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
}