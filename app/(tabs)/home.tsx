import { useRouter } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const streams = [
  {
    id: "1",
    title: "Ranked Grind",
    streamer: "ProGamer",
    viewers: "12.4K",
  },
  {
    id: "2",
    title: "Minecraft Chill Build",
    streamer: "BlockMaster",
    viewers: "3.2K",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={streams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/stream/[id]",
                params: { id: item.id },
              })
            }
          >
            <View style={styles.thumbnail} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {item.streamer} • {item.viewers} viewers
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E10",
    padding: 15,
  },
  card: {
    marginBottom: 20,
  },
  thumbnail: {
    height: 180,
    backgroundColor: "#6441A5",
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    color: "gray",
  },
});
