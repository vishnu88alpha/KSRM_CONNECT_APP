import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProfileScreen = () => {
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [profileDetails, setProfileDetails] = useState(null);
  const [showProfileButton, setShowProfileButton] = useState(true);

  const departments = ['AIML', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];
  const roles = ['HOD', 'Teaching Staff', 'Non-Teaching Staff'];

  const handleProfileDisplay = () => {
    let profile = null;
    
    if (department === 'CSE' && role === 'HOD') {
      profile = [{
        name: 'Dr. V. Lokeswara Reddy',
        title: 'Professor & HOD',
        email: 'lokeswara.reddy@example.com',
        phone: '+1234567890',
        Experience: '13 year',
        image: require('../assets/hod.jpg')
      }];
    } else if (department === 'CSE' && role === 'Teaching Staff') {
      profile = [
        {
          name: 'Dr.S.Nageswara Rao',
          title: 'Assistant Professor',
          Qualification: 'M.Tech.,Ph.D.',
          email: 'nageswara@gamil.com',
          phone: '+1234567890',
          Experience: '13 year',
          image: require('../assets/NageswarRao.png')
        },
        {
          name: 'Sri.G.B.Veeresh',
          title: 'Assistant Professor',
          Qualification: 'MCA., (Ph.D)',
          email: 'veereshksrm@gmail.com',
          phone: '7013011045',
          Experience: '25 year',
          image: require('../assets/NageswarRao.png')
        },
        {
          name: 'Dr.T.MARIPRASATH',
          title: 'Associate Professor',
          Qualification:'M.Tech.,Ph.D.',
          email: 'hod.eee@ksrmce.ac.in',
          phone: '+91-9786110993',
          Experience: '23 year',
          image: require('../assets/NageswarRao.png')
        }
      ];
    } else if (department === 'CSE' && role === 'Non-Teaching Staff') {
      profile = [
        {
          name: 'Dr.S.Gouri',
          title: 'Assistant Professor',
          Qualification: 'M.Tech.,Ph.D.',
          email: 'gouri@gamil.com',
          phone: '+1234567890',
          Experience: '10 year',
          image: require('../assets/Gouri.png')
        },
        {
          name: 'Dr. K.Srinivasa Rao',
          title: 'Professor',
          Qualification: 'M.Tech.,Ph.D.',
          email: 'ksr@ksrmce.ac.in',
          phone: '9440702422',
          Experience: '23 year',
          image: require('../assets/hod.jpg')
        },
        {
          name: 'Smt. N.Lavanya',
          title: 'Assistant Professor',
          Qualification: 'M.Tech',
          email: 'lavanya.n@ksrmce.ac.in',
          phone: '8885311015',
          Experience: '1 year',
          image: require('../assets/Gouri.png')
        }
      ];
    }
  
    if (profile) {
      setProfileDetails(profile);
      setShowProfileButton(false);
    } else {
      setProfileDetails(null);
      setShowProfileButton(true);
    }
  };
  

  const handleCloseProfile = () => {
    setProfileDetails(null);
    setShowProfileButton(true);
  };

  const handleTopButtonPress = () => {
    const profile = [{
      name: 'Dr. V.S.S.Murthy',
      title: 'Principal',
      Qualification: 'M.Tech.,Ph.D.',
      email: 'murthy@gamil.com',
      phone: '+1234567890',
      Experience: '20 years',
      image: require('../assets/Principal.png')
    }];
    setProfileDetails(profile);
    setShowProfileButton(false);
  };

  const renderProfileItem = ({ item }) => (
    <View style={styles.profileItem}>
      <Image source={item.image} style={styles.image} />
      <Text>Name: {item.name}</Text>
      <Text>Title: {item.title}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>Experience: {item.Experience}</Text>
      <Text>Qualification: {item.Qualification}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {showProfileButton && (
        <TouchableOpacity onPress={handleTopButtonPress} style={styles.topButton}>
          <Text style={[styles.buttonText, { color: '#000' }]}>Principal Details</Text>
        </TouchableOpacity>
      )}

      {showProfileButton && (
        <>
          <Picker
            selectedValue={department}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setDepartment(itemValue)}>
            <Picker.Item label="Select Department" value="" />
            {departments.map((dept, index) => (
              <Picker.Item key={index} label={dept} value={dept} />
            ))}
          </Picker>

          {department !== '' && (
            <Picker
              selectedValue={role}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setRole(itemValue)}>
              <Picker.Item label="Select Role" value="" />
              {roles.map((r, index) => (
                <Picker.Item key={index} label={r} value={r} />
              ))}
            </Picker>
          )}

          {department !== '' && role !== '' && (
            <TouchableOpacity onPress={handleProfileDisplay} style={styles.button}>
              <Text style={[styles.buttonText, { color: '#000' }]}>Display</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {profileDetails && (
        <ScrollView style={styles.profileScrollView}>
          <View style={styles.profileContainer}>
            <FlatList
              data={profileDetails}
              renderItem={renderProfileItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={handleCloseProfile} style={styles.closeButton}>
              <Text style={[styles.buttonText, { color: '#fff' }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 7,
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'gold', // yellow
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#1e90ff', // blue
    padding: 10,
    borderRadius: 5,
  },
  topButton: {
    marginBottom: 10,
    backgroundColor: 'gold', // yellow
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  profileScrollView: {
    maxHeight: 300, // Adjust the maximum height according to your needs
    width: '90%',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10, // Add horizontal padding for better spacing
    borderRadius: 10,
    paddingVertical: 20, // Add vertical padding for better spacing
  },
  profileItem: {
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default ProfileScreen;
