import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const Timetable = () => {
  // Define your timetable data here
  const timetableData = [
    {
      day: 'Monday',
      subjects: ['Math', 'Phys', 'C Prog', 'Python', 'Sci', 'Chem'],
      times: ['9:00-10:00', '10:00-11:00', '11:00-12:00', '1:00-2:00', '2:00-3:00', '3:00-4:00'],
    },
    {
      day: 'Tuesday',
      subjects: ['Math', 'Phys', 'Chem', 'IT WS', 'Java', 'C Prog'],
      times: ['9:00-10:00', '10:00-11:00', '11:00-12:00', '1:00-2:00', '2:00-3:00', '3:00-4:00'],
    },
    {
      day: 'Wednesday',
      subjects: ['Chem', 'Phys', 'C Prog', 'Java', 'Sports', 'Lib'],
      times: ['9:00-10:00', '10:00-11:00', '11:00-12:00', '1:00-2:00', '2:00-3:00', '3:00-4:00'],
    },
    {
      day: 'Thursday',
      subjects: ['Python', 'Phys', 'C Prog', 'Chem', 'Sports', 'Lib'],
      times: ['9:00-10:00', '10:00-11:00', '11:00-12:00', '1:00-2:00', '2:00-3:00', '3:00-4:00'],
    },
    {
      day: 'Friday',
      subjects: ['C Prog', 'Phys', 'C Prog', 'Java', 'Chem', 'Lib'],
      times: ['9:00-10:00', '10:00-11:00', '11:00-12:00', '1:00-2:00', '2:00-3:00', '3:00-4:00'],
    },
    {
      day: 'Saturday',
      subjects: ['Chem', 'Phys', 'Lib', 'Java', 'C Prog', 'BEEE'],
      times: ['9:00-10:00', '10:00-11:00', '11:00-12:00', '1:00-2:00', '2:00-3:00', '3:00-4:00'],
    },
  ];

  // Get the current day
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay() - 1; // Sunday is 0, we want Monday to be 0

  // Group timetable data into pairs of two days
  const groupedTimetableData = [];
  for (let i = 0; i < timetableData.length; i += 2) {
    if (i + 1 < timetableData.length) {
      groupedTimetableData.push([timetableData[i], timetableData[i + 1]]);
    } else {
      groupedTimetableData.push([timetableData[i]]);
    }
  }

  const getDayStyle = (day) => {
    switch (day) {
      case 'Monday':
        return styles.monday;
      case 'Tuesday':
        return styles.tuesday;
      case 'Wednesday':
        return styles.wednesday;
      case 'Thursday':
        return styles.thursday;
      case 'Friday':
        return styles.friday;
      case 'Saturday':
        return styles.saturday;
      default:
        return styles.dayText;
    }
  };

  const getSubjectIcon = (subject) => {
    switch (subject) {
      case 'Math':
        return 'calculator';
      case 'Phys':
        return 'flask';
      case 'C Prog':
        return 'code';
      case 'Python':
        return 'laptop'; // Changed to 'laptop' for Python
      case 'Sci':
        return 'leaf';
      case 'Chem':
        return 'flask';
      case 'IT WS':
        return 'desktop';
      case 'Java':
        return 'coffee';
      case 'Sports':
        return 'soccer-ball-o';
      case 'Lib':
        return 'book';
      case 'BEEE':
        return 'bolt';
      default:
        return 'question';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {groupedTimetableData.map((group, index) => (
          <View key={index} style={styles.row}>
            {group.map((day, idx) => (
              <View key={idx} style={[styles.dayContainer, index * 2 + idx === currentDayIndex ? styles.highlightedDay : null]}>
                <Text style={[styles.dayText, getDayStyle(day.day)]}>{day.day}</Text>
                <View>
                  {day.subjects.map((subject, sIndex) => (
                    <View key={sIndex} style={styles.subjectRow}>
                      <Icon name={getSubjectIcon(subject)} size={16} style={styles.subjectIcon} />
                      <Text style={styles.subjectText}>{subject}</Text>
                      <Text style={styles.timeText}>{day.times[sIndex]}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1ABC9C', // Background color for the timetable
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dayContainer: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  highlightedDay: {
    backgroundColor: 'lightblue', // Highlighted day color
  },
  dayText: {
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  subjectIcon: {
    marginRight: 10,
  },
  subjectText: {
    flex: 1,
  },
  timeText: {
    textAlign: 'right',
  },
  monday: {
    color: 'red',
  },
  tuesday: {
    color: 'blue',
  },
  wednesday: {
    color: 'green',
  },
  thursday: {
    color: 'purple',
  },
  friday: {
    color: 'orange',
  },
  saturday: {
    color: 'pink',
  },
});

export default Timetable;
