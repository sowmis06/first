import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  Animated,
  TouchableOpacity
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import { products } from "./constants/products";
import { categories } from "./constants/categories";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("Popular");
  const [cartCount] = useState(0);
  const insets = useSafeAreaInsets();

  const filteredProducts = React.useMemo(() => {
    let result = products.filter((p) => {
      const matchCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch = (p.name || "")
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchCat && matchSearch;
    });

    if (sortOrder === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [selectedCategory, searchText, sortOrder]);

  const listHeader = (
    <View style={styles.listHeaderWrap}>
      {/* Section label */}
      <View style={styles.sectionRow}>
        <View>
          <Text style={styles.sectionTitle}>
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </Text>
          <Text style={styles.sectionCount}>
            {filteredProducts.length} items
          </Text>
        </View>
        <TouchableOpacity
          style={styles.sortChip}
          onPress={() => {
            if (sortOrder === "Popular") setSortOrder("low");
            else if (sortOrder === "low") setSortOrder("high");
            else setSortOrder("Popular");
          }}
        >
          <Text style={styles.sortChipText}>
            {sortOrder === "Popular"
              ? "Popular ↓"
              : sortOrder === "low"
                ? "Price ↑"
                : "Price ↓"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <View
        style={{
          height: Math.max(insets.top, StatusBar.currentHeight || 0),
          backgroundColor: "#8a301eff",
        }}
      />
      <StatusBar barStyle="light-content" backgroundColor="#1e8a74" />

      <Header
        searchText={searchText}
        onSearchChange={setSearchText}
        cartCount={cartCount}
      />
      <View style={{ marginTop: 10, overflow: "visible" }}>
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={listHeader}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyText}>
              Try a different category or search term
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  listHeaderWrap: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    letterSpacing: -0.3,
  },
  sectionCount: {
    fontSize: 12,
    color: "#999999",
    marginTop: 2,
  },
  sortChip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sortChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444444",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 12,
  },
  listContent: {
    paddingTop: 14,
    paddingBottom: 80,
  },
  emptyWrap: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 6,
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },
});