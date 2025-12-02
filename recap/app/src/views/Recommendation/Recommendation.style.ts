import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
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
    flex: 1,
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
    marginVertical: 5,
    textAlign: 'center',
    marginHorizontal: 10,
    color: theme.terciary,
    fontFamily: 'IBMPlexMono_300Light',
  },
  btn: {
    padding: 10,
    borderRadius: 50,
    marginVertical: 10,
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
    height: 1,
    width: '100%',
    marginVertical: 15,
    backgroundColor: theme.terciary,
  },
});
