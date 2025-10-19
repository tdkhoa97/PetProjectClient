import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useLesson, useMarkWordAsLearned, useCompleteLesson } from '@/hooks/useApi'
import { useLearningStore } from '@/stores/learningStore'
import { useAchievementStore } from '@/stores/achievementStore'
import type { StudyMode } from '@/types'
import {
    ArrowLeft,
    BookOpen,
    CheckCircle,
    Clock,
    Star,
    Volume2,
    RotateCcw,
    Play,
    Pause,
    Target,
    Trophy
} from 'lucide-react'

export function LessonDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { data: lesson, isLoading } = useLesson(id || '')
    const markWordAsLearnedMutation = useMarkWordAsLearned()
    const completeLessonMutation = useCompleteLesson()
    const { setCurrentLesson, markWordAsLearned, completeLesson } = useLearningStore()
    const { updatePoints, checkAchievements } = useAchievementStore()

    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)
    const [studyMode, setStudyMode] = useState<StudyMode>('learn')
    const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({})
    const [quizScore, setQuizScore] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        if (lesson) {
            setCurrentLesson(lesson)
        }
    }, [lesson, setCurrentLesson])

    const currentWord = lesson?.words[currentWordIndex]
    const progress = lesson ? ((currentWordIndex + 1) / lesson.words.length) * 100 : 0
    const learnedWords = lesson?.words.filter(word => word.learned).length || 0

    const handleMarkAsLearned = async () => {
        if (!currentWord) return

        try {
            await markWordAsLearnedMutation.mutateAsync(currentWord.id)
            markWordAsLearned(currentWord.id)
            updatePoints(currentWord.points)

            // Check achievements
            checkAchievements({
                lessonsCompleted: 0,
                wordsLearned: 1,
                streak: 0,
                lessonsPerDay: 0
            })

            nextWord()
        } catch (error) {
            console.error('Error marking word as learned:', error)
        }
    }

    const nextWord = () => {
        if (lesson && currentWordIndex < lesson.words.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1)
            setShowAnswer(false)
        }
    }

    const prevWord = () => {
        if (currentWordIndex > 0) {
            setCurrentWordIndex(currentWordIndex - 1)
            setShowAnswer(false)
        }
    }

    const handleCompleteLesson = async () => {
        if (!lesson) return

        try {
            await completeLessonMutation.mutateAsync(lesson.id)
            completeLesson(lesson.id)
            updatePoints(lesson.points)

            // Check achievements
            checkAchievements({
                lessonsCompleted: 1,
                wordsLearned: 0,
                streak: 0,
                lessonsPerDay: 1
            })
        } catch (error) {
            console.error('Error completing lesson:', error)
        }
    }

    const playPronunciation = () => {
        if (currentWord) {
            // In a real app, you would use Web Speech API or audio files
            const utterance = new SpeechSynthesisUtterance(currentWord.english)
            utterance.lang = 'en-US'
            speechSynthesis.speak(utterance)
            setIsPlaying(true)

            utterance.onend = () => setIsPlaying(false)
        }
    }

    const handleQuizAnswer = (wordId: string, answer: string) => {
        setQuizAnswers({ ...quizAnswers, [wordId]: answer })
    }

    const submitQuiz = () => {
        if (!lesson) return

        let score = 0
        lesson.words.forEach(word => {
            if (quizAnswers[word.id] === word.vietnamese) {
                score++
            }
        })

        setQuizScore(score)
        setStudyMode('review')
    }

    const resetQuiz = () => {
        setQuizAnswers({})
        setQuizScore(0)
        setStudyMode('quiz')
    }

    if (isLoading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Đang tải...</p>
            </div>
        )
    }

    if (!lesson) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài học</h2>
                <Link to="/lessons">
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Quay lại danh sách bài học
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link to="/lessons">
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Quay lại
                    </Button>
                </Link>

                <div className="flex items-center space-x-4">
                    <Badge variant="outline">
                        {lesson.difficulty === 'easy' ? 'Dễ' :
                            lesson.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                    </Badge>
                    <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        {lesson.estimatedTime} phút
                    </Badge>
                </div>
            </div>

            {/* Lesson Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                    <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Tiến độ học tập</span>
                            <span className="text-sm font-medium">{learnedWords}/{lesson.words.length} từ</span>
                        </div>
                        <Progress value={progress} className="h-2" />

                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Từ {currentWordIndex + 1} / {lesson.words.length}</span>
                            <span>{lesson.points} điểm</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Study Mode Toggle */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-center space-x-4">
                        <Button
                            variant={studyMode === 'learn' ? 'default' : 'outline'}
                            onClick={() => setStudyMode('learn')}
                        >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Học từ
                        </Button>
                        <Button
                            variant={studyMode === 'quiz' ? 'default' : 'outline'}
                            onClick={() => setStudyMode('quiz')}
                        >
                            <Target className="h-4 w-4 mr-2" />
                            Kiểm tra
                        </Button>
                        <Button
                            variant={studyMode === 'review' ? 'default' : 'outline'}
                            onClick={() => setStudyMode('review')}
                        >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Ôn tập
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Learning Content */}
            {studyMode === 'learn' && currentWord && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center text-3xl">
                            {currentWord.english}
                        </CardTitle>
                        <CardDescription className="text-center text-lg">
                            {currentWord.pronunciation}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={playPronunciation}
                                disabled={isPlaying}
                            >
                                {isPlaying ? (
                                    <Pause className="h-6 w-6 mr-2" />
                                ) : (
                                    <Volume2 className="h-6 w-6 mr-2" />
                                )}
                                Phát âm
                            </Button>
                        </div>

                        {showAnswer ? (
                            <div className="text-center space-y-4">
                                <div className="text-2xl font-medium text-blue-600">
                                    {currentWord.vietnamese}
                                </div>
                                <div className="text-gray-700">
                                    <strong>Ví dụ:</strong> {currentWord.example}
                                </div>
                                <div className="text-gray-600">
                                    <strong>Dịch:</strong> {currentWord.exampleVietnamese}
                                </div>

                                <div className="flex items-center justify-center space-x-4">
                                    <Button onClick={handleMarkAsLearned} disabled={currentWord.learned}>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        {currentWord.learned ? 'Đã học' : 'Đánh dấu đã học'}
                                    </Button>
                                    <Button variant="outline" onClick={() => setShowAnswer(false)}>
                                        <RotateCcw className="h-4 w-4 mr-2" />
                                        Ẩn đáp án
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <Button onClick={() => setShowAnswer(true)}>
                                    Hiển thị đáp án
                                </Button>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <Button
                                variant="outline"
                                onClick={prevWord}
                                disabled={currentWordIndex === 0}
                            >
                                Từ trước
                            </Button>
                            <Button
                                variant="outline"
                                onClick={nextWord}
                                disabled={currentWordIndex === lesson.words.length - 1}
                            >
                                Từ tiếp theo
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Quiz Mode */}
            {studyMode === 'quiz' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Kiểm tra kiến thức</CardTitle>
                        <CardDescription>
                            Chọn nghĩa tiếng Việt đúng cho từ tiếng Anh
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {lesson.words.map((word, index) => (
                                <div key={word.id} className="p-4 border rounded-lg">
                                    <h3 className="font-medium text-lg mb-3">{word.english}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {[word.vietnamese, ...lesson.words.filter(w => w.id !== word.id).slice(0, 3).map(w => w.vietnamese)]
                                            .sort(() => Math.random() - 0.5)
                                            .map((option, optionIndex) => (
                                                <Button
                                                    key={optionIndex}
                                                    variant={quizAnswers[word.id] === option ? 'default' : 'outline'}
                                                    onClick={() => handleQuizAnswer(word.id, option)}
                                                    className="justify-start"
                                                >
                                                    {option}
                                                </Button>
                                            ))}
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-center">
                                <Button onClick={submitQuiz} size="lg">
                                    <Target className="h-4 w-4 mr-2" />
                                    Nộp bài
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Review Mode */}
            {studyMode === 'review' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Trophy className="h-5 w-5 text-yellow-600" />
                            <span>Kết quả kiểm tra</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center space-y-6">
                            <div className="text-4xl font-bold text-blue-600">
                                {quizScore}/{lesson.words.length}
                            </div>
                            <div className="text-lg text-gray-600">
                                Điểm số: {Math.round((quizScore / lesson.words.length) * 100)}%
                            </div>

                            <div className="space-y-4">
                                {lesson.words.map(word => (
                                    <div key={word.id} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">{word.english}</div>
                                                <div className="text-sm text-gray-600">{word.vietnamese}</div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {quizAnswers[word.id] === word.vietnamese ? (
                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                ) : (
                                                    <div className="text-red-600">
                                                        <div className="text-sm">Sai: {quizAnswers[word.id]}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center space-x-4">
                                <Button onClick={resetQuiz}>
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Làm lại
                                </Button>
                                <Button variant="outline" onClick={() => setStudyMode('learn')}>
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    Tiếp tục học
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Complete Lesson */}
            {learnedWords === lesson.words.length && (
                <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6 text-center">
                        <Trophy className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                            Chúc mừng! Bạn đã hoàn thành bài học
                        </h3>
                        <p className="text-green-700 mb-4">
                            Bạn đã học được {lesson.words.length} từ và nhận được {lesson.points} điểm!
                        </p>
                        <Button onClick={handleCompleteLesson} size="lg">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Hoàn thành bài học
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
