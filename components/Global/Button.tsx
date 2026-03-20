import { Pressable, PressableProps } from 'react-native';
import Text from './Text';

type ButtonProps = PressableProps & {
  title: string;
  variant: 'black' | 'white';
};

export default function Button({ title, variant, ...rest }: ButtonProps) {
  return (
    <Pressable
      {...rest}
      className={
        variant === 'black'
          ? 'group/button border border-black py-3 items-center bg-black active:bg-white'
          : 'group/button border border-black py-3 items-center bg-white active:bg-black'
      }
    >
      <Text className={
        variant === 'black'
          ? 'text-xs font-bold text-white group-active/button:text-black'
          : 'text-xs font-bold text-black group-active/button:text-white'
      }>
        {title}
      </Text>
    </Pressable>
  );
}