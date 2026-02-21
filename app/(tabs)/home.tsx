import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BG = "#0E0E10";
const CARD = "#1F1F23";
const PURPLE = "#9147FF";

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
      </ScrollView>
    </SafeAreaView>
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
});
