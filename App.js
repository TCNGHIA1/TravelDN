import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainScreen from './components/MainScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor='#F18934' />
      <MainScreen></MainScreen>
    </SafeAreaProvider>
   
  );
}

