import TabBar from '@/components/TabBar';
import { Tabs } from 'expo-router';
import GroupIcon from '../../assets/images/group.svg';
import ProfileIcon from '../../assets/images/profile.svg';
import ExploreIcon from '../../assets/images/explore.svg';
import FeedIcon from '../../assets/images/feed.svg';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}

      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <FeedIcon
              width={size + 4}
              height={size + 4}
              fill={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='groups'
        options={{
          title: 'Groups',
          tabBarIcon: ({ color, size }) => (
            <GroupIcon
              width={size + 4}
              height={size + 4}
              fill={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <ExploreIcon
              width={size + 12}
              height={size + 8}
              fill={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon
              width={size}
              height={size}
              fill={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
