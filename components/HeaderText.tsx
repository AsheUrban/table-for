import { Text as RNText, TextProps } from 'react-native';

export default function HeaderText(props: TextProps) {
  return (
    <RNText
      {...props}
      className={`font-display ${props.className || ''}`}
    />
  );
}