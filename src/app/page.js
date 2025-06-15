'use client';

import { useState, useEffect } from 'react';
import { FilmIcon, LinkIcon, SparklesIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import VideoPlayer from '../components/VideoPlayer';
import CaptionEditor from '../components/CaptionEditor';
import VideoDownloader from '../components/VideoDownloader';

export default function Home() {
  // State for video URL input
  const [videoUrl, setVideoUrl] = useState('');
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  // State for captions management
  const [captions, setCaptions] = useState([]);
  const [videoDuration, setVideoDuration] = useState(0);

  // State for UI feedback
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [videoError, setVideoError] = useState('');

  // State for collapsible instructions
  const [showInstructions, setShowInstructions] = useState(false);

  // Function to load a new video
  const handleLoadVideo = () => {
    if (!videoUrl.trim()) {
      alert('Please enter a video URL');
      return;
    }

    setIsLoadingVideo(true);
    setVideoError('');

    // Create a temporary video element to validate the URL
    const tempVideo = document.createElement('video');

    tempVideo.onloadedmetadata = () => {
      setCurrentVideoUrl(videoUrl);
      setVideoDuration(tempVideo.duration);
      setIsLoadingVideo(false);
      // Clear existing captions when loading new video
      setCaptions([]);
    };

    tempVideo.onerror = () => {
      setVideoError('Failed to load video. Please check the URL and try again.');
      setIsLoadingVideo(false);
    };

    tempVideo.src = videoUrl;
  };

  // Function to handle captions changes
  const handleCaptionsChange = (newCaptions) => {
    setCaptions(newCaptions);
  };

  // Function to load sample video (only when user clicks the button)
  const handleUseSampleVideo = () => {
    const sampleVideoUrl = '/sample-video.mp4';
    setVideoUrl(sampleVideoUrl);

    // Load the sample video immediately
    setIsLoadingVideo(true);
    setVideoError('');

    const tempVideo = document.createElement('video');

    tempVideo.onloadedmetadata = () => {
      setCurrentVideoUrl(sampleVideoUrl);
      setVideoDuration(tempVideo.duration);
      setIsLoadingVideo(false);
      // Clear existing captions when loading new video
      setCaptions([]);
    };

    tempVideo.onerror = () => {
      setVideoError('Failed to load sample video.');
      setIsLoadingVideo(false);
    };

    tempVideo.src = sampleVideoUrl;
  };

  // Function to load sample captions for demonstration
  const loadSampleCaptions = () => {
    if (!currentVideoUrl) {
      alert('Please load a video first');
      return;
    }

    const sampleCaptions = [
      {
        id: 1,
        text: "Welcome to our video captioning demo!",
        startTime: "0",
        endTime: "3"
      },
      {
        id: 2,
        text: "This is a sample caption to show how the system works.",
        startTime: "4",
        endTime: "8"
      },
      {
        id: 3,
        text: "You can add, edit, and delete captions with precise timing.",
        startTime: "9",
        endTime: "13"
      }
    ];

    setCaptions(sampleCaptions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FilmIcon className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Video Caption Studio</h1>
                <p className="text-gray-600 text-sm">Add captions to your videos with precise timing</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <SparklesIcon className="w-4 h-4 mr-1" />
                Professional Quality
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Collapsible How to Use Instructions */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 overflow-hidden">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2 text-blue-500" />
                How to Use Video Caption Studio
              </h3>
              {showInstructions ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {showInstructions && (
              <div className="px-6 pb-6">
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                    <div>
                      <strong>Load a Video:</strong> Enter a video URL in the input field below or click &ldquo;Use Sample Video&rdquo; to test with the provided demo video.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                    <div>
                      <strong>Add Captions:</strong> Use the Caption Editor to add text with precise start and end timestamps. Use the ▲▼ buttons for fine-tuned timing control.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                    <div>
                      <strong>Watch with Captions:</strong> Play your video to see captions appear at the exact right time. Use the draggable progress bar to navigate through the video.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0 font-semibold">4</span>
                    <div>
                      <strong>Edit & Manage:</strong> Edit or delete individual captions as needed. Use &ldquo;Delete All&rdquo; to clear all captions at once. The system prevents overlapping timelines.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0 font-semibold">5</span>
                    <div>
                      <strong>Download:</strong> Export your captions as SRT/VTT files or create a video with burned-in captions for permanent embedding.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0 font-semibold">💡</span>
                    <div>
                      <strong>Pro Tips:</strong> Captions cannot overlap in time. Drag the red progress bar for smooth video navigation. The caption list scrolls automatically after 5 entries.
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Video URL Input Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <LinkIcon className="w-5 h-5 mr-2 text-blue-500" />
              Video Source
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter video URL (e.g., https://example.com/video.mp4)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleLoadVideo()}
                />

                {videoError && (
                  <p className="text-red-500 text-sm mt-2">{videoError}</p>
                )}
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={handleLoadVideo}
                  disabled={isLoadingVideo}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingVideo ? 'Loading...' : 'Load Video'}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={handleUseSampleVideo}
                className="text-sm px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                Use Sample Video
              </button>

              {currentVideoUrl && (
                <button
                  onClick={loadSampleCaptions}
                  className="text-sm px-3 py-1.5 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                >
                  Load Sample Captions
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Video Player and Caption Editor Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* Video Player Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FilmIcon className="w-5 h-5 mr-2 text-blue-500" />
                Video Player
              </h2>

              <VideoPlayer
                videoUrl={currentVideoUrl}
                captions={captions}
              />

              {currentVideoUrl && videoDuration > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Video Duration:</strong> {Math.floor(videoDuration / 60)}:{(Math.floor(videoDuration % 60)).toString().padStart(2, '0')}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    <strong>Active Captions:</strong> {captions.length}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Caption Editor Section */}
          <div className="space-y-6">
            <CaptionEditor
              captions={captions}
              onCaptionsChange={handleCaptionsChange}
              videoDuration={videoDuration}
            />

            {/* Video Downloader */}
            <VideoDownloader
              videoUrl={currentVideoUrl}
              captions={captions}
              videoDuration={videoDuration}
            />

            {/* Caption Statistics */}
            {captions.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Caption Statistics</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{captions.length}</div>
                    <div className="text-sm text-blue-700">Total Captions</div>
                  </div>

                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {captions.reduce((total, caption) =>
                        total + (parseFloat(caption.endTime) - parseFloat(caption.startTime)), 0
                      ).toFixed(1)}s
                    </div>
                    <div className="text-sm text-green-700">Caption Duration</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">
                    <strong>Coverage:</strong> {videoDuration > 0 ?
                      Math.round((captions.reduce((total, caption) =>
                        total + (parseFloat(caption.endTime) - parseFloat(caption.startTime)), 0
                      ) / videoDuration) * 100) : 0}% of video
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p className="text-sm">Built with Next.js, React, and Tailwind CSS</p>
            <p className="text-xs mt-2">Video Caption Studio - Professional captioning made simple</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
