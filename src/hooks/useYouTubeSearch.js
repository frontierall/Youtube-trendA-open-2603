import { useState, useCallback } from 'react';
import { getCache, setCache } from './useCache';

const YOUTUBE_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_VIDEOS_API = 'https://www.googleapis.com/youtube/v3/videos';

/**
 * YouTube 키워드 검색 커스텀 훅
 *
 * ⚠️ 주의: 검색 API는 1회 호출당 100 쿼터를 소비합니다!
 * 일일 무료 쿼터(10,000)가 빠르게 소진될 수 있습니다.
 *
 * @param {string} apiKey - YouTube Data API 키
 */
export function useYouTubeSearch(apiKey) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  const search = useCallback(async (query, forceRefresh = false) => {
    if (!apiKey || !query.trim()) {
      setSearchResults([]);
      setLastQuery('');
      return;
    }

    const trimmedQuery = query.trim();
    const cacheKey = `search_${trimmedQuery}`;

    // 캐시 확인
    if (!forceRefresh) {
      const cached = getCache(cacheKey);
      if (cached) {
        setSearchResults(cached);
        setFromCache(true);
        setLastQuery(trimmedQuery);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setError(null);
    setFromCache(false);
    setLastQuery(trimmedQuery);

    try {
      // 1단계: 검색 API로 동영상 ID 목록 가져오기 (100 쿼터 소비)
      const searchParams = new URLSearchParams({
        part: 'snippet',
        q: trimmedQuery,
        type: 'video',
        maxResults: '25',
        order: 'relevance',
        key: apiKey,
      });

      const searchResponse = await fetch(`${YOUTUBE_SEARCH_API}?${searchParams.toString()}`);
      const searchData = await searchResponse.json();

      if (!searchResponse.ok) {
        const errorMessage = searchData.error?.message || '검색에 실패했습니다.';
        throw new Error(errorMessage);
      }

      const videoIds = searchData.items
        ?.map(item => item.id?.videoId)
        .filter(Boolean)
        .join(',');

      if (!videoIds) {
        setSearchResults([]);
        return;
      }

      // 2단계: 동영상 상세 정보 가져오기 (1 쿼터 소비)
      const videosParams = new URLSearchParams({
        part: 'snippet,statistics,contentDetails',
        id: videoIds,
        key: apiKey,
      });

      const videosResponse = await fetch(`${YOUTUBE_VIDEOS_API}?${videosParams.toString()}`);
      const videosData = await videosResponse.json();

      if (!videosResponse.ok) {
        const errorMessage = videosData.error?.message || '동영상 정보를 가져오는데 실패했습니다.';
        throw new Error(errorMessage);
      }

      const items = videosData.items || [];
      setSearchResults(items);

      // 캐시 저장
      if (items.length > 0) {
        setCache(cacheKey, items);
      }
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setLastQuery('');
    setError(null);
    setFromCache(false);
  }, []);

  return {
    searchResults,
    loading,
    error,
    fromCache,
    lastQuery,
    search,
    clearSearch,
  };
}
