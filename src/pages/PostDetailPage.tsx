import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { usePost, useComments, useCreateComment, useLikePost } from '@/hooks/useApi'
import { useAuthStore } from '@/stores/authStore'
import {
    ArrowLeft,
    Heart,
    MessageCircle,
    Clock,
    Tag,
    User,
    Send
} from 'lucide-react'

export function PostDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuthStore()
    const { data: post, isLoading: postLoading } = usePost(id || '')
    const { data: comments = [], isLoading: commentsLoading } = useComments(id || '')
    const createCommentMutation = useCreateComment()
    const likePostMutation = useLikePost()
    const [newComment, setNewComment] = useState('')

    const handleCreateComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user || !id || !newComment.trim()) return

        try {
            await createCommentMutation.mutateAsync({
                postId: id,
                userId: user.id,
                content: newComment.trim()
            })
            setNewComment('')
        } catch (error) {
            console.error('Error creating comment:', error)
        }
    }

    const handleLikePost = async () => {
        if (!id) return
        try {
            await likePostMutation.mutateAsync(id)
        } catch (error) {
            console.error('Error liking post:', error)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (postLoading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Đang tải...</p>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h2>
                <Link to="/community">
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Quay lại cộng đồng
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Back Button */}
            <Link to="/community">
                <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Quay lại cộng đồng
                </Button>
            </Link>

            {/* Post Content */}
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <CardTitle className="text-2xl">{post.title}</CardTitle>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <User className="h-4 w-4" />
                                    <span>Người dùng {post.userId}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatDate(post.createdAt)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Heart className="h-4 w-4" />
                                    <span>{post.likes} thích</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <MessageCircle className="h-4 w-4" />
                                    <span>{post.comments} bình luận</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            {post.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-6 border-t">
                        <Button
                            onClick={handleLikePost}
                            disabled={likePostMutation.isPending}
                            className="flex items-center space-x-2"
                        >
                            <Heart className="h-4 w-4" />
                            <span>Thích ({post.likes})</span>
                        </Button>

                        <div className="text-sm text-gray-500">
                            Được tạo lúc {formatDate(post.createdAt)}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <MessageCircle className="h-5 w-5" />
                        <span>Bình luận ({comments.length})</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Comment Form */}
                    {user && (
                        <form onSubmit={handleCreateComment} className="space-y-4">
                            <div>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Viết bình luận của bạn..."
                                    className="w-full h-24 px-3 py-2 border border-input bg-background rounded-md text-sm resize-none"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={createCommentMutation.isPending || !newComment.trim()}
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    {createCommentMutation.isPending ? 'Đang gửi...' : 'Gửi bình luận'}
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Comments List */}
                    {commentsLoading ? (
                        <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-2 text-sm text-gray-600">Đang tải bình luận...</p>
                        </div>
                    ) : comments.length > 0 ? (
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex space-x-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <User className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-medium text-sm">Người dùng {comment.userId}</span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(comment.createdAt)}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

