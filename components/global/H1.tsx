import { Text as RNText, TextProps } from 'react-native';

export default function H1(props: TextProps) {
  return (
    <RNText
      {...props}
      className={`font-display ${props.className || ''}`}
    />
  );
}