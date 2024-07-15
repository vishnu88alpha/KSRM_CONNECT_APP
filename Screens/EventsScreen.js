import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Animated, Easing, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { firebase } from '../FirebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';

// Component for glowing text effect
const GlowingText = ({ children, glowColors }) => {
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const glowInterpolate = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: glowColors,
  });

  const glowStyle = {
    color: glowInterpolate,
  };

  return (
    <Animated.Text style={[styles.eventTitle, glowStyle]}>
      {children}
    </Animated.Text>
  );
};

const EventsScreen = () => {
  const [collegeEvents, setCollegeEvents] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const glowColors = ['#00ff00', '#ff0000', '#0000ff'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsSnapshot = await firebase.firestore().collection('events').get();
        const eventsData = eventsSnapshot.docs.map(doc => {
          const data = doc.data();
          // Convert Firestore Timestamp to JavaScript Date object
          const date = data.date.toDate(); // Assuming 'date' is the field storing event date
          return { id: doc.id, ...data, date };
        });

        // Sort events by date in descending order (newest to oldest)
        eventsData.sort((a, b) => b.date - a.date);

        setCollegeEvents(eventsData);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchEvents();
  }, []);

  // Function to open link in default browser
  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

  return (
    <ImageBackground source={require('../assets/event.png')} style={styles.container}>
      {/* Title for the events */}
      {/* Loading indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        // List of events
        <FlatList
          data={collegeEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.eventContainer}>
              {/* Glowing text effect for event title */}
              <GlowingText glowColors={glowColors}>{item.title}</GlowingText>
              {/* Render event date, location, and description */}
              <Text style={styles.eventDetail}>Date: {item.date.toDateString()}</Text>
              <Text style={styles.eventDetail}>Location: {item.location}</Text>
              <Text style={styles.eventDetail}>Description: {item.description}</Text>
              {/* TouchableOpacity for link */}
              <TouchableOpacity onPress={() => handleLinkPress(item.link)}>
                <Text style={styles.link}><Icon name="link" size={18} color="blue" /> {item.link}</Text>
              </TouchableOpacity>
            </View>
          )}
          style={styles.list}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff', // Background color behind the image
    resizeMode: 'cover', // Adjust the image's size to the container's dimensions
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Title color
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    width: '80%',
  },
  eventContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Event title color
    marginBottom: 5,
  },
  eventDetail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', // Event detail color
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default EventsScreen;
