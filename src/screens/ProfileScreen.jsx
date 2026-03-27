import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit3,
  Star,
  Gift,
} from 'lucide-react-native';

const MENU_SECTIONS = [
  {
    title: 'MY ORDERS',
    items: [
      { icon: Package,  label: 'My Orders',         sublabel: '3 active orders', iconBg: '#EDE9FE', iconColor: '#7C3AED' },
      { icon: Heart,    label: 'My Wishlist',        sublabel: '4 saved items',   iconBg: '#FCE7F3', iconColor: '#DB2777' },
      { icon: Star,     label: 'Reviews & Ratings',  sublabel: null,              iconBg: '#FEF3C7', iconColor: '#D97706' },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { icon: MapPin,     label: 'Saved Addresses',  sublabel: '2 addresses', iconBg: '#D1FAE5', iconColor: '#059669' },
      { icon: CreditCard, label: 'Payment Methods',  sublabel: null,          iconBg: '#DBEAFE', iconColor: '#2563EB' },
      { icon: Gift,       label: 'Coupons & Offers', sublabel: '2 active',    iconBg: '#FEE2E2', iconColor: '#DC2626' },
    ],
  },
  {
    title: 'PREFERENCES',
    items: [
      { icon: Bell,        label: 'Notifications',    sublabel: null, iconBg: '#EDE9FE', iconColor: '#7C3AED', toggle: true },
      { icon: Shield,      label: 'Privacy & Security', sublabel: null, iconBg: '#F1F5F9', iconColor: '#64748B' },
      { icon: HelpCircle,  label: 'Help & Support',   sublabel: null, iconBg: '#E0F2FE', iconColor: '#0284C7' },
    ],
  },
];

const STATS = [
  { label: 'Orders',   value: '12' },
  { label: 'Wishlist', value: '4'  },
  { label: 'Reviews',  value: '8'  },
];

export default function ProfileScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="bg-blue-900 flex-row items-center justify-between px-4 py-3.5">
        <TouchableOpacity onPress={() => navigation?.goBack()} className="p-1">
          <ArrowLeft size={22} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">My Profile</Text>
        <TouchableOpacity className="p-1">
          <Edit3 size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Hero (extends blue header) */}
        <View className="bg-blue-900 items-center pb-7 pt-2">
          {/* Avatar */}
          <View className="relative mb-3">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
              }}
              className="w-24 h-24 rounded-full border-4 border-white bg-slate-200"
            />
            <TouchableOpacity className="absolute bottom-0.5 right-0.5 bg-blue-500 rounded-full w-7 h-7 items-center justify-center border-2 border-white">
              <Edit3 size={12} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text className="text-white text-xl font-extrabold mb-1">Priya Sharma</Text>
          <Text className="text-blue-300 text-sm mb-3">priya.sharma@email.com</Text>
          <View className="bg-white/20 border border-white/30 px-4 py-1.5 rounded-full">
            <Text className="text-amber-100 text-xs font-semibold">⭐ StyleCart Premium</Text>
          </View>
        </View>

        {/* Stats Card */}
        <View
          className="bg-white mx-3 -mt-4 rounded-2xl flex-row py-4"
          style={{ elevation: 4 }}
        >
          {STATS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <View className="flex-1 items-center">
                <Text className="text-xl font-extrabold text-blue-900">{stat.value}</Text>
                <Text className="text-xs text-slate-400 font-medium mt-1">{stat.label}</Text>
              </View>
              {i < STATS.length - 1 && (
                <View className="w-px bg-slate-200 my-1" />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Referral Banner */}
        <TouchableOpacity
          className="flex-row items-center justify-between bg-blue-50 border border-blue-200 mx-3 mt-3 rounded-xl px-4 py-3.5"
        >
          <View className="flex-row items-center gap-3">
            <Gift size={22} color="#1e3a8a" />
            <View>
              <Text className="text-sm font-bold text-blue-900">Refer & Earn ₹200</Text>
              <Text className="text-xs text-slate-500 mt-0.5">Invite friends and earn rewards</Text>
            </View>
          </View>
          <ChevronRight size={18} color="#94A3B8" />
        </TouchableOpacity>

        {/* Menu Sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} className="mt-3 px-3">
            <Text className="text-xs font-bold text-slate-400 tracking-widest mb-1.5 ml-1">
              {section.title}
            </Text>
            <View className="bg-white rounded-2xl overflow-hidden" style={{ elevation: 1 }}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.7}
                  className={`flex-row items-center px-4 py-3.5 gap-3.5 ${
                    index !== 0 ? 'border-t border-slate-100' : ''
                  }`}
                >
                  {/* Icon Box */}
                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <item.icon size={18} color={item.iconColor} />
                  </View>

                  {/* Label */}
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-slate-800">{item.label}</Text>
                    {item.sublabel && (
                      <Text className="text-xs text-slate-400 mt-0.5">{item.sublabel}</Text>
                    )}
                  </View>

                  {/* Toggle or Chevron */}
                  {item.toggle ? (
                    <Switch
                      value={notifications}
                      onValueChange={setNotifications}
                      trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                      thumbColor={notifications ? '#1e3a8a' : '#f1f5f9'}
                      ios_backgroundColor="#CBD5E1"
                    />
                  ) : (
                    <ChevronRight size={16} color="#CBD5E1" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity
          className="flex-row items-center justify-center gap-2.5 mx-3 mt-3 bg-red-50 border border-red-200 rounded-2xl py-4"
        >
          <LogOut size={18} color="#EF4444" />
          <Text className="text-red-500 font-bold text-base">Log Out</Text>
        </TouchableOpacity>

        <Text className="text-center text-xs text-slate-300 mt-4 mb-6">
          StyleCart v2.1.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}