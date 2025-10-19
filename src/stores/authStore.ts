import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthState } from '@/types'

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            login: async (email: string, password: string) => {
                set({ isLoading: true })
                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1000))

                    const mockUser: User = {
                        id: '1',
                        email,
                        name: 'John Doe',
                        level: 'intermediate',
                        streak: 5,
                        totalWordsLearned: 150,
                        createdAt: new Date().toISOString()
                    }

                    set({
                        user: mockUser,
                        isAuthenticated: true,
                        isLoading: false
                    })
                } catch (error) {
                    set({ isLoading: false })
                    throw error
                }
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false
                })
            },

            updateProfile: (data: Partial<User>) => {
                const currentUser = get().user
                if (currentUser) {
                    set({
                        user: { ...currentUser, ...data }
                    })
                }
            },

            setLoading: (loading: boolean) => {
                set({ isLoading: loading })
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
)
