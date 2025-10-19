import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Difficulty, UserLevel, AchievementRarity, PostCategory } from '@/types'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getDifficultyLabel(difficulty: Difficulty): string {
    const labels = {
        easy: 'Dễ',
        medium: 'Trung bình',
        hard: 'Khó'
    }
    return labels[difficulty]
}

export function getUserLevelLabel(level: UserLevel): string {
    const labels = {
        beginner: 'Mới bắt đầu',
        intermediate: 'Trung bình',
        advanced: 'Nâng cao'
    }
    return labels[level]
}

export function getAchievementRarityLabel(rarity: AchievementRarity): string {
    const labels = {
        common: 'Thường',
        rare: 'Hiếm',
        epic: 'Cực hiếm',
        legendary: 'Huyền thoại'
    }
    return labels[rarity]
}

export function getAchievementRarityColor(rarity: AchievementRarity): string {
    const colors = {
        common: 'bg-gray-100 text-gray-800',
        rare: 'bg-blue-100 text-blue-800',
        epic: 'bg-purple-100 text-purple-800',
        legendary: 'bg-yellow-100 text-yellow-800'
    }
    return colors[rarity]
}

export function getPostCategoryLabel(category: PostCategory): string {
    const labels = {
        tips: 'Mẹo học tập',
        routine: 'Thói quen học',
        resources: 'Tài liệu',
        general: 'Thảo luận chung',
        questions: 'Câu hỏi'
    }
    return labels[category]
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
        return 'Vừa xong'
    } else if (diffInHours < 24) {
        return `${diffInHours} giờ trước`
    } else {
        const diffInDays = Math.floor(diffInHours / 24)
        return `${diffInDays} ngày trước`
    }
}

export function calculateProgress(current: number, total: number): number {
    if (total === 0) return 0
    return Math.round((current / total) * 100)
}

export function generateId(): string {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

export function getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = shuffleArray(array)
    return shuffled.slice(0, count)
}

export function capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function kebabCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()
}

export function camelCase(str: string): string {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, '')
}