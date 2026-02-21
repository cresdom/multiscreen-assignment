import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function StreamDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.video} />
      <Text style={styles.title}>Stream ID: {id}</Text>
      <Text style={styles.subtitle}>Live Stream Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E10",
    padding: 20,
  },
  video: {
    height: 220,
    backgroundColor: "#6441A5",
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "gray",
  },
});
