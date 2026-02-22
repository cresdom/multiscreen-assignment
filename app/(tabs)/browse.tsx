import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, Image, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const BG = "#0E0E10";
const CARD = "#1F1F23";
const MUTED = "#9A9AA0";
const WHITE = "#FFFFFF";
const PURPLE = "#9147FF";

type TopTab = "Categories" | "Live Channels";

type Category = {
  id: string;
  title: string;
  viewers: string;
  tag: string;
  image: any;
};

export default function Browse() {
  const [activeTab, setActiveTab] = useState<TopTab>("Categories");
  const [query, setQuery] = useState("");

  // Mock data w images
  const categories: Category[] = useMemo(
    () => [
      {
        id: "tft",
        title: "Teamfight\nTactics",
        viewers: "18.6K",
        tag: "Strategy",
        image: require("../../assets/images/tft.png"),
      },
      {
        id: "justchatting",
        title: "Just Chatting",
        viewers: "531.6K",
        tag: "IRL",
        image: require("../../assets/images/jc.jpg"),
      },
      {
        id: "minecraft",
        title: "Minecraft",
        viewers: "90.2K",
        tag: "Simulation",
        image: require("../../assets/images/mc.jpg"),
      },
      {
        id: "heartopia",
        title: "Heartopia",
        viewers: "4.8K",
        tag: "Simulation",
        image: require("../../assets/images/heartopia.jpg"),
      },
      {
        id: "sleeping",
        title: "I'm Only\nSleeping",
        viewers: "1.3K",
        tag: "Point and Click",
        image: require("../../assets/images/sleep.jpg"),
      },
      {
        id: "lol",
        title: "League of\nLegends",
        viewers: "163.4K",
        tag: "RPG",
        image: require("../../assets/images/lol.png"),
      },
      {
        id: "art",
        title: "Art",
        viewers: "12.1K",
        tag: "Creative",
        image: require("../../assets/images/art.jpg"),
      },
      {
        id: "peak",
        title: "PEAK",
        viewers: "9.2K",
        tag: "Adventure",
        image: require("../../assets/images/peak.jpg"),
      },
      {
        id: "fantasy",
        title: "Fantasy",
        viewers: "22.4K",
        tag: "RPG",
        image: require("../../assets/images/fantasy.jpg"),
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.title.toLowerCase().includes(q));
  }, [categories, query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top search bar*/}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={22} color={WHITE} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={MUTED}
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.tabsRow}>
        <Pressable onPress={() => setActiveTab("Categories")} style={styles.tabBtn}>
          <Text
            style={[
              styles.tabText,
              activeTab === "Categories" && styles.tabTextActive,
            ]}
          >
            Categories
          </Text>
          <View
            style={[
              styles.underline,
              activeTab === "Categories" ? styles.underlineOn : styles.underlineOff,
            ]}
          />
        </Pressable>

        <Pressable onPress={() => setActiveTab("Live Channels")} style={styles.tabBtn}>
          <Text
            style={[
              styles.tabText,
              activeTab === "Live Channels" && styles.tabTextActive,
            ]}
          >
            Live Channels
          </Text>
          <View
            style={[
              styles.underline,
              activeTab === "Live Channels" ? styles.underlineOn : styles.underlineOff,
            ]}
          />
        </Pressable>

        <View style={{ flex: 1 }} />

        <Pressable style={styles.filterBtn}>
          <Ionicons name="options-outline" size={22} color={WHITE} />
        </Pressable>
      </View>

      {/* grid layout*/}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.columnWrap}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Image source={item.image } style={styles.cardImage} />
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>

            <View style={styles.viewerRow}>
              <View style={styles.redDot} />
              <Text style={styles.viewerText}>{item.viewers}</Text>
            </View>

            <View style={styles.tagPill}>
              <Text style={styles.tagText} numberOfLines={1}>
                {item.tag}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: CARD,
    color: WHITE,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },

  tabsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    marginTop: 14,
    gap: 18,
  },

  tabBtn: { alignItems: "flex-start" },
  tabText: { color: WHITE, fontSize: 18, fontWeight: "900" },
  tabTextActive: { color: PURPLE },

  underline: { marginTop: 8, height: 3, borderRadius: 3 },
  underlineOn: { width: 86, backgroundColor: PURPLE },
  underlineOff: { width: 86, backgroundColor: "transparent" },

  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  gridContent: { paddingHorizontal: 12, paddingTop: 14, paddingBottom: 24 },
  columnWrap: { gap: 12 },

  card: {
    flex: 1,
    marginBottom: 18,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    backgroundColor: "#2A2A2E",
  },

  cardTitle: {
    marginTop: 10,
    color: WHITE,
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 22,
  },

  viewerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  redDot: { width: 10, height: 10, borderRadius: 10, backgroundColor: "#FF2D55" },
  viewerText: { color: MUTED, fontSize: 16, fontWeight: "700" },

  tagPill: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#2A2A2E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: { color: "#D6D6DB", fontWeight: "800" },
});