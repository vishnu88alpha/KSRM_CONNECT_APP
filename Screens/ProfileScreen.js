import { View, Text, StyleSheet, Button, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { firebase } from '../FirebaseConfig'; // Import your Firebase configuration
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile data from Firestore
    const fetchUserProfile = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          // Query Firestore collection for user with matching email
          const userProfileRef = firebase.firestore().collection('users').where('email', '==', currentUser.email);
          const userProfileSnapshot = await userProfileRef.get();
          if (!userProfileSnapshot.empty) {
            // Assuming there's only one user with the given email
            setUserProfile(userProfileSnapshot.docs[0].data());
          } else {
            console.log('User profile not found.');
          }
        } else {
          console.log('No user signed in.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}><Icon name="user" size={24} color="#333" /> Personal Details</Text>
        <View style={styles.section}>
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="user" size={18} color="#666" /> Name:</Text>
              <Text style={styles.value}>{userProfile?.Name}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="venus-mars" size={18} color="#666" /> Gender:</Text>
              <Text style={styles.value}>{userProfile?.Gender}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="calendar" size={18} color="#666" /> Date of Birth:</Text>
              <Text style={styles.value}>{userProfile?.DOB}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="phone" size={18} color="#666" /> Student's Mobile:</Text>
              <Text style={styles.value}>{userProfile?.stdph}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="tint" size={18} color="#666" /> Blood Group:</Text>
              <Text style={styles.value}>{userProfile?.BG}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="user" size={18} color="#666" /> Father's Name:</Text>
              <Text style={styles.value}>{userProfile?.FN}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="phone" size={18} color="#666" /> Parent's Mobile:</Text>
              <Text style={styles.value}>{userProfile?.FMN}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="envelope" size={18} color="#666" /> Student E-Mail:</Text>
              <Text style={styles.value}>{userProfile?.email}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.title}><Icon name="graduation-cap" size={24} color="#333" /> Academic Details</Text>
        <View style={styles.section}>
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="id-card" size={18} color="#666" /> Roll Number:</Text>
              <Text style={styles.value}>{userProfile?.ID}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="users" size={18} color="#666" /> Section:</Text>
              <Text style={styles.value}>{userProfile?.Section}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="building" size={18} color="#666" /> Branch Code:</Text>
              <Text style={styles.value}>{userProfile?.Department}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="bookmark" size={18} color="#666" /> Semester:</Text>
              <Text style={styles.value}>{userProfile?.Semester}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="book" size={18} color="#666" /> Course:</Text>
              <Text style={styles.value}>{userProfile?.Course}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}><Icon name="calendar" size={18} color="#666" /> Batch:</Text>
              <Text style={styles.value}>{userProfile?.Batch}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  section: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detail: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    marginTop: 5,
    color: '#666',
  },
});

export default ProfileScreen;
