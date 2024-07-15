import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Modal, Image, TouchableOpacity, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  useEffect(() => {
    // Any initialization or side effects can be handled here
  }, []);

  const [fileInfo, setFileInfo] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedAssignmentNumber, setSelectedAssignmentNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const pickDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        multiple: true,
      });

      if (!result.cancelled && result.assets.length > 0) {
        const newDocuments = result.assets.map(doc => ({
          name: doc.name,
          type: 'application/pdf',
          uri: doc.uri
        }));
        setFileInfo([...fileInfo, ...newDocuments]);
      } else {
        console.log('Document picking canceled or no documents selected');
      }
    } catch (error) {
      console.log('Error picking documents:', error);
      Alert.alert('Error', 'Failed to pick documents. Please try again.');
    }
  };

  const uploadFiles = () => {
    if (!selectedSubject || !selectedAssignmentNumber) {
      Alert.alert('Error', 'Please select both subject and assignment number.');
      return;
    }

    Alert.alert('Assignment Submitted', `You have submitted the assignment for ${selectedSubject} - ${selectedAssignmentNumber}.`);

    setSelectedSubject('');
    setSelectedAssignmentNumber('');
    setFileInfo([]);
    setModalVisible(false);
  };

  const clearFiles = () => {
    setFileInfo([]);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/1.jpeg')} style={styles.backgroundImage} resizeMode="cover" />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedSubject}
                style={styles.dropdown}
                onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}
              >
                <Picker.Item label="Select Subject" value="" />
                <Picker.Item label="AI" value="AI" />
                <Picker.Item label="ML" value="ML" />
                <Picker.Item label="Compiler Design" value="Compiler Design" />
              </Picker>
              <Picker
                selectedValue={selectedAssignmentNumber}
                style={styles.dropdown}
                onValueChange={(itemValue, itemIndex) => setSelectedAssignmentNumber(itemValue)}
              >
                <Picker.Item label="Select Assignment Number" value="" />
                <Picker.Item label="Assignment 1" value="Assignment 1" />
                <Picker.Item label="Assignment 2" value="Assignment 2" />
                <Picker.Item label="Assignment 3" value="Assignment 3" />
              </Picker>
              <TouchableOpacity onPress={pickDocuments} style={styles.uploadIcon}>
                <FontAwesomeIcon icon={faCloudUploadAlt} size={30} color="#778899" />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.fileInfoContainer}>
              {fileInfo.length > 0 && (
                <View style={styles.fileListContainer}>
                  {fileInfo.map((file, index) => (
                    <View key={index} style={styles.fileItemContainer}>
                      <Text style={styles.fileNameText}>File Name: {file.name}</Text>
                      <Text style={styles.fileTypeText}>File Type: {file.type}</Text>
                    </View>
                  ))}
                  <View style={styles.buttonGroup}>
                    <Button title="Submit" onPress={uploadFiles} color="#7b68ee" />
                    <Button title="Clear" onPress={clearFiles} color="#7b68ee" />
                  </View>
                </View>
              )}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button title="Close" onPress={() => setModalVisible(false)} color="#ccc" />
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.chooseFileButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.chooseFileButtonText}>Choose File</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  chooseFileButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
  },
  chooseFileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  fileInfoContainer: {
    flexGrow: 1,
  },
  fileListContainer: {
    marginTop: 20,
  },
  fileItemContainer: {
    marginBottom: 10,
  },
  fileNameText: {
    fontWeight: 'bold',
  },
  fileTypeText: {
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  uploadIcon: {
    marginLeft: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});
