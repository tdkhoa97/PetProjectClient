import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type {
    User,
    Word,
    Lesson,
    Achievement,
    UserAchievement,
    Post,
    Comment,
    Notification,
    LeaderboardEntry,
    ApiError
} from '@/types'
import { API_BASE_URL } from '@/constants'

// API functions
export const api = {
    // Auth
    login: async (email: string, password: string): Promise<User> => {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
        })
        return response.data
    },

    // User
    getUser: async (): Promise<User> => {
        const response = await axios.get(`${API_BASE_URL}/user/profile`)
        return response.data
    },

    updateUser: async (data: Partial<User>): Promise<User> => {
        const response = await axios.put(`${API_BASE_URL}/user/profile`, data)
        return response.data
    },

    // Lessons
    getLessons: async (): Promise<Lesson[]> => {
        const response = await axios.get(`${API_BASE_URL}/lessons`)
        return response.data
    },

    getLesson: async (id: string): Promise<Lesson> => {
        const response = await axios.get(`${API_BASE_URL}/lessons/${id}`)
        return response.data
    },

    completeLesson: async (id: string): Promise<void> => {
        await axios.post(`${API_BASE_URL}/lessons/${id}/complete`)
    },

    // Words
    getWords: async (category?: string): Promise<Word[]> => {
        const params = category ? { category } : {}
        const response = await axios.get(`${API_BASE_URL}/words`, { params })
        return response.data
    },

    markWordAsLearned: async (wordId: string): Promise<void> => {
        await axios.post(`${API_BASE_URL}/words/${wordId}/learn`)
    },

    // Achievements
    getAchievements: async (): Promise<Achievement[]> => {
        const response = await axios.get(`${API_BASE_URL}/achievements`)
        return response.data
    },

    getUserAchievements: async (userId: string): Promise<UserAchievement[]> => {
        const response = await axios.get(`${API_BASE_URL}/userAchievements?userId=${userId}`)
        return response.data
    },

    // Posts and Community
    getPosts: async (category?: string): Promise<Post[]> => {
        const params = category ? { category } : {}
        const response = await axios.get(`${API_BASE_URL}/posts`, { params })
        return response.data
    },

    getPost: async (id: string): Promise<Post> => {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`)
        return response.data
    },

    createPost: async (data: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>): Promise<Post> => {
        const response = await axios.post(`${API_BASE_URL}/posts`, {
            ...data,
            likes: 0,
            comments: 0,
            createdAt: new Date().toISOString()
        })
        return response.data
    },

    likePost: async (postId: string): Promise<void> => {
        await axios.post(`${API_BASE_URL}/posts/${postId}/like`)
    },

    // Comments
    getComments: async (postId: string): Promise<Comment[]> => {
        const response = await axios.get(`${API_BASE_URL}/comments?postId=${postId}`)
        return response.data
    },

    createComment: async (data: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> => {
        const response = await axios.post(`${API_BASE_URL}/comments`, {
            ...data,
            createdAt: new Date().toISOString()
        })
        return response.data
    },

    // Notifications
    getNotifications: async (userId: string): Promise<Notification[]> => {
        const response = await axios.get(`${API_BASE_URL}/notifications?userId=${userId}`)
        return response.data
    },

    markNotificationAsRead: async (notificationId: string): Promise<void> => {
        await axios.patch(`${API_BASE_URL}/notifications/${notificationId}`, { read: true })
    },

    // Leaderboard
    getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
        const response = await axios.get(`${API_BASE_URL}/leaderboard`)
        return response.data
    },
}

// React Query hooks
export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: api.getUser,
    })
}

export const useLessons = () => {
    return useQuery({
        queryKey: ['lessons'],
        queryFn: api.getLessons,
    })
}

export const useLesson = (id: string) => {
    return useQuery({
        queryKey: ['lesson', id],
        queryFn: () => api.getLesson(id),
        enabled: !!id,
    })
}

export const useWords = (category?: string) => {
    return useQuery({
        queryKey: ['words', category],
        queryFn: () => api.getWords(category),
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    })
}

export const useCompleteLesson = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.completeLesson,
        onSuccess: (_, lessonId) => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] })
            queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] })
        },
    })
}

export const useMarkWordAsLearned = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.markWordAsLearned,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['words'] })
            queryClient.invalidateQueries({ queryKey: ['lessons'] })
        },
    })
}

// Achievement hooks
export const useAchievements = () => {
    return useQuery({
        queryKey: ['achievements'],
        queryFn: api.getAchievements,
    })
}

export const useUserAchievements = (userId: string) => {
    return useQuery({
        queryKey: ['userAchievements', userId],
        queryFn: () => api.getUserAchievements(userId),
        enabled: !!userId,
    })
}

// Community hooks
export const usePosts = (category?: string) => {
    return useQuery({
        queryKey: ['posts', category],
        queryFn: () => api.getPosts(category),
    })
}

export const usePost = (id: string) => {
    return useQuery({
        queryKey: ['post', id],
        queryFn: () => api.getPost(id),
        enabled: !!id,
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })
}

export const useLikePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.likePost,
        onSuccess: (_, postId) => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            queryClient.invalidateQueries({ queryKey: ['post', postId] })
        },
    })
}

// Comment hooks
export const useComments = (postId: string) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => api.getComments(postId),
        enabled: !!postId,
    })
}

export const useCreateComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.createComment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] })
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })
}

// Notification hooks
export const useNotifications = (userId: string) => {
    return useQuery({
        queryKey: ['notifications', userId],
        queryFn: () => api.getNotifications(userId),
        enabled: !!userId,
    })
}

export const useMarkNotificationAsRead = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: api.markNotificationAsRead,
        onSuccess: (_, notificationId) => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] })
        },
    })
}

// Leaderboard hooks
export const useLeaderboard = () => {
    return useQuery({
        queryKey: ['leaderboard'],
        queryFn: api.getLeaderboard,
    })
}
