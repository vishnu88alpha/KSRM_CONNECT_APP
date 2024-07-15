import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = ({ navigation }) => {
  const buttons = [
    { icon: 'calendar-alt', title: 'Events', screen: 'EventsScreen' },
    { icon: 'clipboard-list', title: 'Attendance', screen: 'AttendanceScreen' },
    { icon: 'poll', title: 'Results', screen: 'ResultsScreen' },
    { icon: 'book-open', title: 'Library', screen: 'LibraryScreen' },
    { icon: 'tasks', title: 'Assignment', screen: 'Assignment' },
    { icon: 'clock', title: 'TimeTable', screen: 'TimeTableScreen' },
    { icon: 'bell', title: 'Announcements', screen: 'StudentAnnouncementsScreen' },
    { icon: 'file-alt', title: 'Quiz', screen: 'QuizScreen' },
    { icon: 'file-alt', title: 'PostedAssignments', screen: 'PostedAssignments' },
    { icon: 'flask', title: 'Trial', screen: 'TrialScreen' },
    { icon: 'cogs', title: 'Develop', screen: 'DevelopScreen' },
  ];

  const timetableData = [
    { day: 'Monday', class: 'Math', time: '09:00 AM-10:00' },
    { day: 'Monday', class: 'Physics', time: '10:00-11:00' },
    { day: 'Monday', class: 'C programming', time: '11:00 AM-12PM' },
    { day: 'Monday', class: 'Python', time: '1:00 PM- 2:00 PM' },
    { day: 'Monday', class: 'Science', time: '2:00- 3:00 ' },
    { day: 'Monday', class: 'Chemistry', time: '3:00- 4:00 PM' },

    { day: 'Tuesday', class: 'Math', time: '09:00 AM-10:00 AM' },
    { day: 'Tuesday', class: 'Physics', time: '10:00 AM-11:00 AM' },
    { day: 'Tuesday', class: 'Chemistry', time: '11:00 AM-12 PM' },
    { day: 'Tuesday', class: 'IT workshop', time: '1:00 PM- 2:00 PM' },
    { day: 'Tuesday', class: 'Java', time: '2:00 PM-3:00 PM' },
    { day: 'Tuesday', class: 'C programming', time: '3:00 PM-4:00 PM' },
    
    { day: 'Wednesday', class: 'Chemistry', time: '09:00 AM-10:00 AM' },
    { day: 'Wednesday', class: 'Physics', time: '10:00 AM-11:00 AM' },
    { day: 'Wednesday', class: 'C programming', time: '11:00 AM-12 PM' },
    { day: 'Wednesday', class: 'Java', time: '1:00 PM- 2:00 PM' },
    { day: 'Wednesday', class: 'Sports', time: '2:00 PM-3:00 PM' },
    { day: 'Wednesday', class: 'Library', time: '3:00 PM-4:00 PM' },

    { day: 'Thursday', class: 'Python', time: '09:00 AM-10:00 AM' },
    { day: 'Thursday', class: 'Physics', time: '10:00 AM-11:00 AM' },
    { day: 'Thursday', class: 'C programming', time: '11:00 AM-12 PM' },
    { day: 'Thursday', class: 'Chemistry', time: '1:00 PM- 2:00 PM' },
    { day: 'Thursday', class: 'Sports', time: '2:00 PM-3:00 PM' },
    { day: 'Thursday', class: 'Library', time: '3:00 PM-4:00 PM' },

    { day: 'Friday', class: 'C programming', time: '09:00 AM-10:00 AM' },
    { day: 'Friday', class: 'Physics', time: '10:00 AM-11:00 AM' },
    { day: 'Friday', class: 'C programming', time: '11:00 AM-12 PM' },
    { day: 'Friday', class: 'Java', time: '1:00 PM- 2:00 PM' },
    { day: 'Friday', class: 'Chemistry', time: '2:00 PM-3:00 PM' },
    { day: 'Friday', class: 'Library', time: '3:00 PM-4:00 PM' },

    { day: 'Saturday', class: 'Chemistry', time: '09:00 AM-10:00 AM' },
    { day: 'Saturday', class: 'Physics', time: '10:00 AM-11:00 AM' },
    { day: 'Saturday', class: 'Library', time: '11:00 AM-12 PM' },
    { day: 'Saturday', class: 'Java', time: '1:00 PM- 2:00 PM' },
    { day: 'Saturday', class: 'C programming', time: '2:00 PM-3:00 PM' },
    { day: 'Saturday', class: 'BEEE', time: '3:00 PM-4:00 PM' },
    // Add more classes for other days
  ];

  const iconColors = {
    'calendar-alt': '#FF5733', // Orange
    'clipboard-list': '#3498DB', // Blue
    'poll': '#9B59B6', // Purple
    'book-open': '#27AE60', // Green
    'user-circle': '#E74C3C', // Red
    'tasks': '#F39C12', // Yellow
    'clock': '#1ABC9C', // Turquoise
    'bell': '#8E44AD', // Violet
    'flask': '#2980B9', // Dark Blue
    'puzzle-piece': '#D35400', // Pumpkin
    'cogs': '#34495E', // Dark Grey
    'file-alt': '#2ECC71', // Emerald
  };

  const currentDate = new Date();
  const dayIndex = currentDate.getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[dayIndex];

  const filterClassesForToday = () => {
    return timetableData.filter((classItem) => classItem.day.toLowerCase() === currentDay.toLowerCase());
  };

  const todayClasses = filterClassesForToday();

  const handleButtonPress = (screen) => {
    navigation.navigate(screen);
  };

  const navigateToSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.todayTimetableContainer}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={{ flexDirection: 'row' }}>
          {todayClasses.map((classItem, index) => (
            <TouchableOpacity
              key={index}
              style={styles.todayClassContainer}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(classItem.screen)}
            >
              <Text style={styles.todayClassText}>{classItem.class}</Text>
              <Text style={styles.todayClassText}>{classItem.time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gridContainer}>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, { backgroundColor: iconColors[button.icon] || '#3498DB' }]}
              onPress={() => handleButtonPress(button.screen)}
              activeOpacity={0.8}
            >
              <Icon name={button.icon} size={30} color="#FFF" />
              <Text style={styles.buttonText}>{button.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.settingsButton} onPress={navigateToSettings} activeOpacity={0.8}>
        <Icon name="cogs" size={30} color="#FFF" />
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: '48%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 14,
    color: '#FFF',
  },
  todayTimetableContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    paddingVertical: 1,
  },
  todayClassContainer: {
    marginRight: 5,
    backgroundColor: '#FFA500',
    padding: 17,
    borderRadius: 15,
  },
  todayClassText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  settingsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 10,
  },
  settingsButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FFF',
  },
});

export default HomeScreen;
