import React, {useState, useEffect} from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
      api.get('/repositories').then(response => {
          console.log(response)
          setProjects(response.data);
      })
  }, [])

  async function handleLikeRepository(id) {

    const response = await api.post(`/repositories/${id}/like`)
  
    if (response.status === 200){
      const atualizaProjeto = projects.map(project => {
        return project.id === id ? response.data : project;
      });
      setProjects(atualizaProjeto);
    }
  
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item : project}) => (
          <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>{project.title}</Text>

            <View style={styles.techsContainer}>
                {project.techs.map(techs => <Text style={styles.tech} key={techs}> {techs} </Text>)}
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                testID={`repository-likes-${project.id}`}
              >
              {project.likes} curtidas
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(`${project.id}`)}
              testID={`like-button-${project.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>
          )}>
        </FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    color: '#7159c1',
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: '#105077',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#FFF",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#105077",
    padding: 15,
  },
});
