import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLearningStore } from '@/stores/learningStore'
import {
    BookOpen,
    PlayCircle,
    CheckCircle,
    Clock,
    Star,
    Target,
    TrendingUp
} from 'lucide-react'

export function LessonsPage() {
    const { lessons, setCurrentLesson, completeLesson } = useLearningStore()

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800'
            case 'medium': return 'bg-yellow-100 text-yellow-800'
            case 'hard': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getDifficultyText = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'Dễ'
            case 'medium': return 'Trung bình'
            case 'hard': return 'Khó'
            default: return 'Không xác định'
        }
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    Bài học tiếng Anh
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Chọn bài học phù hợp với trình độ của bạn và bắt đầu hành trình học tiếng Anh
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{lessons.length}</p>
                                <p className="text-sm text-gray-600">Tổng bài học</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {lessons.filter(lesson => lesson.completed).length}
                                </p>
                                <p className="text-sm text-gray-600">Đã hoàn thành</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-100 rounded-full">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {Math.round(
                                        (lessons.filter(lesson => lesson.completed).length / lessons.length) * 100
                                    )}%
                                </p>
                                <p className="text-sm text-gray-600">Tiến độ</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                    <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                                    <CardDescription>{lesson.description}</CardDescription>
                                </div>
                                {lesson.completed && (
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Progress */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Tiến độ</span>
                                        <span>{lesson.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${lesson.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Words count */}
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{lesson.words.length} từ</span>
                                </div>

                                {/* Difficulty badges */}
                                <div className="flex flex-wrap gap-2">
                                    {Array.from(new Set(lesson.words.map(word => word.difficulty))).map((difficulty) => (
                                        <Badge
                                            key={difficulty}
                                            className={getDifficultyColor(difficulty)}
                                        >
                                            {getDifficultyText(difficulty)}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Action buttons */}
                                <div className="flex space-x-2">
                                    <Link to={`/lessons/${lesson.id}`}>
                                        <Button className="flex-1">
                                            <PlayCircle className="h-4 w-4 mr-2" />
                                            {lesson.completed ? 'Xem lại' : 'Bắt đầu'}
                                        </Button>
                                    </Link>
                                    {!lesson.completed && (
                                        <Button
                                            variant="outline"
                                            onClick={() => completeLesson(lesson.id)}
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty state */}
            {lessons.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Chưa có bài học nào
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Các bài học sẽ được thêm vào sớm nhất có thể.
                        </p>
                        <Button>
                            <Target className="h-4 w-4 mr-2" />
                            Tạo bài học mới
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Learning Tips */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-600" />
                        <span>Mẹo học hiệu quả</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                                <div>
                                    <h4 className="font-medium">Học đều đặn</h4>
                                    <p className="text-sm text-gray-600">
                                        Dành 15-30 phút mỗi ngày để học từ mới
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Target className="h-5 w-5 text-green-600 mt-1" />
                                <div>
                                    <h4 className="font-medium">Đặt mục tiêu</h4>
                                    <p className="text-sm text-gray-600">
                                        Đặt mục tiêu học bao nhiêu từ mỗi ngày
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <BookOpen className="h-5 w-5 text-purple-600 mt-1" />
                                <div>
                                    <h4 className="font-medium">Ôn tập thường xuyên</h4>
                                    <p className="text-sm text-gray-600">
                                        Ôn lại từ đã học để ghi nhớ lâu hơn
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <TrendingUp className="h-5 w-5 text-orange-600 mt-1" />
                                <div>
                                    <h4 className="font-medium">Theo dõi tiến độ</h4>
                                    <p className="text-sm text-gray-600">
                                        Xem lại thành tích để có động lực học tập
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
