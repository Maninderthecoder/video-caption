# Video Caption Studio

A modern, responsive web application for adding captions to videos with precise timestamps. Built with Next.js 15, React 19, and Tailwind CSS.

![Video Caption Studio](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)

## 🎯 Features

### Core Functionality

- **Video URL Input**: Support for any video URL or local files
- **Precise Timing**: Add captions with start and end timestamps (supports decimal precision)
- **Real-time Preview**: Watch captions appear and disappear at the exact right time
- **Full Video Controls**: Play, pause, seek, and progress tracking
- **Caption Management**: Add, edit, delete, and reorder captions

### User Experience

- **Beautiful UI**: Modern, clean design with smooth animations
- **Mobile Responsive**: Fully optimized for mobile devices and tablets
- **Intuitive Interface**: Easy-to-use caption editor with validation
- **Quick Actions**: Sample video and caption loading for quick testing
- **Statistics Dashboard**: Track caption coverage and duration

### Technical Features

- **Client-side Processing**: No server required for basic functionality
- **Real-time Updates**: Instant caption synchronization with video playback
- **Error Handling**: Comprehensive validation and user feedback
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Performance Optimized**: Efficient video handling and state management

## 🚀 Quick Start

### Prerequisites

- Node.js (16.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd video-caption
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 How to Use

### Getting Started

1. **Load a Video**: Enter a video URL in the input field or use the sample video provided
2. **Add Captions**: Use the caption editor to add text with start and end timestamps
3. **Preview**: Watch your video with captions appearing at the specified times
4. **Edit & Refine**: Modify captions, adjust timing, or delete unwanted entries

### Video Sources

- **URL Videos**: Any publicly accessible video URL (MP4, WebM, etc.)
- **Sample Video**: Use `/sample-video.mp4` for testing (provided in the project)
- **Local Files**: Place video files in the `public` folder and reference them

### Caption Editor

- **Text Input**: Add your caption text in the text area
- **Start Time**: Enter the time (in seconds) when the caption should appear
- **End Time**: Enter the time (in seconds) when the caption should disappear
- **Validation**: The system validates timing to prevent overlaps and errors

## 🏗️ Technical Architecture

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Main application page
│   └── globals.css        # Global styles
└── components/            # React components
    ├── VideoPlayer.js     # Video player with caption overlay
    └── CaptionEditor.js   # Caption management interface
```

### Key Components

#### VideoPlayer Component

- **Video Controls**: Custom play/pause, seek, and progress tracking
- **Caption Overlay**: Dynamic caption display synchronized with video time
- **Responsive Design**: Adapts to different screen sizes
- **Event Handling**: Manages video events and state updates

#### CaptionEditor Component

- **Form Management**: Add new captions with validation
- **Edit Mode**: In-line editing of existing captions
- **Data Management**: CRUD operations for caption data
- **User Feedback**: Error messages and success indicators

#### Main Application (page.js)

- **State Management**: Centralized state for video and captions
- **URL Validation**: Checks video URLs before loading
- **Sample Data**: Provides demo content for testing
- **Statistics**: Calculates caption coverage and metrics

## 🎨 Design Decisions

### UI/UX Choices

- **Color Scheme**: Blue and purple gradient for a modern, professional look
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Generous whitespace for better readability
- **Mobile-First**: Responsive design that works on all devices

### Technical Decisions

- **Client-Side Architecture**: No backend required for core functionality
- **React Hooks**: Modern state management with useState and useEffect
- **Tailwind CSS**: Utility-first CSS for rapid development and consistency
- **Component Architecture**: Modular, reusable components
- **ES6 Modules**: Modern JavaScript with import/export syntax

### Performance Optimizations

- **Efficient Re-renders**: Proper use of React hooks to minimize updates
- **Event Cleanup**: Proper cleanup of video event listeners
- **Debounced Updates**: Smooth video time tracking without excessive updates
- **Lazy Loading**: Components load only when needed

## 🛠️ Edge Cases & Error Handling

### Video Loading

- **Invalid URLs**: User-friendly error messages for broken video links
- **Network Issues**: Graceful handling of connection problems
- **Format Support**: Clear feedback for unsupported video formats
- **Loading States**: Visual indicators during video loading

### Caption Management

- **Time Validation**: Prevents invalid start/end time combinations
- **Duration Limits**: Respects video duration boundaries
- **Text Validation**: Ensures caption text is not empty
- **Overlap Detection**: Warns about overlapping caption times

### User Interface

- **Mobile Responsiveness**: Layout adapts to small screens
- **Touch Support**: Proper touch event handling for mobile devices
- **Keyboard Navigation**: Supports keyboard shortcuts and navigation
- **Screen Readers**: Accessible markup for assistive technologies

## 🚀 Future Enhancements

### Planned Features

- **Export Options**: Save captions as SRT, VTT, or JSON files
- **Import Support**: Load existing caption files
- **Drag & Drop**: Upload videos directly to the application
- **Auto-sync**: Automatic caption timing adjustment
- **Collaboration**: Multi-user caption editing
- **Templates**: Pre-built caption styles and formats

### Technical Improvements

- **Backend Integration**: Server-side caption storage and processing
- **Real-time Collaboration**: WebSocket-based multi-user editing
- **Advanced Validation**: More sophisticated timing conflict detection
- **Video Processing**: Automatic speech recognition for caption generation
- **Cloud Storage**: Integration with cloud video platforms

## 📱 Mobile Experience

The application is fully optimized for mobile devices:

- **Responsive Layout**: Adapts to all screen sizes
- **Touch Controls**: Intuitive touch interface for video controls
- **Mobile-First Design**: Designed for mobile, enhanced for desktop
- **Fast Loading**: Optimized for mobile network conditions
- **Offline Support**: Core functionality works without internet (for local videos)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Environment Setup

The project uses Next.js 15 with the App Router and includes:

- **Automatic Hot Reloading**: Changes reflect immediately during development
- **Built-in Optimization**: Automatic code splitting and optimization
- **TypeScript Support**: Ready for TypeScript if needed
- **ESLint Integration**: Code quality enforcement

## 📄 License

This project is built as an assignment submission and is available for educational purposes.

## 🤝 Contributing

This is an assignment project, but feedback and suggestions are welcome for future improvements.

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
