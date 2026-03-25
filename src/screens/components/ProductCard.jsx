import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { HeartPlus, CirclePlus } from "lucide-react-native";

const { width } = Dimensions.get("window");
const CARD_W = (width - 48) / 2;

export default function ProductCard({ item }) {
  const [imgError, setImgError] = useState(false);
  const [wishlist, setWishlist] = useState(false);

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
      <View
        style={{ height: CARD_W * 1.15 }}
        className="w-full bg-gray-100 relative"
      >
        {!imgError ? (
          <Image
            source={{ uri: item.image }}
            className="w-full h-full"
            resizeMode="cover"
            onError={() => {
              // Defer state update to next tick to avoid "update before mount" warnings
              setTimeout(() => setImgError(true), 0);
            }}
          />
        ) : (
          <View className="w-full h-full items-center justify-center bg-gray-200">
            <Text className="text-3xl">👗</Text>
          </View>
        )}

        {/* Wishlist */}
        <TouchableOpacity
          onPress={() => setWishlist(!wishlist)}
          className="absolute top-2 right-2 bg-blue-100 rounded-full w-8 h-8 items-center justify-center"
        >
          <HeartPlus
            color={wishlist ? "red" : "#060606ff"}
            fill={wishlist ? "red" : "none"}
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

          <Text
            className="text-[13px] h-12 font-bold text-gray-900 leading-5"
          >
            {item.name}
          </Text>
        </View>

        {/* Bottom */}
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-base font-extrabold text-blue-500">
            {formatPrice(item.price)}
          </Text>

          <TouchableOpacity className="w-7 h-7  items-center justify-center">
            <CirclePlus color="black" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}