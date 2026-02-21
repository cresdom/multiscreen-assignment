import { Ionicons } from "@expo/vector-icons";
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
const WHITE = "#FFFFFF";
const MUTED = "#9A9AA0";
const PURPLE = "#9147FF";

export default function Profile() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Purple header */}
        <View style={styles.purpleHeader}>
          <Pressable style={styles.iconCircle}>
            <Ionicons name="settings-outline" size={22} color={WHITE} />
          </Pressable>

          <Pressable style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Pressable>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* User row */}
          <View style={styles.userRow}>
            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: "https://placehold.co/200x200/png" }}
                style={styles.avatar}
              />
            </View>

            <View>
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

          {/* Try Ad-Free */}
          <Pressable style={styles.adFreeBtn}>
            <Ionicons name="ticket-outline" size={18} color={WHITE} />
            <Text style={styles.adFreeText}>Try Ad-Free</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
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

  editProfileText: {
    color: WHITE,
    fontWeight: "800",
  },

  body: {
    paddingHorizontal: 16,
    marginTop: -34,
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

  username: {
    color: WHITE,
    fontSize: 28,
    fontWeight: "900",
  },

  status: {
    color: MUTED,
    marginTop: 4,
  },

  twoButtonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },

  squareBtn: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  squareBtnText: {
    color: WHITE,
    fontWeight: "800",
  },

  adFreeBtn: {
    marginTop: 14,
    backgroundColor: CARD,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  adFreeText: {
    color: WHITE,
    fontWeight: "900",
  },
});
