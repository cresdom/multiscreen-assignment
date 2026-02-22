import React, { useMemo, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

const BG = "#0E0E10";
const PANEL = "#141418";
const PANEL_2 = "#1F1F23";
const WHITE = "#FFFFFF";
const MUTED = "#9A9AA0";
const PURPLE = "#9147FF";

type Gifter = { rank: 1 | 2 | 3; name: string; gifts: number };
type ChatMsg = { id: string; time: string; name: string; message: string; accent?: "purple" | "pink" | "blue" };

export default function Stream() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [text, setText] = useState("");

  const topGifters: Gifter[] = useMemo(
    () => [
      { rank: 1, name: "User1", gifts: 12 },
      { rank: 2, name: "User2", gifts: 6 },
      { rank: 3, name: "User3", gifts: 3 },
    ],
    [],
  );

  const messages: ChatMsg[] = useMemo(
    () => [
      { id: "1", time: "17:40", name: "SoundAlerts", message: "helaniecrescia followed your channel!", accent: "purple" },
      { id: "2", time: "17:41", name: "helaniecrescia", message: "!lurk", accent: "pink" },
      {
        id: "3",
        time: "17:41",
        name: "Nightbot",
        message: "♡☆ Enjoy your lurk! ☆♡",
        accent: "blue",
      },
      { id: "4", time: "17:41", name: "helaniecrescia", message: "heyyyyy", accent: "pink" },
      { id: "5", time: "", name: "", message: "Welcome to the chat room!", accent: undefined },
    ],
    [],
  );

  const streamTitle = String(id ?? "Stream");

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {/* Top video area */}
        <View style={styles.videoWrap}>
          {/* Back button overlay */}
          <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
            <Ionicons name="chevron-back" size={22} color={WHITE} />
          </Pressable>

          <View style={styles.video} />

          {/* Bottom layout */}
          <View style={styles.videoOverlayRow}>
            <View style={styles.latestBox}>
              <Text style={styles.latestLabel}>LATEST</Text>
              <Text style={styles.latestBig}>+1</Text>
            </View>

            <View style={{ flex: 1 }} />

            <View style={styles.avatarBlob} />
          </View>
        </View>

        {/* Buttons - Gift a Sub / Subscribe */}
        <View style={styles.ctaRow}>
          <View style={{ flex: 1 }} />
          <Pressable style={styles.giftBtn}>
            <Text style={styles.giftText}>Gift a Sub</Text>
          </Pressable>
          <Pressable style={styles.subBtn}>
            <Text style={styles.subText}>Subscribe</Text>
          </Pressable>
        </View>

        {/* Top gifters row */}
        <View style={styles.gifterRow}>
          {topGifters.map((g) => (
            <View key={g.rank} style={styles.gifterCard}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{g.rank}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.gifterName} numberOfLines={1}>
                  {g.name}
                </Text>
                <View style={styles.giftCountRow}>
                  <Ionicons name="gift" size={16} color={g.rank === 1 ? "#F5C451" : g.rank === 2 ? "#C9C9CE" : "#D39A7B"} />
                  <Text style={styles.giftCount}>{g.gifts}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Chat */}
        <View style={styles.chatWrap}>
          <FlatList
            data={messages}
            keyExtractor={(m) => m.id}
            contentContainerStyle={styles.chatContent}
            renderItem={({ item }) => <ChatRow item={item} />}
            ListFooterComponent={<View style={{ height: 94 }} />}
          />
        </View>

        {/* input bar */}
        <View style={styles.inputBar}>
          <View style={styles.viewerPill}>
            <Ionicons name="eye" size={18} color={WHITE} />
            <Text style={styles.viewerText}>1K</Text>
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Send chat"
              placeholderTextColor="#6F6F77"
              style={styles.input}
              returnKeyType="send"
              onSubmitEditing={() => setText("")}
            />
          </View>

          <Pressable style={styles.iconBtn} hitSlop={10}>
            <Ionicons name="diamond-outline" size={22} color={WHITE} />
          </Pressable>
          <Pressable style={styles.iconBtn} hitSlop={10}>
            <Ionicons name="happy-outline" size={22} color={WHITE} />
          </Pressable>
          <Pressable style={styles.iconBtn} hitSlop={10}>
            <Ionicons name="ellipsis-vertical" size={20} color={WHITE} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ChatRow({ item }: { item: ChatMsg }) {
  const nameColor =
    item.accent === "purple" ? PURPLE : item.accent === "pink" ? "#FF4FB2" : item.accent === "blue" ? "#58C7FF" : MUTED;

  // system line “Welcome to the chat room!”
  if (!item.name) {
    return (
      <View style={styles.systemRow}>
        <Text style={styles.systemText}>{item.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.msgRow}>
      <Text style={styles.time}>{item.time}</Text>

      <View style={styles.msgBody}>
        {/* small icon blob like bots */}
        <View style={styles.msgIcon} />
        <Text style={[styles.name, { color: nameColor }]}>{item.name}:</Text>
        <Text style={styles.msgText}>{item.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: BG },

  // Video
  videoWrap: { backgroundColor: "#000" },
  video: { height: 340, backgroundColor: "#2A2A2E" },
  backBtn: {
    position: "absolute",
    zIndex: 5,
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  videoOverlayRow: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 12,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  latestBox: {
    width: 66,
    height: 46,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
  },
  latestLabel: { color: MUTED, fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  latestBig: { color: WHITE, fontSize: 18, fontWeight: "900", marginTop: 2 },
  avatarBlob: { width: 44, height: 44, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.18)" },


  ctaRow: {
    backgroundColor: BG,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  giftBtn: {
    backgroundColor: PANEL_2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  giftText: { color: WHITE, fontWeight: "900", fontSize: 16 },
  subBtn: {
    backgroundColor: PURPLE,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 124,
    alignItems: "center",
    justifyContent: "center",
  },
  subText: { color: WHITE, fontWeight: "900", fontSize: 16 },

  // Top gifters
  gifterRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 12,
    paddingBottom: 10,
    backgroundColor: BG,
  },
  gifterCard: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: PANEL,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#2A2A2E",
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#2A2A2E",
    alignItems: "center",
    justifyContent: "center",
  },
  rankText: { 
    color: WHITE, 
    fontWeight: "900" 
  },
  gifterName: { 
    color: WHITE, 
    fontWeight: "900", 
    fontSize: 16 
  },
  giftCountRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 6, 
    marginTop: 4 
  },
  giftCount: { 
    color: MUTED, 
    fontWeight: "900" 
  },

  // Chat
  chatWrap: { 
    flex: 1, 
    backgroundColor: BG 
  },
  chatContent: { 
    paddingHorizontal: 12, 
    paddingTop: 8, 
    paddingBottom: 0 
  },
  msgRow: { 
    marginBottom: 16 
  },
  time: { 
    color: MUTED, 
    fontWeight: "800", 
    marginBottom: 8 
  },
  msgBody: { 
    flexDirection: "row", 
    alignItems: "flex-start", 
    gap: 10, flexWrap: "wrap" 
  },
  msgIcon: { 
    width: 22, 
    height: 22, 
    borderRadius: 6, 
    backgroundColor: "#2A2A2E", 
    marginTop: 2 
  },
  name: { 
    fontWeight: "900", 
    fontSize: 18 
  },
  msgText: { 
    color: WHITE, 
    fontWeight: "600", 
    fontSize: 18, 
    flexShrink: 1 
  },

  systemRow: { 
    paddingTop: 14, 
    paddingBottom: 6 
  },
  systemText: { 
    color: MUTED, 
    fontWeight: "800", 
    fontSize: 18 
  },

  // Input bar
  inputBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BG,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#1B1B1F",
  },
  viewerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: PANEL_2,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  viewerText: { color: WHITE, fontWeight: "900" },
  inputWrap: { flex: 1, backgroundColor: PANEL_2, borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10 },
  input: { color: WHITE, fontSize: 18, fontWeight: "700" },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: PANEL_2,
    alignItems: "center",
    justifyContent: "center",
  },
});