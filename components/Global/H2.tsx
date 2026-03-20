import { TextProps } from 'react-native';
import Text from './Text';

export default function H2(props: TextProps) {
  return (
    <Text
      {...props}
      className={`text-xl font-bold ${props.className || ''}`}
    />
  );
}
