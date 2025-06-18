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

export const elementaryA2Data: CourseNode[] = [
  {
    id: 'a2-chapter-1',
    title: '1 - Past Experiences',
    lessons: 8,
    exercises: 74,
    completion: 65,
    hasChildren: true,
    children: [
      {
        id: 'a2-lesson-1-1',
        title: '1 Simple past tense',
        lessons: 1,
        exercises: 12,
        completion: 80,
        hasChildren: true,
        children: [
          {
            id: 'a2-vocabulary-1-1',
            title: 'Vocabulary',
            lessons: 1,
            exercises: 8,
            completion: 85,
            hasChildren: true,
            children: [
              { id: 'a2-exercise-1-1-1', title: '1 Past time expressions', lessons: 0, exercises: 0, completion: 90, hasChildren: false },
              { id: 'a2-exercise-1-1-2', title: '2 Irregular verbs', lessons: 0, exercises: 0, completion: 80, hasChildren: false },
              { id: 'a2-exercise-1-1-3', title: '3 Time markers', lessons: 0, exercises: 0, completion: 85, hasChildren: false }
            ]
          },
          {
            id: 'a2-grammar-1-1',
            title: 'Grammar',
            lessons: 0,
            exercises: 4,
            completion: 75,
            hasChildren: true,
            children: [
              { id: 'a2-exercise-1-1-4', title: '1 Regular past forms', lessons: 0, exercises: 0, completion: 80, hasChildren: false },
              { id: 'a2-exercise-1-1-5', title: '2 Negative sentences', lessons: 0, exercises: 0, completion: 70, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'a2-lesson-1-2',
        title: '2 Telling stories',
        lessons: 1,
        exercises: 15,
        completion: 55,
        hasChildren: true,
        children: [
          {
            id: 'a2-vocabulary-1-2',
            title: 'Vocabulary',
            lessons: 1,
            exercises: 10,
            completion: 60,
            hasChildren: true,
            children: [
              { id: 'a2-exercise-1-2-1', title: '1 Story connectors', lessons: 0, exercises: 0, completion: 65, hasChildren: false },
              { id: 'a2-exercise-1-2-2', title: '2 Descriptive words', lessons: 0, exercises: 0, completion: 55, hasChildren: false }
            ]
          },
          {
            id: 'a2-speaking-1-2',
            title: 'Speaking',
            lessons: 0,
            exercises: 5,
            completion: 50,
            hasChildren: true,
            children: [
              { id: 'a2-exercise-1-2-3', title: '1 Personal anecdotes', lessons: 0, exercises: 0, completion: 55, hasChildren: false },
              { id: 'a2-exercise-1-2-4', title: '2 Story sequencing', lessons: 0, exercises: 0, completion: 45, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'a2-lesson-1-3',
        title: '3 Weekend activities',
        lessons: 1,
        exercises: 18,
        completion: 72,
        hasChildren: false
      },
      {
        id: 'a2-lesson-1-4',
        title: '4 Travel experiences',
        lessons: 1,
        exercises: 11,
        completion: 60,
        hasChildren: false
      },
      {
        id: 'a2-lesson-1-5',
        title: '5 Past habits',
        lessons: 1,
        exercises: 9,
        completion: 58,
        hasChildren: false
      },
      {
        id: 'a2-lesson-1-6',
        title: '6 Biography writing',
        lessons: 1,
        exercises: 6,
        completion: 70,
        hasChildren: false
      },
      {
        id: 'a2-lesson-1-7',
        title: 'Checkpoint #1',
        lessons: 1,
        exercises: 3,
        completion: 80,
        hasChildren: false
      }
    ]
  },
  {
    id: 'a2-chapter-2',
    title: '2 - Future Plans',
    lessons: 7,
    exercises: 58,
    completion: 35,
    hasChildren: true,
    children: [
      {
        id: 'a2-lesson-2-1',
        title: '1 Going to future',
        lessons: 1,
        exercises: 14,
        completion: 45,
        hasChildren: true,
        children: [
          {
            id: 'a2-vocabulary-2-1',
            title: 'Vocabulary',
            lessons: 1,
            exercises: 8,
            completion: 50,
            hasChildren: true,
            children: [
              { id: 'a2-exercise-2-1-1', title: '1 Future time expressions', lessons: 0, exercises: 0, completion: 55, hasChildren: false },
              { id: 'a2-exercise-2-1-2', title: '2 Plans and intentions', lessons: 0, exercises: 0, completion: 45, hasChildren: false }
            ]
          },
          {
            id: 'a2-grammar-2-1',
            title: 'Grammar',
            lessons: 0,
            exercises: 6,
            completion: 40,
            hasChildren: true,
            children: [
              { id: 'a2-exercise-2-1-3', title: '1 Going to structure', lessons: 0, exercises: 0, completion: 45, hasChildren: false },
              { id: 'a2-exercise-2-1-4', title: '2 Questions and negatives', lessons: 0, exercises: 0, completion: 35, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'a2-lesson-2-2',
        title: '2 Making predictions',
        lessons: 1,
        exercises: 12,
        completion: 28,
        hasChildren: false
      },
      {
        id: 'a2-lesson-2-3',
        title: '3 Scheduling appointments',
        lessons: 1,
        exercises: 10,
        completion: 40,
        hasChildren: false
      },
      {
        id: 'a2-lesson-2-4',
        title: '4 Holiday plans',
        lessons: 1,
        exercises: 8,
        completion: 32,
        hasChildren: false
      },
      {
        id: 'a2-lesson-2-5',
        title: '5 Career goals',
        lessons: 1,
        exercises: 7,
        completion: 25,
        hasChildren: false
      },
      {
        id: 'a2-lesson-2-6',
        title: 'Checkpoint #2',
        lessons: 1,
        exercises: 7,
        completion: 45,
        hasChildren: false
      }
    ]
  },
  {
    id: 'a2-chapter-3',
    title: '3 - Comparisons',
    lessons: 6,
    exercises: 49,
    completion: 58,
    hasChildren: true,
    children: [
      {
        id: 'a2-lesson-3-1',
        title: '1 Comparative adjectives',
        lessons: 1,
        exercises: 16,
        completion: 70,
        hasChildren: false
      },
      {
        id: 'a2-lesson-3-2',
        title: '2 Superlative adjectives',
        lessons: 1,
        exercises: 14,
        completion: 62,
        hasChildren: false
      },
      {
        id: 'a2-lesson-3-3',
        title: '3 Comparing cities',
        lessons: 1,
        exercises: 8,
        completion: 55,
        hasChildren: false
      },
      {
        id: 'a2-lesson-3-4',
        title: '4 Shopping comparisons',
        lessons: 1,
        exercises: 6,
        completion: 48,
        hasChildren: false
      },
      {
        id: 'a2-lesson-3-5',
        title: 'Checkpoint #3',
        lessons: 1,
        exercises: 5,
        completion: 60,
        hasChildren: false
      }
    ]
  },
  {
    id: 'a2-chapter-4',
    title: '4 - Present Perfect',
    lessons: 7,
    exercises: 52,
    completion: 38,
    hasChildren: true,
    children: [
      {
        id: 'a2-lesson-4-1',
        title: '1 Present perfect introduction',
        lessons: 1,
        exercises: 14,
        completion: 50,
        hasChildren: false
      },
      {
        id: 'a2-lesson-4-2',
        title: '2 Ever and never',
        lessons: 1,
        exercises: 12,
        completion: 42,
        hasChildren: false
      },
      {
        id: 'a2-lesson-4-3',
        title: '3 Just, already, yet',
        lessons: 1,
        exercises: 10,
        completion: 35,
        hasChildren: false
      },
      {
        id: 'a2-lesson-4-4',
        title: '4 For and since',
        lessons: 1,
        exercises: 8,
        completion: 28,
        hasChildren: false
      },
      {
        id: 'a2-lesson-4-5',
        title: '5 Life experiences',
        lessons: 1,
        exercises: 6,
        completion: 45,
        hasChildren: false
      },
      {
        id: 'a2-lesson-4-6',
        title: 'Checkpoint #4',
        lessons: 1,
        exercises: 2,
        completion: 30,
        hasChildren: false
      }
    ]
  },
  {
    id: 'a2-chapter-5',
    title: '5 - Modals',
    lessons: 6,
    exercises: 43,
    completion: 22,
    hasChildren: true,
    children: [
      {
        id: 'a2-lesson-5-1',
        title: '1 Can and could',
        lessons: 1,
        exercises: 12,
        completion: 35,
        hasChildren: false
      },
      {
        id: 'a2-lesson-5-2',
        title: '2 Should and must',
        lessons: 1,
        exercises: 10,
        completion: 18,
        hasChildren: false
      },
      {
        id: 'a2-lesson-5-3',
        title: '3 May and might',
        lessons: 1,
        exercises: 8,
        completion: 15,
        hasChildren: false
      },
      {
        id: 'a2-lesson-5-4',
        title: '4 Permission and obligation',
        lessons: 1,
        exercises: 7,
        completion: 20,
        hasChildren: false
      },
      {
        id: 'a2-lesson-5-5',
        title: 'Checkpoint #5',
        lessons: 1,
        exercises: 6,
        completion: 25,
        hasChildren: false
      }
    ]
  }
]; 