import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAchievements, useUserAchievements } from '@/hooks/useApi'
import { useAchievementStore } from '@/stores/achievementStore'
import { useAuthStore } from '@/stores/authStore'
import {
    Trophy,
    Star,
    Target,
    Zap,
    Crown,
    Award,
    Medal,
    Gem
} from 'lucide-react'

export function AchievementsPage() {
    const { user } = useAuthStore()
    const { data: achievements = [] } = useAchievements()
    const { data: userAchievements = [] } = useUserAchievements(user?.id || '')
    const { totalPoints } = useAchievementStore()

    const getRarityIcon = (rarity: string) => {
        switch (rarity) {
            case 'common': return <Medal className="h-5 w-5 text-gray-500" />
            case 'rare': return <Star className="h-5 w-5 text-blue-500" />
            case 'epic': return <Gem className="h-5 w-5 text-purple-500" />
            case 'legendary': return <Crown className="h-5 w-5 text-yellow-500" />
            default: return <Award className="h-5 w-5 text-gray-500" />
        }
    }

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'bg-gray-100 text-gray-800'
            case 'rare': return 'bg-blue-100 text-blue-800'
            case 'epic': return 'bg-purple-100 text-purple-800'
            case 'legendary': return 'bg-yellow-100 text-yellow-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const earnedAchievementIds = userAchievements.map(ua => ua.achievementId)
    const earnedAchievements = achievements.filter(a => earnedAchievementIds.includes(a.id))
    const unearnedAchievements = achievements.filter(a => !earnedAchievementIds.includes(a.id))

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    Thành tích của bạn
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Thu thập các thành tích và huy hiệu để thể hiện tiến độ học tập của bạn
                </p>

                <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{totalPoints}</div>
                        <div className="text-sm text-gray-600">Tổng điểm</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">{earnedAchievements.length}</div>
                        <div className="text-sm text-gray-600">Thành tích đã đạt</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">{achievements.length}</div>
                        <div className="text-sm text-gray-600">Tổng thành tích</div>
                    </div>
                </div>
            </div>

            {/* Earned Achievements */}
            {earnedAchievements.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Trophy className="h-6 w-6 text-yellow-600 mr-2" />
                        Thành tích đã đạt được
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {earnedAchievements.map((achievement) => (
                            <Card key={achievement.id} className="border-green-200 bg-green-50">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-3xl">{achievement.icon}</div>
                                            <div>
                                                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                                                <CardDescription>{achievement.description}</CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {getRarityIcon(achievement.rarity)}
                                            <Badge className={getRarityColor(achievement.rarity)}>
                                                {achievement.rarity}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <span className="font-medium">{achievement.points} điểm</span>
                                        </div>
                                        <div className="text-sm text-green-600 font-medium">
                                            ✓ Đã đạt được
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Unearned Achievements */}
            {unearnedAchievements.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Target className="h-6 w-6 text-gray-600 mr-2" />
                        Thành tích chưa đạt được
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {unearnedAchievements.map((achievement) => (
                            <Card key={achievement.id} className="opacity-75">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-3xl grayscale">{achievement.icon}</div>
                                            <div>
                                                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                                                <CardDescription>{achievement.description}</CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {getRarityIcon(achievement.rarity)}
                                            <Badge className={getRarityColor(achievement.rarity)}>
                                                {achievement.rarity}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Star className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium">{achievement.points} điểm</span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Chưa đạt được
                                            </div>
                                        </div>

                                        {/* Progress indicator */}
                                        <div className="space-y-2">
                                            <div className="text-sm text-gray-600">
                                                Yêu cầu: {achievement.requirement.type === 'lessons_completed' ? 'Hoàn thành' :
                                                    achievement.requirement.type === 'words_learned' ? 'Học' :
                                                        achievement.requirement.type === 'streak' ? 'Chuỗi ngày' :
                                                            'Bài học/ngày'} {achievement.requirement.value}
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-gray-400 h-2 rounded-full" style={{ width: '0%' }} />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Achievement Stats */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-blue-600" />
                        <span>Thống kê thành tích</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                                {earnedAchievements.filter(a => a.rarity === 'common').length}
                            </div>
                            <div className="text-sm text-gray-600">Common</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {earnedAchievements.filter(a => a.rarity === 'rare').length}
                            </div>
                            <div className="text-sm text-gray-600">Rare</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {earnedAchievements.filter(a => a.rarity === 'epic').length}
                            </div>
                            <div className="text-sm text-gray-600">Epic</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                                {earnedAchievements.filter(a => a.rarity === 'legendary').length}
                            </div>
                            <div className="text-sm text-gray-600">Legendary</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Empty state */}
            {achievements.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Chưa có thành tích nào
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Các thành tích sẽ được thêm vào sớm nhất có thể.
                        </p>
                        <Button>
                            <Target className="h-4 w-4 mr-2" />
                            Bắt đầu học để đạt thành tích
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

