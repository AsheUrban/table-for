import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Feed',
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
