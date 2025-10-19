import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLeaderboard } from '@/hooks/useApi'
import { useAuthStore } from '@/stores/authStore'
import {
    Trophy,
    Medal,
    Crown,
    Award,
    TrendingUp,
    Calendar,
    Target,
    Star
} from 'lucide-react'

export function LeaderboardPage() {
    const { user } = useAuthStore()
    const { data: leaderboard = [], isLoading } = useLeaderboard()
    const [timeFilter, setTimeFilter] = useState<'all' | 'weekly' | 'monthly'>('all')

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="h-6 w-6 text-yellow-500" />
            case 2:
                return <Medal className="h-6 w-6 text-gray-400" />
            case 3:
                return <Award className="h-6 w-6 text-orange-500" />
            default:
                return <span className="text-lg font-bold text-gray-600">#{rank}</span>
        }
    }

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1:
                return 'bg-yellow-50 border-yellow-200'
            case 2:
                return 'bg-gray-50 border-gray-200'
            case 3:
                return 'bg-orange-50 border-orange-200'
            default:
                return 'bg-white border-gray-200'
        }
    }

    const getPoints = (entry: any) => {
        switch (timeFilter) {
            case 'weekly':
                return entry.weeklyPoints
            case 'monthly':
                return entry.monthlyPoints
            default:
                return entry.totalPoints
        }
    }

    const getTimeLabel = () => {
        switch (timeFilter) {
            case 'weekly':
                return 'tuần này'
            case 'monthly':
                return 'tháng này'
            default:
                return 'tổng cộng'
        }
    }

    const currentUserRank = leaderboard.find(entry => entry.userId === user?.id)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    Bảng xếp hạng
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Xem ai đang dẫn đầu trong cộng đồng học tiếng Anh
                </p>
            </div>

            {/* Time Filter */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-sm font-medium text-gray-600">Xem theo:</span>
                        <div className="flex space-x-2">
                            {[
                                { value: 'all', label: 'Tổng cộng' },
                                { value: 'weekly', label: 'Tuần này' },
                                { value: 'monthly', label: 'Tháng này' }
                            ].map((filter) => (
                                <Button
                                    key={filter.value}
                                    variant={timeFilter === filter.value ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setTimeFilter(filter.value as any)}
                                >
                                    {filter.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Current User Rank */}
            {currentUserRank && (
                <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-blue-800">
                            <Star className="h-5 w-5" />
                            <span>Xếp hạng của bạn</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {getRankIcon(currentUserRank.rank)}
                                <div>
                                    <p className="font-medium text-blue-800">
                                        Hạng {currentUserRank.rank} với {getPoints(currentUserRank)} điểm ({getTimeLabel()})
                                    </p>
                                    <p className="text-sm text-blue-600">
                                        Tổng điểm: {currentUserRank.totalPoints} | Tuần: {currentUserRank.weeklyPoints} | Tháng: {currentUserRank.monthlyPoints}
                                    </p>
                                </div>
                            </div>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {user?.name}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Leaderboard */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-yellow-600" />
                        <span>Top {leaderboard.length} người học</span>
                    </CardTitle>
                    <CardDescription>
                        Dựa trên điểm số {getTimeLabel()}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-2 text-gray-600">Đang tải...</p>
                        </div>
                    ) : leaderboard.length > 0 ? (
                        <div className="space-y-4">
                            {leaderboard.map((entry, index) => (
                                <div
                                    key={entry.userId}
                                    className={`flex items-center justify-between p-4 rounded-lg border ${getRankColor(entry.rank)}`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center justify-center w-8">
                                            {getRankIcon(entry.rank)}
                                        </div>
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-blue-600">
                                                {entry.userId === user?.id ? 'Bạn' : `U${entry.userId}`}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {entry.userId === user?.id ? user.name : `Người dùng ${entry.userId}`}
                                            </p>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                <span>Tổng: {entry.totalPoints}</span>
                                                <span>Tuần: {entry.weeklyPoints}</span>
                                                <span>Tháng: {entry.monthlyPoints}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {getPoints(entry)}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            điểm {getTimeLabel()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <p>Chưa có dữ liệu xếp hạng</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-yellow-100 rounded-full">
                                <Crown className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {leaderboard[0]?.totalPoints || 0}
                                </p>
                                <p className="text-sm text-gray-600">Điểm cao nhất</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <TrendingUp className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {leaderboard.length}
                                </p>
                                <p className="text-sm text-gray-600">Người tham gia</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <Target className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {Math.round(leaderboard.reduce((sum, entry) => sum + entry.totalPoints, 0) / leaderboard.length) || 0}
                                </p>
                                <p className="text-sm text-gray-600">Điểm trung bình</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tips */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-600" />
                        <span>Mẹo để lên top</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                                <div>
                                    <h4 className="font-medium">Học đều đặn</h4>
                                    <p className="text-sm text-gray-600">
                                        Duy trì chuỗi ngày học để có điểm streak cao
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Target className="h-5 w-5 text-green-600 mt-1" />
                                <div>
                                    <h4 className="font-medium">Hoàn thành bài học</h4>
                                    <p className="text-sm text-gray-600">
                                        Mỗi bài học hoàn thành sẽ cho bạn điểm số
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <Trophy className="h-5 w-5 text-purple-600 mt-1" />
                                <div>
                                    <h4 className="font-medium">Đạt thành tích</h4>
                                    <p className="text-sm text-gray-600">
                                        Thu thập các thành tích để có điểm bonus
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <TrendingUp className="h-5 w-5 text-orange-600 mt-1" />
                                <div>
                                    <h4 className="font-medium">Tương tác cộng đồng</h4>
                                    <p className="text-sm text-gray-600">
                                        Tham gia thảo luận và giúp đỡ người khác
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

