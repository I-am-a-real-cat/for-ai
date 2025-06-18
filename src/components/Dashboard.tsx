import React from 'react';
import { User, Subject, WeakArea, LearningSession } from '../types';
import { Brain, Target, ArrowRight, BookOpen, Bookmark, BookmarkCheck } from 'lucide-react';

interface DashboardProps {
  user: User;
  subjects: Subject[];
  weakAreas: WeakArea[];
  recentSessions: LearningSession[];
  onSelectSubject: (subject: Subject) => void;
  onStartChat: () => void;
  onStartQuiz: () => void;
  darkMode: boolean;
  bookmarkedSubjects: string[];
  onToggleBookmark: (subjectId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  subjects,
  weakAreas,
  recentSessions,
  onSelectSubject,
  onStartChat,
  onStartQuiz,
  darkMode,
  bookmarkedSubjects,
  onToggleBookmark
}) => {
  // Filter subjects to only show bookmarked ones
  const bookmarkedSubjectsList = subjects.filter(subject => bookmarkedSubjects.includes(subject.id));
  
  const totalProgress = bookmarkedSubjectsList.length > 0 
    ? bookmarkedSubjectsList.reduce((acc, subject) => acc + (subject.completedTopics / subject.totalTopics), 0) / bookmarkedSubjectsList.length * 100
    : 0;

  const handleBookmarkClick = (e: React.MouseEvent, subjectId: string) => {
    e.stopPropagation();
    onToggleBookmark(subjectId);
  };

  // Function to get current topic name for each subject
  const getCurrentTopicName = (subjectName: string, completedTopics: number): string => {
    const topicMap: Record<string, string[]> = {
      'Mathematics': ['Derivatives', 'Integration', 'Limits', 'Series', 'Functions', 'Algebra', 'Geometry', 'Trigonometry', 'Statistics', 'Probability', 'Calculus', 'Linear Algebra', 'Differential Equations', 'Complex Numbers', 'Matrices', 'Vectors', 'Sequences', 'Logarithms', 'Exponentials', 'Polynomials', 'Rational Functions', 'Conic Sections', 'Parametric Equations', 'Polar Coordinates'],
      'Physics': ['Quantum Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Mechanics', 'Waves', 'Relativity', 'Nuclear Physics', 'Atomic Physics', 'Fluid Dynamics', 'Oscillations', 'Gravitation', 'Energy', 'Momentum', 'Electric Fields', 'Magnetic Fields', 'Circuits', 'Semiconductors', 'Superconductivity', 'Particle Physics'],
      'Chemistry': ['Organic Reactions', 'Molecular Structure', 'Kinetics', 'Equilibrium', 'Thermochemistry', 'Electrochemistry', 'Acids and Bases', 'Redox Reactions', 'Chemical Bonding', 'Periodic Trends', 'Gas Laws', 'Solutions', 'Crystallography', 'Spectroscopy', 'Catalysis', 'Polymers', 'Biochemistry', 'Environmental Chemistry'],
      'Biology': ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Molecular Biology', 'Physiology', 'Anatomy', 'Biochemistry', 'Microbiology', 'Botany', 'Zoology', 'Immunology', 'Neurobiology', 'Developmental Biology', 'Marine Biology', 'Conservation Biology', 'Biotechnology', 'Bioinformatics', 'Pharmacology', 'Toxicology', 'Epidemiology', 'Bioethics'],
      'History': ['Ancient Civilizations', 'Medieval Period', 'Renaissance', 'Modern Era', 'World Wars', 'Cold War', 'Industrial Revolution', 'American Revolution', 'French Revolution', 'Roman Empire', 'Greek Civilization', 'Egyptian History', 'Asian History', 'African History', 'European History', 'Colonial Period'],
      'Literature': ['Poetry Analysis', 'Novel Studies', 'Literary Criticism', 'Creative Writing', 'Shakespeare', 'Modern Literature', 'Classical Literature', 'American Literature', 'British Literature', 'World Literature', 'Drama', 'Short Stories', 'Essays', 'Rhetoric']
    };
    
    const topics = topicMap[subjectName] || ['General Topics'];
    // Return the topic at the current progress index (completedTopics represents the next topic to learn)
    return topics[Math.min(completedTopics, topics.length - 1)] || 'Advanced Topics';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome back, <span className="text-blue-600">{user.name}</span>
          </h1>
          <p className={`text-xl mb-8 max-w-2xl mx-auto transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Continue your personalized learning journey with AI-powered tutoring and adaptive quizzes
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={onStartChat}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Brain className="w-5 h-5 mr-2" />
              Start AI Tutoring
            </button>
            <button
              onClick={onStartQuiz}
              className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              <Target className="w-5 h-5 mr-2" />
              Daily Practice
            </button>
          </div>
        </div>

        {/* Learning Paths */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Learning Paths</h2>
            <span className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>{bookmarkedSubjectsList.length} bookmarked subjects</span>
          </div>
          
          {bookmarkedSubjectsList.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>No Bookmarked Subjects</h3>
              <p className={`transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Bookmark subjects from the available list to see them here in your learning paths
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedSubjectsList.map((subject) => {
                const progress = (subject.completedTopics / subject.totalTopics) * 100;
                const isBookmarked = bookmarkedSubjects.includes(subject.id);
                const currentTopicName = getCurrentTopicName(subject.name, subject.completedTopics);
                
                return (
                  <div
                    key={subject.id}
                    onClick={() => onSelectSubject(subject)}
                    className={`group cursor-pointer border rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-200 ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <span className="text-white font-bold text-lg">{subject.name.charAt(0)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => handleBookmarkClick(e, subject.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isBookmarked
                              ? 'text-blue-600 hover:text-blue-700'
                              : darkMode
                              ? 'text-gray-400 hover:text-gray-300'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                        <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                          subject.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          subject.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {subject.difficulty}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className={`text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {subject.name}
                    </h3>
                    <p className={`text-sm mb-4 transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{subject.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className={`transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {subject.completedTopics}/{subject.totalTopics} topics: {currentTopicName}
                        </span>
                        <span className={`font-medium transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{Math.round(progress)}%</span>
                      </div>
                      <div className={`w-full rounded-full h-2 ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${subject.color} transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end pt-4 border-t border-opacity-20 border-gray-300">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>Continue</span>
                        <ArrowRight className={`w-4 h-4 group-hover:text-blue-600 transition-colors ${
                          darkMode ? 'text-gray-400' : 'text-gray-400'
                        }`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};