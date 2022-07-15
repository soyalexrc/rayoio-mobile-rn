import {Alert} from "react-native";

export const AsyncAlert = (title, msg) => new Promise((resolve) => {
  Alert.alert(
    title,
    msg,
    [
      {
        text: 'Ok',
        onPress: () => {
          resolve(true);
        },
      },
      {
        text: 'Cancelar',
        onPress: () => {
          resolve(false);
        },
      },
    ],
    {cancelable: false},
  );
});
