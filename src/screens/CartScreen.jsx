import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Minus, Plus, Trash2, Tag, ChevronRight, ShoppingBag } from 'lucide-react-native';
import { useAppContext } from './constants/AppContext.js';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, updateQty } = useAppContext();
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const savings = cartItems.reduce(
    (sum, i) => (i.originalPrice ? sum + (i.originalPrice - i.price) * i.qty : sum),
    0
  );
  const couponDiscount = couponApplied ? Math.floor(subtotal * 0.1) : 0;
  const delivery = subtotal > 999 ? 0 : subtotal === 0 ? 0 : 99;
  const total = subtotal - couponDiscount + delivery;
  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="bg-blue-900 flex-row items-center px-4 py-3.5 gap-3">
        <TouchableOpacity onPress={() => navigation?.goBack()} className="p-1">
          <ArrowLeft size={22} color="#fff" />
        </TouchableOpacity>
        <Text className="flex-1 text-white text-lg font-bold">My Cart</Text>
        <View className="bg-white rounded-xl px-2 py-0.5 min-w-7 items-center justify-center">
          <Text className="text-blue-900 font-bold text-sm">{totalQty}</Text>
        </View>
      </View>

      {cartItems.length === 0 ? (
        /* Empty State */
        <View className="flex-1 items-center justify-center px-8">
          <ShoppingBag size={64} color="#CBD5E1" strokeWidth={1.5} />
          <Text className="text-xl font-bold text-slate-800 mt-5 mb-2">Your cart is empty</Text>
          <Text className="text-sm text-slate-400 text-center leading-5 mb-7">
            Tap the + on any product to add it here
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className="bg-blue-900 px-8 py-3.5 rounded-full"
          >
            <Text className="text-white font-bold text-base">Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            {/* Delivery Banner */}
            {delivery === 0 ? (
              <View className="bg-green-100 px-4 py-2.5 items-center">
                <Text className="text-green-800 font-semibold text-sm">
                  🎉 You've got FREE delivery!
                </Text>
              </View>
            ) : (
              <View className="bg-amber-100 px-4 py-2.5 items-center">
                <Text className="text-amber-800 font-semibold text-sm">
                  Add ₹{999 - subtotal} more for FREE delivery
                </Text>
              </View>
            )}

            {/* Cart Items */}
            <View className="bg-white mx-3 mt-3 rounded-xl overflow-hidden" style={{ elevation: 2 }}>
              {cartItems.map((item, index) => (
                <View
                  key={item.id}
                  className={`flex-row p-3 gap-3 ${index !== 0 ? 'border-t border-slate-100' : ''}`}
                >
                  <Image
                    source={{ uri: item.image }}
                    className="w-24 h-28 rounded-xl bg-slate-100"
                    resizeMode="cover"
                  />
                  <View className="flex-1">
                    <View className="flex-row justify-between">
                      <View className="flex-1 mr-2">
                        <Text className="text-xs text-slate-400 font-semibold tracking-widest">
                          {item.category}
                        </Text>
                        <Text className="text-sm font-bold text-slate-800 mt-0.5 leading-5" numberOfLines={2}>
                          {item.name}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => removeFromCart(item.id)} className="p-1">
                        <Trash2 size={15} color="#94A3B8" />
                      </TouchableOpacity>
                    </View>

                    {/* Price + Qty */}
                    <View className="flex-row justify-between items-center mt-2.5">
                      <Text className="text-base font-bold text-blue-900">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </Text>
                      <View className="flex-row items-center bg-blue-50 rounded-full px-1 gap-0.5">
                        <TouchableOpacity onPress={() => updateQty(item.id, -1)} className="p-1.5">
                          <Minus size={14} color="#1e3a8a" />
                        </TouchableOpacity>
                        <Text className="text-sm font-bold text-blue-900 w-6 text-center">
                          {item.qty}
                        </Text>
                        <TouchableOpacity onPress={() => updateQty(item.id, 1)} className="p-1.5">
                          <Plus size={14} color="#1e3a8a" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Coupon */}
            <TouchableOpacity
              onPress={() => setCouponApplied(!couponApplied)}
              className="flex-row items-center justify-between bg-white mx-3 mt-2.5 rounded-xl px-4 py-4"
              style={{ elevation: 1 }}
            >
              <View className="flex-row items-center gap-2.5">
                <Tag size={18} color="#1e3a8a" />
                <Text className="text-sm font-semibold text-blue-900">
                  {couponApplied ? 'STYLE10 Applied ✓' : 'Apply Coupon / Promo Code'}
                </Text>
              </View>
              <ChevronRight size={18} color="#94A3B8" />
            </TouchableOpacity>

            {/* Price Summary */}
            <View className="bg-white mx-3 mt-2.5 rounded-xl p-4 mb-2" style={{ elevation: 1 }}>
              <Text className="text-base font-bold text-slate-800 mb-3">Price Details</Text>

              <View className="flex-row justify-between mb-2.5">
                <Text className="text-sm text-slate-500">Subtotal ({totalQty} items)</Text>
                <Text className="text-sm text-slate-800 font-medium">₹{subtotal.toLocaleString()}</Text>
              </View>

              {savings > 0 && (
                <View className="flex-row justify-between mb-2.5">
                  <Text className="text-sm text-slate-500">Discount</Text>
                  <Text className="text-sm text-green-600 font-semibold">-₹{savings.toLocaleString()}</Text>
                </View>
              )}

              {couponApplied && (
                <View className="flex-row justify-between mb-2.5">
                  <Text className="text-sm text-slate-500">Coupon (STYLE10)</Text>
                  <Text className="text-sm text-green-600 font-semibold">-₹{couponDiscount.toLocaleString()}</Text>
                </View>
              )}

              <View className="flex-row justify-between mb-2.5">
                <Text className="text-sm text-slate-500">Delivery</Text>
                <Text className={`text-sm font-semibold ${delivery === 0 ? 'text-green-600' : 'text-slate-800'}`}>
                  {delivery === 0 ? 'FREE' : `₹${delivery}`}
                </Text>
              </View>

              <View className="h-px bg-slate-100 my-2" />

              <View className="flex-row justify-between">
                <Text className="text-base font-bold text-slate-800">Total Amount</Text>
                <Text className="text-base font-extrabold text-blue-900">₹{total.toLocaleString()}</Text>
              </View>

              {savings + couponDiscount > 0 && (
                <View className="bg-green-50 rounded-lg p-2.5 mt-3 items-center">
                  <Text className="text-green-700 font-semibold text-sm">
                    🎉 You're saving ₹{(savings + couponDiscount).toLocaleString()} on this order!
                  </Text>
                </View>
              )}
            </View>

            <View className="h-24" />
          </ScrollView>

          {/* Sticky Checkout Bar */}
          <View
            className="absolute bottom-0 left-0 right-0 bg-white flex-row items-center justify-between px-4 py-3 border-t border-slate-200"
            style={{ elevation: 8 }}
          >
            <View>
              <Text className="text-lg font-extrabold text-blue-900">₹{total.toLocaleString()}</Text>
              <Text className="text-xs text-slate-400 mt-0.5">{totalQty} items</Text>
            </View>
            <TouchableOpacity className="bg-blue-900 px-6 py-3.5 rounded-full">
              <Text className="text-white font-bold text-sm">Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}