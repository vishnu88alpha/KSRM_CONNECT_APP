import React, { useState } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, ImageBackground, Alert, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebase } from '../FirebaseConfig';

const EventUploadScreen = () => {
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [date, setDate] = useState(new Date());
 const [location, setLocation] = useState('');
 const [link, setLink] = useState('');
 const [show, setShow] = useState(false);

 const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(selectedDate);
 };

 const handleSubmit = async () => {
  if (!title || !date || !location) {
    Alert.alert('Missing Fields', 'Please fill in all mandatory fields.');
    return;
  }

  const currentUser = firebase.auth().currentUser;
  const userEmail = currentUser ? currentUser.email : 'Unknown';

  try {
    await firebase.firestore().collection('events').add({
      title,
      description,
      date,
      location,
      link: link || null,
      uploadedBy: userEmail,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setTitle('');
    setDescription('');
    setDate(new Date());
    setLocation('');
    setLink('');

    // Alert when submission is successful
    Alert.alert('Success', 'Event submitted successfully!');
  } catch (error) {
    console.error('Error adding event: ', error);
  }
};


 return (
    <ImageBackground source={require('../assets/event.png')} style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Event Title *"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Event Description"
      />
      <TouchableOpacity style={styles.input} onPress={() => setShow(true)}>
        <Text style={styles.dateInputLabel}>Event Date: {date ? (typeof date === 'object' ? date.toDateString() : '') : ''}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Event Location *"
      />
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="Event Link (Optional)"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Event</Text>
      </TouchableOpacity>
    </ImageBackground>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
 },
 title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
 },
 input: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
 },
 dateInputLabel: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000',
 },
 submitButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
 },
 buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
 },
});

export default EventUploadScreen;
