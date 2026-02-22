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

type OfflineItem = {
  id: string;
  name: string;
};

const BG = "#0E0E10";
const CARD = "#1F1F23";
const MUTED = "#9A9AA0";
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
        viewers: 76,
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

  const offline: OfflineItem[] = useMemo(
    () => [
      { id: "suni", name: "SuniSideBoiledEgg" },
      { id: "mayson", name: "MaceyAlpacaRun" },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner */}
        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerText}>
              Stories from streamers you follow will appear here!{" "}
              <Text style={styles.learnMore}>Learn More</Text>{" "}
              <Ionicons name="chevron-forward" size={16} color={PURPLE} />
            </Text>
          </View>

          {/* right “sparkle blob” placeholder */}
          <View style={styles.bannerIconBlob}>
            <Ionicons name="sparkles" size={26} color="#FFFFFF" />
          </View>
        </View>

        {/* Main rounded container */}
        <View style={styles.roundedContainer}>
          {/* Top segmented tabs */}
          <View style={styles.topTabs}>
            <TopTab
              label="Following"
              active={activeTopTab === "Following"}
              onPress={() => setActiveTopTab("Following")}
            />
            <TopTab
              label="Live"
              active={activeTopTab === "Live"}
              onPress={() => setActiveTopTab("Live")}
            />
            <TopTab
              label="Clips"
              active={activeTopTab === "Clips"}
              onPress={() => setActiveTopTab("Clips")}
            />
          </View>

          {/* Live Now header + button */}
          <View style={styles.liveHeaderRow}>
            <Text style={styles.sectionTitle}>Live Now</Text>
            <Pressable style={styles.adFreeBtn}>
              <Ionicons name="battery-charging" size={18} color="#D6D6DB" />
              <Text style={styles.adFreeText}>Try Ad-Free</Text>
            </Pressable>
          </View>

          {/* Live list */}
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

          {/* Offline */}
          <Text style={[styles.sectionTitle, { marginTop: 26 }]}>Offline</Text>
          <FlatList
            data={offline}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => <OfflineRow name={item.name} />}
            ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
            style={{ marginTop: 10 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TopTab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.topTab}>
      <Text style={[styles.topTabText, active && styles.topTabTextActive]}>
        {label}
      </Text>
      {active ? (
        <View style={styles.topTabUnderline} />
      ) : (
        <View style={styles.topTabUnderlineOff} />
      )}
    </Pressable>
  );
}

function LiveRow({ item, onPress }: { item: LiveItem; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.liveRow}>
      {/* Thumbnail placeholder */}
      <View style={styles.thumb}>
        <View style={styles.livePill}>
          <View style={styles.redDot} />
          <Text style={styles.viewerText}>{item.viewers}</Text>
        </View>
      </View>

      {/* Right content */}
      <View style={styles.liveInfo}>
        <View style={styles.nameRow}>
          <View style={styles.avatar} />
          <Text style={styles.channelName}>{item.name}</Text>
        </View>

        <Text style={styles.streamTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.category}>{item.category}</Text>

        <View style={styles.tagRow}>
          {item.tags.map((t) => (
            <View key={t} style={styles.tagPill}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

function OfflineRow({ name }: { name: string }) {
  return (
    <View style={styles.offlineRow}>
      <View style={styles.offlineAvatar} />
      <Text style={styles.offlineName}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  scrollContent: { paddingBottom: 28 },

  banner: {
    backgroundColor: CARD,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bannerText: { color: "#fff", fontSize: 15, lineHeight: 20 },
  learnMore: { color: PURPLE, fontWeight: "600" },
  bannerIconBlob: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#E9A8B7",
    alignItems: "center",
    justifyContent: "center",
  },

  roundedContainer: {
    marginTop: 14,
    marginHorizontal: 12,
    borderRadius: 22,
    padding: 16,
    backgroundColor: "#0B0B0D",
    borderWidth: 1,
    borderColor: "#2A2A2E",
  },

  topTabs: {
    flexDirection: "row",
    gap: 20,
    paddingBottom: 12,
  },
  topTab: { paddingTop: 4 },
  topTabText: { color: "#D6D6DB", fontSize: 20, fontWeight: "700" },
  topTabTextActive: { color: "#FFFFFF" },
  topTabUnderline: {
    marginTop: 8,
    height: 3,
    width: 72,
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
  },
  topTabUnderlineOff: {
    marginTop: 8,
    height: 3,
    width: 72,
    backgroundColor: "transparent",
  },

  liveHeaderRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "800" },

  adFreeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2A2A2E",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  adFreeText: { color: "#D6D6DB", fontWeight: "700" },

  liveRow: { flexDirection: "row", gap: 12 },
  thumb: {
    width: 130,
    height: 74,
    borderRadius: 10,
    backgroundColor: "#2A2A2E",
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 8,
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#FF2D55",
  },
  viewerText: { color: "#FFFFFF", fontWeight: "800" },

  liveInfo: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: "#3A3A40",
  },
  channelName: { color: "#FFFFFF", fontSize: 26, fontWeight: "900" },

  streamTitle: { color: MUTED, marginTop: 2, fontSize: 16, fontWeight: "600" },
  category: { color: MUTED, marginTop: 2, fontSize: 16 },

  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  tagPill: {
    backgroundColor: "#2A2A2E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: { color: "#D6D6DB", fontWeight: "700" },

  offlineRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  offlineAvatar: {
    width: 44,
    height: 44,
    borderRadius: 44,
    backgroundColor: "#2A2A2E",
  },
  offlineName: { color: "#FFFFFF", fontSize: 24, fontWeight: "800" },
});
