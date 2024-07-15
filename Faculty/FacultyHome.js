import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebase } from '../FirebaseConfig';

const FacultyHome = ({ navigation }) => {

 const navigateToAttendanceMarking = () => {
    navigation.navigate('AttendanceMkScreen');
 };

 const navigateToAssignmentsScreen = () => {
    navigation.navigate('AssignmentsScreen');
 };

 const navigateToAnnouncementScreen = () => {
    navigation.navigate('AnnouncementScreen');
 };

 const navigateToConductingQuizScreen = () => {
    navigation.navigate('ConductingQuizScreen');
 };

 /*const navigateToGradingScreen = () => {
    navigation.navigate('GradingScreen');
 };
       <TouchableOpacity style={styles.button} onPress={navigateToGradingScreen}>
        <Icon name="graduation-cap" size={30} color="black" />
        <Text style={styles.buttonText}>Grade</Text>
      </TouchableOpacity>
 */

 const navigateToFacultyProfileScreen = () => {
    navigation.navigate('FacultyProfileScreen');
 };

 const navigateToEventUploadScreen = () => {
    navigation.navigate('EventUploadScreen');
 };

 const handleLogout = async () => {
    try {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', onPress: async () => {
            await firebase.auth().signOut();
            navigation.replace('CommonStackScreen', { screen: 'LoadingScreen' });
          }},
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error signing out:', error);
    }
 };

 return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.button} onPress={navigateToAttendanceMarking}>
        <Icon name="check-square" size={30} color="black" />
        <Text style={styles.buttonText}>Attendance Marking</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToAssignmentsScreen}>
        <Icon name="book" size={30} color="black" />
        <Text style={styles.buttonText}>Assignments</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToConductingQuizScreen}>
        <Icon name="question-circle" size={30} color="black" />
        <Text style={styles.buttonText}>Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToAnnouncementScreen}>
        <Icon name="bullhorn" size={30} color="black" />
        <Text style={styles.buttonText}>Announcements</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToEventUploadScreen}>
        <Icon name="calendar" size={30} color="black" />
        <Text style={styles.buttonText}>Upload Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToFacultyProfileScreen}>
        <Icon name="user" size={30} color="black" />
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton} onPress={handleLogout}>
        <Icon name="sign-out" size={30} color="#e74c3c" />
        <Text style={styles.settingsButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
 );
};

const styles = StyleSheet.create({
 container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e90ff', // Light background color
    borderRadius: 7,
 },
 button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 3, // Add elevation for a card-like effect
 },
 buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
 },
 settingsButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 3, // Add elevation for a card-like effect
 },
 settingsButtonText: {
    color: '#e74c3c',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
 },
});

export default FacultyHome;
