import React, { useState } from 'react';
import { 
  Calendar, BarChart3, Clock, BookOpen, Award, 
  TrendingUp, Flame, Target
} from 'lucide-react';

interface StudyDashboardProps {
  onBack: () => void;
  darkMode: boolean;
}

export const StudyDashboard: React.FC<StudyDashboardProps> = ({ onBack, darkMode }) => {
  // Mock data for the analytics
  const todayStudyTime = 145; // minutes
  const totalStudyTime = 2840; // minutes
  const dayStreak = 12;
  const allSubjects = 6;
  const finishedSubjects = 2;

  // Mock data for the last 7 days of study time
  const weeklyData = [
    { day: 'Mon', minutes: 120, date: '12/9' },
    { day: 'Tue', minutes: 95, date: '12/10' },
    { day: 'Wed', minutes: 180, date: '12/11' },
    { day: 'Thu', minutes: 75, date: '12/12' },
    { day: 'Fri', minutes: 160, date: '12/13' },
    { day: 'Sat', minutes: 200, date: '12/14' },
    { day: 'Sun', minutes: 145, date: '12/15' }
  ];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const maxStudyTime = Math.max(...weeklyData.map(d => d.minutes));
  const minStudyTime = Math.min(...weeklyData.map(d => d.minutes));

  // Generate SVG path for the line
  const generateLinePath = () => {
    const width = 600;
    const height = 200;
    const padding = 40;
    
    const points = weeklyData.map((day, index) => {
      const x = padding + (index * (width - 2 * padding)) / (weeklyData.length - 1);
      const y = height - padding - ((day.minutes - minStudyTime) / (maxStudyTime - minStudyTime)) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  // Generate points for circles
  const generatePoints = () => {
    const width = 600;
    const height = 200;
    const padding = 40;
    
    return weeklyData.map((day, index) => {
      const x = padding + (index * (width - 2 * padding)) / (weeklyData.length - 1);
      const y = height - padding - ((day.minutes - minStudyTime) / (maxStudyTime - minStudyTime)) * (height - 2 * padding);
      return { x, y, day, minutes: day.minutes, date: day.date };
    });
  };

  const points = generatePoints();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Study Analytics</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {/* Today's Study Time */}
          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{formatTime(todayStudyTime)}</span>
            </div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Today's Study Time</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Current session progress</p>
          </div>

          {/* Total Study Time */}
          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{Math.floor(totalStudyTime / 60)}h</span>
            </div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Total Study Time</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>All time accumulated</p>
          </div>

          {/* Day Streak */}
          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">{dayStreak}</span>
            </div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Day Streak</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Consecutive study days</p>
          </div>

          {/* All Subjects */}
          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{allSubjects}</span>
            </div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>All Subjects</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Total enrolled</p>
          </div>

          {/* Finished Subjects */}
          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-yellow-600">{finishedSubjects}</span>
            </div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Finished Subjects</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>100% completed</p>
          </div>
        </div>

        {/* Weekly Study Time Line Graph */}
        <div className={`border rounded-xl p-8 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className={`text-2xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Daily Study Time</h2>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Last 7 days study time tracking</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Study Time</span>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="space-y-6">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[600px] h-[280px] relative">
                {/* SVG Line Chart */}
                <svg width="100%" height="240" className="absolute top-0 left-0">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="100" height="40" patternUnits="userSpaceOnUse">
                      <path 
                        d="M 100 0 L 0 0 0 40" 
                        fill="none" 
                        stroke={darkMode ? '#374151' : '#e5e7eb'} 
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Y-axis labels */}
                  {[0, 1, 2, 3, 4].map((i) => {
                    const value = minStudyTime + (i * (maxStudyTime - minStudyTime)) / 4;
                    const y = 200 - 40 - (i * 120) / 4;
                    return (
                      <text
                        key={i}
                        x="20"
                        y={y + 5}
                        className={`text-xs fill-current ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        textAnchor="end"
                      >
                        {formatTime(Math.round(value))}
                      </text>
                    );
                  })}
                  
                  {/* Area under the line */}
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
                    </linearGradient>
                  </defs>
                  <path
                    d={`${generateLinePath()} L ${points[points.length - 1].x},160 L ${points[0].x},160 Z`}
                    fill="url(#areaGradient)"
                  />
                  
                  {/* Main line */}
                  <path
                    d={generateLinePath()}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-sm"
                  />
                  
                  {/* Data points */}
                  {points.map((point, index) => (
                    <g key={index}>
                      {/* Outer circle */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        fill="#3b82f6"
                        className="opacity-20"
                      />
                      {/* Inner circle */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="#3b82f6"
                        className="cursor-pointer hover:r-6 transition-all duration-200"
                      />
                      {/* Invisible larger circle for better hover */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="15"
                        fill="transparent"
                        className="cursor-pointer"
                      >
                        <title>{`${point.day} (${point.date}): ${formatTime(point.minutes)}`}</title>
                      </circle>
                    </g>
                  ))}
                </svg>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 w-full flex justify-between px-10">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-sm font-medium transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{day.day}</div>
                      <div className={`text-xs transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{day.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary stats */}
            <div className={`border-t pt-6 transition-colors duration-300 ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{formatTime(weeklyData.reduce((sum, day) => sum + day.minutes, 0))}</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Total This Week</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{formatTime(Math.round(weeklyData.reduce((sum, day) => sum + day.minutes, 0) / 7))}</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Daily Average</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{formatTime(maxStudyTime)}</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Best Day</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-green-600`}>+{Math.round(((weeklyData[6].minutes - weeklyData[0].minutes) / weeklyData[0].minutes) * 100)}%</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Week Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};