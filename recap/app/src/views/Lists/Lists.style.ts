import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: "#121212",
    padding: 24,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  addButton: {
    backgroundColor: "#E50914",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  container: {
    backgroundColor: "#121212",
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: "#fff",
  },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    backgroundColor: "#121212",
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
    gap: 16,
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

  imagePicker: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },

  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
    alignSelf: "flex-start",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },

  suggestionsList: {
    maxHeight: 150,
    marginBottom: 8,
  },

  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#222",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },

  suggestionText: {
    color: "#fff",
    fontSize: 14,
  },

  movieItem: {
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },

  movieText: {
    color: "#fff",
    fontSize: 12,
  },

  saveButton: {
    backgroundColor: "#E50914",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },

  logoutButton: {
    alignItems: "center",
  },

  cancelText: {
    color: "#fff",
    fontSize: 14,
  },
});
