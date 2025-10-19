import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/authStore'
import { useLearningStore } from '@/stores/learningStore'
import {
    BookOpen,
    Target,
    Trophy,
    Clock,
    TrendingUp,
    PlayCircle,
    Star,
    Users
} from 'lucide-react'

export function HomePage() {
    const { user, isAuthenticated } = useAuthStore()
    const { lessons, learnedWords, currentStreak, dailyGoal } = useLearningStore()

    const completedLessons = lessons.filter(lesson => lesson.completed).length
    const totalLessons = lessons.length
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

    const stats = [
        {
            title: 'Từ đã học',
            value: learnedWords.length,
            icon: BookOpen,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Chuỗi ngày',
            value: currentStreak,
            icon: Trophy,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100'
        },
        {
            title: 'Bài học hoàn thành',
            value: completedLessons,
            icon: Target,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            title: 'Mục tiêu hôm nay',
            value: dailyGoal,
            icon: Clock,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        }
    ]

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    Chào mừng đến với English Learning!
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Học tiếng Anh một cách hiệu quả và thú vị với các bài học được thiết kế đặc biệt cho bạn.
                </p>

                {isAuthenticated && user && (
                    <div className="flex items-center justify-center space-x-2">
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                            Level: {user.level}
                        </Badge>
                        <Badge variant="outline" className="text-lg px-4 py-2">
                            {user.totalWordsLearned} từ đã học
                        </Badge>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                        <Icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-sm text-gray-600">{stat.title}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Progress Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5" />
                        <span>Tiến độ học tập</span>
                    </CardTitle>
                    <CardDescription>
                        Theo dõi tiến độ học tập của bạn
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span>Hoàn thành bài học</span>
                            <span>{completedLessons}/{totalLessons}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-600">
                            {progressPercentage.toFixed(1)}% hoàn thành
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <PlayCircle className="h-5 w-5 text-blue-600" />
                            <span>Bắt đầu học</span>
                        </CardTitle>
                        <CardDescription>
                            Tiếp tục bài học hiện tại hoặc bắt đầu bài học mới
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link to="/lessons">
                            <Button className="w-full">
                                <BookOpen className="h-4 w-4 mr-2" />
                                Xem tất cả bài học
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Star className="h-5 w-5 text-yellow-600" />
                            <span>Thành tích</span>
                        </CardTitle>
                        <CardDescription>
                            Xem các thành tích và huy hiệu bạn đã đạt được
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full">
                            <Trophy className="h-4 w-4 mr-2" />
                            Xem thành tích
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span>Hoạt động gần đây</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {learnedWords.slice(-3).map((word, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <BookOpen className="h-4 w-4 text-blue-600" />
                                <div>
                                    <p className="font-medium">{word.english}</p>
                                    <p className="text-sm text-gray-600">{word.vietnamese}</p>
                                </div>
                                <Badge variant="secondary" className="ml-auto">
                                    Đã học
                                </Badge>
                            </div>
                        ))}
                        {learnedWords.length === 0 && (
                            <p className="text-gray-500 text-center py-4">
                                Chưa có hoạt động nào. Hãy bắt đầu học ngay!
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Community Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5" />
                        <span>Cộng đồng học tập</span>
                    </CardTitle>
                    <CardDescription>
                        Kết nối với những người học khác và chia sẻ kinh nghiệm
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <p className="font-medium">1,234</p>
                            <p className="text-sm text-gray-600">Người học</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <p className="font-medium">5,678</p>
                            <p className="text-sm text-gray-600">Bài học hoàn thành</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <p className="font-medium">9,012</p>
                            <p className="text-sm text-gray-600">Từ đã học</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

