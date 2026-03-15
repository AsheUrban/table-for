import { View, ViewProps } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import Text from './Text';

type DividerProps = ViewProps & {
  text?: string;
};

export default function Divider({ text, ...rest }: DividerProps) {
  const dotLine = (
    <View className='flex-1'>
      <Svg height='1' width='100%'>
        <Line
          x1='0'
          y1='0'
          x2='100%'
          y2='0'
          stroke='black'
          strokeWidth='1'
          strokeDasharray='2 4'
          />
      </Svg>
    </View>
  );

  if (!text) {
    return (
      <View {...rest} className={`my-5 ${rest.className || ''}`}>
        {dotLine}
      </View>
    );
  }

  return (
    <View 
      {...rest} 
      className={`flex-row items-center my-5 ${rest.className || ''}`}
    >
      {dotLine}
      <Text className='text-[11px] opacity-60 mx-3'>
        {text}
      </Text>
      {dotLine}
    </View>
  );
}