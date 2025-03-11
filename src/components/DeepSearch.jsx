import React, { useState, useEffect } from 'react';
import './DeepSearch.css';

/**
 * DeepSearch - A component that mimics Grok's DeepSearch feature
 * 
 * @param {Object} props
 * @param {string} props.query - The search query
 * @param {Array} props.sources - Array of sources found
 * @param {boolean} props.isSearching - Whether the search is in progress
 * @param {string} props.summary - Summary of the search results
 * @param {Function} props.onSearchComplete - Callback when search is complete
 */
const DeepSearch = ({
  query = "",
  sources = [],
  isSearching = false,
  summary = "",
  onSearchComplete = () => {}
}) => {
  const [animatedSources, setAnimatedSources] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  
  // Animate sources appearing one by one
  useEffect(() => {
    if (sources.length > animatedSources.length) {
      const timer = setTimeout(() => {
        setAnimatedSources(sources.slice(0, animatedSources.length + 1));
      }, 300);
      return () => clearTimeout(timer);
    }
    
    if (sources.length > 0 && sources.length === animatedSources.length && !isSearching) {
      setShowSummary(true);
      onSearchComplete();
    }
  }, [sources, animatedSources, isSearching, onSearchComplete]);
  
  // Simulate search progress
  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        setSearchProgress(prev => {
          const newProgress = prev + (Math.random() * 5);
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else {
      setSearchProgress(100);
    }
  }, [isSearching]);
  
  // Reset when query changes
  useEffect(() => {
    setAnimatedSources([]);
    setShowSummary(false);
    setSearchProgress(0);
  }, [query]);
  
  return (
    <div className="deep-search-container">
      <div className="deep-search-header">
        <h2>
          <span className="deep-search-icon">🔍</span>
          DeepSearch
        </h2>
        <div className="deep-search-query">{query}</div>
      </div>
      
      <div className="deep-search-progress-container">
        <div 
          className="deep-search-progress-bar" 
          style={{ width: `${searchProgress}%` }}
        ></div>
        {isSearching && (
          <div className="deep-search-status">
            Searching {Math.round(searchProgress)}%
          </div>
        )}
      </div>
      
      <div className="deep-search-content">
        {animatedSources.length > 0 ? (
          <>
            <div className="deep-search-sources">
              <h3>Sources ({animatedSources.length})</h3>
              <div className="deep-search-sources-list">
                {animatedSources.map((source, index) => (
                  <div key={index} className="deep-search-source-card">
                    <div className="deep-search-source-header">
                      <div className="deep-search-source-favicon">
                        {source.favicon ? (
                          <img src={source.favicon} alt="" />
                        ) : (
                          <div className="deep-search-default-favicon">
                            {source.domain?.charAt(0).toUpperCase() || '?'}
                          </div>
                        )}
                      </div>
                      <div className="deep-search-source-info">
                        <div className="deep-search-source-title">
                          <a href={source.url} target="_blank" rel="noopener noreferrer">
                            {source.title}
                          </a>
                        </div>
                        <div className="deep-search-source-domain">{source.domain}</div>
                      </div>
                    </div>
                    {source.snippet && (
                      <div className="deep-search-source-snippet">
                        {source.snippet}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {showSummary && summary && (
              <div className="deep-search-summary">
                <h3>Summary</h3>
                <div className="deep-search-summary-content">
                  {summary}
                </div>
              </div>
            )}
          </>
        ) : isSearching ? (
          <div className="deep-search-searching">
            <div className="deep-search-animation">
              <div className="deep-search-magnifier">🔍</div>
              <div className="deep-search-pulse"></div>
            </div>
            <div className="deep-search-message">
              Searching across the web...
            </div>
          </div>
        ) : (
          <div className="deep-search-empty">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default DeepSearch; 