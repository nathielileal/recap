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
    height: 800,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 76,
  },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },

  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
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

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#333",
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

  addButtonSmall: {
    backgroundColor: "#E50914",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 12,
  },

  addButtonSmallText: {
    color: "#fff",
    fontSize: 14,
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

  input: {
    backgroundColor: "#222",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },

  emptyText: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 20,
  },
});
