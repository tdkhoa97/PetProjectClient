import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Achievement, UserAchievement, Notification, AchievementState } from '@/types'

export const useAchievementStore = create<AchievementState>()(
    persist(
        (set, get) => ({
            achievements: [],
            userAchievements: [],
            notifications: [],
            totalPoints: 0,

            setAchievements: (achievements: Achievement[]) => {
                set({ achievements })
            },

            addUserAchievement: (achievement: UserAchievement) => {
                const { userAchievements, achievements } = get()
                const achievementData = achievements.find(a => a.id === achievement.achievementId)

                if (achievementData && !userAchievements.find(ua => ua.achievementId === achievement.achievementId)) {
                    set({
                        userAchievements: [...userAchievements, achievement],
                        totalPoints: get().totalPoints + achievementData.points
                    })

                    // Add notification
                    const notification: Notification = {
                        id: `notif-${Date.now()}`,
                        userId: achievement.userId,
                        type: 'achievement',
                        title: 'Achievement Unlocked!',
                        message: `You earned the '${achievementData.title}' achievement!`,
                        read: false,
                        createdAt: new Date().toISOString()
                    }

                    set({ notifications: [...get().notifications, notification] })
                }
            },

            addNotification: (notification: Notification) => {
                set({ notifications: [...get().notifications, notification] })
            },

            markNotificationAsRead: (notificationId: string) => {
                const { notifications } = get()
                set({
                    notifications: notifications.map(n =>
                        n.id === notificationId ? { ...n, read: true } : n
                    )
                })
            },

            updatePoints: (points: number) => {
                set({ totalPoints: get().totalPoints + points })
            },

            checkAchievements: (stats) => {
                const { achievements, userAchievements } = get()

                achievements.forEach(achievement => {
                    const alreadyEarned = userAchievements.some(ua => ua.achievementId === achievement.id)

                    if (!alreadyEarned) {
                        let shouldEarn = false

                        switch (achievement.requirement.type) {
                            case 'lessons_completed':
                                shouldEarn = stats.lessonsCompleted >= achievement.requirement.value
                                break
                            case 'words_learned':
                                shouldEarn = stats.wordsLearned >= achievement.requirement.value
                                break
                            case 'streak':
                                shouldEarn = stats.streak >= achievement.requirement.value
                                break
                            case 'lessons_per_day':
                                shouldEarn = stats.lessonsPerDay >= achievement.requirement.value
                                break
                        }

                        if (shouldEarn) {
                            const userAchievement: UserAchievement = {
                                id: `ua-${Date.now()}`,
                                userId: '1', // This should come from auth store
                                achievementId: achievement.id,
                                earnedAt: new Date().toISOString()
                            }

                            get().addUserAchievement(userAchievement)
                        }
                    }
                })
            }
        }),
        {
            name: 'achievement-storage',
            partialize: (state) => ({
                userAchievements: state.userAchievements,
                notifications: state.notifications,
                totalPoints: state.totalPoints
            }),
        }
    )
)
