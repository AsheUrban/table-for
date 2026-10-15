import { TextProps } from 'react-native';
import Text from './Text';

export default function Label(props: TextProps) {
  return (
    <Text
      {...props}
      className={`text-xs uppercase opacity-60 ${props.className || ''}`}
    />
  );
}
