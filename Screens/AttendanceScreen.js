import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';

const AttendanceScreen = () => {
  const [attendanceData, setAttendanceData] = useState([
    { id: '1', subject: 'Data Structures', attendance: 17, totalClasses: 20 },
    { id: '2', subject: 'Algorithms', attendance: 15, totalClasses: 20 },
    { id: '3', subject: 'Database Management', attendance: 18, totalClasses: 20 },
    { id: '4', subject: 'Operating Systems', attendance: 14, totalClasses: 20 },
    { id: '5', subject: 'Computer Networks', attendance: 8, totalClasses: 20 },
    { id: '6', subject: 'Software Engineering', attendance: 18, totalClasses: 20 },
    { id: '7', subject: 'Artificial Intelligence', attendance: 14, totalClasses: 20 },
    { id: '8', subject: 'Machine Learning', attendance: 16, totalClasses: 20 },
    // Add more subjects as needed
  ]);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject);
    setModalVisible(true);
  };

  const calculateOverallPercentage = () => {
    const totalAttendance = attendanceData.reduce((acc, curr) => acc + curr.attendance, 0);
    const totalClasses = attendanceData.reduce((acc, curr) => acc + curr.totalClasses, 0);
    const overallPercentage = (totalAttendance / totalClasses) * 100;
    return Math.round(overallPercentage); // Round to the nearest whole number
  };

  const overallPercentage = calculateOverallPercentage();

  const overallPercentageColor = overallPercentage < 75 ? 'red' : 'green'; // Change color based on percentage
  const overallPercentageHighlightColor = 'gold'; // Change text highlight color

  const getProgressBarColor = (attendance) => {
    if (attendance >= 50 && attendance <= 70) {
      return 'orange'; // Light Coral color for attendance between 50 and 70
    } else if (attendance > 70) {
      return 'green'; // Green color for attendance greater than 70
    } else {
      return 'red'; // Red color for attendance below 50
    }
  };

  const renderItem = ({ item }) => {
    const attendancePercentage = (item.attendance / item.totalClasses) * 100;
    const formattedPercentage = Math.round(attendancePercentage); // Round to the nearest whole number

    return (
      <TouchableOpacity onPress={() => handleSubjectSelection(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.subject}>{item.subject}</Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: attendancePercentage + '%', backgroundColor: getProgressBarColor(attendancePercentage) }
              ]}
            />
          </View>
          <Text style={styles.attendanceText}>{formattedPercentage}%</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const AttendanceDetailModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Attendance Details</Text>
          {!selectedSubject ? (
            <ScrollView>
              <View>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Subjects</Text>
                  <Text style={styles.tableHeaderText}>Total</Text>
                  <Text style={styles.tableHeaderText}>Attended</Text>
                  <Text style={styles.tableHeaderText}>Not Attended</Text>
                  <Text style={styles.tableHeaderText}>Remaining</Text>
                  <Text style={styles.tableHeaderText}>Per(%)</Text>
                </View>
                {attendanceData.map((subject, index) => (
                  <TouchableOpacity key={index} onPress={() => handleSubjectSelection(subject)}>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableRowText}>{subject.subject}</Text>
                      <Text style={styles.tableRowText}>{subject.totalClasses}</Text>
                      <Text style={styles.tableRowText}>{subject.attendance}</Text>
                      <Text style={styles.tableRowText}>{subject.totalClasses - subject.attendance}</Text>
                      <Text style={styles.tableRowText}>{50-subject.totalClasses }</Text>
                      <Text style={styles.tableRowText}>{Math.round((subject.attendance / subject.totalClasses) * 100)}%</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          ) : (
            <>
              <Text style={styles.modalTitle}>{selectedSubject?.subject}</Text>
              <Text>{'                        Classes Total held          : ' + selectedSubject?.totalClasses}</Text>
              <Text>{'                        Classes Attended           : ' + selectedSubject?.attendance}</Text>
              <Text>{'                        Classes Not Attended    : ' + (selectedSubject ? selectedSubject.totalClasses - selectedSubject.attendance : 0)}</Text>
              <Text>{'                        Classes Remaining         : ' + (selectedSubject ? 50 - selectedSubject.totalClasses : 0)}</Text>
            </>
          )}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleSubjectSelection(null)}>
        <Text style={[styles.overallPercentage, { color: overallPercentageColor, backgroundColor: overallPercentageHighlightColor }]}>
          {'Overall Percentage: ' + overallPercentage + '%'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={attendanceData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <AttendanceDetailModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
  },
  itemContainer: {
    marginBottom: 15,
    backgroundColor: '#fffaf0',
    padding: 10,
    borderRadius: 10,
  },
  subject: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  attendanceText: {
    fontSize: 16,
  },
  overallPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
    width: '100%',
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 3,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 3,
    marginBottom: 5,
    width: '100%',
  },
  tableRowText: {
    fontSize: 12,
    textAlign: 'center',
    flex: 3,
  },
});

export default AttendanceScreen;
