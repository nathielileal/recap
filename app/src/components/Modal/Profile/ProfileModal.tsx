import { EyeIcon, EyeSlashIcon, XIcon } from "phosphor-react-native";
import { Keyboard, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useThemeContext } from "../../../provider/ThemeProvider";
import { useProfileViewModel } from '../../../viewmodels/profile.viewlmodel';
import { stylesheet } from "./ProfileModal.styles";
import { useMemo } from "react";

interface Props {
    userId: string;
    initialName: string;
    initialEmail: string;
    onClosed: () => void,
}

export function ProfileModal({ userId, initialName, initialEmail, onClosed }: Props) {
    const { username, setUsername, email, setEmail, password, setPassword, showPassword, setShowPassword } = useProfileViewModel();
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    const handleSave = async () => {
        onClosed();
    };

    return (
        <Modal visible transparent animationType="slide">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.modal}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Editar Perfil</Text>

                            <TouchableOpacity onPress={() => onClosed()}>
                                <XIcon color={theme.secondary} size={25} weight="thin"></XIcon>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={styles.title}>Nome de usuário:</Text>
                            <TextInput value={initialName ?? username} onChangeText={setUsername} style={styles.input} autoCapitalize="none" placeholder="Insira seu nome de usuário" placeholderTextColor={theme.grey}></TextInput>

                            <Text style={styles.title}>E-mail:</Text>
                            <TextInput value={initialEmail ?? email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" placeholder="exemplo@domain.com" placeholderTextColor={theme.grey}></TextInput>

                            <Text style={styles.title}>Senha:</Text>
                            <View style={styles.password}>
                                <TextInput value={password} onChangeText={setPassword} secureTextEntry={!showPassword} style={[styles.input, { flex: 1 }]} autoCapitalize="none" placeholder="Insira a sua senha" placeholderTextColor={theme.grey}></TextInput>

                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                    {showPassword ? <EyeSlashIcon color={theme.grey} size={24} /> : <EyeIcon color={theme.grey} size={24} />}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.btnView}>
                            <TouchableOpacity style={styles.btn} onPress={handleSave}>
                                <Text style={styles.btnText}>SALVAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}