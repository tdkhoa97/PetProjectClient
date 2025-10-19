# English Learning App

Ứng dụng học tiếng Anh được xây dựng với React 18, Vite, TypeScript và các công nghệ hiện đại.

## 🚀 Công nghệ sử dụng

- **React 18** - Framework UI hiện đại với TypeScript
- **Vite** - Build tool nhanh và hiệu quả
- **TypeScript** - Type safety và developer experience tốt hơn
- **Zustand** - State management đơn giản và hiệu quả với TypeScript
- **TanStack Query (React Query)** - Data fetching và caching
- **Shadcn UI** - Component library đẹp và accessible
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **ESLint** - Code linting với TypeScript rules
- **JSON Server** - Mock API server cho development

## 📁 Cấu trúc dự án

```
src/
├── components/          # Components tái sử dụng
│   ├── ui/             # Shadcn UI components với TypeScript
│   ├── Layout.tsx      # Layout chính
│   └── ProtectedRoute.tsx
├── pages/              # Các trang của ứng dụng
│   ├── HomePage.tsx    # Trang chủ
│   ├── AccountPage.tsx # Quản lý tài khoản
│   ├── LoginPage.tsx   # Đăng nhập
│   ├── LessonsPage.tsx # Danh sách bài học
│   ├── LessonDetailPage.tsx # Chi tiết bài học
│   ├── AchievementsPage.tsx # Thành tích
│   ├── CommunityPage.tsx # Cộng đồng
│   ├── PostDetailPage.tsx # Chi tiết bài viết
│   ├── LeaderboardPage.tsx # Bảng xếp hạng
│   └── NotificationsPage.tsx # Thông báo
├── stores/             # Zustand stores với TypeScript
│   ├── authStore.ts    # Quản lý authentication
│   ├── learningStore.ts # Quản lý học tập
│   └── achievementStore.ts # Quản lý thành tích
├── hooks/              # Custom hooks với TypeScript
│   └── useApi.ts       # API hooks với React Query
├── providers/          # Context providers
│   └── QueryProvider.tsx
├── types/              # TypeScript type definitions
│   └── index.ts        # Global types
├── constants/          # Application constants
│   └── index.ts        # App constants
├── lib/                # Utilities với TypeScript
│   └── utils.ts        # Helper functions
├── App.tsx             # App component chính
├── main.tsx            # Entry point
├── vite-env.d.ts       # Vite type definitions
└── index.css           # Global styles
```

## 🛠️ Cài đặt và chạy

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Chạy development server:**
```bash
npm run dev
```

3. **Build cho production:**
```bash
npm run build
```

4. **Preview build:**
```bash
npm run preview
```

## ✨ Tính năng chính

### 🏠 Trang chủ
- Dashboard với thống kê học tập
- Hiển thị tiến độ học tập
- Hoạt động gần đây
- Cộng đồng học tập

### 👤 Quản lý tài khoản
- Xem và chỉnh sửa thông tin cá nhân
- Thống kê học tập chi tiết
- Cài đặt mục tiêu học tập
- Lịch sử hoạt động

### 📚 Bài học
- Danh sách bài học với nhiều cấp độ
- Theo dõi tiến độ từng bài học
- Hệ thống đánh giá độ khó
- Mẹo học hiệu quả
- **Tính năng học tập nâng cao:**
  - Chế độ học từ với phát âm
  - Chế độ kiểm tra trắc nghiệm
  - Chế độ ôn tập
  - Theo dõi tiến độ chi tiết

### 🏆 Hệ thống thành tích
- Thu thập thành tích và huy hiệu
- Hệ thống điểm số và xếp hạng
- Thông báo khi đạt thành tích
- Phân loại thành tích theo độ hiếm

### 👥 Cộng đồng học tập
- Forum thảo luận và chia sẻ kinh nghiệm
- Tạo và tương tác với bài viết
- Hệ thống bình luận và thích
- Tìm kiếm và lọc bài viết theo danh mục

### 📊 Bảng xếp hạng
- Xếp hạng theo tổng điểm, tuần, tháng
- Hiển thị vị trí của người dùng
- Thống kê điểm số và thành tích
- Mẹo để lên top

### 🔔 Hệ thống thông báo
- Thông báo thành tích và tiến độ
- Cài đặt loại thông báo muốn nhận
- Đánh dấu đã đọc và quản lý thông báo

### 🔐 Authentication
- Đăng nhập/đăng xuất
- Bảo vệ routes
- Quản lý session với Zustand persist

## 🎨 UI/UX Features

- **Responsive Design** - Tương thích mọi thiết bị
- **Dark/Light Mode** - Hỗ trợ chế độ tối/sáng
- **Accessibility** - Tuân thủ WCAG guidelines
- **Modern Design** - Giao diện đẹp với Tailwind CSS
- **Smooth Animations** - Hiệu ứng mượt mà

## 🔧 State Management

### Auth Store (Zustand)
- Quản lý trạng thái đăng nhập
- Thông tin người dùng
- Persist data với localStorage

### Learning Store (Zustand)
- Quản lý bài học và từ vựng
- Theo dõi tiến độ học tập
- Cài đặt mục tiêu

## 📡 API Integration

- **React Query** cho data fetching
- **Axios** cho HTTP requests
- **Optimistic Updates** cho UX tốt hơn
- **Error Handling** và retry logic

## 🚀 Performance

- **Code Splitting** với React.lazy
- **Tree Shaking** với Vite
- **Bundle Optimization**
- **Lazy Loading** components

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly interactions
- Optimized cho mobile devices

## 🔒 Security

- Protected routes
- Input validation
- XSS protection
- CSRF protection ready

## 🔧 TypeScript Features

- **Type Safety** - Đầy đủ type definitions cho tất cả components và functions
- **Global Types** - Centralized type definitions trong `src/types/`
- **Constants** - Type-safe constants và enums
- **Utility Functions** - Helper functions với proper typing
- **ESLint Rules** - TypeScript-specific linting rules
- **Vite Integration** - Seamless TypeScript support với Vite
- **API Types** - Type-safe API calls và responses
- **Store Types** - Zustand stores với proper TypeScript typing

## 🧪 Testing Ready

- TypeScript cho type safety
- Component structure tối ưu cho testing
- Mock data sẵn sàng
- Test utilities có thể thêm

## 📈 Scalability

- Modular architecture
- Reusable components
- Clean code structure
- Easy to extend

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Project Link: [https://github.com/yourusername/english-learning-app](https://github.com/yourusername/english-learning-app)

---

**Happy Learning! 🎓**
