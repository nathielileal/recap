// src/components/CreateListModal.tsx

import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { movieApi } from "../services/movie.service";
import { styles } from "../views/Lists/Lists.style";

interface Props {
  onClose: () => void;
  onCreate: (
    name: string,
    desc: string,
    image?: string,
    items?: string[],
    isPublic?: boolean
  ) => void;
}

interface MovieSuggestion {
  id: number;
  title: string;
}

const CreateListModal: React.FC<Props> = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<string>();
  const [isPublic, setIsPublic] = useState(false);

  const [movieSearch, setMovieSearch] = useState("");
  const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([]);
  const [movies, setMovies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Pede permissão para acessar a galeria
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Precisamos de permissão para acessar sua galeria.");
      }
    })();
  }, []);

  // Busca sugestões no movieApi sempre que movieSearch mudar
  useEffect(() => {
    const fetchSuggestions = async () => {
      const query = movieSearch.trim();
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const response = await movieApi.get("/search/movie", {
          params: { query },
        });
        const results = response.data.results || [];
        setSuggestions(
          results.map((f: any) => ({
            id: f.id,
            title: f.title,
          }))
        );
      } catch (e) {
        console.warn("Erro buscando filmes", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [movieSearch]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    const canceled =
      "canceled" in result ? (result as any).canceled : (result as any).cancelled;
    const assets = (result as any).assets || [];
    if (!canceled && assets.length > 0) {
      setImage(assets[0].uri);
    }
  };

  const addSuggestion = (title: string) => {
    if (!movies.includes(title)) {
      setMovies((prev) => [...prev, title]);
    }
    setMovieSearch("");
    setSuggestions([]);
  };

  return (
    <Modal visible transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Criar nova lista</Text>

          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.label}>Exportar imagem</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nome da lista"
            placeholderTextColor="#888"
          />

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Pública</Text>
            <Switch value={isPublic} onValueChange={setIsPublic} />
          </View>

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={desc}
            onChangeText={setDesc}
            placeholder="Descrição"
            placeholderTextColor="#888"
            multiline
          />

          <Text style={styles.label}>Filmes</Text>
          <TextInput
            style={[styles.input, { marginBottom: 8 }]}
            value={movieSearch}
            onChangeText={setMovieSearch}
            placeholder="Procurar filme..."
            placeholderTextColor="#888"
          />

          {loading && (
            <ActivityIndicator
              color="#E50914"
              style={{ marginVertical: 8 }}
            />
          )}

          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id.toString()}
            style={styles.suggestionsList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => addSuggestion(item.title)}
                style={styles.suggestionItem}
              >
                <Text style={styles.suggestionText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

          <FlatList
            data={movies}
            keyExtractor={(item, i) => `${item}-${i}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.movieItem}>
                <Text style={styles.movieText}>{item}</Text>
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              onCreate(name, desc, image, movies, isPublic);
              onClose();
            }}
          >
            <Text style={styles.addButtonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreateListModal;
