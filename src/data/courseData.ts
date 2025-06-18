export interface CourseNode {
  id: string;
  title: string;
  lessons: number;
  exercises: number;
  completion: number;
  hasChildren: boolean;
  children?: CourseNode[];
  defaultExpanded?: boolean;
}

export const courseData: CourseNode[] = [
  {
    id: 'chapter-1',
    title: '1 - Introductions',
    lessons: 7,
    exercises: 62,
    completion: 72,
    hasChildren: false
  },
  {
    id: 'chapter-2',
    title: '2 - Greetings',
    lessons: 6,
    exercises: 41,
    completion: 12,
    hasChildren: true,
    children: [
      {
        id: 'lesson-2-1',
        title: '1 Saying how you are',
        lessons: 1,
        exercises: 7,
        completion: 13,
        hasChildren: false
      },
      {
        id: 'lesson-2-2',
        title: '2 Referring to a person',
        lessons: 6,
        exercises: 5,
        completion: 13,
        hasChildren: false
      },
      {
        id: 'lesson-2-3',
        title: '3 Asking how somebody is',
        lessons: 6,
        exercises: 6,
        completion: 45,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-2-3',
            title: 'Vocabulary',
            lessons: 1,
            exercises: 6,
            completion: 13,
            hasChildren: true,
            children: [
              {
                id: 'exercise-2-3-1',
                title: '1 Flashcard',
                lessons: 0,
                exercises: 0,
                completion: 0,
                hasChildren: false
              },
              {
                id: 'exercise-2-3-2',
                title: '2 Fillgap',
                lessons: 0,
                exercises: 0,
                completion: 0,
                hasChildren: false
              },
              {
                id: 'exercise-2-3-3',
                title: 'Phrase builder Audio',
                lessons: 0,
                exercises: 0,
                completion: 0,
                hasChildren: false
              },
              {
                id: 'exercise-2-3-4',
                title: '3 Flashcard',
                lessons: 0,
                exercises: 0,
                completion: 0,
                hasChildren: false
              },
              {
                id: 'exercise-2-3-5',
                title: '4 True or False Image & Audio',
                lessons: 0,
                exercises: 0,
                completion: 0,
                hasChildren: false
              },
              {
                id: 'exercise-2-3-6',
                title: '5 Fillgap',
                lessons: 0,
                exercises: 0,
                completion: 0,
                hasChildren: false
              },
              {
                id: 'exercise-2-3-7',
                title: '6 Matchup',
                lessons: 0,
                exercises: 0,
                completion: 0,
                hasChildren: false
              }
            ]
          }
        ]
      },
      {
        id: 'lesson-2-4',
        title: '4 Speaking - Speaking about yourself',
        lessons: 1,
        exercises: 9,
        completion: 56,
        hasChildren: false
      },
      {
        id: 'lesson-2-5',
        title: '5 Developing fluency',
        lessons: 1,
        exercises: 6,
        completion: 72,
        hasChildren: false
      },
      {
        id: 'lesson-2-6',
        title: 'Checkpoint # 1',
        lessons: 1,
        exercises: 8,
        completion: 93,
        hasChildren: false
      }
    ]
  },
  {
    id: 'chapter-3',
    title: '3 - All about me',
    lessons: 11,
    exercises: 57,
    completion: 54,
    hasChildren: false
  },
  {
    id: 'chapter-4',
    title: '4 - People and things',
    lessons: 7,
    exercises: 68,
    completion: 12,
    hasChildren: false
  },
  {
    id: 'chapter-5',
    title: '5 - Languages',
    lessons: 9,
    exercises: 45,
    completion: 92,
    hasChildren: false
  }
];

export const additionalChapters: CourseNode[] = [
  {
    id: 'chapter-6',
    title: '6 - Food and drinks',
    lessons: 8,
    exercises: 54,
    completion: 78,
    hasChildren: false
  },
  {
    id: 'chapter-7',
    title: '7 - Daily routines',
    lessons: 10,
    exercises: 67,
    completion: 45,
    hasChildren: false
  },
  {
    id: 'chapter-8',
    title: '8 - Travel and transport',
    lessons: 12,
    exercises: 89,
    completion: 23,
    hasChildren: false
  },
  {
    id: 'chapter-9',
    title: '9 - Shopping',
    lessons: 7,
    exercises: 41,
    completion: 91,
    hasChildren: false
  },
  {
    id: 'chapter-10',
    title: '10 - Weather and seasons',
    lessons: 6,
    exercises: 38,
    completion: 67,
    hasChildren: false
  }
]; 