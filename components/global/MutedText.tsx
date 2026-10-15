import { TextProps } from 'react-native';
import Text from './Text';

export default function MutedText(props: TextProps) {
  return (
    <Text
      {...props}
      className={`text-[12px] opacity-60 ${props.className || ''}`}
    />
  );
}