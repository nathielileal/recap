import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
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
  contentContainer: {
    width: "100%",
    paddingBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 28,
    marginTop: 28,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginBottom: 26,
    marginRight: 10,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  editIcon: {
    marginLeft: 8,
    marginTop: 2,
  },
  error: {
    color: "#E50914",
    marginBottom: 12,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E50914",
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  logoutButton: {
    alignItems: "center",
    marginTop: 8,
  },
  tabSelector: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    marginBottom: 12,
    marginTop: 6,
    width: "100%",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: "#E50914",
  },
  tabText: {
    color: "#fff",
    fontSize: 16,
  },
  configRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  configText: {
    color: "#fff",
    fontSize: 16,
  },
});