import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
  header: {
    width: "100%",
    paddingBottom: 15,
  },
  input: {
    height: 40,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.darkGrey,
  },
  textInput: {
    width: "80%",
    paddingLeft: 5,
    color: theme.terciary,
  },
  empty: {
    fontSize: 18,
    textAlign: "center",
    color: theme.terciary,
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.terciary,
    backgroundColor: theme.primary,
  },
  cardImage: {
    width: 80,
    height: 80,
    opacity: 0.3,
    borderRadius: 50,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.terciary,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
  },
  cardText: {
    flex: 1,
  },
  cardOptions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: theme.terciary,
    fontFamily: 'IBMPlexMono_400Regular',
  },
  cardDescription: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 10,
    color: theme.terciary,
  },
  cardItems: {
    fontSize: 12,
    color: theme.grey,
  },
  btn: {
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: theme.secondary,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.terciary,
    fontFamily: 'IBMPlexMono_400Regular',
  },
});
