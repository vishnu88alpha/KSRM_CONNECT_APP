import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProfileScreen = () => {
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [profileDetails, setProfileDetails] = useState(null);
  const [showProfileButton, setShowProfileButton] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const handleProfileDisplay = () => {
    let profile = null;
    if (department === 'CSE' && role === 'HOD') {
      // Mock profile details for CSE HOD
      profile = {
        name: 'Dr. V. Lokeswara Reddy',
        title: 'Professor & HOD',
        email: 'lokeswara.reddy@example.com',
        phone: '+1234567890',
        Experience: '13 year',
        image: require('../assets/hod.jpg')
      };
    } else if (department === 'CSE' && role === 'Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        name: 'Dr.S.Nageswara Rao',
        title: 'Assistant Professor',
        Qualification: 'M.Tech.,Ph.D.',
        email: 'nageswara@gamil.com',
        phone: '+1234567890',
        Experience: '13 year',
        image: require('../assets/NageswarRao.png')
      };
    } else if (department === 'CSE' && role === 'Non-Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        name: 'Dr.S.Gouri',
        title: 'Assistant Professor',
        Qualification: 'M.Tech.,Ph.D.',
        email: 'gouri@gamil.com',
        phone: '+1234567890',
        Experience: '10 year',
        image: require('../assets/Gouri.png')
      };
    }
    // Add more else-if blocks for other departments and roles as needed
    // Note: I've omitted other else-if blocks for brevity
    if (department === 'AIML' && role === 'HOD') {
      // Mock profile details for CSE HOD
      profile = {
        name: 'Dr. K.Srinivasa Rao',
        title: 'Professor',
        Qualification: 'M.Tech.,Ph.D.',
        email: 'ksr@ksrmce.ac.in',
        phone: '9440702422',
        Experience: '23 year',
        image: require('../assets/hod.jpg')
      };
    } else if (department === 'AIML' && role === 'Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        name: 'Sri.G.B.Veeresh',
        title: 'Assistant Professor',
        Qualification: 'MCA., (Ph.D)',
        email: 'veereshksrm@gmail.com',
        phone: '7013011045',
        Experience: '25 year',
        image: require('../assets/NageswarRao.png')
        

        // Add the image source if available
      };
    } else if (department === 'AIML' && role === 'Non-Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        name: 'Smt. N.Lavanya',
        title: 'Assistant Professor',
        Qualification: 'M.Tech',
        email: 'lavanya.n@ksrmce.ac.in',
        phone: '8885311015',
        Experience: '1 year',
        image: require('../assets/Gouri.png')
        

        // Add the image source if available
      };
    }
    if (department === 'EEE' && role === 'HOD') {
      // Mock profile details for CSE HOD
      profile = {
        name: 'Dr. M.S.Priyadarshini',
        title: 'Professor and HoD',
        Qualification:'M.Tech.,Ph.D.',
        email: 'hod.eee@ksrmce.ac.in',
        phone: '1234567890',
        Experience: '15 year',
        image: require('../assets/hod.jpg')
      };
    } else if (department === 'EEE' && role === 'Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        
        name: 'Dr.T.MARIPRASATH',
        title: 'Associate Professor',
        Qualification:'M.Tech.,Ph.D.',
        email: 'hod.eee@ksrmce.ac.in',
        phone: '+91-9786110993',
        Experience: '23 year',
        image: require('../assets/NageswarRao.png')
        

        // Add the image source if available
      };
    } else if (department === 'EEE' && role === 'Non-Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        name: 'Sri.P.Viswanatha Reddy',
        title: 'Grade I Technician',
        Qualification:'ITI.',
        Experience: '30 year',
        image: require('../assets/Gouri.png')
        

        // Add the image source if available
      };
    }
    // Add more else-if blocks for other departments and roles as needed
    if (department === 'ECE' && role === 'HOD') {
      // Mock profile details for CSE HOD
      profile = {
        name: 'Dr. G. Hemalatha',
        title: 'Professor & HOD ',
        Qualification: 'M.Tech.,Ph.D.',
        email: 'latha.g@ksrmce.ac.in',
        phone: '9440004404',
        Experience: '22 year',
        image: require('../assets/hod.jpg')
      };
    } else if (department === 'ECE' && role === 'Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        name: 'Dr. S. Zahiruddin',
        title: 'Associate Professor',
        Qualification: 'M.Tech.,Ph.D.',
        email: 'latha.g@ksrmce.ac.in',
        phone: '9985226064',
        Experience: '18 year',
        image: require('../assets/NageswarRao.png')
        

        // Add the image source if available
      };
    } else if (department === 'ECE' && role === 'Non-Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        name: 'Sri D. Radha Krishna',
        title: 'DEO',
        Qualification:'B.A.,',
        Experience: '6 year',
        image: require('../assets/Gouri.png')
        

        // Add the image source if available
      };
      
    }
    if (department === 'MECH' && role === 'HOD') {
      // Mock profile details for CSE HOD
      profile = {
        name: 'Dr.D.Ravikanth',
        title: 'Professor & HOD ',
        Qualification: 'M.Tech.,Ph.D.',
        email: 'doddaravi2007@gmail.com',
        phone: '9440506828',
        Experience: '16 year',
        image: require('../assets/hod.jpg')
      };

    } else if (department === 'MECH' && role === 'Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        name: 'Sri. R.Mahesh',
        title: 'Assistant Professor',
        Qualification: 'M.Tech',
        email: 'doddaravi2007@gmail.com',
        phone: '9876543210',
        Experience: '10 year',
        image: require('../assets/NageswarRao.png')
        

        // Add the image source if available
      };
    } else if (department === 'MECH' && role === 'Non-Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        name: 'Sri.Y.V.Krishna Reddy',
        title: 'Grade II Technician',
        Qualification:'Inter.,ITI.,CTI.,',
        Experience: '30 year',
        image: require('../assets/Gouri.png')
        

        // Add the image source if available
      };
    }
    // Add more else-if blocks for other departments and roles as needed
    if (department === 'CIVIL' && role === 'HOD') {
      // Mock profile details for CSE HOD
      profile = {
        name: 'Dr. N. Amaranatha Reddy',
        title: 'Associate Professor & HOD',
        Qualification: 'M.Tech,Ph.d',
        email: 'amaranath@ksrmce.ac.in',
        phone: '9876543210',
        Experience: '10 year',
        image: require('../assets/hod.jpg')
      };
    } else if (department === 'CIVIL' && role === 'Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        name: 'Dr. T. Kiran Kumar',
        title: 'Professor',
        Qualification: 'M.Tech,Ph.',
        email: 'kiranced@ksrmce.ac.in',
        phone: '8328476839',
        Experience: '16 year',
        image: require('../assets/NageswarRao.png')
        

        // Add the image source if available
      };
    } else if (department === 'CIVIL' && role === 'Non-Teaching Staff') {
      // Mock profile details for CSE Teaching Staff
      profile = {
        name: 'Sri.V.Ramanjaneya Reddy',
        title: 'Junior Asst.',
        Qualification:'B.A',
        Experience: '18 year',
        image: require('../assets/Gouri.png')
        

        // Add the image source if available
      };
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
    fadeOut();
    setTimeout(() => {
      setProfileDetails(null);
      setShowProfileButton(true);
    }, 1000);
  };

  const handleTopButtonPress = () => {
    const profile = {
      name: 'Dr. V.S.S.Murthy',
      title: 'Principal',
      Qualification: 'M.Tech.,Ph.D.',
      email: 'murthy@gamil.com',
      phone: '+1234567890',
      Experience: '20 years',
      image: require('../assets/Principal.png')
    };
    setProfileDetails(profile);
    setShowProfileButton(false);
  };

  const departments = ['AIML', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];
  const roles = ['HOD', 'Teaching Staff', 'Non-Teaching Staff'];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTopButtonPress} style={styles.topButton}>
        <Text style={styles.buttonText}>Principal Details</Text>
      </TouchableOpacity>

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

          {(department !== '' && role !== '') && (
            <TouchableOpacity onPress={() => { handleProfileDisplay(); fadeIn(); }} style={styles.button}>
              <Text style={styles.buttonText}>Display</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {profileDetails && (
        <Animated.View style={{ ...styles.profileContainer, opacity: fadeAnim }}>
          {Array.isArray(profileDetails) ? (
            profileDetails.map((profile, index) => (
              <View key={index} style={{ alignItems: 'center' }}>
                {profile.image && <Image source={profile.image} style={styles.image} />}
                <Text style={styles.profileText}>Name: {profile.name}</Text>
                <Text style={styles.profileText}>Title: {profile.title}</Text>
                <Text style={styles.profileText}>Email: {profile.email}</Text>
                <Text style={styles.profileText}>Phone: {profile.phone}</Text>
                <Text style={styles.profileText}>Experience: {profile.Experience}</Text>
                <Text style={styles.profileText}>Qualification: {profile.Qualification}</Text>
              </View>
            ))
          ) : (
            <View style={{ alignItems: 'center' }}>
              {profileDetails.image && <Image source={profileDetails.image} style={styles.image} />}
              <Text style={styles.profileText}>Name: {profileDetails.name}</Text>
              <Text style={styles.profileText}>Title: {profileDetails.title}</Text>
              <Text style={styles.profileText}>Email: {profileDetails.email}</Text>
              <Text style={styles.profileText}>Phone: {profileDetails.phone}</Text>
              <Text style={styles.profileText}>Experience: {profileDetails.Experience}</Text>
              <Text style={styles.profileText}>Qualification: {profileDetails.Qualification}</Text>
            </View>
          )}
          <TouchableOpacity onPress={handleCloseProfile} style={styles.closeButton}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
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
    backgroundColor: '#f00', // red
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
    color: '#000', // black
  },
  profileContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    width: 300,
    borderRadius: 10,
    padding: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  profileText: {
    marginBottom: 10,
    fontSize: 18,
  },
});

export default ProfileScreen;
