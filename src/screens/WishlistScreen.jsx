import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Trash2, ShoppingCart, ArrowLeft, Share2 } from 'lucide-react-native';
import { useAppContext } from './constants/AppContext.js';

export default function WishlistScreen({ navigation }) {
  const { wishlistItems, removeFromWishlist, addToCart, isInCart } = useAppContext();

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-xl overflow-hidden mb-3" style={{ width: '48.5%' }}>
      {/* Image */}
      <View className="h-44 bg-slate-100 relative">
        <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
        {item.badge && (
          <View className="absolute top-2 left-2 bg-red-600 px-2 py-0.5 rounded">
            <Text className="text-white text-xs font-bold tracking-widest">{item.badge}</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => removeFromWishlist(item.id)}
          className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 items-center justify-center"
          style={{ elevation: 3 }}
        >
          <Trash2 size={15} color="#E53935" />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View className="p-2.5">
        <Text className="text-xs text-slate-400 font-semibold tracking-widest mb-0.5">
          {item.category}
        </Text>
        <Text className="text-sm font-bold text-slate-800 leading-5 mb-2" numberOfLines={2}>
          {item.name}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-bold text-blue-900">
            ₹{typeof item.price === 'number' ? item.price.toLocaleString() : item.price}
          </Text>
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            className={`rounded-full w-9 h-9 items-center justify-center ${
              isInCart(item.id) ? 'bg-blue-900' : 'bg-blue-100'
            }`}
          >
            <ShoppingCart size={16} color={isInCart(item.id) ? '#fff' : '#1e3a8a'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="bg-blue-900 flex-row items-center justify-between px-4 py-3.5">
        <TouchableOpacity onPress={() => navigation?.goBack()} className="p-1">
          <ArrowLeft size={22} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">My Wishlist</Text>
        <TouchableOpacity className="p-1">
          <Share2 size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {wishlistItems.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Heart size={64} color="#CBD5E1" strokeWidth={1.5} />
          <Text className="text-xl font-bold text-slate-800 mt-5 mb-2">
            Your wishlist is empty
          </Text>
          <Text className="text-sm text-slate-400 text-center leading-5 mb-7">
            Tap the ❤️ on any product to save it here
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className="bg-blue-900 px-8 py-3.5 rounded-full"
          >
            <Text className="text-white font-bold text-base">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View className="flex-row justify-between items-center px-4 py-3 bg-white mb-2">
            <Text className="text-sm text-slate-500 font-medium">
              {wishlistItems.length} saved items
            </Text>
            <TouchableOpacity onPress={() => wishlistItems.forEach((i) => addToCart(i))}>
              <Text className="text-sm text-blue-900 font-semibold">Move all to cart</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={wishlistItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}