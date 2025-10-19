import { create } from 'zustand'
import type { Word, Lesson, LearningState } from '@/types'

export const useLearningStore = create<LearningState>((set, get) => ({
    currentLesson: null,
    lessons: [
        {
            id: '1',
            title: 'Basic Greetings',
            description: 'Learn common greeting words and phrases',
            words: [
                {
                    id: '1',
                    english: 'Hello',
                    vietnamese: 'Xin chào',
                    pronunciation: '/həˈloʊ/',
                    difficulty: 'easy',
                    category: 'greetings',
                    example: 'Hello, how are you?',
                    learned: false
                },
                {
                    id: '2',
                    english: 'Goodbye',
                    vietnamese: 'Tạm biệt',
                    pronunciation: '/ɡʊdˈbaɪ/',
                    difficulty: 'easy',
                    category: 'greetings',
                    example: 'Goodbye, see you tomorrow!',
                    learned: false
                }
            ],
            completed: false,
            progress: 0
        }
    ],
    learnedWords: [],
    dailyGoal: 10,
    currentStreak: 0,

    setCurrentLesson: (lesson: Lesson) => {
        set({ currentLesson: lesson })
    },

    markWordAsLearned: (wordId: string) => {
        const { lessons, learnedWords } = get()
        const updatedLessons = lessons.map(lesson => ({
            ...lesson,
            words: lesson.words.map(word =>
                word.id === wordId ? { ...word, learned: true } : word
            )
        }))

        const word = lessons
            .flatMap(lesson => lesson.words)
            .find(w => w.id === wordId)

        if (word && !learnedWords.find(w => w.id === wordId)) {
            set({
                lessons: updatedLessons,
                learnedWords: [...learnedWords, { ...word, learned: true }]
            })
        }
    },

    completeLesson: (lessonId: string) => {
        const { lessons } = get()
        const updatedLessons = lessons.map(lesson =>
            lesson.id === lessonId
                ? { ...lesson, completed: true, progress: 100 }
                : lesson
        )
        set({ lessons: updatedLessons })
    },

    setDailyGoal: (goal: number) => {
        set({ dailyGoal: goal })
    },

    updateStreak: () => {
        const { currentStreak } = get()
        set({ currentStreak: currentStreak + 1 })
    }
}))
