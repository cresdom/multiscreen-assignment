import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, Image, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type TopTab = "Categories" | "Live Channels";

type Category = {
  id: string;
  title: string;
  viewers: string;
  tag: string;
  image: string;
};

export default function Browse() {
  const [activeTab, setActiveTab] = useState<TopTab>("Categories");
  const [query, setQuery] = useState("");

  // putting mock data here w corresponding images
  const categories: Category[] = useMemo(
    () => [
      {
        id: "tft",
        title: "Teamfight\nTactics",
        viewers: "18.6K",
        tag: "Strategy",
        image: require("../../assets/images/tft.png"),
      },
      {
        id: "justchatting",
        title: "Just Chatting",
        viewers: "531.6K",
        tag: "IRL",
        image: require("../../assets/images/jc.jpg"),
      },
      {
        id: "minecraft",
        title: "Minecraft",
        viewers: "90.2K",
        tag: "Simulation",
        image: require("../../assets/images/mc.jpg"),
      },
      {
        id: "heartopia",
        title: "Heartopia",
        viewers: "4.8K",
        tag: "Simulation",
        image: require("../../assets/images/heartopia.jpg"),
      },
      {
        id: "sleeping",
        title: "I'm Only\nSleeping",
        viewers: "1.3K",
        tag: "Point and Click",
        image: require("../../assets/images/sleep.jpg"),
      },
      {
        id: "lol",
        title: "League of\nLegends",
        viewers: "163.4K",
        tag: "RPG",
        image: require("../../assets/images/lol.png"),
      },
      {
        id: "art",
        title: "Art",
        viewers: "12.1K",
        tag: "Creative",
        image: require("../../assets/images/art.jpg"),
      },
      {
        id: "peak",
        title: "PEAK",
        viewers: "9.2K",
        tag: "Adventure",
        image: require("../../assets/images/peak.jpg"),
      },
      {
        id: "fantasy",
        title: "Fantasy",
        viewers: "22.4K",
        tag: "RPG",
        image: require("../../assets/images/fantasy.jpg"),
      },
    ],
    []
  );
}