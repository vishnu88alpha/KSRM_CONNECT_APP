import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import Modal from 'react-native-modal';

const developers = [
  { name: 'N Uma Maheswari Devi', image: require('../assets/UM.jpg') },
  { name: 'L Tharun', image: require('../assets/LT.jpg') },
  { name: 'K Jayasree', image: require('../assets/KJ.jpg') },
  { name: 'K Harshitha', image: require('../assets/KH.jpg') },
  { name: 'M Vishnu Prabu', image: require('../assets/MV.jpg') },
  { name: 'P Sai Krishna', image: require('../assets/SK.jpg') },
];

const AboutScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  const openModal = (developer) => {
    setSelectedDeveloper(developer);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDeveloper(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {developers.map((developer, index) => (
        <Card key={index} style={styles.card}>
          <TouchableOpacity onPress={() => openModal(developer)}>
            <Card.Cover source={developer.image} />
          </TouchableOpacity>
          <Card.Content>
            <View style={styles.content}>
              <Text style={styles.name}>{developer.name}</Text>
            </View>
          </Card.Content>
        </Card>
      ))}

      {selectedDeveloper && (
        <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
          <View style={styles.modalContent}>
            <Image source={selectedDeveloper.image} style={styles.fullscreenImage} />
            <Text style={styles.fullscreenName}>{selectedDeveloper.name}</Text>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  fullscreenImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  fullscreenName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AboutScreen;
