# হাদিস বাংলা | Bengali Hadith API

<div align="center">

![Bengali Hadith](https://img.shields.io/badge/Bengali-Hadith-green?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A comprehensive Bengali Hadith collection with modern web interface**

[🚀 Live Demo](https://mahfuz4223.github.io/bangla-hadith-api) | [📚 API Docs](#api-documentation) | [🛠️ Installation](#installation)

</div>

## 🌟 Features

### 📚 **Comprehensive Hadith Collection**
- **6 Major Hadith Books**: Sahih Bukhari, Sahih Muslim, Sunan Abu Dawood, Jami at-Tirmidhi, Sunan an-Nasa'i, Sunan Ibn Majah
- **Complete Bengali Translation** with original Arabic text
- **30,000+ Hadiths** with authentic sources and references
- **Chapter-wise Organization** for easy navigation

### 🔍 **Advanced Search System**
- **Smart Search**: Search in Bengali, Arabic, or by topics
- **Filter Options**: By book, chapter, authenticity, and narrator
- **Real-time Results** with highlighting
- **Voice Search** support (planned)

### 🎨 **Modern User Interface**
- **Clean & Responsive Design** optimized for all devices
- **Dark/Light Theme** with automatic switching
- **Bengali Typography** with multiple font options (Noto Sans Bengali, Kalpurush, SolaimanLipi)
- **Progressive Web App** for offline reading

### 🌐 **Developer-Friendly API**
- **RESTful API** with JSON responses
- **Free to Use** with no rate limits
- **CORS Enabled** for web applications
- **Comprehensive Documentation**

### ⚡ **Performance & Accessibility**
- **Fast Loading** with optimized caching
- **Offline Support** through service workers
- **Screen Reader Compatible**
- **Keyboard Navigation** support

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/mahfuz4223/bangla-hadith-api.git

# Navigate to project directory
cd bangla-hadith-api

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development
- **Tailwind CSS** for responsive styling
- **shadcn/ui** for beautiful UI components
- **Lucide Icons** for consistent iconography

### Data & Search
- **FlexSearch** for advanced search capabilities
- **JSON API** for hadith data delivery
- **Service Workers** for offline functionality
- **LocalStorage** for user preferences

### Development Tools
- **ESLint** & **Prettier** for code quality
- **TypeScript** for better development experience
- **Git** for version control
- **GitHub Actions** for CI/CD (planned)

## 📖 API Documentation

### Base URL
```
https://cdn.jsdelivr.net/npm/hadithbangla@latest/data/
```

### Available Endpoints

#### Get All Books
```http
GET /books.json
```

#### Get Book Details
```http
GET /{book-slug}/info.json
```

#### Get Hadith by Chapter
```http
GET /{book-slug}/chapters/{chapter-number}.json
```

#### Example Response
```json
{
  "book": "bukhari",
  "chapter": 1,
  "hadiths": [
    {
      "id": 1,
      "arabic": "عن عمر بن الخطاب...",
      "bengali": "হযরত উমর ইবনুল খাত্তাব...",
      "narrator": "উমর ইবনুল খাত্তাব (রাঃ)",
      "grade": "সহীহ"
    }
  ]
}
```

## 📱 Features In Detail

### 🔍 Search System
- **Multi-language Support**: Search in Bengali, Arabic, or English
- **Advanced Filters**: Filter by book, chapter, narrator, or authenticity
- **Smart Suggestions**: Auto-complete and typo tolerance
- **Bookmarking**: Save favorite hadiths for later reading

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Theme Switching**: Light, dark, and sepia reading modes
- **Font Customization**: Choose from multiple Bengali fonts
- **Reading Progress**: Track your reading journey

### 📚 Content Organization
- **Chapter Navigation**: Browse hadiths by chapters and topics
- **Book Overview**: Quick access to all 6 major hadith collections
- **Daily Hadith**: Get a new hadith recommendation every day
- **Random Hadith**: Discover hadiths through random exploration

## 🎯 Roadmap

### Version 1.1 (Upcoming)
- [ ] **User Accounts** with sync across devices
- [ ] **Audio Recitation** for Arabic text
- [ ] **Bookmarks & Collections** system
- [ ] **Social Sharing** with beautiful cards
- [ ] **Offline Download** for complete books

### Version 1.2 (Planned)
- [ ] **Search in Arabic** with diacritics support
- [ ] **Advanced Analytics** for reading habits
- [ ] **Multiple Translations** support
- [ ] **Community Features** and discussions
- [ ] **Mobile Apps** for Android and iOS

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hadith Data Source**: [md-rifatkhan/hadithbangla](https://github.com/md-rifatkhan/hadithbangla)
- **Islamic Scholars** for preserving and translating these valuable texts
- **Open Source Community** for the amazing tools and libraries

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/mahfuz4223/bangla-hadith-api/issues)
- **Discussions**: [Join community discussions](https://github.com/mahfuz4223/bangla-hadith-api/discussions)

---

<div align="center">

**Made with ❤️ for the Bengali Muslim Community**

[⭐ Star this repository](https://github.com/mahfuz4223/bangla-hadith-api) | [🍴 Fork it](https://github.com/mahfuz4223/bangla-hadith-api/fork) | [📢 Share it](https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20Bengali%20Hadith%20API%20and%20web%20app!&url=https://github.com/mahfuz4223/bangla-hadith-api)

</div>
