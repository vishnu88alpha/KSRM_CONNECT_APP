import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EventsUploadScreen = () => {
  const [venue, setVenue] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUploadEvent = () => {
    // Perform upload logic here, e.g., send data to server
    console.log('Uploaded event:', { venue, dateTime, title, description });
    // You can also add validation logic here before uploading
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Venue"
        value={venue}
        onChangeText={text => setVenue(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date & Time"
        value={dateTime}
        onChangeText={text => setDateTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadEvent}>
        <Text style={styles.buttonText}>Upload Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventsUploadScreen;
