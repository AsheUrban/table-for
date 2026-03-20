import { View, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className='flex-row justify-center items-center pb-6 pt-3 border-t border-black bg-white'>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? '#000000' : 'rgba(0, 0, 0, 0.5)';
        const size = 24;

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            className='items-center justify-center px-6'
          >
            {options.tabBarIcon?.({ focused: isFocused, color, size })}
          </Pressable>
        );
      })}
    </View>
  );
}