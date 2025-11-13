import { EyeIcon, EyeSlashIcon, XIcon } from "phosphor-react-native";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../../constants/colors";
import { useProfileViewModel } from '../../../viewmodels/profile.viewlmodel';
import { styles } from "./ProfileModal.styles";

interface Props {
    id_user: string;
    onClosed: () => void,
}

export function ProfileModal({ id_user, onClosed }: Props) {
    const { username, setUsername, email, setEmail, password, setPassword, showPassword, setShowPassword } = useProfileViewModel();

    const handleSave = async () => {
        // const success = await saveReview();

        // if (success) {
            onClosed();

        //     alert("Avaliação salva com sucesso!");
        // } else {
        //     alert("Erro ao salvar avaliação. Tente novamente.");
        // }
    };

    return (
        <Modal visible transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Editar Perfil</Text>

                        <TouchableOpacity onPress={() => onClosed()}>
                            <XIcon color={COLORS.secondary} size={25} weight="thin"></XIcon>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.title}>Nome de usuário:</Text>
                        <TextInput value={username} onChangeText={setUsername} style={styles.input} autoCapitalize="none" placeholder="Insira seu nome de usuário" placeholderTextColor={COLORS.grey}></TextInput>

                        <Text style={styles.title}>E-mail:</Text>
                        <TextInput value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" placeholder="exemplo@domain.com" placeholderTextColor={COLORS.grey}></TextInput>

                        <Text style={styles.title}>Senha:</Text>
                        <View style={styles.password}>
                            <TextInput value={password} onChangeText={setPassword} secureTextEntry={!showPassword} style={[styles.input, { flex: 1 }]} autoCapitalize="none" placeholder="Insira a sua senha" placeholderTextColor={COLORS.grey}></TextInput>
                           
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                {showPassword ? <EyeSlashIcon color={COLORS.grey} size={24} /> : <EyeIcon color={COLORS.grey} size={24} />}
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
        </Modal>
    );
}