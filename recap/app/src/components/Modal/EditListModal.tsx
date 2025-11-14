import * as ImagePicker from "expo-image-picker";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { stylesheet } from "../../views/Lists/Lists.style";
import { useThemeContext } from "../../provider/ThemeProvider";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (
    id: number,
    name: string,
    desc: string,
    image?: string,
    items?: string[],
    isPublic?: boolean
  ) => void;
  onDelete: (id: number) => void;
  list: {
    id: number;
    name: string;
    desc: string;
    image?: string;
    items: string[];
    isPublic: boolean;
  };
}

const EditListModal: React.FC<Props> = ({
  visible,
  onClose,
  onSave,
  onDelete,
  list,
}) => {
  const [name, setName] = useState(list.name);
  const [desc, setDesc] = useState(list.desc);
  const [image, setImage] = useState<string | undefined>(list.image);
  const [isPublic, setIsPublic] = useState(list.isPublic);
  const [movies, setMovies] = useState<string[]>(list.items);
  const [movieSearch, setMovieSearch] = useState("");
  const [suggestions, setSuggestions] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const addSuggestion = (title: string) => {
    if (!movies.includes(title)) setMovies([...movies, title]);
    setMovieSearch("");
    setSuggestions([]);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Editar lista</Text>

          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.cardImage} resizeMode="cover" />
            ) : (
              <Text style={styles.label}>Escolher imagem</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Título</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Pública</Text>
            <Switch value={isPublic} onValueChange={setIsPublic} />
          </View>

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={desc}
            onChangeText={setDesc}
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

          {loading && <Text>Carregando...</Text>}

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
            style={{ marginVertical: 8 }}
            renderItem={({ item }) => (
              <View style={styles.movieItem}>
                <Text style={styles.movieText}>{item}</Text>
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => onSave(list.id, name, desc, image, movies, isPublic)}
          >
            <Text style={styles.addButtonText}>Salvar alterações</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => onDelete(list.id)}
          >
            <Text style={styles.cancelText}>Remover lista</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditListModal;
