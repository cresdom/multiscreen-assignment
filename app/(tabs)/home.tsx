import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LiveItem = {
  id: string;
  name: string;
  title: string;
  category: string;
  viewers: number;
  tags: string[];
};

const BG = "#0E0E10";
const CARD = "#1F1F23";
const MUTED = "#9A9AA0";
const WHITE = "#FFFFFF";
const PURPLE = "#9147FF";

export default function Home() {
  const [activeTopTab, setActiveTopTab] = useState<
    "Following" | "Live" | "Clips"
  >("Following");

  const liveNow: LiveItem[] = useMemo(
    () => [
      {
        id: "TypicalRosie",
        name: "TypicalRosie",
        title: "✧ late night gamin' ✧ ",
        category: "Team Fight Tactics",
        viewers: 767,
        tags: ["Anime", "English", "Vtuber", "Chill"],
      },
      {
        id: "kitsuviogevt",
        name: "KitsuViogeVT",
        title: "♡ hello darkness my old friend ♡",
        category: "Valorant",
        viewers: 67,
        tags: ["PNGTuber", "VarietyStreamer", "English"],
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Stories from streamers you follow will appear here!
          </Text>
        </View>

        {/* Main Container */}
        <View style={styles.roundedContainer}>
          
          {/* Top Tabs */}
          <View style={styles.topTabs}>
            <TopTab label="Following" active />
            <TopTab label="Live" active={false} />
            <TopTab label="Clips" active={false} />
          </View>

          {/* Live Now Header */}
          <View style={styles.liveHeaderRow}>
            <Text style={styles.sectionTitle}>Live Now</Text>

            <Pressable style={styles.adFreeBtn}>
              <Ionicons name="battery-charging" size={18} color="#D6D6DB" />
              <Text style={styles.adFreeText}>Try Ad-Free</Text>
            </Pressable>
          </View>

          {/* Live List */}
          <FlatList
            data={liveNow}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <LiveRow
                item={item}
                onPress={() => router.push(`/stream/${item.id}`)}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TopTab({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <View>
      <Text style={[styles.topTabText, active && styles.topTabTextActive]}>
        {label}
      </Text>
      <View
        style={active ? styles.topTabUnderline : styles.topTabUnderlineOff}
      />
    </View>
  );
}

function LiveRow({ item, onPress }: { item: LiveItem; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.liveRow}>
      <View style={styles.thumb}>
        <View style={styles.livePill}>
          <View style={styles.redDot} />
          <Text style={styles.viewerText}>{item.viewers}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.channelName}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  scrollContent: { paddingBottom: 28 },

  banner: {
    backgroundColor: CARD,
    padding: 16,
    margin: 16,
    borderRadius: 14,
  },

  bannerText: { color: WHITE },

  roundedContainer: {
    marginHorizontal: 12,
    borderRadius: 22,
    padding: 16,
    backgroundColor: "#0B0B0D",
  },

  topTabs: { flexDirection: "row", gap: 20 },

  topTabText: { color: MUTED, fontSize: 20 },
  topTabTextActive: { color: WHITE },

  topTabUnderline: {
    marginTop: 6,
    height: 3,
    width: 72,
    backgroundColor: WHITE,
  },

  topTabUnderlineOff: {
    marginTop: 6,
    height: 3,
    width: 72,
    backgroundColor: "transparent",
  },

  liveHeaderRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: { color: WHITE, fontSize: 22, fontWeight: "800" },

  adFreeBtn: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#2A2A2E",
    padding: 10,
    borderRadius: 10,
  },

  adFreeText: { color: WHITE },

  liveRow: { flexDirection: "row", gap: 12, marginTop: 14 },

  thumb: { width: 120, height: 70, backgroundColor: "#2A2A2E" },

  livePill: { flexDirection: "row", gap: 6 },

  redDot: { width: 10, height: 10, backgroundColor: "red" },

  viewerText: { color: WHITE },

  channelName: { color: WHITE, fontSize: 18 },

  category: { color: MUTED },
});