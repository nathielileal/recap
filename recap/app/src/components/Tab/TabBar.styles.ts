import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.primary,
  },
  innerBar: {
    height: 60,
    marginHorizontal: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.primary,
  },
  tabButton: {
    flex: 1,
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});