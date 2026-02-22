import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BG = "#0E0E10";
const CARD = "#1F1F23";
const MUTED = "#9A9AA0";
const WHITE = "#FFFFFF";
const PURPLE = "#9147FF";

export default function Home() {
  const [activeTopTab, setActiveTopTab] = useState<
    "Following" | "Live" | "Clips"
  >("Following");

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

          <View style={styles.bannerIconBlob}>
            <Ionicons name="sparkles" size={26} color="#FFFFFF" />
          </View>
        </View>

        {/* Rounded Container */}
        <View style={styles.roundedContainer}>
          {/* Top Tabs */}
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

          <Text style={styles.placeholder}>Content coming next commit…</Text>
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

  bannerText: { color: WHITE, fontSize: 15, lineHeight: 20 },
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

  topTabText: { color: MUTED, fontSize: 20, fontWeight: "700" },
  topTabTextActive: { color: WHITE },

  topTabUnderline: {
    marginTop: 8,
    height: 3,
    width: 72,
    backgroundColor: WHITE,
    borderRadius: 3,
  },

  topTabUnderlineOff: {
    marginTop: 8,
    height: 3,
    width: 72,
    backgroundColor: "transparent",
  },

  placeholder: {
    color: MUTED,
    marginTop: 20,
  },
});
