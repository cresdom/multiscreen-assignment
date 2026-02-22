import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BG = "#0E0E10";
const CARD = "#1F1F23";
const MUTED = "#9A9AA0";
const WHITE = "#FFFFFF";
const PURPLE = "#9147FF";

type TopTab = "About" | "Clips" | "Videos" | "Schedule" | "Chat";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<TopTab>("About");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Purple header area */}
        <View style={styles.purpleHeader}>
          <Pressable style={styles.iconCircle}>
            <Ionicons name="settings-outline" size={22} color={WHITE} />
          </Pressable>

          <Pressable style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Pressable>
        </View>

        {/* Main profile body */}
        <View style={styles.body}>
          {/* Avatar + name */}
          <View style={styles.userRow}>
            {/* Replace this Image with your own avatar if you want */}
            <View style={styles.avatarWrap}>
              <Image
                source={{
                  uri: "https://placehold.co/200x200/png",
                }}
                style={styles.avatar}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.username}>cresanie718</Text>
              <Text style={styles.status}>Offline</Text>
            </View>
          </View>

          {/* Buttons row */}
          <View style={styles.twoButtonsRow}>
            <Pressable style={styles.squareBtn}>
              <Ionicons name="radio-outline" size={18} color={WHITE} />
              <Text style={styles.squareBtnText}>Stream Manager</Text>
            </Pressable>

            <Pressable style={styles.squareBtn}>
              <Ionicons name="stats-chart-outline" size={18} color={WHITE} />
              <Text style={styles.squareBtnText}>Analytics</Text>
            </Pressable>
          </View>

          {/* Try Ad-Free button */}
          <Pressable style={styles.adFreeBtn}>
            <Ionicons name="ticket-outline" size={18} color={WHITE} />
            <Text style={styles.adFreeText}>Try Ad-Free</Text>
          </Pressable>

          {/* Top tabs */}
          <View style={styles.topTabs}>
            <ProfileTab
              label="About"
              active={activeTab === "About"}
              onPress={() => setActiveTab("About")}
            />
            <ProfileTab
              label="Clips"
              active={activeTab === "Clips"}
              onPress={() => setActiveTab("Clips")}
            />
            <ProfileTab
              label="Videos"
              active={activeTab === "Videos"}
              onPress={() => setActiveTab("Videos")}
            />
            <ProfileTab
              label="Schedule"
              active={activeTab === "Schedule"}
              onPress={() => setActiveTab("Schedule")}
            />
            <ProfileTab
              label="Chat"
              active={activeTab === "Chat"}
              onPress={() => setActiveTab("Chat")}
            />
          </View>

          {/* Content area */}
          <View style={styles.content}>
            {activeTab === "About" ? (
              <EmptyState />
            ) : (
              <Text style={styles.placeholderText}>
                {activeTab} (mock content)
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileTab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.tabBtn}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
      <View
        style={[styles.tabUnderline, active ? styles.tabOn : styles.tabOff]}
      />
    </Pressable>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyWrap}>
      <View style={styles.emptyIcon}>
        <Ionicons name="person-circle-outline" size={92} color={PURPLE} />
      </View>

      <Text style={styles.emptyTitle}>Tell us more!</Text>
      <Text style={styles.emptySubtitle}>
        You're more than just a profile... tell us the rest of the story!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  scrollContent: { paddingBottom: 24 },

  purpleHeader: {
    height: 120,
    backgroundColor: PURPLE,
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  editProfileBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  editProfileText: { color: WHITE, fontWeight: "800", fontSize: 14 },

  body: {
    paddingHorizontal: 16,
    marginTop: -34, // pulls avatar area up slightly (like screenshot)
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  avatarWrap: {
    width: 84,
    height: 84,
    borderRadius: 999,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 999,
  },

  username: { color: WHITE, fontSize: 30, fontWeight: "900" },
  status: { color: MUTED, fontSize: 16, marginTop: 2 },

  twoButtonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },

  squareBtn: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  squareBtnText: { color: WHITE, fontWeight: "800", fontSize: 16 },

  adFreeBtn: {
    marginTop: 12,
    backgroundColor: CARD,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  adFreeText: { color: WHITE, fontWeight: "900", fontSize: 16 },

  topTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingBottom: 10,
  },

  tabBtn: { alignItems: "center", gap: 8 },
  tabText: { color: WHITE, fontSize: 18, fontWeight: "800", opacity: 0.9 },
  tabTextActive: { color: PURPLE, opacity: 1 },

  tabUnderline: {
    height: 3,
    width: 46,
    borderRadius: 3,
  },
  tabOn: { backgroundColor: PURPLE },
  tabOff: { backgroundColor: "transparent" },

  content: {
    marginTop: 26,
    alignItems: "center",
    paddingHorizontal: 24,
  },

  emptyWrap: { alignItems: "center" },
  emptyIcon: {
    width: 160,
    height: 160,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(145,71,255,0.12)",
  },

  emptyTitle: {
    marginTop: 18,
    color: WHITE,
    fontSize: 24,
    fontWeight: "900",
  },
  emptySubtitle: {
    marginTop: 10,
    color: MUTED,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },

  placeholderText: { color: MUTED, fontSize: 18, fontWeight: "700" },
});
