import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/authStore'
import { useLearningStore } from '@/stores/learningStore'
import {
    User,
    Mail,
    Calendar,
    Trophy,
    Target,
    BookOpen,
    Settings,
    Save,
    Edit3,
    Camera
} from 'lucide-react'

export function AccountPage() {
    const { user, updateProfile } = useAuthStore()
    const { dailyGoal, setDailyGoal, learnedWords, lessons } = useLearningStore()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        level: user?.level || 'beginner'
    })

    const completedLessons = lessons.filter(lesson => lesson.completed).length
    const totalLessons = lessons.length
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

    const handleSave = () => {
        updateProfile(formData)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            level: user?.level || 'beginner'
        })
        setIsEditing(false)
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-green-100 text-green-800'
            case 'intermediate': return 'bg-yellow-100 text-yellow-800'
            case 'advanced': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Header */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="h-10 w-10 text-blue-600" />
                                </div>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                                >
                                    <Camera className="h-4 w-4" />
                                </Button>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {isEditing ? 'Chỉnh sửa hồ sơ' : 'Hồ sơ của tôi'}
                                </h1>
                                <p className="text-gray-600">
                                    Quản lý thông tin tài khoản và cài đặt học tập
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {isEditing ? (
                                <>
                                    <Button variant="outline" onClick={handleCancel}>
                                        Hủy
                                    </Button>
                                    <Button onClick={handleSave}>
                                        <Save className="h-4 w-4 mr-2" />
                                        Lưu
                                    </Button>
                                </>
                            ) : (
                                <Button variant="outline" onClick={() => setIsEditing(true)}>
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    Chỉnh sửa
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Họ và tên</Label>
                                {isEditing ? (
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-lg font-medium">{user?.name}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                {isEditing ? (
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-lg">{user?.email}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="level">Trình độ</Label>
                                {isEditing ? (
                                    <select
                                        id="level"
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                                    >
                                        <option value="beginner">Mới bắt đầu</option>
                                        <option value="intermediate">Trung bình</option>
                                        <option value="advanced">Nâng cao</option>
                                    </select>
                                ) : (
                                    <Badge className={getLevelColor(user?.level || 'beginner')}>
                                        {user?.level === 'beginner' ? 'Mới bắt đầu' :
                                            user?.level === 'intermediate' ? 'Trung bình' : 'Nâng cao'}
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Ngày tham gia</p>
                                    <p className="font-medium">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Trophy className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Chuỗi ngày học</p>
                                    <p className="font-medium">{user?.streak || 0} ngày</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Từ đã học</p>
                                    <p className="font-medium">{user?.totalWordsLearned || 0} từ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Learning Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Target className="h-5 w-5" />
                            <span>Thống kê học tập</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Bài học hoàn thành</span>
                                <span className="font-medium">{completedLessons}/{totalLessons}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Từ đã học</span>
                                <span className="font-medium">{learnedWords.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Chuỗi ngày học</span>
                                <span className="font-medium">{user?.streak || 0}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Settings className="h-5 w-5" />
                            <span>Cài đặt học tập</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="dailyGoal">Mục tiêu từ mỗi ngày</Label>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Input
                                        id="dailyGoal"
                                        type="number"
                                        value={dailyGoal}
                                        onChange={(e) => setDailyGoal(parseInt(e.target.value) || 0)}
                                        className="w-20"
                                    />
                                    <span className="text-sm text-gray-600">từ</span>
                                </div>
                            </div>
                            <div className="pt-4">
                                <Button variant="outline" className="w-full">
                                    <Settings className="h-4 w-4 mr-2" />
                                    Cài đặt thông báo
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Hoạt động gần đây</CardTitle>
                    <CardDescription>
                        Lịch sử học tập của bạn trong 7 ngày qua
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {learnedWords.slice(-5).map((word, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <BookOpen className="h-4 w-4 text-blue-600" />
                                    <div>
                                        <p className="font-medium">{word.english}</p>
                                        <p className="text-sm text-gray-600">{word.vietnamese}</p>
                                    </div>
                                </div>
                                <Badge variant="secondary">
                                    {word.difficulty === 'easy' ? 'Dễ' :
                                        word.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                                </Badge>
                            </div>
                        ))}
                        {learnedWords.length === 0 && (
                            <p className="text-gray-500 text-center py-8">
                                Chưa có hoạt động nào. Hãy bắt đầu học ngay!
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Cài đặt tài khoản</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                            <Mail className="h-4 w-4 mr-2" />
                            Thay đổi email
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                            <Settings className="h-4 w-4 mr-2" />
                            Thay đổi mật khẩu
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                            <User className="h-4 w-4 mr-2" />
                            Xóa tài khoản
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

