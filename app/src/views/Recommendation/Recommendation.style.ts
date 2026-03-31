import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  innerScroll: {
    flex: 1,
    width: '100%',
  },
  container: {
  },
  context: {
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    margin: 15,
    fontSize: 14,
    color: theme.terciary,
    fontFamily: 'IBMPlexMono_700Bold_Italic',
  },
  about: {
    fontSize: 10,
    marginVertical: 10,
    textAlign: 'center',
    marginHorizontal: 10,
    color: theme.terciary,
    fontFamily: 'IBMPlexMono_300Light',
  },
  empty: {
    fontSize: 12,
    marginVertical: 10,
    textAlign: 'center',
    marginHorizontal: 10,
    color: theme.secondary,
    fontFamily: 'IBMPlexMono_700Bold',
  },
  btn: {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.secondary,
  },
  btnText: {
    fontSize: 12,
    marginHorizontal: 5,
    color: theme.terciary,
  },
  divider: {
    height: 10,
    width: '100%',
    marginVertical: 15,
    backgroundColor: theme.terciary,
  },
  input: {
    flex: 3,
    padding: 10,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: theme.darkGrey,
  },
  textInput: {
    width: "90%",
    paddingLeft: 5,
    color: theme.terciary,
    textAlignVertical: 'top',
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  footer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "column",
    borderColor: theme.terciary,
  },
  review: {
    marginVertical: 5,
    fontSize: 10,
    color: theme.terciary,
  },
  options: {
    flexDirection: "row",
  }
});
