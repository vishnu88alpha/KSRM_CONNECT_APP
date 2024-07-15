import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const quizData = [
  { id: 1, subject: 'CD', title: 'Quiz 1', link: 'https://docs.google.com/forms/d/e/1FAIpQLSdVbeI4eD8vlMr1u0lxHgymHXZCLdLdBgZVIrS8T2xVS26mFA/viewform?usp=sf_link', dueDate: '2023-12-28', sharedDate: '2024-01-01' },
  { id: 2, subject: 'DLD', title: 'Quiz 1', link: 'https://forms.gle/yGHrPaszmSXyt4Aa9', dueDate: '2024-01-10', sharedDate: '2024-01-11' },
  { id: 3, subject: 'CD', title: 'Quiz 2', link: 'https://docs.google.com/forms/d/e/1FAIpQLSeab-mMH97_GUa7EKW5hhsh0HFgMf7lez3d3zuyvfy_WoO6PQ/viewform?usp=sf_link', dueDate: '2024-01-03', sharedDate: '2024-01-24' },
  { id: 4, subject: 'AI', title: 'Quiz 1', link: 'https://forms.gle/yGHrPaszmSXyt4Aa9', dueDate: '2024-02-13', sharedDate: '2024-02-21' },
  { id: 5, subject: 'ML', title: 'Quiz 1', link: 'https://docs.google.com/forms/d/e/1FAIpQLSeab-mMH97_GUa7EKW5hhsh0HFgMf7lez3d3zuyvfy_WoO6PQ/viewform?usp=sf_link', dueDate: '2024-02-20', sharedDate: '2024-03-19' },
  { id: 6, subject: 'DLD', title: 'Quiz 2', link: 'https://docs.google.com/forms/d/e/1FAIpQLSeab-mMH97_GUa7EKW5hhsh0HFgMf7lez3d3zuyvfy_WoO6PQ/viewform?usp=sf_link', dueDate: '2024-03-14', sharedDate: '2024-04-01' },
  { id: 7, subject: 'AI', title: 'Quiz 2', link: 'https://forms.gle/yGHrPaszmSXyt4Aa9', dueDate: '2024-03-19', sharedDate: '2024-04-20' },
  // Add more quiz data as needed
];

const QuizScreen = () => {
  const handleQuizPress = (link) => {
    Linking.openURL(link); // Open the quiz link in a web browser
  };

  // Sort quizData by title
  const sortedQuizData = quizData.slice().sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {sortedQuizData.map(quiz => (
        <TouchableOpacity key={quiz.id} style={styles.quizContainer} onPress={() => handleQuizPress(quiz.link)}>
          <View style={styles.titleContainer}>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.subjectText}>{quiz.subject}</Text>
          </View>
          <Text style={styles.dateText}>Due Date: {quiz.dueDate}</Text>
          <Text style={styles.dateText}>Shared Date: {quiz.sharedDate}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'skyblue',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  quizContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  dateText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default QuizScreen;
