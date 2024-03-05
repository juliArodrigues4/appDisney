import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

const request = async(callback) => {
  const response = await fetch('https://api.disneyapi.dev/character');
  const parsed = await response.json();
  callback(parsed.data);
}

export default function App() {
  const [registros, setRegistros] = useState([]);
  useEffect(()=> {
    request(setRegistros);
  }, [])

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
         <Text style={styles.title}>Animações da Disney</Text>
      </View>
      <FlatList
        data={registros}
        renderItem={({item}) =>
        <View style={styles.cont}>
          <Text style={styles.texto}>{item.films.join(', ')} {'\n'}</Text> 
          <Text style={styles.texto}>Séries: {item.tvShows}</Text>
          <Image source={{ uri: item.imageUrl }} style={styles.imagem}/>
        </View>
      }
      />    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(25, 25, 112, 0.91)',
  },
  imagem: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  header: {
    width: '100%',
    height: 50,
    textAlign: 'center',
    marginTop: 25,
  },
  cont: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    margin: 15,
    padding: 5,
  },
  texto: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
    flexWrap: 'wrap',
    marginTop: 5,
  },
  title:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
  }

});
