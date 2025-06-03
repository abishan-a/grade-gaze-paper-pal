
import React, { useState } from 'react';
import { Search, Download, BookOpen, GraduationCap, Filter, Youtube, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Paper {
  id: number;
  title: string;
  subject: string;
  grade: string;
  medium: string;
  description: string;
  author: string;
  downloadUrl: string;
  pages: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface SubjectVideo {
  subject: string;
  medium: string;
  videos: {
    title: string;
    url: string;
    description: string;
  }[];
}

const samplePapers: Paper[] = [
  {
    id: 1,
    title: "Introduction to Algebra",
    subject: "Mathematics",
    grade: "High School",
    medium: "English",
    description: "Comprehensive guide to algebraic expressions and equations",
    author: "Dr. Sarah Johnson",
    downloadUrl: "#",
    pages: 45,
    difficulty: "Medium"
  },
  {
    id: 2,
    title: "இயற்கணித அடிப்படைகள்",
    subject: "Mathematics",
    grade: "High School",
    medium: "Tamil",
    description: "இயற்கணித வெளிப்பாடுகள் மற்றும் சமன்பாடுகளுக்கான விரிவான வழிகாட்டி",
    author: "டாக்டர் ராஜேஷ் குமார்",
    downloadUrl: "#",
    pages: 50,
    difficulty: "Medium"
  },
  {
    id: 3,
    title: "Cell Biology Fundamentals",
    subject: "Science",
    grade: "High School",
    medium: "English",
    description: "Detailed study of cellular structures and functions",
    author: "Prof. Michael Chen",
    downloadUrl: "#",
    pages: 62,
    difficulty: "Hard"
  },
  {
    id: 4,
    title: "உயிரணு உயிரியல் அடிப்படைகள்",
    subject: "Science",
    grade: "High School",
    medium: "Tamil",
    description: "உயிரணு கட்டமைப்புகள் மற்றும் செயல்பாடுகளின் விரிவான ஆய்வு",
    author: "பேராசிரியர் சுந்தர் ராமன்",
    downloadUrl: "#",
    pages: 58,
    difficulty: "Hard"
  },
  {
    id: 5,
    title: "Creative Writing Techniques",
    subject: "English",
    grade: "Middle School",
    medium: "English",
    description: "Essential techniques for developing creative writing skills",
    author: "Ms. Emily Rodriguez",
    downloadUrl: "#",
    pages: 28,
    difficulty: "Easy"
  },
  {
    id: 6,
    title: "World War II History",
    subject: "History",
    grade: "High School",
    medium: "English",
    description: "Comprehensive overview of World War II events and impact",
    author: "Dr. Robert Taylor",
    downloadUrl: "#",
    pages: 78,
    difficulty: "Medium"
  }
];

const subjectVideos: SubjectVideo[] = [
  {
    subject: "Mathematics",
    medium: "English",
    videos: [
      {
        title: "Khan Academy - Algebra Basics",
        url: "https://www.youtube.com/watch?v=NybHckSEQBI",
        description: "Complete introduction to algebraic thinking and problem solving"
      },
      {
        title: "Professor Leonard - Calculus",
        url: "https://www.youtube.com/watch?v=fYyARMqiaag",
        description: "Comprehensive calculus lectures for advanced students"
      }
    ]
  },
  {
    subject: "Mathematics",
    medium: "Tamil",
    videos: [
      {
        title: "கணிதம் - இயற்கணித அடிப்படைகள்",
        url: "https://www.youtube.com/watch?v=example1",
        description: "இயற்கணித சிந்தனை மற்றும் சிக்கல் தீர்வுக்கான முழுமையான அறிமுகம்"
      },
      {
        title: "தமிழில் கணிதம் - வடிவியல்",
        url: "https://www.youtube.com/watch?v=example2",
        description: "வடிவியல் கருத்துகள் மற்றும் சூத்திரங்கள்"
      }
    ]
  },
  {
    subject: "Science",
    medium: "English",
    videos: [
      {
        title: "Crash Course Biology",
        url: "https://www.youtube.com/watch?v=QnQe0xW_JY4",
        description: "Engaging biology lessons covering cellular processes and life sciences"
      },
      {
        title: "SciShow - Environmental Science",
        url: "https://www.youtube.com/watch?v=RS7IzU2VJIQ",
        description: "Environmental science concepts and sustainability practices"
      }
    ]
  },
  {
    subject: "Science",
    medium: "Tamil",
    videos: [
      {
        title: "அறிவியல் - உயிரணு உயிரியல்",
        url: "https://www.youtube.com/watch?v=example3",
        description: "உயிரணு செயல்முறைகள் மற்றும் உயிர் அறிவியல்களை உள்ளடக்கிய பாடங்கள்"
      },
      {
        title: "தமிழில் இயற்பியல்",
        url: "https://www.youtube.com/watch?v=example4",
        description: "இயற்பியல் கருத்துகள் மற்றும் விதிகள்"
      }
    ]
  }
];

const grades = ["Elementary", "Middle School", "High School", "University"];
const subjects = ["Mathematics", "Science", "English", "History", "Art", "Music", "Physical Education"];
const mediums = ["Tamil", "English"];

const Index = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getCurrentStepSubjects = () => {
    if (!selectedGrade) return [];
    return subjects;
  };

  const filteredPapers = samplePapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !selectedGrade || paper.grade === selectedGrade;
    const matchesSubject = !selectedSubject || paper.subject === selectedSubject;
    const matchesMedium = !selectedMedium || paper.medium === selectedMedium;
    
    return matchesSearch && matchesGrade && matchesSubject && matchesMedium;
  });

  const getCurrentVideos = () => {
    if (!selectedSubject || !selectedMedium) return [];
    return subjectVideos.find(sv => sv.subject === selectedSubject && sv.medium === selectedMedium)?.videos || [];
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = (paper: Paper) => {
    console.log(`Downloading paper: ${paper.title}`);
    alert(`Downloading "${paper.title}" - ${paper.pages} pages`);
  };

  const resetSelections = () => {
    setSelectedGrade("");
    setSelectedSubject("");
    setSelectedMedium("");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">AcademicPapers</h1>
            </div>
            {(selectedGrade || selectedSubject || selectedMedium) && (
              <Button variant="outline" onClick={resetSelections}>
                Start Over
              </Button>
            )}
          </div>
          <p className="mt-2 text-gray-600">Download educational papers by grade, subject, and language</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step-by-step Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Find Your Educational Content</h2>
          
          {/* Step 1: Grade Selection */}
          {!selectedGrade && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                <h3 className="text-lg font-medium text-gray-900">Select Your Grade Level</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-10">
                {grades.map((grade) => (
                  <Button
                    key={grade}
                    variant="outline"
                    className="h-16 text-left justify-start hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => setSelectedGrade(grade)}
                  >
                    <div>
                      <div className="font-medium">{grade}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Subject Selection */}
          {selectedGrade && !selectedSubject && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="text-gray-600">Grade: {selectedGrade}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                <h3 className="text-lg font-medium text-gray-900">Select Subject</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-10">
                {getCurrentStepSubjects().map((subject) => (
                  <Button
                    key={subject}
                    variant="outline"
                    className="h-16 text-left justify-start hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => setSelectedSubject(subject)}
                  >
                    <div>
                      <div className="font-medium">{subject}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Medium Selection */}
          {selectedGrade && selectedSubject && !selectedMedium && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="text-gray-600">Grade: {selectedGrade}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="text-gray-600">Subject: {selectedSubject}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                <h3 className="text-lg font-medium text-gray-900">Select Language Medium</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 ml-10 max-w-md">
                {mediums.map((medium) => (
                  <Button
                    key={medium}
                    variant="outline"
                    className="h-16 text-left justify-start hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => setSelectedMedium(medium)}
                  >
                    <div>
                      <div className="font-medium">{medium}</div>
                      <div className="text-sm text-gray-500">
                        {medium === "Tamil" ? "தமிழ்" : "English"}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Final Selection Summary */}
          {selectedGrade && selectedSubject && selectedMedium && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="text-gray-600">Grade: {selectedGrade}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="text-gray-600">Subject: {selectedSubject}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="text-gray-600">Medium: {selectedMedium}</span>
              </div>
              
              {/* Search */}
              <div className="ml-10">
                <Input
                  placeholder="Search papers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {selectedGrade && selectedSubject && selectedMedium && (
          <>
            {/* YouTube Videos Section */}
            {getCurrentVideos().length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Youtube className="h-5 w-5 text-red-600 mr-2" />
                  Related YouTube Videos - {selectedSubject} ({selectedMedium})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getCurrentVideos().map((video, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <Youtube className="h-4 w-4 mr-1" />
                        Watch Video
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Found {filteredPapers.length} paper{filteredPapers.length !== 1 ? 's' : ''} for {selectedGrade} - {selectedSubject} ({selectedMedium})
              </p>
            </div>

            {/* Papers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPapers.map((paper) => (
                <Card key={paper.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {paper.grade}
                      </Badge>
                      <div className="flex space-x-1">
                        <Badge className={`text-xs ${getDifficultyColor(paper.difficulty)}`}>
                          {paper.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {paper.medium}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {paper.title}
                    </CardTitle>
                    <CardDescription className="text-blue-600 font-medium">
                      {paper.subject}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {paper.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Author:</span> {paper.author}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Pages:</span> {paper.pages}
                      </p>
                    </div>
                    <Button 
                      onClick={() => handleDownload(paper)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Paper
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredPapers.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
                <p className="text-gray-600">
                  No papers available for {selectedSubject} in {selectedMedium} for {selectedGrade} level.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 AcademicPapers. Educational resources for all grade levels.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
