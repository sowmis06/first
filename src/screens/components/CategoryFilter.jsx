import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      {categories.map((cat) => {
        const isSelected = selected === cat.label;

        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat.label)}
            className={`
  px-5 py-3 rounded-full mr-3
  items-center justify-center border
  ${isSelected ? "bg-blue-900 border-blue-900" : "bg-white border-white"}
`}
          >
            <Text
              className={`
    text-base font-semibold
    ${isSelected ? "text-white" : "text-black"}
  `}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}