import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";

export default function ArticleCard({ item, onPress }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const shortDesc =
    item.description && item.description.length > 50
      ? item.description.substring(0, 50) + "..."
      : item.description;

  return (
    <Pressable onPress={() => onPress(item)}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>

        {shortDesc ? <Text style={styles.desc}>{shortDesc}</Text> : null}

        <Text style={styles.meta}>
          {item.source?.name} • {new Date(item.publishedAt).toDateString()}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    borderRadius: 14,
    shadowColor: "#8E2DE2",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(142, 45, 226, 0.15)",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2D2D2D",
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: "#626262",
    marginBottom: 10,
    lineHeight: 20,
  },
  meta: {
    fontSize: 12,
    color: "#8A6BBE",
    marginTop: 4,
  },
});
