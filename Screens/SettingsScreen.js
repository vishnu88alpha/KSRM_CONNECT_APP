import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { firebase } from '../FirebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';


const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = async () => {
    try {
      // Display confirmation dialog
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            onPress: async () => {
              await firebase.auth().signOut();
              // Navigate to the login screen after logout
              navigation.replace('CommonStackScreen', { screen: 'LoadingScreen' });
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(prev => !prev);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(prev => !prev);
  };

  const handleFeedback = () => {
    // Implement feedback functionality (e.g., open a feedback form)
    Alert.alert('Feedback', 'Thank you for your feedback!');
  };

  const navigateToAboutScreen = () => {
    navigation.navigate('AboutScreen'); // Navigate to the AboutScreen component
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>

      <TouchableOpacity style={styles.settingItem} onPress={handleFeedback}>
        <Text style={styles.settingText}>Give Feedback</Text>
        <Icon name="comment" size={20} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={navigateToAboutScreen}>
        <Text style={styles.settingText}>About Developers</Text>
        <Icon name="users" size={20} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
        <Text style={[styles.settingText, { color: 'red' }]}>Log Out</Text>
        <Icon name="sign-out" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
  },
  settingText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
