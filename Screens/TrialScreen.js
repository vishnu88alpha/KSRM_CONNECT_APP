import React, { useState } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icon library
import HodImage from '../assets/hod.jpg'; // Import the image directly

// Sample data for staff profiles
const staffData = {
 HOD: {
    CSE: [
      { 
        name: 'John Doe', 
        position: 'Head of Department', 
        qualification: 'Ph.D., Computer Science',
        email: 'john.doe@example.com',
        image: HodImage 
      },
      // Add more CSE HOD profiles
    ],
    EEE: [
      // Add EEE HOD profiles
    ],
    // Add HOD profiles for other departments
 },
 Principal: [
    // Add Principal profiles
 ],
 TeachingStaff: [
    // Add Teaching Staff profiles
 ],
 NonTeachingStaff: [
    // Add Non-Teaching Staff profiles
 ],
};

const StaffModal = ({ visible, onClose }) => {
 const [selectedCategory, setSelectedCategory] = useState('HOD');
 const [selectedDepartment, setSelectedDepartment] = useState('CSE');

 // Function to render staff profiles based on selected category and department
 const renderProfiles = () => {
    const profiles = staffData[selectedCategory][selectedDepartment];
    console.log('Rendering profiles for:', selectedCategory, selectedDepartment); // Log the category and department being rendered
    return profiles.map((profile, index) => (
      <View key={index} style={{ padding: 10 }}>
        <Image source={profile.image} style={{ width: 100, height: 100 }} /> {/* Render image */}
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{profile.name}</Text>
        <Text style={{ fontSize: 16 }}>{profile.position}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <FontAwesome name="graduation-cap" size={20} color="black" style={{ marginRight: 5 }} /> {/* Qualification icon */}
          <Text>{profile.qualification}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <FontAwesome name="envelope" size={20} color="black" style={{ marginRight: 5 }} /> {/* Email icon */}
          <Text>{profile.email}</Text>
        </View>
      </View>
    ));
 };

 // Main component return
 return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', height: '80%', backgroundColor: 'white', borderRadius: 10 }}>
          {/* Category selection */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 10 }}>
            {Object.keys(staffData).map(category => (
              <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)}>
                <Text style={{ fontWeight: selectedCategory === category ? 'bold' : 'normal' }}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Department selection */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            {Object.keys(staffData[selectedCategory]).map(department => (
              <TouchableOpacity key={department} onPress={() => setSelectedDepartment(department)}>
                <Text style={{ marginHorizontal: 10, fontWeight: selectedDepartment === department ? 'bold' : 'normal' }}>{department}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Scrollable list of profiles */}
          <ScrollView>{renderProfiles()}</ScrollView>
          {/* Close button */}
          <TouchableOpacity onPress={onClose} style={{ alignItems: 'center', paddingVertical: 10 }}>
            <Text style={{ color: 'blue' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
 );
};

export default StaffModal;
