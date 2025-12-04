import { StarIcon } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useThemeContext } from "../../provider/ThemeProvider";

interface Props {
    size?: number,
    rate: number,
    index: number,
    readonly?: boolean,
    onPress?: (value: number) => void;
}

export function StarRating({ index, rate, onPress, readonly = true, size = 10 }: Props) {
    const { theme } = useThemeContext();
    
    const handleClick = (value: number) => {
        if (!readonly && onPress) {
            onPress(index);
        }
    }

    const filled = index <= rate;

    return (
        readonly
            ? <StarIcon key={index} size={size} weight={filled ? "fill" : "light"} color={filled ? theme.yellow : theme.terciary} />
            : <TouchableOpacity onPress={() => handleClick(index)}>
                <StarIcon key={index} size={size} weight={filled ? "fill" : "light"} color={filled ? theme.yellow : theme.terciary} />
            </TouchableOpacity>

    );
}