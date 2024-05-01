import { StyleSheet, View } from 'react-native';
import Chronometer from './src/chronometer';

export default function App() {
  //AGREGAR UN MAIN ACA CON LA NAVEGACION PARA CADA VISTA
  return (
    <View style={styles.container}>
      <Chronometer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50
  }
});
