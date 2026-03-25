import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ShoppingCart } from "lucide-react-native";
export default function Header({ searchText, onSearchChange, cartCount }) {
  return (
    <View className="bg-blue-900 px-4 pt-1 pb-8 rounded-b-3xl">
      {/* Top Row */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-white text-2xl font-bold">
          StyleCart
        </Text>

        {/* Cart Button */}
        <TouchableOpacity
          className="bg-white rounded-2xl w-14 h-14 items-center justify-center"
          activeOpacity={0.8}>
          <ShoppingCart color="black" size={24} />
          {cartCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="bg-white rounded-xl px-4 py-1 mt-4">
        <TextInput
          className="text-black text-base"
          placeholder="Search products..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={onSearchChange}
        />
      </View>
    </View>
  );
}
