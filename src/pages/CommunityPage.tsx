import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { usePosts, useCreatePost, useLikePost } from '@/hooks/useApi'
import { useAuthStore } from '@/stores/authStore'
import {
    MessageSquare,
    Heart,
    MessageCircle,
    Plus,
    Search,
    Filter,
    TrendingUp,
    Users,
    Clock,
    Tag
} from 'lucide-react'

export function CommunityPage() {
    const { user } = useAuthStore()
    const { data: posts = [], isLoading } = usePosts()
    const createPostMutation = useCreatePost()
    const likePostMutation = useLikePost()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [showCreatePost, setShowCreatePost] = useState(false)
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        category: 'general',
        tags: ''
    })

    const categories = [
        { value: '', label: 'Tất cả' },
        { value: 'tips', label: 'Mẹo học tập' },
        { value: 'routine', label: 'Thói quen học' },
        { value: 'resources', label: 'Tài liệu' },
        { value: 'general', label: 'Thảo luận chung' },
        { value: 'questions', label: 'Câu hỏi' }
    ]

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesCategory = !selectedCategory || post.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        try {
            await createPostMutation.mutateAsync({
                userId: user.id,
                title: newPost.title,
                content: newPost.content,
                category: newPost.category,
                tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            })

            setNewPost({ title: '', content: '', category: 'general', tags: '' })
            setShowCreatePost(false)
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    const handleLikePost = async (postId: string) => {
        try {
            await likePostMutation.mutateAsync(postId)
        } catch (error) {
            console.error('Error liking post:', error)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    Cộng đồng học tập
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Kết nối với những người học khác, chia sẻ kinh nghiệm và học hỏi lẫn nhau
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <MessageSquare className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                                <p className="text-sm text-gray-600">Bài viết</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">1,234</p>
                                <p className="text-sm text-gray-600">Thành viên</p>
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
                                <p className="text-2xl font-bold text-gray-900">5,678</p>
                                <p className="text-sm text-gray-600">Tương tác</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Tìm kiếm bài viết..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                            >
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                            {user && (
                                <Button onClick={() => setShowCreatePost(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Tạo bài viết
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Create Post Modal */}
            {showCreatePost && (
                <Card>
                    <CardHeader>
                        <CardTitle>Tạo bài viết mới</CardTitle>
                        <CardDescription>
                            Chia sẻ kinh nghiệm học tập của bạn với cộng đồng
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Tiêu đề</label>
                                <Input
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    placeholder="Nhập tiêu đề bài viết..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Nội dung</label>
                                <textarea
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    placeholder="Viết nội dung bài viết..."
                                    className="w-full h-32 px-3 py-2 border border-input bg-background rounded-md text-sm resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Danh mục</label>
                                    <select
                                        value={newPost.category}
                                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                                    >
                                        {categories.slice(1).map(category => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Tags (cách nhau bởi dấu phẩy)</label>
                                    <Input
                                        value={newPost.tags}
                                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                        placeholder="ví dụ: vocabulary, tips, grammar"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <Button type="submit" disabled={createPostMutation.isPending}>
                                    {createPostMutation.isPending ? 'Đang tạo...' : 'Tạo bài viết'}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setShowCreatePost(false)}>
                                    Hủy
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Posts List */}
            <div className="space-y-6">
                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Đang tải...</p>
                    </div>
                ) : filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Card key={post.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <Link to={`/community/${post.id}`}>
                                            <CardTitle className="text-lg hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </CardTitle>
                                        </Link>
                                        <CardDescription className="mt-2 line-clamp-2">
                                            {post.content}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline">
                                        {categories.find(c => c.value === post.category)?.label || post.category}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{formatDate(post.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Heart className="h-4 w-4" />
                                            <span>{post.likes}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MessageCircle className="h-4 w-4" />
                                            <span>{post.comments}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {post.tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                <Tag className="h-3 w-3 mr-1" />
                                                {tag}
                                            </Badge>
                                        ))}
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleLikePost(post.id)}
                                            disabled={likePostMutation.isPending}
                                        >
                                            <Heart className="h-4 w-4 mr-1" />
                                            Thích
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="text-center py-12">
                            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Không tìm thấy bài viết nào
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Hãy thử thay đổi từ khóa tìm kiếm hoặc danh mục.
                            </p>
                            {user && (
                                <Button onClick={() => setShowCreatePost(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Tạo bài viết đầu tiên
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

