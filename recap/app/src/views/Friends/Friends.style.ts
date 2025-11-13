import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: COLORS.primary,
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
    color: COLORS.grey,
    fontSize: 16,
    fontWeight: "bold",
  },
  tabActiveText: {
    color: COLORS.terciary,
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
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.terciary,
    padding: 16,
    margin: 5,
    justifyContent: "space-between",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: COLORS.darkGrey,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.terciary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.grey,
  },
  addButtonSmall: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 12,
  },
  addButtonSmallText: {
    color: COLORS.terciary,
    fontSize: 14,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: COLORS.darkGrey,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 12,
  },
  removeButtonText: {
    color: COLORS.terciary,
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: COLORS.darkGrey,
    color: COLORS.terciary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  emptyText: {
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 20,
  },
});
