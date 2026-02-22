import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BG = "#0E0E10";
const WHITE = "#FFFFFF";
const MUTED = "#9A9AA0";
const PURPLE = "#9147FF";

type TopTab = "Notifications" | "Whispers";

type NotificationItem = {
  id: string;
  message: string;
  time: string;
  category?: string; // optional like subs
};

export default function Activity() {
  const [activeTab, setActiveTab] = useState<TopTab>("Notifications");

  const notifications: NotificationItem[] = useMemo(
    () => [
      {
        id: "1",
        message:
          "You are now eligible to get Denny*12000 for Zenless Zone Zero. To get your loot, claim your Drop by March 6, 2026 3:59:00 pm UTC on the Inventory page!",
        time: "4 days ago",
      },
      {
        id: "2",
        message:
          "Watch MasontheAlpaca to save your streak! Your 9-stream streak can be saved within the next 24h",
        time: "1 week ago",
      },
      {
        id: "3",
        message:
          "Your Gift Sub to typicallycrescia has expired. Click here to go to the channel and resubscribe.",
        time: "1 week ago",
        category: "Subscriptions",
      },
      {
        id: "4",
        message:
          "You are now eligible to get Invisible Woman Emotes for Marvel Rivals. To get your loot, claim your Drop by February 20, 2026 8:59:00 am UTC on the Inventory page!",
        time: "1 week ago",
      },
      {
        id: "5",
        message:
          "You are now eligible to get Invisible Woman Nameplate for Marvel Rivals. To get your loot, claim your Drop by February 20, 2026 8:59:00 am UTC on the Inventory page!",
        time: "1 week ago",
      },
      {
        id: "6",
        message:
          "You are now eligible to get Invisible Woman Spray for Marvel Rivals. To get your loot, claim your Drop by February 20, 2026 8:59:00 am UTC on the Inventory page!",
        time: "1 week ago",
      },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* title*/}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Activity</Text>
      </View>

      {/* tabs */}
      <View style={styles.tabsRow}>
        <TopTabButton
          label="Notifications"
          active={activeTab === "Notifications"}
          onPress={() => setActiveTab("Notifications")}
        />
        <TopTabButton
          label="Whispers"
          active={activeTab === "Whispers"}
          onPress={() => setActiveTab("Whispers")}
        />
      </View>

      {/* header row section */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>EARLIER</Text>

        <Pressable>
          <Text style={styles.markAll}>MARK ALL AS READ</Text>
        </Pressable>
      </View>

      {/* list */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <NotificationRow item={item} showAccent={index === 0} />
        )}
      />
    </SafeAreaView>
  );
}

function TopTabButton({
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
      <View style={[styles.underline, active ? styles.underlineOn : styles.underlineOff]} />
    </Pressable>
  );
}

function NotificationRow({
  item,
  showAccent,
}: {
  item: NotificationItem;
  showAccent: boolean;
}) {
  return (
    <View style={styles.rowWrap}>
      {/* left purple accent like the ss */}
      {showAccent ? <View style={styles.leftAccent} /> : <View style={styles.leftAccentSpacer} />}

      {/* avatar placeholder */}
      <View style={styles.avatar} />

      {/* right text */}
      <View style={styles.textWrap}>
        <Text style={styles.message}>{item.message}</Text>

        <Text style={styles.time}>
          {item.time}
          {item.category ? ` Â· ${item.category}` : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },

  titleRow: {
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: "center",
  },
  title: { color: WHITE, fontSize: 24, fontWeight: "900" },

  tabsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 40,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 6,
  },

  tabBtn: { alignItems: "flex-start" },
  tabText: { color: WHITE, fontSize: 20, fontWeight: "900" },
  tabTextActive: { color: PURPLE },

  underline: { marginTop: 10, height: 3, borderRadius: 3 },
  underlineOn: { width: 120, backgroundColor: PURPLE },
  underlineOff: { width: 120, backgroundColor: "transparent" },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    marginTop: 10,
  },
  sectionLabel: { color: MUTED, fontWeight: "900", letterSpacing: 1 },
  markAll: { color: PURPLE, fontWeight: "900", fontSize: 16 },

  listContent: { paddingTop: 14, paddingBottom: 24 },

  rowWrap: {
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 14,
    alignItems: "flex-start",
  },

  leftAccent: {
    width: 6,
    height: 54,
    backgroundColor: PURPLE,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginTop: 8,
  },
  leftAccentSpacer: { width: 6, height: 54, marginTop: 8 },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: "#2A2A2E",
    marginLeft: 14,
    marginRight: 14,
  },

  textWrap: { flex: 1, paddingRight: 18 },
  message: {
    color: WHITE,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 26,
  },
  time: {
    marginTop: 10,
    color: MUTED,
    fontSize: 16,
    fontWeight: "600",
  },
});
