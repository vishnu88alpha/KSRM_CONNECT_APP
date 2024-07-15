import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';

const AttendanceMkScreen = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showGrades, setShowGrades] = useState(false);
  const [gradesData, setGradesData] = useState([]);

  const assignmentOptions = ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4'];
  const subjectOptions = ['Sem1-CSE-A-C Programming', 'Sem4-CSE-B-ADS', 'Sem5-CSE-B-DAA'];

  const studentGradesData = [
    { rollNo: '209Y1A0501', name: 'ABBINENI GOWTHAM', grade: '' },
    { rollNo: '209Y1A0502', name: 'ALAMURU SAINATHA', grade: '' },
    { rollNo: '209Y1A0503', name: 'ALLADU NANDINI (W)', grade: '' },
    { rollNo: '209Y1A0504', name: 'ALLE KUSUMA (W)', grade: '' },
    { rollNo: '209Y1A0505', name: 'ALLURU GANGADHAR', grade: '' },
    { rollNo: '209Y1A0506', name: 'AMBU GOWTHAM KUMAR', grade: '' },
    { rollNo: '209Y1A0507', name: 'ANCHALA NIHARIKA (W)', grade: '' },
    { rollNo: '209Y1A0508', name: 'ANCHALA SNEHA LATHA (W)', grade: '' },
    { rollNo: '209Y1A0509', name: 'ANDELA MOUNIKA (W)', grade: '' },
    { rollNo: '209Y1A0510', name: 'ANGADI LAVANYA (W)', grade: '' },
    { rollNo: '209Y1A0511', name: 'ANKIREDDY LIKHITA (W)', grade: '' },
    { rollNo: '209Y1A0512', name: 'AVULA ASHWITH', grade: '' },
    { rollNo: '209Y1A0513', name: 'AVULA VANI (W)',grade: '' },
    { rollNo: '209Y1A0514', name: 'AVULAKUNTA SIVA', grade: '' },
    // Add more student data as needed
  ];

  const handleAssignmentChange = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  const handleGiveGrades = () => {
    if (!selectedAssignment || !selectedSubject) {
      Alert.alert('Error', 'Please select both assignment and subject.');
      return;
    }

    // Retrieve grades data for the selected assignment and subject
    // Here, you might fetch data from an API or prepare it locally
    // For demonstration purposes, I'm setting a sample data
    setGradesData(studentGradesData);
    setShowGrades(true);
  };

  const handleSubmitGrades = () => {
    // Logic to handle submitted grades
    // You can process the gradesData state here
    // For now, let's just reset the state
    setGradesData([]);
    setShowGrades(false);
    Alert.alert('Success', 'Grades submitted successfully.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <RNPicker
          selectedValue={selectedAssignment}
          onValueChange={(itemValue) => handleAssignmentChange(itemValue)}
          style={[styles.dropdown, { backgroundColor: 'lightgrey', color: 'black' }]}>
          <RNPicker.Item label="Select Assignment" value={null} />
          {assignmentOptions.map((option, index) => (
            <RNPicker.Item key={index} label={option} value={option} />
          ))}
        </RNPicker>

        <RNPicker
          selectedValue={selectedSubject}
          onValueChange={(itemValue) => handleSubjectChange(itemValue)}
          style={[styles.dropdown, { backgroundColor: 'lightgrey', color: 'black' }]}>
          <RNPicker.Item label="Select Subject" value={null} />
          {subjectOptions.map((option, index) => (
            <RNPicker.Item key={index} label={option} value={option} />
          ))}
        </RNPicker>
      </View>

      <TouchableOpacity style={styles.giveGradesButton} onPress={handleGiveGrades}>
        <Text style={styles.buttonText}>Give Grades</Text>
      </TouchableOpacity>

      {showGrades && (
        <ScrollView style={styles.gradesScrollView}>
          <View style={styles.gradesContainer}>
            <Text style={styles.subHeading}>Grades for {selectedSubject}</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Roll No</Text>
              <Text style={styles.headerText}>Name</Text>
              <Text style={styles.headerText}>Grade</Text>
            </View>
            {gradesData.map((student, index) => (
              <View key={index} style={styles.gradeRow}>
                <Text style={styles.gradeText}>{student.rollNo}</Text>
                <Text style={styles.gradeText}>{student.name}</Text>
                <RNPicker
                  selectedValue={student.grade}
                  onValueChange={(grade) => {
                    const updatedGradesData = [...gradesData];
                    updatedGradesData[index].grade = grade;
                    setGradesData(updatedGradesData);
                  }}
                  style={[styles.dropdown, { backgroundColor: 'lightgrey', color: 'black', flex: 1 }]}>
                  <RNPicker.Item label="Select Grade" value="" />
                  <RNPicker.Item label="1" value="1" />
                  <RNPicker.Item label="2" value="2" />
                  <RNPicker.Item label="3" value="3" />
                  <RNPicker.Item label="4" value="4" />
                  <RNPicker.Item label="5" value="5" />
                </RNPicker>
              </View>
            ))}
            <TouchableOpacity style={styles.submitGradesButton} onPress={handleSubmitGrades}>
              <Text style={styles.buttonText}>Submit Grades</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  dropdownContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdown: {
    width: '48%',
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  giveGradesButton: {
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  gradesScrollView: {
    marginTop: 20,
    width: '100%',
    maxHeight: Dimensions.get('window').height * 0.6, // Set a maximum height for ScrollView
  },
  gradesContainer: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  gradeText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  submitGradesButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
});

export default AttendanceMkScreen;
