// Application constants

export const API_BASE_URL = 'http://localhost:3001'

export const DIFFICULTY_LABELS = {
    easy: 'Dễ',
    medium: 'Trung bình',
    hard: 'Khó'
} as const

export const USER_LEVEL_LABELS = {
    beginner: 'Mới bắt đầu',
    intermediate: 'Trung bình',
    advanced: 'Nâng cao'
} as const

export const ACHIEVEMENT_RARITY_LABELS = {
    common: 'Thường',
    rare: 'Hiếm',
    epic: 'Cực hiếm',
    legendary: 'Huyền thoại'
} as const

export const ACHIEVEMENT_RARITY_COLORS = {
    common: 'bg-gray-100 text-gray-800',
    rare: 'bg-blue-100 text-blue-800',
    epic: 'bg-purple-100 text-purple-800',
    legendary: 'bg-yellow-100 text-yellow-800'
} as const

export const POST_CATEGORIES = {
    tips: 'Mẹo học tập',
    routine: 'Thói quen học',
    resources: 'Tài liệu',
    general: 'Thảo luận chung',
    questions: 'Câu hỏi'
} as const

export const NOTIFICATION_TYPES = {
    achievement: 'Thành tích',
    streak: 'Chuỗi ngày',
    lesson: 'Bài học',
    comment: 'Bình luận',
    like: 'Thích'
} as const

export const STUDY_MODES = {
    learn: 'Học từ',
    quiz: 'Kiểm tra',
    review: 'Ôn tập'
} as const

export const DEFAULT_DAILY_GOAL = 10
export const DEFAULT_STREAK = 0
export const DEFAULT_POINTS = 0

export const ROUTES = {
    HOME: '/',
    LESSONS: '/lessons',
    LESSON_DETAIL: '/lessons/:id',
    ACHIEVEMENTS: '/achievements',
    COMMUNITY: '/community',
    POST_DETAIL: '/community/:id',
    LEADERBOARD: '/leaderboard',
    NOTIFICATIONS: '/notifications',
    ACCOUNT: '/account',
    LOGIN: '/login'
} as const

export const STORAGE_KEYS = {
    AUTH: 'auth-storage',
    ACHIEVEMENT: 'achievement-storage',
    LEARNING: 'learning-storage'
} as const

export const QUERY_KEYS = {
    USER: 'user',
    LESSONS: 'lessons',
    LESSON: 'lesson',
    WORDS: 'words',
    ACHIEVEMENTS: 'achievements',
    USER_ACHIEVEMENTS: 'userAchievements',
    POSTS: 'posts',
    POST: 'post',
    COMMENTS: 'comments',
    NOTIFICATIONS: 'notifications',
    LEADERBOARD: 'leaderboard'
} as const

