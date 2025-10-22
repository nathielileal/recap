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
    backgroundColor: "#121212",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 28,
        height: 800, // tamanho fixo, igual ao Profile

    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 76,
  },

  listContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 16,
    justifyContent: "space-between",
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },

  cardSubtitle: {
    fontSize: 14,
    color: "#ccc",
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

  removeButton: {
    backgroundColor: "#444",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 12,
  },

  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
