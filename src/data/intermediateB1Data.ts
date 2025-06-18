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

export const intermediateB1Data: CourseNode[] = [
  {
    id: 'b1-chapter-1',
    title: '1 - Complex Tenses',
    lessons: 9,
    exercises: 82,
    completion: 45,
    hasChildren: true,
    children: [
      {
        id: 'b1-lesson-1-1',
        title: '1 Present perfect',
        lessons: 1,
        exercises: 18,
        completion: 60,
        hasChildren: true,
        children: [
          {
            id: 'b1-vocabulary-1-1',
            title: 'Vocabulary',
            lessons: 1,
            exercises: 10,
            completion: 65,
            hasChildren: true,
            children: [
              { id: 'b1-exercise-1-1-1', title: '1 Time expressions', lessons: 0, exercises: 0, completion: 70, hasChildren: false },
              { id: 'b1-exercise-1-1-2', title: '2 Experience vocabulary', lessons: 0, exercises: 0, completion: 60, hasChildren: false },
              { id: 'b1-exercise-1-1-3', title: '3 Achievement words', lessons: 0, exercises: 0, completion: 65, hasChildren: false }
            ]
          },
          {
            id: 'b1-grammar-1-1',
            title: 'Grammar',
            lessons: 0,
            exercises: 8,
            completion: 55,
            hasChildren: true,
            children: [
              { id: 'b1-exercise-1-1-4', title: '1 Formation rules', lessons: 0, exercises: 0, completion: 60, hasChildren: false },
              { id: 'b1-exercise-1-1-5', title: '2 Ever/never usage', lessons: 0, exercises: 0, completion: 50, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'b1-lesson-1-2',
        title: '2 Past perfect',
        lessons: 1,
        exercises: 16,
        completion: 38,
        hasChildren: true,
        children: [
          {
            id: 'b1-vocabulary-1-2',
            title: 'Vocabulary',
            lessons: 1,
            exercises: 8,
            completion: 42,
            hasChildren: true,
            children: [
              { id: 'b1-exercise-1-2-1', title: '1 Sequence markers', lessons: 0, exercises: 0, completion: 45, hasChildren: false },
              { id: 'b1-exercise-1-2-2', title: '2 Narrative connectors', lessons: 0, exercises: 0, completion: 40, hasChildren: false }
            ]
          },
          {
            id: 'b1-grammar-1-2',
            title: 'Grammar',
            lessons: 0,
            exercises: 8,
            completion: 35,
            hasChildren: true,
            children: [
              { id: 'b1-exercise-1-2-3', title: '1 Past perfect formation', lessons: 0, exercises: 0, completion: 40, hasChildren: false },
              { id: 'b1-exercise-1-2-4', title: '2 Time relationships', lessons: 0, exercises: 0, completion: 30, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'b1-lesson-1-3',
        title: '3 Future perfect',
        lessons: 1,
        exercises: 12,
        completion: 25,
        hasChildren: false
      },
      {
        id: 'b1-lesson-1-4',
        title: '4 Continuous aspects',
        lessons: 1,
        exercises: 14,
        completion: 48,
        hasChildren: false
      },
      {
        id: 'b1-lesson-1-5',
        title: '5 Mixed tenses practice',
        lessons: 1,
        exercises: 10,
        completion: 52,
        hasChildren: false
      },
      {
        id: 'b1-lesson-1-6',
        title: '6 Narrative writing',
        lessons: 1,
        exercises: 8,
        completion: 35,
        hasChildren: false
      },
      {
        id: 'b1-lesson-1-7',
        title: 'Checkpoint #1',
        lessons: 1,
        exercises: 4,
        completion: 55,
        hasChildren: false
      }
    ]
  },
  {
    id: 'b1-chapter-2',
    title: '2 - Conditionals',
    lessons: 8,
    exercises: 67,
    completion: 32,
    hasChildren: true,
    children: [
      {
        id: 'b1-lesson-2-1',
        title: '1 First conditional',
        lessons: 1,
        exercises: 15,
        completion: 50,
        hasChildren: true,
        children: [
          {
            id: 'b1-vocabulary-2-1',
            title: 'Vocabulary',
            lessons: 1,
            exercises: 9,
            completion: 55,
            hasChildren: true,
            children: [
              { id: 'b1-exercise-2-1-1', title: '1 Condition expressions', lessons: 0, exercises: 0, completion: 60, hasChildren: false },
              { id: 'b1-exercise-2-1-2', title: '2 Result expressions', lessons: 0, exercises: 0, completion: 50, hasChildren: false }
            ]
          },
          {
            id: 'b1-grammar-2-1',
            title: 'Grammar',
            lessons: 0,
            exercises: 6,
            completion: 45,
            hasChildren: true,
            children: [
              { id: 'b1-exercise-2-1-3', title: '1 If clauses', lessons: 0, exercises: 0, completion: 50, hasChildren: false },
              { id: 'b1-exercise-2-1-4', title: '2 Will/won\'t results', lessons: 0, exercises: 0, completion: 40, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'b1-lesson-2-2',
        title: '2 Second conditional',
        lessons: 1,
        exercises: 18,
        completion: 28,
        hasChildren: false
      },
      {
        id: 'b1-lesson-2-3',
        title: '3 Third conditional',
        lessons: 1,
        exercises: 16,
        completion: 20,
        hasChildren: false
      },
      {
        id: 'b1-lesson-2-4',
        title: '4 Mixed conditionals',
        lessons: 1,
        exercises: 12,
        completion: 15,
        hasChildren: false
      },
      {
        id: 'b1-lesson-2-5',
        title: '5 Unless and other conditionals',
        lessons: 1,
        exercises: 8,
        completion: 35,
        hasChildren: false
      },
      {
        id: 'b1-lesson-2-6',
        title: 'Checkpoint #2',
        lessons: 1,
        exercises: 6,
        completion: 40,
        hasChildren: false
      }
    ]
  },
  {
    id: 'b1-chapter-3',
    title: '3 - Passive Voice',
    lessons: 7,
    exercises: 54,
    completion: 42,
    hasChildren: true,
    children: [
      {
        id: 'b1-lesson-3-1',
        title: '1 Present passive',
        lessons: 1,
        exercises: 12,
        completion: 58,
        hasChildren: false
      },
      {
        id: 'b1-lesson-3-2',
        title: '2 Past passive',
        lessons: 1,
        exercises: 14,
        completion: 45,
        hasChildren: false
      },
      {
        id: 'b1-lesson-3-3',
        title: '3 Passive with modals',
        lessons: 1,
        exercises: 10,
        completion: 32,
        hasChildren: false
      },
      {
        id: 'b1-lesson-3-4',
        title: '4 Passive reporting',
        lessons: 1,
        exercises: 8,
        completion: 28,
        hasChildren: false
      },
      {
        id: 'b1-lesson-3-5',
        title: '5 Active vs passive',
        lessons: 1,
        exercises: 6,
        completion: 50,
        hasChildren: false
      },
      {
        id: 'b1-lesson-3-6',
        title: 'Checkpoint #3',
        lessons: 1,
        exercises: 4,
        completion: 45,
        hasChildren: false
      }
    ]
  },
  {
    id: 'b1-chapter-4',
    title: '4 - Reported Speech',
    lessons: 8,
    exercises: 61,
    completion: 28,
    hasChildren: true,
    children: [
      {
        id: 'b1-lesson-4-1',
        title: '1 Direct vs indirect speech',
        lessons: 1,
        exercises: 12,
        completion: 40,
        hasChildren: false
      },
      {
        id: 'b1-lesson-4-2',
        title: '2 Tense changes',
        lessons: 1,
        exercises: 15,
        completion: 25,
        hasChildren: false
      },
      {
        id: 'b1-lesson-4-3',
        title: '3 Time and place changes',
        lessons: 1,
        exercises: 10,
        completion: 30,
        hasChildren: false
      },
      {
        id: 'b1-lesson-4-4',
        title: '4 Reporting questions',
        lessons: 1,
        exercises: 8,
        completion: 20,
        hasChildren: false
      },
      {
        id: 'b1-lesson-4-5',
        title: '5 Reporting commands',
        lessons: 1,
        exercises: 6,
        completion: 35,
        hasChildren: false
      },
      {
        id: 'b1-lesson-4-6',
        title: '6 Mixed reporting',
        lessons: 1,
        exercises: 7,
        completion: 22,
        hasChildren: false
      },
      {
        id: 'b1-lesson-4-7',
        title: 'Checkpoint #4',
        lessons: 1,
        exercises: 3,
        completion: 30,
        hasChildren: false
      }
    ]
  },
  {
    id: 'b1-chapter-5',
    title: '5 - Advanced Grammar',
    lessons: 7,
    exercises: 48,
    completion: 18,
    hasChildren: true,
    children: [
      {
        id: 'b1-lesson-5-1',
        title: '1 Relative clauses',
        lessons: 1,
        exercises: 14,
        completion: 25,
        hasChildren: false
      },
      {
        id: 'b1-lesson-5-2',
        title: '2 Gerunds and infinitives',
        lessons: 1,
        exercises: 12,
        completion: 15,
        hasChildren: false
      },
      {
        id: 'b1-lesson-5-3',
        title: '3 Participle clauses',
        lessons: 1,
        exercises: 8,
        completion: 12,
        hasChildren: false
      },
      {
        id: 'b1-lesson-5-4',
        title: '4 Causative verbs',
        lessons: 1,
        exercises: 6,
        completion: 20,
        hasChildren: false
      },
      {
        id: 'b1-lesson-5-5',
        title: '5 Mixed structures',
        lessons: 1,
        exercises: 5,
        completion: 18,
        hasChildren: false
      },
      {
        id: 'b1-lesson-5-6',
        title: 'Checkpoint #5',
        lessons: 1,
        exercises: 3,
        completion: 22,
        hasChildren: false
      }
    ]
  }
]; 