import { useState } from 'react';
import { STORAGE_KEY } from '../utils/constants';
import { setItem, removeItem, getStorageType } from '../utils/storage';

export function ApiKeyInput({ apiKey, onApiKeyChange }) {
  const [inputValue, setInputValue] = useState(apiKey);
  const [isEditing, setIsEditing] = useState(!apiKey);
  const storageType = getStorageType();
  const isNoSaveMode = storageType === 'noApiKey';

  const handleSave = () => {
    const trimmedKey = inputValue.trim();
    if (trimmedKey) {
      setItem(STORAGE_KEY, trimmedKey);
      onApiKeyChange(trimmedKey);
      setIsEditing(false);
    }
  };

  const handleClear = () => {
    removeItem(STORAGE_KEY);
    setInputValue('');
    onApiKeyChange('');
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  if (!isEditing && apiKey) {
    return (
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">API 키: </span>
        <span className="text-sm font-mono text-gray-800 dark:text-gray-200">
          {apiKey.slice(0, 8)}...{apiKey.slice(-4)}
        </span>
        {isNoSaveMode && (
          <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full">
            저장 안 함
          </span>
        )}
        <button
          onClick={() => setIsEditing(true)}
          className="ml-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          수정
        </button>
        <button
          onClick={handleClear}
          className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          삭제
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="password"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="YouTube API 키를 입력하세요"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <button
          onClick={handleSave}
          disabled={!inputValue.trim()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isNoSaveMode ? '사용' : '저장'}
        </button>
        {apiKey && (
          <button
            onClick={() => {
              setInputValue(apiKey);
              setIsEditing(false);
            }}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            취소
          </button>
        )}
      </div>
      {isNoSaveMode && (
        <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          "API 키 저장 안 함" 모드: 페이지를 새로고침하면 API 키가 삭제됩니다.
        </p>
      )}
    </div>
  );
}
