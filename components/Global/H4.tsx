import { TextProps } from 'react-native';
import Text from './Text';

export default function H4(props: TextProps) {
  return (
    <Text
      {...props}
      className={`text-sm font-bold ${props.className || ''}`}
    />
  );
}
