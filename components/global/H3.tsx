import { TextProps } from 'react-native';
import Text from './Text';

export default function H3(props: TextProps) {
  return (
    <Text
      {...props}
      className={`text-lg font-bold ${props.className || ''}`}
    />
  );
}
