import "./index.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Heart, ShoppingCart, User } from "lucide-react-native";
import { AppProvider, useAppContext } from "./src/screens/constants/AppContext.js";
import Homescreen from "./src/screens/Homescreen.jsx";
import WishlistScreen from "./src/screens/WishlistScreen.jsx";
import CartScreen from "./src/screens/CartScreen.jsx";
import ProfileScreen from "./src/screens/ProfileScreen.jsx";

const Tab = createBottomTabNavigator();

// Separate component so it can access context for live badge count
function TabNavigator() {
  const { cartCount, wishlistItems } = useAppContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#1e3a8a",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarIcon: ({ color, focused }) => {
          if (route.name === "Home")
            return <Home size={22} color={color} strokeWidth={focused ? 2.5 : 1.8} />;
          if (route.name === "Wishlist")
            return <Heart size={22} color={color} strokeWidth={focused ? 2.5 : 1.8} />;
          if (route.name === "Cart")
            return <ShoppingCart size={22} color={color} strokeWidth={focused ? 2.5 : 1.8} />;
          if (route.name === "Profile")
            return <User size={22} color={color} strokeWidth={focused ? 2.5 : 1.8} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Homescreen} />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarBadge: wishlistItems.length > 0 ? wishlistItems.length : undefined,
          tabBarBadgeStyle: { backgroundColor: "#ec4899", color: "#fff", fontSize: 10 },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: { backgroundColor: "#1e3a8a", color: "#fff", fontSize: 10 },
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}