import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';

const AttendanceMkScreen = () => {
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [showAttendance, setShowAttendance] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});

  const detailsOptions = [
    'Sem1-CSE-A-C Programming',
    'Sem4-CSE-B-ADS',
    'Sem5-CSE-B-DAA'
    // Add more options as needed
  ];

  const studentNames = [
    'ABBINENI GOWTHAM',
    'ALAMURU SAINATHA',
    'ALLADU NANDINI (W)',
    'ALLE KUSUMA (W)',
    'ALLURU GANGADHAR',
    'AMBU GOWTHAM KUMAR',
    'ANCHALA NIHARIKA (W)',
    'ANCHALA SNEHA LATHA (W)',
    'ANDELA MOUNIKA (W)',
    'ANGADI LAVANYA (W)',
    'ANKIREDDY LIKHITA (W)',
    'AVULA ASHWITH',
    'AVULA VANI (W)',
    'AVULAKUNTA SIVA',
    'BADUGU NITHISH KUMAR'
  ];

  const handleDetailsChange = (details) => {
    setSelectedDetails(details);
    setShowAttendance(false);

    // If attendance data exists for the selected subject, populate it for modification
    if (attendanceData[details]) {
      const { studentsAttendance, presentCount, absentCount } = attendanceData[details];
      setStudentsAttendance(studentsAttendance);
      setPresentCount(presentCount);
      setAbsentCount(absentCount);
      setShowAttendance(true);
    } else {
      // Reset attendance data if it doesn't exist
      resetAttendance();
    }
  };

  const resetAttendance = () => {
    setStudentsAttendance([]);
    setPresentCount(0);
    setAbsentCount(0);
  };

  const handleEnterAttendance = () => {
    if (!selectedDetails) {
      Alert.alert('Error', 'Please select details first.');
      return;
    }

    const subjectAttendanceData = attendanceData[selectedDetails];
    if (subjectAttendanceData) {
      setStudentsAttendance(subjectAttendanceData.studentsAttendance);
      setPresentCount(subjectAttendanceData.presentCount);
      setAbsentCount(subjectAttendanceData.absentCount);
    } else {
      // Simulate fetching students list for selected subject
      const studentsList = studentNames.map((name, index) => ({
        id: index + 1,
        rollNo: `209Y1A05${(index + 1).toString().padStart(2, '0')}`, // Format roll number as per requirement
        name,
        present: false,
      }));
      setStudentsAttendance(studentsList);
    }

    setShowAttendance(true);
  };

  const handleAttendanceChange = (studentId, present) => {
    const updatedStudentsAttendance = studentsAttendance.map((student) =>
      student.id === studentId ? { ...student, present } : student
    );
    setStudentsAttendance(updatedStudentsAttendance);
  };

  const handleSubmitAttendance = () => {
    const presentStudents = studentsAttendance.filter((student) => student.present);
    const absentStudents = studentsAttendance.filter((student) => !student.present);
    setPresentCount(presentStudents.length);
    setAbsentCount(absentStudents.length);
    setShowAttendance(false);

    const subjectAttendance = {
      studentsAttendance,
      presentCount: presentStudents.length,
      absentCount: absentStudents.length,
    };

    setAttendanceData({
      ...attendanceData,
      [selectedDetails]: subjectAttendance,
    });

    Alert.alert('Success', 'Attendance submitted successfully.');
  };

  return (
    <View style={styles.container}>
      <RNPicker
        selectedValue={selectedDetails}
        onValueChange={(itemValue) => handleDetailsChange(itemValue)}
        style={[styles.dropdown, { backgroundColor: 'lightgrey', color: 'black' }]}>
        <RNPicker.Item label="Select Details" value={null} />
        {detailsOptions.map((option, index) => (
          <RNPicker.Item key={index} label={option} value={option} />
        ))}
      </RNPicker>

      {selectedDetails && (
        <TouchableOpacity style={styles.enterAttendanceButton} onPress={handleEnterAttendance}>
          <Text style={styles.buttonText}>Enter Attendance</Text>
        </TouchableOpacity>
      )}

      {showAttendance && (
        <ScrollView style={styles.attendanceScrollView}>
          <View style={styles.attendanceContainer}>
            <Text style={styles.subHeading}>Attendance for {selectedDetails}</Text>
            {studentsAttendance.map((student) => (
              <View key={student.id} style={styles.studentAttendanceRow}>
                <Text style={styles.studentInfo}>{student.rollNo}</Text>
                <Text style={styles.studentInfo}>{student.name}</Text>
                <View style={styles.attendanceButtons}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={[styles.attendanceButton, student.present && styles.presentButton]}
                      onPress={() => handleAttendanceChange(student.id, true)}>
                      <Text style={styles.buttonText}>P</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.attendanceButton, !student.present && styles.absentButton, { marginLeft: 10 }]}
                      onPress={() => handleAttendanceChange(student.id, false)}>
                      <Text style={styles.buttonText}>A</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAttendance}>
              <Text style={styles.buttonText}>Submit Attendance</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <View style={styles.summaryContainer}>
        {Object.keys(attendanceData).map((subject, index) => (
          <View key={index} style={styles.subjectContainer}>
            <Text style={styles.subjectText}>{subject}</Text>
            <Text>Present: {attendanceData[subject].presentCount}</Text>
            <Text>Absent: {attendanceData[subject].absentCount}</Text>
            <TouchableOpacity
              style={styles.resubmitButton}
              onPress={() => handleDetailsChange(subject)}>
              <Text style={styles.buttonText}>Resubmit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#3498db',
    alignItems: 'center',
  },
  dropdown: {
    width: '100%',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  attendanceScrollView: {
    marginTop: 20,
    width: '100%',
    maxHeight: Dimensions.get('window').height * 0.6, // Set a maximum height for ScrollView
  },
  attendanceContainer: {
    width: '100%',
  },
  studentAttendanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  studentInfo: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  attendanceButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align buttons to the left
  },
  attendanceButton: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    marginRight: 5,
  },
  presentButton: {
    backgroundColor: 'green',
  },
  absentButton: {
    backgroundColor: 'red',
  },
  enterAttendanceButton: {
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  resubmitButton: {
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  summaryContainer: {
    marginTop: 20,
    width: '100%',
  },
  subjectContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default AttendanceMkScreen;
