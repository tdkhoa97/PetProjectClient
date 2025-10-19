// Global types for the English Learning App

export interface User {
    id: string
    email: string
    name: string
    avatar?: string
    level: 'beginner' | 'intermediate' | 'advanced'
    streak: number
    totalWordsLearned: number
    totalPoints: number
    createdAt: string
    lastActiveAt: string
}

export interface Word {
    id: string
    english: string
    vietnamese: string
    pronunciation: string
    difficulty: 'easy' | 'medium' | 'hard'
    category: string
    example: string
    exampleVietnamese: string
    learned: boolean
    points: number
}

export interface Lesson {
    id: string
    title: string
    description: string
    category: string
    difficulty: 'easy' | 'medium' | 'hard'
    estimatedTime: number
    words: Word[]
    completed: boolean
    progress: number
    points: number
}

export interface Achievement {
    id: string
    title: string
    description: string
    icon: string
    points: number
    requirement: {
        type: 'lessons_completed' | 'words_learned' | 'streak' | 'lessons_per_day'
        value: number
    }
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface UserAchievement {
    id: string
    userId: string
    achievementId: string
    earnedAt: string
}

export interface Post {
    id: string
    userId: string
    title: string
    content: string
    category: string
    likes: number
    comments: number
    createdAt: string
    tags: string[]
}

export interface Comment {
    id: string
    postId: string
    userId: string
    content: string
    createdAt: string
}

export interface Notification {
    id: string
    userId: string
    type: 'achievement' | 'streak' | 'lesson' | 'comment' | 'like'
    title: string
    message: string
    read: boolean
    createdAt: string
}

export interface LeaderboardEntry {
    userId: string
    totalPoints: number
    rank: number
    weeklyPoints: number
    monthlyPoints: number
}

// API Response types
export interface ApiResponse<T> {
    data: T
    message?: string
    success: boolean
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

// Form types
export interface LoginForm {
    email: string
    password: string
}

export interface RegisterForm {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface CreatePostForm {
    title: string
    content: string
    category: string
    tags: string[]
}

export interface CreateCommentForm {
    content: string
}

// Component Props types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    asChild?: boolean
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

// Store types
export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    updateProfile: (data: Partial<User>) => void
    setLoading: (loading: boolean) => void
}

export interface LearningState {
    currentLesson: Lesson | null
    lessons: Lesson[]
    learnedWords: Word[]
    dailyGoal: number
    currentStreak: number
    setCurrentLesson: (lesson: Lesson) => void
    markWordAsLearned: (wordId: string) => void
    completeLesson: (lessonId: string) => void
    setDailyGoal: (goal: number) => void
    updateStreak: () => void
}

export interface AchievementState {
    achievements: Achievement[]
    userAchievements: UserAchievement[]
    notifications: Notification[]
    totalPoints: number
    setAchievements: (achievements: Achievement[]) => void
    addUserAchievement: (achievement: UserAchievement) => void
    addNotification: (notification: Notification) => void
    markNotificationAsRead: (notificationId: string) => void
    updatePoints: (points: number) => void
    checkAchievements: (stats: {
        lessonsCompleted: number
        wordsLearned: number
        streak: number
        lessonsPerDay: number
    }) => void
}

// Study modes
export type StudyMode = 'learn' | 'quiz' | 'review'

// Difficulty levels
export type Difficulty = 'easy' | 'medium' | 'hard'

// User levels
export type UserLevel = 'beginner' | 'intermediate' | 'advanced'

// Achievement rarities
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary'

// Notification types
export type NotificationType = 'achievement' | 'streak' | 'lesson' | 'comment' | 'like'

// Post categories
export type PostCategory = 'tips' | 'routine' | 'resources' | 'general' | 'questions'

// API Error type
export interface ApiError {
    message: string
    status: number
    code?: string
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

