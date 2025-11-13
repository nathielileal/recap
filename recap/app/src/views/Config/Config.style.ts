import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
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
    color: COLORS.secondary,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: { 
    width: 150,
    height: 150,
    borderRadius: 55, 
    position: 'relative', 
  },
  image: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 80,
    overflow: 'hidden',
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.secondary,
  },
  icon: { 
    right: 0,
    bottom: 0, 
    padding: 8, 
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: COLORS.secondary, 
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    color: COLORS.terciary,
    fontFamily: 'IBMPlexMono_400Regular',
  },
  section: {
    width: "90%",
    marginTop: 20,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderColor: COLORS.secondary,
    justifyContent: "space-between",
  },
  optionText: {
    color: COLORS.terciary,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },

  // notification
  label: {
    fontSize: 16,
    marginTop: 40,
    color: COLORS.terciary,
    fontFamily: 'IBMPlexMono_400Regular',
  },
  configRow: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  configText: {
    color: COLORS.terciary,
    fontSize: 18,
  },
});