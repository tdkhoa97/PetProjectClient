import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNotifications, useMarkNotificationAsRead } from '@/hooks/useApi'
import { useAuthStore } from '@/stores/authStore'
import {
    Bell,
    Trophy,
    Flame,
    BookOpen,
    MessageCircle,
    Heart,
    Check,
    Clock,
    Filter
} from 'lucide-react'

export function NotificationsPage() {
    const { user } = useAuthStore()
    const { data: notifications = [], isLoading } = useNotifications(user?.id || '')
    const markAsReadMutation = useMarkNotificationAsRead()

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'achievement':
                return <Trophy className="h-5 w-5 text-yellow-600" />
            case 'streak':
                return <Flame className="h-5 w-5 text-orange-600" />
            case 'lesson':
                return <BookOpen className="h-5 w-5 text-blue-600" />
            case 'comment':
                return <MessageCircle className="h-5 w-5 text-green-600" />
            case 'like':
                return <Heart className="h-5 w-5 text-red-600" />
            default:
                return <Bell className="h-5 w-5 text-gray-600" />
        }
    }

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'achievement':
                return 'bg-yellow-50 border-yellow-200'
            case 'streak':
                return 'bg-orange-50 border-orange-200'
            case 'lesson':
                return 'bg-blue-50 border-blue-200'
            case 'comment':
                return 'bg-green-50 border-green-200'
            case 'like':
                return 'bg-red-50 border-red-200'
            default:
                return 'bg-gray-50 border-gray-200'
        }
    }

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            await markAsReadMutation.mutateAsync(notificationId)
        } catch (error) {
            console.error('Error marking notification as read:', error)
        }
    }

    const handleMarkAllAsRead = async () => {
        const unreadNotifications = notifications.filter(n => !n.read)
        for (const notification of unreadNotifications) {
            try {
                await markAsReadMutation.mutateAsync(notification.id)
            } catch (error) {
                console.error('Error marking notification as read:', error)
            }
        }
    }

    const formatDate = (dateString: string) => {
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

    const unreadCount = notifications.filter(n => !n.read).length
    const readNotifications = notifications.filter(n => n.read)
    const unreadNotifications = notifications.filter(n => !n.read)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    Thông báo
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Theo dõi các hoạt động và thành tích của bạn
                </p>

                {unreadCount > 0 && (
                    <div className="flex items-center justify-center space-x-2">
                        <Badge variant="destructive" className="text-lg px-4 py-2">
                            {unreadCount} thông báo chưa đọc
                        </Badge>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleMarkAllAsRead}
                            disabled={markAsReadMutation.isPending}
                        >
                            <Check className="h-4 w-4 mr-2" />
                            Đánh dấu tất cả đã đọc
                        </Button>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <Bell className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                                <p className="text-sm text-gray-600">Chưa đọc</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <Check className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{readNotifications.length}</p>
                                <p className="text-sm text-gray-600">Đã đọc</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Clock className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                                <p className="text-sm text-gray-600">Tổng cộng</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Notifications List */}
            {isLoading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Đang tải...</p>
                </div>
            ) : notifications.length > 0 ? (
                <div className="space-y-4">
                    {/* Unread Notifications */}
                    {unreadNotifications.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <Bell className="h-5 w-5 text-red-600 mr-2" />
                                Thông báo mới ({unreadCount})
                            </h2>
                            <div className="space-y-3">
                                {unreadNotifications.map((notification) => (
                                    <Card
                                        key={notification.id}
                                        className={`${getNotificationColor(notification.type)} border-l-4`}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-3 flex-1">
                                                    {getNotificationIcon(notification.type)}
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900">
                                                            {notification.title}
                                                        </h3>
                                                        <p className="text-gray-700 mt-1">
                                                            {notification.message}
                                                        </p>
                                                        <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                                                            <Clock className="h-4 w-4" />
                                                            <span>{formatDate(notification.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    disabled={markAsReadMutation.isPending}
                                                >
                                                    <Check className="h-4 w-4 mr-1" />
                                                    Đã đọc
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Read Notifications */}
                    {readNotifications.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <Check className="h-5 w-5 text-green-600 mr-2" />
                                Đã đọc ({readNotifications.length})
                            </h2>
                            <div className="space-y-3">
                                {readNotifications.map((notification) => (
                                    <Card
                                        key={notification.id}
                                        className="opacity-75"
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start space-x-3">
                                                {getNotificationIcon(notification.type)}
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-700">
                                                        {notification.title}
                                                    </h3>
                                                    <p className="text-gray-600 mt-1">
                                                        {notification.message}
                                                    </p>
                                                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-400">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{formatDate(notification.createdAt)}</span>
                                                        <Check className="h-4 w-4" />
                                                        <span>Đã đọc</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Card>
                    <CardContent className="text-center py-12">
                        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Chưa có thông báo nào
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Các thông báo về thành tích và hoạt động sẽ xuất hiện ở đây.
                        </p>
                        <Button>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Bắt đầu học để nhận thông báo
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Notification Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Filter className="h-5 w-5 text-gray-600" />
                        <span>Cài đặt thông báo</span>
                    </CardTitle>
                    <CardDescription>
                        Tùy chỉnh loại thông báo bạn muốn nhận
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Trophy className="h-5 w-5 text-yellow-600" />
                                <div>
                                    <p className="font-medium">Thành tích</p>
                                    <p className="text-sm text-gray-600">Thông báo khi đạt thành tích mới</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                Bật
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Flame className="h-5 w-5 text-orange-600" />
                                <div>
                                    <p className="font-medium">Chuỗi ngày học</p>
                                    <p className="text-sm text-gray-600">Nhắc nhở duy trì chuỗi ngày học</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                Bật
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <MessageCircle className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="font-medium">Tương tác cộng đồng</p>
                                    <p className="text-sm text-gray-600">Thông báo khi có bình luận hoặc thích</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                Bật
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

