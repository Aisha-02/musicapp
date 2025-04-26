import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

// Screens
import ConnectScreen from '../(tabs)/connect';
import JamroomScreen from '../(tabs)/jamroom';
import HomeScreen from '../(tabs)/home';
import SearchScreen from '../(tabs)/search';
import LibraryScreen from '../(tabs)/library';

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.dark.text,
        tabBarStyle: {
          backgroundColor: Colors.SECONDARY,
          paddingBottom: 14,
          height: 75,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
      }}
    >
      <Tab.Screen
        name="Connect"
        component={ConnectScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Jamroom"
        component={JamroomScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'musical-notes' : 'musical-notes-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'library' : 'library-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabLayout;
