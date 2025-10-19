import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import { BookOpen, User, LogOut, Home, GraduationCap, Trophy, MessageSquare, TrendingUp, Bell } from 'lucide-react'

export function Layout() {
    const location = useLocation()
    const { user, isAuthenticated, logout } = useAuthStore()

    const navigation = [
        { name: 'Trang chủ', href: '/', icon: Home },
        { name: 'Bài học', href: '/lessons', icon: BookOpen },
        { name: 'Thành tích', href: '/achievements', icon: Trophy },
        { name: 'Cộng đồng', href: '/community', icon: MessageSquare },
        { name: 'Xếp hạng', href: '/leaderboard', icon: TrendingUp },
        { name: 'Thông báo', href: '/notifications', icon: Bell },
        { name: 'Tài khoản', href: '/account', icon: User },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <GraduationCap className="h-8 w-8 text-blue-600" />
                                <h1 className="text-xl font-bold text-gray-900">English Learning</h1>
                            </div>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                const isActive = location.pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{item.name}</span>
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="flex items-center space-x-4">
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center space-x-2">
                                        <div className="text-sm">
                                            <p className="font-medium text-gray-900">{user?.name}</p>
                                            <p className="text-gray-500">Level: {user?.level}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={logout}>
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Đăng xuất
                                    </Button>
                                </>
                            ) : (
                                <Link to="/login">
                                    <Button size="sm">Đăng nhập</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center text-gray-500 text-sm">
                        <p>&copy; 2024 English Learning App. Học tiếng Anh hiệu quả.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
