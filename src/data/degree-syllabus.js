export const DEGREE_PROGRAMS = [
 {
 id: 'btech-cse',
 name: 'B.Tech Computer Science',
 duration: '4 Years (8 Semesters)',
 color: '#D4A373', // Bronze/Gold
 semesters: [
 { id: 'sem-1', name: 'Semester 1', subjects: ['Engineering Mathematics I', 'Physics for CS', 'Basic Electrical Engineering', 'Programming in C'] },
 { id: 'sem-2', name: 'Semester 2', subjects: ['Engineering Mathematics II', 'Chemistry', 'Data Structures using C', 'Digital Logic Design'] },
 { id: 'sem-3', name: 'Semester 3', subjects: ['Object Oriented Programming (C++/Java)', 'Computer Organization', 'Discrete Mathematics', 'Database Management Systems'] },
 { id: 'sem-4', name: 'Semester 4', subjects: ['Operating Systems', 'Design and Analysis of Algorithms', 'Software Engineering', 'Computer Networks'] },
 { id: 'sem-5', name: 'Semester 5', subjects: ['Theory of Computation', 'Web Technologies', 'Microprocessors', 'Compiler Design'] },
 { id: 'sem-6', name: 'Semester 6', subjects: ['Artificial Intelligence', 'Machine Learning', 'Computer Graphics', 'Information Security'] },
 { id: 'sem-7', name: 'Semester 7', subjects: ['Cloud Computing', 'Big Data Analytics', 'Elective I', 'Minor Project'] },
 { id: 'sem-8', name: 'Semester 8', subjects: ['Major Project', 'Elective II', 'Industrial Training'] }
 ]
 },
 {
 id: 'bca',
 name: 'Bachelor of Computer Applications (BCA)',
 duration: '3 Years (6 Semesters)',
 color: '#8D99AE', // Silver/Steel
 semesters: [
 { id: 'sem-1', name: 'Semester 1', subjects: ['Computer Fundamentals', 'Programming in C', 'Mathematics I'] },
 { id: 'sem-2', name: 'Semester 2', subjects: ['Data Structures', 'Operating Systems', 'Mathematics II'] },
 ]
 }
];

export const SUBJECT_UNITS = {
 'Operating Systems': [
 { name: 'Unit 1: Introduction', topics: ['OS Components', 'System Calls', 'OS Structures'] },
 { name: 'Unit 2: Process Management', topics: ['Process Scheduling', 'Inter-process Communication', 'Threads'] },
 { name: 'Unit 3: Concurrency', topics: ['Mutex', 'Semaphores', 'Deadlock Characterization'] },
 { name: 'Unit 4: Memory Management', topics: ['Paging', 'Segmentation', 'Virtual Memory', 'Page Replacement Algorithms'] },
 ]
};
