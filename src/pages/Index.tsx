
import React, { useState } from 'react';
import { Search, Download, BookOpen, GraduationCap, Filter } from 'lucide-react';
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
  description: string;
  author: string;
  downloadUrl: string;
  pages: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const samplePapers: Paper[] = [
  {
    id: 1,
    title: "Introduction to Algebra",
    subject: "Mathematics",
    grade: "High School",
    description: "Comprehensive guide to algebraic expressions and equations",
    author: "Dr. Sarah Johnson",
    downloadUrl: "#",
    pages: 45,
    difficulty: "Medium"
  },
  {
    id: 2,
    title: "Cell Biology Fundamentals",
    subject: "Science",
    grade: "High School",
    description: "Detailed study of cellular structures and functions",
    author: "Prof. Michael Chen",
    downloadUrl: "#",
    pages: 62,
    difficulty: "Hard"
  },
  {
    id: 3,
    title: "Creative Writing Techniques",
    subject: "English",
    grade: "Middle School",
    description: "Essential techniques for developing creative writing skills",
    author: "Ms. Emily Rodriguez",
    downloadUrl: "#",
    pages: 28,
    difficulty: "Easy"
  },
  {
    id: 4,
    title: "World War II History",
    subject: "History",
    grade: "High School",
    description: "Comprehensive overview of World War II events and impact",
    author: "Dr. Robert Taylor",
    downloadUrl: "#",
    pages: 78,
    difficulty: "Medium"
  },
  {
    id: 5,
    title: "Basic Geometry Shapes",
    subject: "Mathematics",
    grade: "Elementary",
    description: "Introduction to geometric shapes and their properties",
    author: "Mrs. Lisa Williams",
    downloadUrl: "#",
    pages: 24,
    difficulty: "Easy"
  },
  {
    id: 6,
    title: "Environmental Science",
    subject: "Science",
    grade: "University",
    description: "Advanced concepts in environmental science and sustainability",
    author: "Dr. Amanda Green",
    downloadUrl: "#",
    pages: 95,
    difficulty: "Hard"
  }
];

const grades = ["All Grades", "Elementary", "Middle School", "High School", "University"];
const subjects = ["All Subjects", "Mathematics", "Science", "English", "History", "Art", "Music", "Physical Education"];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  const filteredPapers = samplePapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "All Grades" || paper.grade === selectedGrade;
    const matchesSubject = selectedSubject === "All Subjects" || paper.subject === selectedSubject;
    
    return matchesSearch && matchesGrade && matchesSubject;
  });

  const handleDownload = (paper: Paper) => {
    console.log(`Downloading paper: ${paper.title}`);
    // In a real application, this would handle the actual download
    alert(`Downloading "${paper.title}" - ${paper.pages} pages`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">AcademicPapers</h1>
          </div>
          <p className="mt-2 text-gray-600">Download educational papers by grade and subject</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search papers by title, description, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Grade Filter */}
            <div className="lg:w-48">
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subject Filter */}
            <div className="lg:w-48">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <BookOpen className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredPapers.length} paper{filteredPapers.length !== 1 ? 's' : ''}
            {selectedGrade !== "All Grades" && ` for ${selectedGrade}`}
            {selectedSubject !== "All Subjects" && ` in ${selectedSubject}`}
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
                  <Badge className={`text-xs ${getDifficultyColor(paper.difficulty)}`}>
                    {paper.difficulty}
                  </Badge>
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
              Try adjusting your search terms or filters to find more papers.
            </p>
          </div>
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
