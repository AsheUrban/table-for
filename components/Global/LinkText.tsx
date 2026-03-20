import { Pressable, PressableProps } from 'react-native';
import Text from './Text';

type LinkTextProps = PressableProps & {
  title: string;
};

export default function LinkText({ title, ...rest }: LinkTextProps) {
  return (
    <Pressable {...rest} className='group/link'>
      <Text className='text-xs underline text-black group-active/link:opacity-60'>
        {title}
      </Text>
    </Pressable>
  );
}