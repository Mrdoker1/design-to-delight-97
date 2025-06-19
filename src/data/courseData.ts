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
    exercises: 14,
    completion: 72,
    hasChildren: true,
    children: [
      {
        id: 'lesson-1-1',
        title: '1 Personal pronouns',
        lessons: 0,
        exercises: 4,
        completion: 85,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-1-1',
            title: 'Vocabulary',
            lessons: 0,
            exercises: 4,
            completion: 85,
            hasChildren: true,
            children: [
              { id: 'exercise-1-1-1', title: '1 Flashcard', lessons: 0, exercises: 0, completion: 100, hasChildren: false },
              { id: 'exercise-1-1-2', title: '2 Multiple choice', lessons: 0, exercises: 0, completion: 90, hasChildren: false },
              { id: 'exercise-1-1-3', title: '3 Fill in the gap', lessons: 0, exercises: 0, completion: 75, hasChildren: false },
              { id: 'exercise-1-1-4', title: '4 Audio recognition', lessons: 0, exercises: 0, completion: 80, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-1-2',
        title: '2 Basic greetings',
        lessons: 0,
        exercises: 5,
        completion: 67,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-1-2',
            title: 'Vocabulary',
            lessons: 0,
            exercises: 3,
            completion: 67,
            hasChildren: true,
            children: [
              { id: 'exercise-1-2-1', title: '1 Flashcard', lessons: 0, exercises: 0, completion: 70, hasChildren: false },
              { id: 'exercise-1-2-2', title: '2 Pronunciation', lessons: 0, exercises: 0, completion: 65, hasChildren: false },
              { id: 'exercise-1-2-3', title: '3 Conversation practice', lessons: 0, exercises: 0, completion: 60, hasChildren: false }
            ]
          },
          {
            id: 'grammar-1-2',
            title: 'Grammar',
            lessons: 0,
            exercises: 2,
            completion: 67,
            hasChildren: true,
            children: [
              { id: 'exercise-1-2-4', title: '1 Sentence structure', lessons: 0, exercises: 0, completion: 70, hasChildren: false },
              { id: 'exercise-1-2-5', title: '2 Question formation', lessons: 0, exercises: 0, completion: 65, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-1-3',
        title: '3 Introducing yourself',
        lessons: 0,
        exercises: 1,
        completion: 45,
        hasChildren: false
      },
      {
        id: 'lesson-1-4',
        title: '4 Asking for names',
        lessons: 0,
        exercises: 1,
        completion: 92,
        hasChildren: false
      },
      {
        id: 'lesson-1-5',
        title: '5 Countries and nationalities',
        lessons: 0,
        exercises: 1,
        completion: 78,
        hasChildren: false
      },
      {
        id: 'lesson-1-6',
        title: '6 Speaking practice',
        lessons: 0,
        exercises: 1,
        completion: 56,
        hasChildren: false
      },
      {
        id: 'lesson-1-7',
        title: 'Checkpoint #1',
        lessons: 0,
        exercises: 1,
        completion: 88,
        hasChildren: false
      }
    ]
  },
  {
    id: 'chapter-2',
    title: '2 - Greetings',
    lessons: 6,
    exercises: 15,
    completion: 12,
    hasChildren: true,
    children: [
      {
        id: 'lesson-2-1',
        title: '1 Saying how you are',
        lessons: 0,
        exercises: 4,
        completion: 13,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-2-1',
            title: 'Vocabulary',
            lessons: 0,
            exercises: 2,
            completion: 25,
            hasChildren: true,
            children: [
              { id: 'exercise-2-1-1', title: '1 Feelings and emotions', lessons: 0, exercises: 0, completion: 30, hasChildren: false },
              { id: 'exercise-2-1-2', title: '2 Common responses', lessons: 0, exercises: 0, completion: 20, hasChildren: false }
            ]
          },
          {
            id: 'speaking-2-1',
            title: 'Speaking',
            lessons: 0,
            exercises: 2,
            completion: 5,
            hasChildren: true,
            children: [
              { id: 'exercise-2-1-3', title: '1 Role play', lessons: 0, exercises: 0, completion: 10, hasChildren: false },
              { id: 'exercise-2-1-4', title: '2 Conversation starter', lessons: 0, exercises: 0, completion: 0, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-2-2',
        title: '2 Referring to a person',
        lessons: 0,
        exercises: 3,
        completion: 13,
        hasChildren: true,
        children: [
          {
            id: 'grammar-2-2',
            title: 'Grammar',
            lessons: 0,
            exercises: 3,
            completion: 13,
            hasChildren: true,
            children: [
              { id: 'exercise-2-2-1', title: '1 Subject pronouns', lessons: 0, exercises: 0, completion: 15, hasChildren: false },
              { id: 'exercise-2-2-2', title: '2 Object pronouns', lessons: 0, exercises: 0, completion: 10, hasChildren: false },
              { id: 'exercise-2-2-3', title: '3 Practice exercises', lessons: 0, exercises: 0, completion: 15, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-2-3',
        title: '3 Asking how somebody is',
        lessons: 0,
        exercises: 7,
        completion: 45,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-2-3',
            title: 'Vocabulary',
            lessons: 0,
            exercises: 7,
            completion: 13,
            hasChildren: true,
            children: [
              { id: 'exercise-2-3-1', title: '1 Flashcard', lessons: 0, exercises: 0, completion: 0, hasChildren: false },
              { id: 'exercise-2-3-2', title: '2 Fillgap', lessons: 0, exercises: 0, completion: 0, hasChildren: false },
              { id: 'exercise-2-3-3', title: 'Phrase builder Audio', lessons: 0, exercises: 0, completion: 0, hasChildren: false },
              { id: 'exercise-2-3-4', title: '3 Flashcard', lessons: 0, exercises: 0, completion: 0, hasChildren: false },
              { id: 'exercise-2-3-5', title: '4 True or False Image & Audio', lessons: 0, exercises: 0, completion: 0, hasChildren: false },
              { id: 'exercise-2-3-6', title: '5 Fillgap', lessons: 0, exercises: 0, completion: 0, hasChildren: false },
              { id: 'exercise-2-3-7', title: '6 Matchup', lessons: 0, exercises: 0, completion: 0, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-2-4',
        title: '4 Speaking - Speaking about yourself',
        lessons: 0,
        exercises: 1,
        completion: 56,
        hasChildren: false
      },
      {
        id: 'lesson-2-5',
        title: '5 Developing fluency',
        lessons: 0,
        exercises: 1,
        completion: 72,
        hasChildren: false
      },
      {
        id: 'lesson-2-6',
        title: 'Checkpoint # 1',
        lessons: 0,
        exercises: 1,
        completion: 93,
        hasChildren: false
      }
    ]
  },
  {
    id: 'chapter-3',
    title: '3 - All about me',
    lessons: 8,
    exercises: 16,
    completion: 54,
    hasChildren: true,
    children: [
      {
        id: 'lesson-3-1',
        title: '1 Age and birthday',
        lessons: 0,
        exercises: 5,
        completion: 75,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-3-1',
            title: 'Vocabulary',
            lessons: 0,
            exercises: 3,
            completion: 80,
            hasChildren: true,
            children: [
              { id: 'exercise-3-1-1', title: '1 Numbers 1-100', lessons: 0, exercises: 0, completion: 85, hasChildren: false },
              { id: 'exercise-3-1-2', title: '2 Months of the year', lessons: 0, exercises: 0, completion: 75, hasChildren: false },
              { id: 'exercise-3-1-3', title: '3 Ordinal numbers', lessons: 0, exercises: 0, completion: 70, hasChildren: false }
            ]
          },
          {
            id: 'grammar-3-1',
            title: 'Grammar',
            lessons: 0,
            exercises: 2,
            completion: 65,
            hasChildren: true,
            children: [
              { id: 'exercise-3-1-4', title: '1 Question words', lessons: 0, exercises: 0, completion: 70, hasChildren: false },
              { id: 'exercise-3-1-5', title: '2 Present tense "to be"', lessons: 0, exercises: 0, completion: 60, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-3-2',
        title: '2 Family members',
        lessons: 0,
        exercises: 5,
        completion: 42,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-3-2',
            title: 'Vocabulary',
            lessons: 0,
            exercises: 3,
            completion: 50,
            hasChildren: true,
            children: [
              { id: 'exercise-3-2-1', title: '1 Family tree', lessons: 0, exercises: 0, completion: 55, hasChildren: false },
              { id: 'exercise-3-2-2', title: '2 Relationships', lessons: 0, exercises: 0, completion: 45, hasChildren: false },
              { id: 'exercise-3-2-3', title: '3 Audio matching', lessons: 0, exercises: 0, completion: 50, hasChildren: false }
            ]
          },
          {
            id: 'speaking-3-2',
            title: 'Speaking',
            lessons: 0,
            exercises: 2,
            completion: 30,
            hasChildren: true,
            children: [
              { id: 'exercise-3-2-4', title: '1 Family description', lessons: 0, exercises: 0, completion: 35, hasChildren: false },
              { id: 'exercise-3-2-5', title: '2 Interview practice', lessons: 0, exercises: 0, completion: 25, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-3-3',
        title: '3 Hobbies and interests',
        lessons: 0,
        exercises: 1,
        completion: 68,
        hasChildren: false
      },
      {
        id: 'lesson-3-4',
        title: '4 Physical appearance',
        lessons: 0,
        exercises: 1,
        completion: 34,
        hasChildren: false
      },
      {
        id: 'lesson-3-5',
        title: '5 Personality traits',
        lessons: 0,
        exercises: 1,
        completion: 89,
        hasChildren: false
      },
      {
        id: 'lesson-3-6',
        title: '6 My hometown',
        lessons: 0,
        exercises: 1,
        completion: 23,
        hasChildren: false
      },
      {
        id: 'lesson-3-7',
        title: '7 Education and work',
        lessons: 0,
        exercises: 1,
        completion: 76,
        hasChildren: false
      },
      {
        id: 'lesson-3-8',
        title: 'Checkpoint #2',
        lessons: 0,
        exercises: 1,
        completion: 95,
        hasChildren: false
      }
    ]
  },
  {
    id: 'chapter-4',
    title: '4 - People and things',
    lessons: 7,
    exercises: 11,
    completion: 12,
    hasChildren: true,
    children: [
      {
        id: 'lesson-4-1',
        title: '1 Describing people',
        lessons: 0,
        exercises: 5,
        completion: 25,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-4-1',
            title: 'Vocabulary',
            lessons: 0,
            exercises: 3,
            completion: 30,
            hasChildren: true,
            children: [
              { id: 'exercise-4-1-1', title: '1 Physical features', lessons: 0, exercises: 0, completion: 35, hasChildren: false },
              { id: 'exercise-4-1-2', title: '2 Clothing items', lessons: 0, exercises: 0, completion: 25, hasChildren: false },
              { id: 'exercise-4-1-3', title: '3 Colors', lessons: 0, exercises: 0, completion: 30, hasChildren: false }
            ]
          },
          {
            id: 'grammar-4-1',
            title: 'Grammar',
            lessons: 0,
            exercises: 2,
            completion: 15,
            hasChildren: true,
            children: [
              { id: 'exercise-4-1-4', title: '1 Adjective order', lessons: 0, exercises: 0, completion: 20, hasChildren: false },
              { id: 'exercise-4-1-5', title: '2 Comparative forms', lessons: 0, exercises: 0, completion: 10, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-4-2',
        title: '2 Everyday objects',
        lessons: 0,
        exercises: 1,
        completion: 8,
        hasChildren: false
      },
      {
        id: 'lesson-4-3',
        title: '3 Possession',
        lessons: 0,
        exercises: 1,
        completion: 0,
        hasChildren: false
      },
      {
        id: 'lesson-4-4',
        title: '4 This, that, these, those',
        lessons: 0,
        exercises: 1,
        completion: 18,
        hasChildren: false
      },
      {
        id: 'lesson-4-5',
        title: '5 Quantities',
        lessons: 0,
        exercises: 1,
        completion: 5,
        hasChildren: false
      },
      {
        id: 'lesson-4-6',
        title: '6 Review and practice',
        lessons: 0,
        exercises: 1,
        completion: 22,
        hasChildren: false
      },
      {
        id: 'lesson-4-7',
        title: 'Checkpoint #3',
        lessons: 0,
        exercises: 1,
        completion: 45,
        hasChildren: false
      }
    ]
  },
  {
    id: 'chapter-5',
    title: '5 - Languages',
    lessons: 9,
    exercises: 11,
    completion: 92,
    hasChildren: true,
    children: [
      {
        id: 'lesson-5-1',
        title: '1 World languages',
        lessons: 0,
        exercises: 3,
        completion: 95,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-5-1',
            title: 'Vocabulary',
            lessons: 0,
            exercises: 3,
            completion: 95,
            hasChildren: true,
            children: [
              { id: 'exercise-5-1-1', title: '1 Language names', lessons: 0, exercises: 0, completion: 100, hasChildren: false },
              { id: 'exercise-5-1-2', title: '2 Country-language matching', lessons: 0, exercises: 0, completion: 90, hasChildren: false },
              { id: 'exercise-5-1-3', title: '3 Audio recognition', lessons: 0, exercises: 0, completion: 95, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-5-2',
        title: '2 Can you speak...?',
        lessons: 0,
        exercises: 1,
        completion: 88,
        hasChildren: false
      },
      {
        id: 'lesson-5-3',
        title: '3 Language abilities',
        lessons: 0,
        exercises: 1,
        completion: 94,
        hasChildren: false
      },
      {
        id: 'lesson-5-4',
        title: '4 Learning languages',
        lessons: 0,
        exercises: 1,
        completion: 90,
        hasChildren: false
      },
      {
        id: 'lesson-5-5',
        title: '5 Modal verbs: can/can\'t',
        lessons: 0,
        exercises: 1,
        completion: 85,
        hasChildren: false
      },
      {
        id: 'lesson-5-6',
        title: '6 Pronunciation practice',
        lessons: 0,
        exercises: 1,
        completion: 92,
        hasChildren: false
      },
      {
        id: 'lesson-5-7',
        title: '7 Cultural awareness',
        lessons: 0,
        exercises: 1,
        completion: 96,
        hasChildren: false
      },
      {
        id: 'lesson-5-8',
        title: '8 Speaking fluency',
        lessons: 0,
        exercises: 1,
        completion: 88,
        hasChildren: false
      },
      {
        id: 'lesson-5-9',
        title: 'Checkpoint #4',
        lessons: 0,
        exercises: 1,
        completion: 100,
        hasChildren: false
      }
    ]
  }
];

export const additionalChapters: CourseNode[] = [
  {
    id: 'chapter-6',
    title: '6 - Food and drinks',
    lessons: 8,
    exercises: 12,
    completion: 78,
    hasChildren: true,
    children: [
      {
        id: 'lesson-6-1',
        title: '1 Meals of the day',
        lessons: 0,
        exercises: 5,
        completion: 85,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-6-1',
            title: 'Vocabulary',
            lessons: 0,
            exercises: 3,
            completion: 90,
            hasChildren: true,
            children: [
              { id: 'exercise-6-1-1', title: '1 Breakfast foods', lessons: 0, exercises: 0, completion: 95, hasChildren: false },
              { id: 'exercise-6-1-2', title: '2 Lunch items', lessons: 0, exercises: 0, completion: 85, hasChildren: false },
              { id: 'exercise-6-1-3', title: '3 Dinner dishes', lessons: 0, exercises: 0, completion: 90, hasChildren: false }
            ]
          },
          {
            id: 'listening-6-1',
            title: 'Listening',
            lessons: 0,
            exercises: 2,
            completion: 75,
            hasChildren: true,
            children: [
              { id: 'exercise-6-1-4', title: '1 Restaurant dialogue', lessons: 0, exercises: 0, completion: 80, hasChildren: false },
              { id: 'exercise-6-1-5', title: '2 Food preferences', lessons: 0, exercises: 0, completion: 70, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-6-2',
        title: '2 At the restaurant',
        lessons: 0,
        exercises: 1,
        completion: 72,
        hasChildren: false
      },
      {
        id: 'lesson-6-3',
        title: '3 Cooking verbs',
        lessons: 0,
        exercises: 1,
        completion: 68,
        hasChildren: false
      },
      {
        id: 'lesson-6-4',
        title: '4 Drinks and beverages',
        lessons: 0,
        exercises: 1,
        completion: 92,
        hasChildren: false
      },
      {
        id: 'lesson-6-5',
        title: '5 Food preferences',
        lessons: 0,
        exercises: 1,
        completion: 74,
        hasChildren: false
      },
      {
        id: 'lesson-6-6',
        title: '6 Shopping for food',
        lessons: 0,
        exercises: 1,
        completion: 66,
        hasChildren: false
      },
      {
        id: 'lesson-6-7',
        title: '7 Recipe instructions',
        lessons: 0,
        exercises: 1,
        completion: 81,
        hasChildren: false
      },
      {
        id: 'lesson-6-8',
        title: 'Checkpoint #5',
        lessons: 0,
        exercises: 1,
        completion: 89,
        hasChildren: false
      }
    ]
  },
  {
    id: 'chapter-7',
    title: '7 - Daily routines',
    lessons: 10,
    exercises: 14,
    completion: 45,
    hasChildren: true,
    children: [
      {
        id: 'lesson-7-1',
        title: '1 Morning routine',
        lessons: 1,
        exercises: 8,
        completion: 65,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-7-1',
            title: 'Vocabulary',
            lessons: 1,
            exercises: 5,
            completion: 70,
            hasChildren: true,
            children: [
              { id: 'exercise-7-1-1', title: '1 Wake up activities', lessons: 0, exercises: 0, completion: 75, hasChildren: false },
              { id: 'exercise-7-1-2', title: '2 Personal hygiene', lessons: 0, exercises: 0, completion: 65, hasChildren: false }
            ]
          },
          {
            id: 'grammar-7-1',
            title: 'Grammar',
            lessons: 0,
            exercises: 3,
            completion: 55,
            hasChildren: true,
            children: [
              { id: 'exercise-7-1-3', title: '1 Present simple tense', lessons: 0, exercises: 0, completion: 60, hasChildren: false },
              { id: 'exercise-7-1-4', title: '2 Time expressions', lessons: 0, exercises: 0, completion: 50, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-7-2',
        title: '2 Work schedule',
        lessons: 1,
        exercises: 6,
        completion: 38,
        hasChildren: false
      },
      {
        id: 'lesson-7-3',
        title: '3 Free time activities',
        lessons: 1,
        exercises: 9,
        completion: 52,
        hasChildren: false
      },
      {
        id: 'lesson-7-4',
        title: '4 Weekend plans',
        lessons: 1,
        exercises: 7,
        completion: 41,
        hasChildren: false
      },
      {
        id: 'lesson-7-5',
        title: '5 Time prepositions',
        lessons: 1,
        exercises: 5,
        completion: 29,
        hasChildren: false
      },
      {
        id: 'lesson-7-6',
        title: '6 Frequency adverbs',
        lessons: 1,
        exercises: 8,
        completion: 47,
        hasChildren: false
      },
      {
        id: 'lesson-7-7',
        title: '7 Daily habits',
        lessons: 1,
        exercises: 6,
        completion: 33,
        hasChildren: false
      },
      {
        id: 'lesson-7-8',
        title: '8 Evening routine',
        lessons: 1,
        exercises: 7,
        completion: 58,
        hasChildren: false
      },
      {
        id: 'lesson-7-9',
        title: '9 Telling time',
        lessons: 1,
        exercises: 8,
        completion: 62,
        hasChildren: false
      },
      {
        id: 'lesson-7-10',
        title: 'Checkpoint #6',
        lessons: 1,
        exercises: 3,
        completion: 71,
        hasChildren: false
      }
    ]
  },
  {
    id: 'chapter-8',
    title: '8 - Travel and transport',
    lessons: 12,
    exercises: 16,
    completion: 23,
    hasChildren: true,
    children: [
      {
        id: 'lesson-8-1',
        title: '1 Types of transport',
        lessons: 1,
        exercises: 9,
        completion: 45,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-8-1',
            title: 'Vocabulary',
            lessons: 1,
            exercises: 6,
            completion: 50,
            hasChildren: true,
            children: [
              { id: 'exercise-8-1-1', title: '1 Vehicles', lessons: 0, exercises: 0, completion: 55, hasChildren: false },
              { id: 'exercise-8-1-2', title: '2 Public transport', lessons: 0, exercises: 0, completion: 45, hasChildren: false }
            ]
          },
          {
            id: 'speaking-8-1',
            title: 'Speaking',
            lessons: 0,
            exercises: 3,
            completion: 35,
            hasChildren: true,
            children: [
              { id: 'exercise-8-1-3', title: '1 Transport preferences', lessons: 0, exercises: 0, completion: 40, hasChildren: false },
              { id: 'exercise-8-1-4', title: '2 Journey description', lessons: 0, exercises: 0, completion: 30, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-8-2',
        title: '2 At the airport',
        lessons: 1,
        exercises: 8,
        completion: 18,
        hasChildren: false
      },
      {
        id: 'lesson-8-3',
        title: '3 Buying tickets',
        lessons: 1,
        exercises: 7,
        completion: 12,
        hasChildren: false
      },
      {
        id: 'lesson-8-4',
        title: '4 Hotel check-in',
        lessons: 1,
        exercises: 6,
        completion: 25,
        hasChildren: false
      },
      {
        id: 'lesson-8-5',
        title: '5 Asking for directions',
        lessons: 1,
        exercises: 9,
        completion: 31,
        hasChildren: false
      },
      {
        id: 'lesson-8-6',
        title: '6 Tourist attractions',
        lessons: 1,
        exercises: 8,
        completion: 15,
        hasChildren: false
      },
      {
        id: 'lesson-8-7',
        title: '7 Weather for travel',
        lessons: 1,
        exercises: 5,
        completion: 8,
        hasChildren: false
      },
      {
        id: 'lesson-8-8',
        title: '8 Packing luggage',
        lessons: 1,
        exercises: 7,
        completion: 22,
        hasChildren: false
      },
      {
        id: 'lesson-8-9',
        title: '9 Cultural tips',
        lessons: 1,
        exercises: 6,
        completion: 19,
        hasChildren: false
      },
      {
        id: 'lesson-8-10',
        title: '10 Emergency situations',
        lessons: 1,
        exercises: 8,
        completion: 35,
        hasChildren: false
      },
      {
        id: 'lesson-8-11',
        title: '11 Travel experiences',
        lessons: 1,
        exercises: 9,
        completion: 28,
        hasChildren: false
      },
      {
        id: 'lesson-8-12',
        title: 'Checkpoint #7',
        lessons: 1,
        exercises: 7,
        completion: 42,
        hasChildren: false
      }
    ]
  },
  {
    id: 'chapter-9',
    title: '9 - Shopping',
    lessons: 7,
    exercises: 9,
    completion: 91,
    hasChildren: true,
    children: [
      {
        id: 'lesson-9-1',
        title: '1 At the store',
        lessons: 1,
        exercises: 7,
        completion: 95,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-9-1',
            title: 'Vocabulary',
            lessons: 1,
            exercises: 4,
            completion: 100,
            hasChildren: true,
            children: [
              { id: 'exercise-9-1-1', title: '1 Store types', lessons: 0, exercises: 0, completion: 100, hasChildren: false },
              { id: 'exercise-9-1-2', title: '2 Shop assistants', lessons: 0, exercises: 0, completion: 100, hasChildren: false }
            ]
          },
          {
            id: 'dialogue-9-1',
            title: 'Dialogue',
            lessons: 0,
            exercises: 3,
            completion: 87,
            hasChildren: true,
            children: [
              { id: 'exercise-9-1-3', title: '1 Customer service', lessons: 0, exercises: 0, completion: 90, hasChildren: false },
              { id: 'exercise-9-1-4', title: '2 Making purchases', lessons: 0, exercises: 0, completion: 85, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-9-2',
        title: '2 Prices and money',
        lessons: 1,
        exercises: 6,
        completion: 88,
        hasChildren: false
      },
      {
        id: 'lesson-9-3',
        title: '3 Clothing sizes',
        lessons: 1,
        exercises: 5,
        completion: 92,
        hasChildren: false
      },
      {
        id: 'lesson-9-4',
        title: '4 Returns and exchanges',
        lessons: 1,
        exercises: 7,
        completion: 85,
        hasChildren: false
      },
      {
        id: 'lesson-9-5',
        title: '5 Online shopping',
        lessons: 1,
        exercises: 8,
        completion: 94,
        hasChildren: false
      },
      {
        id: 'lesson-9-6',
        title: '6 Bargaining',
        lessons: 1,
        exercises: 4,
        completion: 89,
        hasChildren: false
      },
      {
        id: 'lesson-9-7',
        title: 'Checkpoint #8',
        lessons: 1,
        exercises: 4,
        completion: 96,
        hasChildren: false
      }
    ]
  },
  {
    id: 'chapter-10',
    title: '10 - Weather and seasons',
    lessons: 6,
    exercises: 8,
    completion: 67,
    hasChildren: true,
    children: [
      {
        id: 'lesson-10-1',
        title: '1 Weather conditions',
        lessons: 1,
        exercises: 8,
        completion: 78,
        hasChildren: true,
        children: [
          {
            id: 'vocabulary-10-1',
            title: 'Vocabulary',
            lessons: 1,
            exercises: 5,
            completion: 85,
            hasChildren: true,
            children: [
              { id: 'exercise-10-1-1', title: '1 Weather words', lessons: 0, exercises: 0, completion: 90, hasChildren: false },
              { id: 'exercise-10-1-2', title: '2 Temperature', lessons: 0, exercises: 0, completion: 80, hasChildren: false }
            ]
          },
          {
            id: 'listening-10-1',
            title: 'Listening',
            lessons: 0,
            exercises: 3,
            completion: 65,
            hasChildren: true,
            children: [
              { id: 'exercise-10-1-3', title: '1 Weather forecast', lessons: 0, exercises: 0, completion: 70, hasChildren: false },
              { id: 'exercise-10-1-4', title: '2 Weather reports', lessons: 0, exercises: 0, completion: 60, hasChildren: false }
            ]
          }
        ]
      },
      {
        id: 'lesson-10-2',
        title: '2 Four seasons',
        lessons: 1,
        exercises: 6,
        completion: 72,
        hasChildren: false
      },
      {
        id: 'lesson-10-3',
        title: '3 Seasonal activities',
        lessons: 1,
        exercises: 7,
        completion: 58,
        hasChildren: false
      },
      {
        id: 'lesson-10-4',
        title: '4 Clothing for weather',
        lessons: 1,
        exercises: 5,
        completion: 64,
        hasChildren: false
      },
      {
        id: 'lesson-10-5',
        title: '5 Future weather plans',
        lessons: 1,
        exercises: 8,
        completion: 51,
        hasChildren: false
      },
      {
        id: 'lesson-10-6',
        title: 'Checkpoint #9',
        lessons: 1,
        exercises: 4,
        completion: 82,
        hasChildren: false
      }
    ]
  }
]; 