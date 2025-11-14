import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: theme.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
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
    color: theme.grey,
    fontSize: 16,
    fontWeight: "bold",
  },
  tabActiveText: {
    color: theme.terciary,
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    gap: 16,
    width: "100%",
    height: "100%",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.primary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.terciary,
    padding: 16,
    margin: 5,
    justifyContent: "space-between",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: theme.darkGrey,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.terciary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: theme.grey,
  },
  addButtonSmall: {
    backgroundColor: theme.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 12,
  },
  addButtonSmallText: {
    color: theme.terciary,
    fontSize: 14,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: theme.darkGrey,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 12,
  },
  removeButtonText: {
    color: theme.terciary,
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: theme.darkGrey,
    color: theme.terciary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  emptyText: {
    color: theme.grey,
    textAlign: "center",
    marginTop: 20,
  },
});
