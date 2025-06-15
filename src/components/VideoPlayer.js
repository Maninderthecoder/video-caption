'use client';

import { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

export default function VideoPlayer({ videoUrl, captions }) {
    // State for video player controls
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setVideoDuration] = useState(0);
    const [currentCaption, setCurrentCaption] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    // Ref for video element to control playback
    const videoRef = useRef(null);
    const progressBarRef = useRef(null);

    // Effect to update current time and find active caption
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => {
            if (!isDragging) { // Only update if not dragging
                setCurrentTime(video.currentTime);
            }

            // Update duration if it has changed
            if (video.duration && video.duration !== duration) {
                setVideoDuration(video.duration);
            }

            // Find the current caption based on timestamp
            const activeCaption = captions.find(caption => {
                const startTime = parseFloat(caption.startTime);
                const endTime = parseFloat(caption.endTime);
                return video.currentTime >= startTime && video.currentTime <= endTime;
            });

            setCurrentCaption(activeCaption ? activeCaption.text : '');
        };

        const handleLoadedMetadata = () => {
            setVideoDuration(video.duration);
        };

        // Event listeners for video events
        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('durationchange', handleLoadedMetadata);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('durationchange', handleLoadedMetadata);
        };
    }, [captions, duration, isDragging]);

    // Function to toggle play/pause
    const togglePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Function to calculate time from mouse position
    const getTimeFromMousePosition = (e) => {
        const progressBar = progressBarRef.current;
        if (!progressBar || !duration) return 0;

        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickPercent = Math.max(0, Math.min(1, clickX / rect.width));
        return clickPercent * duration;
    };

    // Function to seek to specific time
    const handleSeek = (e) => {
        const video = videoRef.current;
        if (!video || !duration) return;

        const newTime = getTimeFromMousePosition(e);
        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // Mouse drag functionality
    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleSeek(e);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const video = videoRef.current;
        if (!video || !duration) return;

        const newTime = getTimeFromMousePosition(e);
        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Add global mouse event listeners for dragging
    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (isDragging) {
                handleMouseMove(e);
            }
        };

        const handleGlobalMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
            }
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging]);

    // Function to format time display
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Calculate progress percentage
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    // If no video URL is provided, show placeholder
    if (!videoUrl) {
        return (
            <div className="w-full h-64 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                        <PlayIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">Enter a video URL to get started</p>
                    <p className="text-gray-400 text-sm mt-1">Your video will appear here</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full">
            {/* Video Container with Caption Overlay */}
            <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-64 md:h-96 object-contain"
                    onClick={togglePlayPause}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />

                {/* Caption Overlay */}
                {currentCaption && (
                    <div className="absolute bottom-16 left-4 right-4 flex justify-center">
                        <div className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg text-center max-w-full">
                            <p className="text-sm md:text-base font-medium leading-relaxed">
                                {currentCaption}
                            </p>
                        </div>
                    </div>
                )}

                {/* Play/Pause Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={togglePlayPause}
                        className="bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 transition-colors"
                    >
                        {isPlaying ? (
                            <PauseIcon className="w-8 h-8" />
                        ) : (
                            <PlayIcon className="w-8 h-8" />
                        )}
                    </button>
                </div>
            </div>

            {/* Video Controls */}
            <div className="mt-4 space-y-3">
                {/* Progress Bar - Draggable */}
                <div className="relative">
                    <div
                        ref={progressBarRef}
                        className="relative w-full bg-gray-300 rounded-full cursor-pointer transition-all duration-200 h-2"
                        onMouseDown={handleMouseDown}
                    >
                        {/* Progress track */}
                        <div
                            className="h-full bg-red-500 rounded-full transition-all duration-150 relative"
                            style={{ width: `${progressPercentage}%` }}
                        >
                            {/* Circular handle/thumb */}
                            <div
                                className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full transition-all duration-200 ${isDragging ? 'scale-125 shadow-lg' : ''
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                {/* Control Buttons and Time Display */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={togglePlayPause}
                        className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                    >
                        {isPlaying ? (
                            <PauseIcon className="w-6 h-6" />
                        ) : (
                            <PlayIcon className="w-6 h-6 ml-0.5" />
                        )}
                    </button>

                    <div className="text-sm font-medium text-gray-600">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>
            </div>
        </div>
    );
} 