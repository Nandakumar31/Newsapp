import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  Image,
  ScrollView,
  Pressable,
  Button,
  TouchableOpacity,
} from "react-native";
import useNewsSearch from "../hooks/useNewsSearch";
import ArticleCard from "../components/ArticleCard";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function SearchScreen({ navigation }) {

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Login");
  };
  const { query, setQuery, articles, loading, error } = useNewsSearch();
  const [selected, setSelected] = useState(null);
  const closeModal = () => setSelected(null);

  const fallbackImages = [
    "https://picsum.photos/600/400?random=1",
    "https://picsum.photos/600/400?random=2",
    "https://picsum.photos/600/400?random=3",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Text style={styles.header}>Discover News</Text>
        <TouchableOpacity
          onPress={logout}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4,
            shadowColor: '#000',
          }}
        >
          <Text style={{ color: '#8E2DE2', fontWeight: 'bold', fontSize:12 }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search news..."
        placeholderTextColor="#8A8A8A"
        style={styles.input}
      />

      {loading && <ActivityIndicator size="large" style={styles.loading} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {!loading && articles.length === 0 && query.length > 1 && (
        <Text style={styles.empty}>No results found</Text>
      )}

      <FlatList
        data={articles}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ArticleCard item={item} onPress={(data) => setSelected(data)} />
        )}
      />


      <Modal visible={!!selected} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ScrollView
                horizontal
                pagingEnabled
                style={styles.imageSlider}
                showsHorizontalScrollIndicator={false}
              >
                {[
                  selected?.urlToImage,
                  ...fallbackImages,
                ].map((img, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: img || fallbackImages[0] }}
                    style={styles.modalImage}
                  />
                ))}
              </ScrollView>


              <Text style={styles.modalTitle}>{selected?.title}</Text>

              <Text style={styles.modalDesc}>
                {selected?.description || "No description available."}
              </Text>

              <Text style={styles.modalMeta}>
                {selected?.source?.name} •{" "}
                {new Date(selected?.publishedAt).toDateString()}
              </Text>

              <Pressable onPress={closeModal} style={styles.closeBtn}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#F3F0FF",
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
    color: "#2D2D2D",
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    borderColor: "#D8C9FF",
    marginBottom: 12,
  },

  loading: { marginTop: 20 },
  error: { color: "red", marginTop: 10 },
  empty: { color: "#555", marginTop: 20, textAlign: "center" },


  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContent: {
    height: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 16,
  },

  imageSlider: {
    height: 220,
    marginBottom: 12,
  },

  modalImage: {
    width: 320,
    height: 200,
    borderRadius: 12,
    marginHorizontal: 50
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },

  modalDesc: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
    marginBottom: 10,
  },

  modalMeta: {
    fontSize: 13,
    color: "#8A6BBE",
    marginBottom: 25,
  },

  closeBtn: {
    backgroundColor: "#8E2DE2",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
