import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';

const AnnouncementsScreen = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Payment of Tution fee\nJaganna Vidya Deevena:17-3-2024", category: 'academic', content: 'https://jnanabhumi.ap.gov.in/' },
    { id: 2, title: "GAP is hiring for the role Software Engineer\nGraduate Engineer Trainee!", category: 'placements', content: 'https://unstop.com/o/d9CSJWj?lb=n3zutCh&utm_medium=Share&utm_source=WhatsApp' },
    { id: 3, title: "Seventh Semester Result", category: 'results', content: 'https://jemexam.in/ksrmresult/search_result.php?id=1' },
    { id: 5, title: "Emergency O- blood needed\nclick on the button navigate to the location ", category: 'emergency', content: 'https://www.google.com/maps/dir/14.469633,78.7589448/2nd+%26+3rd+Floor,+Bruhada+Blood+Bank,+Prasad+Towers,+21-648-1,+Old+Municipal+Office+Rd,+Kadapa,+Andhra+Pradesh+516001/@14.4759738,78.7514194,13z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bb3721b499f7147:0x663bf90f6c42d0b0!2m2!1d78.8263729!2d14.4773615?entry=ttu' },
    // Add more announcements as needed
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filterAnnouncements = (category) => {
    setSelectedCategory(category);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.announcementItem, { backgroundColor: getCategoryColor(item.category) }]}
      onPress={() => handlePress(item.content)}
    >
      <Text style={styles.announcementTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic':
        return '#2ecc71'; // green
      case 'placements':
        return 'skyblue'; // red
      case 'results':
        return '#f39c12'; // orange
      case 'events':
        return 'gold'; // blue
      case 'emergency':
        return '#E74C3C'; // purple
      default:
        return '#ffffff'; // default white
    }
  };

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} contentContainerStyle={styles.filterContainer}>
        <FilterButton category="all" selected={selectedCategory === 'all'} onPress={filterAnnouncements} />
        <FilterButton category="academic" selected={selectedCategory === 'academic'} onPress={filterAnnouncements} />
        <FilterButton category="placements" selected={selectedCategory === 'placements'} onPress={filterAnnouncements} />
        <FilterButton category="results" selected={selectedCategory === 'results'} onPress={filterAnnouncements} />
        <FilterButton category="emergency" selected={selectedCategory === 'emergency'} onPress={filterAnnouncements} />
      </ScrollView>

      <FlatList
        data={selectedCategory === 'all' ? announcements : announcements.filter(a => a.category === selectedCategory)}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const FilterButton = ({ category, selected, onPress }) => (
  <TouchableOpacity style={[styles.filterButton, { backgroundColor: selected ? '#3498db' : '#D9E3F0' }]} onPress={() => onPress(category)}>
    <Text style={{ color: selected ? '#fff' : '#3498db' }}>{category.toUpperCase()}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8E44AD',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  announcementItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AnnouncementsScreen;
