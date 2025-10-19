import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryProvider } from '@/providers/QueryProvider'
import { Layout } from '@/components/Layout'
import { HomePage } from '@/pages/HomePage'
import { AccountPage } from '@/pages/AccountPage'
import { LoginPage } from '@/pages/LoginPage'
import { LessonsPage } from '@/pages/LessonsPage'
import { AchievementsPage } from '@/pages/AchievementsPage'
import { CommunityPage } from '@/pages/CommunityPage'
import { PostDetailPage } from '@/pages/PostDetailPage'
import { LeaderboardPage } from '@/pages/LeaderboardPage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { LessonDetailPage } from '@/pages/LessonDetailPage'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'lessons',
                element: <LessonsPage />,
            },
            {
                path: 'lessons/:id',
                element: <LessonDetailPage />,
            },
            {
                path: 'achievements',
                element: (
                    <ProtectedRoute>
                        <AchievementsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'community',
                element: <CommunityPage />,
            },
            {
                path: 'community/:id',
                element: <PostDetailPage />,
            },
            {
                path: 'leaderboard',
                element: <LeaderboardPage />,
            },
            {
                path: 'notifications',
                element: (
                    <ProtectedRoute>
                        <NotificationsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'account',
                element: (
                    <ProtectedRoute>
                        <AccountPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
])

export default function App() {
    return (
        <QueryProvider>
            <RouterProvider router={router} />
        </QueryProvider>
    )
}
