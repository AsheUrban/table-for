import { View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView, KeyboardToolbar } from 'react-native-keyboard-controller';

type FormProps = {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
};

export default function Form({ children, contentContainerStyle }: FormProps) {
  return (
    <>
      <KeyboardAwareScrollView
      style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
          ...contentContainerStyle,
        }}
      >
      <View style={{  maxWidth: 320, width: '100%', alignSelf: 'center' }}>
        {children}
      </View>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
}