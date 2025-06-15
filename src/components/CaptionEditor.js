'use client';

import { useState } from 'react';
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CaptionEditor({ captions, onCaptionsChange, videoDuration }) {
    // State for adding new captions
    const [newCaption, setNewCaption] = useState({
        text: '',
        startTime: '',
        endTime: ''
    });

    // State for editing existing captions
    const [editingId, setEditingId] = useState(null);
    const [editingCaption, setEditingCaption] = useState({});

    // Function to check if new caption overlaps with existing ones
    const checkOverlap = (startTime, endTime, excludeId = null) => {
        const newStart = parseFloat(startTime);
        const newEnd = parseFloat(endTime);

        return captions.some(caption => {
            // Skip the caption being edited
            if (excludeId && caption.id === excludeId) return false;

            const existingStart = parseFloat(caption.startTime);
            const existingEnd = parseFloat(caption.endTime);

            // Check for any overlap
            return (newStart < existingEnd && newEnd > existingStart);
        });
    };

    // Function to add a new caption
    const handleAddCaption = () => {
        // Validate input fields
        if (!newCaption.text.trim()) {
            alert('Please enter caption text');
            return;
        }

        if (!newCaption.startTime || !newCaption.endTime) {
            alert('Please enter both start and end times');
            return;
        }

        const startTime = parseFloat(newCaption.startTime);
        const endTime = parseFloat(newCaption.endTime);

        // Validate time values
        if (startTime >= endTime) {
            alert('End time must be greater than start time');
            return;
        }

        if (startTime < 0 || (videoDuration > 0 && endTime > videoDuration)) {
            alert(`Times must be between 0 and ${Math.floor(videoDuration)} seconds`);
            return;
        }

        // Check for overlapping captions
        if (checkOverlap(startTime, endTime)) {
            alert('This caption overlaps with an existing caption. Please choose different start and end times.');
            return;
        }

        // Create new caption object
        const caption = {
            id: Date.now(), // Simple ID generation
            text: newCaption.text.trim(),
            startTime: startTime.toString(),
            endTime: endTime.toString()
        };

        // Add to captions array and sort by start time
        const updatedCaptions = [...captions, caption].sort((a, b) =>
            parseFloat(a.startTime) - parseFloat(b.startTime)
        );

        onCaptionsChange(updatedCaptions);

        // Reset form
        setNewCaption({ text: '', startTime: '', endTime: '' });
    };

    // Function to delete a caption
    const handleDeleteCaption = (id) => {
        if (confirm('Are you sure you want to delete this caption?')) {
            const updatedCaptions = captions.filter(caption => caption.id !== id);
            onCaptionsChange(updatedCaptions);
        }
    };

    // Function to delete all captions
    const handleDeleteAllCaptions = () => {
        if (captions.length === 0) {
            alert('No captions to delete');
            return;
        }

        if (confirm(`Are you sure you want to delete all ${captions.length} captions? This action cannot be undone.`)) {
            onCaptionsChange([]);
            // Also clear any ongoing edit
            setEditingId(null);
            setEditingCaption({});
        }
    };

    // Function to start editing a caption
    const handleStartEdit = (caption) => {
        setEditingId(caption.id);
        setEditingCaption({ ...caption });
    };

    // Function to save edited caption
    const handleSaveEdit = () => {
        // Validate edited caption
        if (!editingCaption.text.trim()) {
            alert('Please enter caption text');
            return;
        }

        const startTime = parseFloat(editingCaption.startTime);
        const endTime = parseFloat(editingCaption.endTime);

        if (startTime >= endTime) {
            alert('End time must be greater than start time');
            return;
        }

        if (startTime < 0 || (videoDuration > 0 && endTime > videoDuration)) {
            alert(`Times must be between 0 and ${Math.floor(videoDuration)} seconds`);
            return;
        }

        // Check for overlapping captions (excluding the current one being edited)
        if (checkOverlap(startTime, endTime, editingId)) {
            alert('This caption overlaps with another existing caption. Please choose different start and end times.');
            return;
        }

        // Update captions array
        const updatedCaptions = captions.map(caption =>
            caption.id === editingId
                ? { ...editingCaption, text: editingCaption.text.trim() }
                : caption
        ).sort((a, b) => parseFloat(a.startTime) - parseFloat(b.startTime));

        onCaptionsChange(updatedCaptions);

        // Reset editing state
        setEditingId(null);
        setEditingCaption({});
    };

    // Function to cancel editing
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingCaption({});
    };

    // Function to format time for display
    const formatTimeDisplay = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Helper function to increment/decrement time values with proper decimal handling
    const adjustTime = (currentValue, increment) => {
        const current = parseFloat(currentValue) || 0;
        const newValue = Math.max(0, current + increment);
        // Round to 1 decimal place to avoid floating point precision issues
        return Math.round(newValue * 10) / 10;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <PencilIcon className="w-6 h-6 mr-2 text-blue-500" />
                Caption Editor
            </h2>

            {/* Add New Caption Form */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Caption</h3>

                <div className="space-y-4">
                    {/* Caption Text Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Caption Text
                        </label>
                        <textarea
                            value={newCaption.text}
                            onChange={(e) => setNewCaption({ ...newCaption, text: e.target.value })}
                            placeholder="Enter your caption text here..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows="3"
                        />
                    </div>

                    {/* Time Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Start Time (seconds)
                            </label>
                            <div className="flex">
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max={videoDuration || undefined}
                                    value={newCaption.startTime}
                                    onChange={(e) => setNewCaption({ ...newCaption, startTime: e.target.value })}
                                    placeholder="0"
                                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="flex flex-col">
                                    <button
                                        type="button"
                                        onClick={() => setNewCaption({ ...newCaption, startTime: adjustTime(newCaption.startTime, 0.1).toString() })}
                                        className="px-2 py-1.5 bg-gray-200 border border-gray-300 border-l-0 rounded-tr-lg hover:bg-gray-300 text-xs"
                                    >
                                        ▲
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewCaption({ ...newCaption, startTime: adjustTime(newCaption.startTime, -0.1).toString() })}
                                        className="px-2 py-1.5 bg-gray-200 border border-gray-300 border-l-0 border-t-0 rounded-br-lg hover:bg-gray-300 text-xs"
                                    >
                                        ▼
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                End Time (seconds)
                            </label>
                            <div className="flex">
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max={videoDuration || undefined}
                                    value={newCaption.endTime}
                                    onChange={(e) => setNewCaption({ ...newCaption, endTime: e.target.value })}
                                    placeholder="5"
                                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="flex flex-col">
                                    <button
                                        type="button"
                                        onClick={() => setNewCaption({ ...newCaption, endTime: adjustTime(newCaption.endTime, 0.1).toString() })}
                                        className="px-2 py-1.5 bg-gray-200 border border-gray-300 border-l-0 rounded-tr-lg hover:bg-gray-300 text-xs"
                                    >
                                        ▲
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewCaption({ ...newCaption, endTime: adjustTime(newCaption.endTime, -0.1).toString() })}
                                        className="px-2 py-1.5 bg-gray-200 border border-gray-300 border-l-0 border-t-0 rounded-br-lg hover:bg-gray-300 text-xs"
                                    >
                                        ▼
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Button */}
                    <button
                        type="button"
                        onClick={handleAddCaption}
                        className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Add Caption
                    </button>
                </div>
            </div>

            {/* Captions List */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                        Current Captions ({captions.length})
                    </h3>

                    {captions.length > 0 && (
                        <button
                            type="button"
                            onClick={handleDeleteAllCaptions}
                            className="flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                            title="Delete all captions"
                        >
                            <TrashIcon className="w-4 h-4 mr-1" />
                            Delete All
                        </button>
                    )}
                </div>

                {captions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <PencilIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="font-medium">No captions added yet</p>
                        <p className="text-sm">Add your first caption above to get started</p>
                    </div>
                ) : (
                    <div
                        className="space-y-3 overflow-y-auto pr-2"
                        style={{ maxHeight: '420px' }} // Approximately 5 captions height (84px each)
                    >
                        {captions.map((caption) => (
                            <div
                                key={caption.id}
                                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                            >
                                {editingId === caption.id ? (
                                    // Edit Mode
                                    <div className="space-y-3">
                                        <textarea
                                            value={editingCaption.text}
                                            onChange={(e) => setEditingCaption({ ...editingCaption, text: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            rows="2"
                                        />

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex">
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={editingCaption.startTime}
                                                    onChange={(e) => setEditingCaption({ ...editingCaption, startTime: e.target.value })}
                                                    className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <div className="flex flex-col">
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingCaption({ ...editingCaption, startTime: adjustTime(editingCaption.startTime, 0.1).toString() })}
                                                        className="px-1.5 py-1 bg-gray-200 border border-gray-300 border-l-0 hover:bg-gray-300 text-xs"
                                                    >
                                                        ▲
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingCaption({ ...editingCaption, startTime: adjustTime(editingCaption.startTime, -0.1).toString() })}
                                                        className="px-1.5 py-1 bg-gray-200 border border-gray-300 border-l-0 border-t-0 rounded-r hover:bg-gray-300 text-xs"
                                                    >
                                                        ▼
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={editingCaption.endTime}
                                                    onChange={(e) => setEditingCaption({ ...editingCaption, endTime: e.target.value })}
                                                    className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <div className="flex flex-col">
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingCaption({ ...editingCaption, endTime: adjustTime(editingCaption.endTime, 0.1).toString() })}
                                                        className="px-1.5 py-1 bg-gray-200 border border-gray-300 border-l-0 hover:bg-gray-300 text-xs"
                                                    >
                                                        ▲
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingCaption({ ...editingCaption, endTime: adjustTime(editingCaption.endTime, -0.1).toString() })}
                                                        className="px-1.5 py-1 bg-gray-200 border border-gray-300 border-l-0 border-t-0 rounded-r hover:bg-gray-300 text-xs"
                                                    >
                                                        ▼
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={handleSaveEdit}
                                                className="flex items-center px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                                            >
                                                <CheckIcon className="w-4 h-4 mr-1" />
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancelEdit}
                                                className="flex items-center px-3 py-1.5 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                                            >
                                                <XMarkIcon className="w-4 h-4 mr-1" />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // Display Mode
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="text-gray-800 font-medium mb-2">{caption.text}</p>
                                            <p className="text-sm text-gray-500">
                                                {formatTimeDisplay(parseFloat(caption.startTime))} - {formatTimeDisplay(parseFloat(caption.endTime))}
                                                <span className="mx-2">•</span>
                                                Duration: {Math.round((parseFloat(caption.endTime) - parseFloat(caption.startTime)) * 10) / 10}s
                                            </p>
                                        </div>

                                        <div className="flex gap-2 ml-4">
                                            <button
                                                type="button"
                                                onClick={() => handleStartEdit(caption)}
                                                className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                                                title="Edit caption"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteCaption(caption.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                title="Delete caption"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 