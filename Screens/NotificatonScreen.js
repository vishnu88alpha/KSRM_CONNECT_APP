import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const NotificationScreen = () => {
  const notifications = [
    { id: 1, content: 'Quiz: A new Quiz link is shared ', time: '10:00 AM', date: '2024-03-01' },
    { id: 2, content: 'Announcement: A new announcement is posted in emergency Section', time: '10:30 AM', date: '2024-03-01' },
    { id: 3, content: 'Result: Seventh sem results are released in ResultScreen', time: '11:00 AM', date: '2024-03-01' },
    { id: 4, content: 'Event: A new event is Posted  ', time: '11:30 AM', date: '2024-03-02' },
    { id: 5, content: 'Assignemnts: A new Assigment is shared', time: '12:00 PM', date: '2024-03-02' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {notifications.map(notification => (
          <View key={notification.id} style={styles.notificationContainer}>
            <Text style={styles.notificationContent}>{notification.content}</Text>
            <Text style={styles.notificationDateTime}>{notification.date} At {notification.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    padding: 10,
  },
  notificationContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  notificationContent: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: 'white',
  },
  notificationDateTime: {
    fontSize: 12,
    color: '#666',
    backgroundColor: 'white',
  },
});

export default NotificationScreen;
