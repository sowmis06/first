import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { HeartPlus } from "lucide-react-native";
import { useAppContext } from "../constants/AppContext";
import { useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProductCard({ item }) {
  const [imgError, setImgError] = React.useState(false);
  const { addToCart, isInCart, toggleWishlist, isWishlisted } = useAppContext();
  const { width } = useWindowDimensions();
  const CARD_W = (width - 48) / 2;

  const inCart     = isInCart(item.id);
  const wishlisted = isWishlisted(item.id);

  const formatPrice = (price) => {
    if (typeof price === "number") return `₹${price}`;
    return String(price);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      style={{ width: CARD_W }}
      className="bg-white rounded-2xl mb-3 shadow"
    >
      {/* Image */}
      <View style={{ height: CARD_W * 1.15 }} className="w-full bg-gray-100 relative">
        {!imgError ? (
          <Image
            source={{ uri: item.image }}
            className="w-full h-full"
            resizeMode="cover"
            onError={() => setTimeout(() => setImgError(true), 0)}
          />
        ) : (
          <View className="w-full h-full items-center justify-center bg-gray-200">
            <Text className="text-3xl">👗</Text>
          </View>
        )}

        {/* Wishlist Button */}
        <TouchableOpacity
          onPress={() => toggleWishlist(item)}
          className="absolute top-2 right-2 bg-blue-100 rounded-full w-8 h-8 items-center justify-center"
        >
          <HeartPlus
            color={wishlisted ? "red" : "#060606ff"}
            fill={wishlisted ? "red" : "none"}
            size={20}
          />
        </TouchableOpacity>

        {/* Badge */}
        {Number(item.id) <= 3 && (
          <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-md">
            <Text className="text-white text-[9px] font-extrabold">
              {item.id === "1" ? "HOT" : item.id === "2" ? "NEW" : "SALE"}
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View className="p-2.5 flex-1 justify-between">
        <View>
          <Text className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-1">
            {item.category}
          </Text>
          <Text className="text-[13px] h-12 font-bold text-gray-900 leading-5">
            {item.name}
          </Text>
        </View>

        {/* Bottom */}
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-base font-extrabold text-blue-500">
            {formatPrice(item.price)}
          </Text>

          {/* Add to Cart Button */}
          <TouchableOpacity
  onPress={() => addToCart(item)}
  className={`flex-row items-center gap-1 px-3 py-1.5 rounded-lg ${
    inCart ? "bg-green-600" : "bg-blue-900"
  }`}
>
  <Ionicons
    name={inCart ? "checkmark-circle" : "cart-outline"}
    size={14}
    color="white"
  />
  <Text className="text-white text-[11px] font-bold">
    {inCart ? "Added" : "Add"}
  </Text>
</TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}