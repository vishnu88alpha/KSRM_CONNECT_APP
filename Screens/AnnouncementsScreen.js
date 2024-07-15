import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const AnnouncementsScreen = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([
    // Existing announcement data
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filterAnnouncements = (category) => {
    setSelectedCategory(category);
  };

  const renderItem = ({ item }) => {
    // Existing renderItem function
  };

  const FilterButton = ({ category, selected, onPress }) => (
    <TouchableOpacity style={[styles.filterButton, { backgroundColor: selected ? '#3498db' : '#D9E3F0' }]} onPress={() => onPress(category)}>
      {/* Icon component added here */}
      <Icon name={category === 'all' ? 'star' : 'star-o'} size={20} color={selected ? '#fff' : '#3498db'} />
      <Text style={{ color: selected ? '#fff' : '#3498db', marginLeft: 5 }}>{category.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} contentContainerStyle={styles.filterContainer}>
        <FilterButton category="all" selected={selectedCategory === 'all'} onPress={filterAnnouncements} />
        <FilterButton category="academic" selected={selectedCategory === 'academic'} onPress={filterAnnouncements} />
        <FilterButton category="placements" selected={selectedCategory === 'placements'} onPress={filterAnnouncements} />
        <FilterButton category="results" selected={selectedCategory === 'results'} onPress={filterAnnouncements} />
        <FilterButton category="events" selected={selectedCategory === 'events'} onPress={filterAnnouncements} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff',
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row', // Adjusted to accommodate icon and text side by side
    alignItems: 'center', // Adjusted for centering
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  announcementItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  announcementAuthor: {
    fontSize: 14,
    marginBottom: 4,
  },
  announcementLocation: {
    fontSize: 14,
    marginBottom: 4,
  },
  announcementDescription: {
    fontSize: 14,
  },
});

export default AnnouncementsScreen;
