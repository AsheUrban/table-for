import { View, ViewProps } from 'react-native';

export default function Card(props: ViewProps) {
  return (
    <View
      {...props}
      className={`border border-black p-6 ${props.className || ''}`}
    />
  );
}