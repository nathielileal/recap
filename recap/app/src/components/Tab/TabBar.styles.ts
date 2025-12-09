import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
  safeArea: {
    backgroundColor: theme.primary,
  },
  innerBar: {
    height: 60,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.primary,
  },
  tabButton: {
    margin: 0,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});