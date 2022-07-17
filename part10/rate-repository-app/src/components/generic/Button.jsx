import { Pressable } from "react-native";
import Text from "../Text";

const Button = ({ onClick, buttonText, backgroundStyle, textStyle }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <Pressable onPress={handleClick} style={backgroundStyle}>
      <Text style={textStyle}>{buttonText}</Text>
    </Pressable>
  );
};

export default Button;
