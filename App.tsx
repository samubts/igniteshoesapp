import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NotificationClickEvent, OneSignal } from'react-native-onesignal';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { tagUserInfoCreat } from './src/notifications/notificationsTags';
import { CartContextProvider } from './src/contexts/CartContext';

OneSignal.initialize("e579c798-eb11-405d-bbea-1ae4fcba9f93")
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreat()

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result

      switch(actionId) {
        case "1":
          console.log("Ver todos")
          break
        case "2":
          console.log("Ver pedido")
          break
        default:
          console.log("Nenhum botão de ação selecionado.")
          break
      }
    }

    OneSignal.Notifications.addEventListener("click", handleNotificationClick)

    return () => {
      OneSignal.Notifications.removeEventListener("click", handleNotificationClick)
    }
  },[])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}