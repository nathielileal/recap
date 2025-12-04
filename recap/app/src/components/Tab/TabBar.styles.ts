import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
  safeArea: {
    backgroundColor: theme.primary,
  },
  innerBar: {
    height: 60,
    marginHorizontal: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.primary,
  },
  tabButton: {
    flex: 1,
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});