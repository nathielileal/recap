import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },

  scroll: {
    flexGrow: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },

  container: {
    width: "100%",
    maxWidth: 660,
    height: 800, // tamanho fixo, igual ao Profile
    backgroundColor: "#121212",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 76,
  },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    backgroundColor: "#121212",
    borderRadius: 12,
  },

  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },

  tabText: {
    color: "#aaa",
    fontSize: 16,
    fontWeight: "bold",
  },

  tabActiveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  tabUnderline: {
    height: 2,
    backgroundColor: "#E50914",
    marginTop: 4,
    borderRadius: 2,
  },

  listContainer: {
    width: "100%",
    gap: 16,
    flexGrow: 1,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 16,
  },

  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: "#333",
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#fff",
  },

  cardSubtitle: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 4,
  },

  cardDescription: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 8,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardDate: {
    fontSize: 12,
    color: "#888",
  },

  cardItems: {
    fontSize: 12,
    color: "#888",
  },

  addButton: {
    backgroundColor: "#E50914",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: "#121212",
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: "#fff",
  },

  /* ===== Adicionados para CreateListModal ===== */

  imagePicker: {
    width: "100%",
    height: 160,
    backgroundColor: "#333",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },

  input: {
    width: "100%",
    backgroundColor: "#1c1c1c",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 12,
  },

  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },

  suggestionsList: {
    maxHeight: 150,
    marginBottom: 8,
    width: "100%",
  },

  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  suggestionText: {
    color: "#fff",
    fontSize: 14,
  },

  movieItem: {
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },

  movieText: {
    color: "#fff",
    fontSize: 14,
  },

  saveButton: {
    backgroundColor: "#E50914",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    width: "100%",
  },

  logoutButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },

  cancelText: {
    color: "#E50914",
    fontSize: 16,
    fontWeight: "bold",
  },
});
