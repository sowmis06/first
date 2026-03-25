import "./index.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Homescreen from './src/screens/Homescreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <Homescreen />
    </SafeAreaProvider>
  );
}

