import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
  listContainer: {
    gap: 16,
    width: "100%",
    height: "100%",
    marginBottom: 16,
  },
  card: {
    margin: 5,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.terciary,
    backgroundColor: theme.primary,
    justifyContent: "space-between",
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: "bold",
    color: theme.terciary,
  },
  btn: {
    marginLeft: 12,
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  btnText: {
    fontSize: 14,
    color: theme.terciary,
    fontFamily: 'IBMPlexMono_700Bold',
  },
  input: {
    height: 40,
    padding: 15,
    marginBottom: 10,
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
    marginTop: 20,
    textAlign: "center",
    color: theme.terciary,
  },
});
