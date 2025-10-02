import { StarIcon } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../../../constants/colors";

interface Props {
    size?: number,
    rate: number,
    index: number,
    readonly?: boolean,
    onPress?: (value: number) => void;
}

export function StarRating({ index, rate, onPress, readonly = true, size = 10 }: Props) {
    const handleClick = (value: number) => {
        if (!readonly && onPress) {
            onPress(index);
        }
    }

    const filled = index <= rate;

    return (
        readonly
            ? <StarIcon key={index} size={size} weight={filled ? "fill" : "light"} color={filled ? COLORS.yellow : COLORS.terciary} />
            : <TouchableOpacity onPress={() => handleClick(index)}>
                <StarIcon key={index} size={size} weight={filled ? "fill" : "light"} color={filled ? COLORS.yellow : COLORS.terciary} />
            </TouchableOpacity>

    );
}