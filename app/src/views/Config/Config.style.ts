import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
  scroll: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.primary,
  },
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

  // profile
  error: {
    marginBottom: 12,
    color: theme.secondary,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  headerCam: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: theme.primary,
  },
  headerItemLeft: {
    flex: 1,
  },
  headerItemRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 25,
    color: theme.terciary,
    fontFamily: 'IBMPlexMono_400Regular',
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  icon: {
    borderRadius: 50,
    marginLeft: 30,
  },
  image: {
    width: 140,
    height: 140,
    borderWidth: 2,
    borderRadius: 80,
    overflow: 'hidden',
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.secondary,
  },
  info: {
    marginTop: 5,
    marginHorizontal: 15,
  },
  name: {
    fontSize: 20,
    color: theme.terciary,
    fontFamily: 'IBMPlexMono_700Bold',
  },
  details: {
    fontSize: 12,
    marginVertical: 15,
    marginHorizontal: 5,
    color: theme.terciary,
    fontFamily: 'IBMPlexMono_400Regular',
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  follow: {
    fontSize: 10,
    marginRight: 5,
    marginVertical: 5,
    color: theme.terciary,
    fontFamily: 'IBMPlexMono_400Regular',
  },
  follows: {
    fontSize: 12,
    marginRight: 5,
    fontWeight: "bold",
    color: theme.terciary,
  },
  section: {
    width: "100%",
    marginTop: 20,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 5,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderColor: theme.secondary,
    justifyContent: "space-between",
  },
  optionText: {
    color: theme.terciary,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },

  // notification
  label: {
    fontSize: 16,
    marginTop: 40,
    color: theme.terciary,
    fontFamily: 'IBMPlexMono_700Bold',
  },
  configRow: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  configText: {
    color: theme.terciary,
    fontSize: 16,
  },
});