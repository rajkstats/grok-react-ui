import React, { useState, useEffect } from 'react';
import './GrokThinkingSteps.css';

/**
 * GrokThinkingSteps - A component that displays agent thinking steps in a Grok-like UI
 * 
 * @param {Object} props
 * @param {Array} props.steps - Array of thinking steps
 * @param {string} props.steps[].type - Type of step ('thinking', 'search', 'observation', 'conclusion')
 * @param {string} props.steps[].content - Content of the step
 * @param {Array} props.steps[].sources - Optional array of sources for search results
 * @param {boolean} props.isThinking - Whether the agent is currently thinking
 * @param {string} props.query - The original query
 * @param {Function} props.onThinkComplete - Callback when thinking is complete
 */
const GrokThinkingSteps = ({ 
  steps = [], 
  isThinking = false, 
  query = "", 
  onThinkComplete = () => {} 
}) => {
  const [expandedStep, setExpandedStep] = useState(null);
  const [animatedSteps, setAnimatedSteps] = useState([]);
  const [showThinkingIndicator, setShowThinkingIndicator] = useState(isThinking);

  // Animate steps appearing one by one
  useEffect(() => {
    if (steps.length > animatedSteps.length) {
      const timer = setTimeout(() => {
        setAnimatedSteps(steps.slice(0, animatedSteps.length + 1));
      }, 300);
      return () => clearTimeout(timer);
    }
    
    if (steps.length > 0 && steps.length === animatedSteps.length && !steps[steps.length - 1].isLoading) {
      setShowThinkingIndicator(false);
      onThinkComplete();
    }
  }, [steps, animatedSteps, onThinkComplete]);

  // Update animated steps when steps change
  useEffect(() => {
    if (steps.length === 0) {
      setAnimatedSteps([]);
    }
  }, [steps]);

  const toggleStep = (index) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  const getStepIcon = (type) => {
    switch (type) {
      case 'thinking':
        return '🧠';
      case 'search':
        return '🔍';
      case 'observation':
        return '👁️';
      case 'conclusion':
        return '✓';
      default:
        return '•';
    }
  };

  const getStepTitle = (type) => {
    switch (type) {
      case 'thinking':
        return 'Thinking';
      case 'search':
        return 'DeepSearch';
      case 'observation':
        return 'Observation';
      case 'conclusion':
        return 'Conclusion';
      default:
        return 'Step';
    }
  };

  return (
    <div className="grok-thinking-container">
      {query && (
        <div className="grok-query">
          <h3>Query: {query}</h3>
        </div>
      )}
      
      <div className="grok-thinking-header">
        <h2>
          <span className="grok-icon">🧠</span> 
          Thinking Process
        </h2>
        {showThinkingIndicator && (
          <div className="grok-thinking-indicator">
            <div className="grok-thinking-dot"></div>
            <div className="grok-thinking-dot"></div>
            <div className="grok-thinking-dot"></div>
          </div>
        )}
      </div>
      
      <div className="grok-steps-container">
        {animatedSteps.map((step, index) => (
          <div 
            key={index} 
            className={`grok-step ${expandedStep === index ? 'expanded' : ''} ${step.type}`}
          >
            <div 
              className="grok-step-header" 
              onClick={() => toggleStep(index)}
            >
              <div className="grok-step-icon">{getStepIcon(step.type)}</div>
              <div className="grok-step-title">{getStepTitle(step.type)}</div>
              <div className="grok-step-expand">
                {expandedStep === index ? '−' : '+'}
              </div>
            </div>
            
            <div className="grok-step-content">
              {step.content}
              
              {step.type === 'search' && step.sources && step.sources.length > 0 && (
                <div className="grok-sources">
                  <h4>Sources:</h4>
                  <ul>
                    {step.sources.map((source, sourceIndex) => (
                      <li key={sourceIndex}>
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {step.isLoading && (
                <div className="grok-step-loading">
                  <div className="grok-loading-dot"></div>
                  <div className="grok-loading-dot"></div>
                  <div className="grok-loading-dot"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {steps.length === 0 && isThinking && (
        <div className="grok-empty-state">
          <div className="grok-thinking-big">
            <div className="grok-thinking-brain">🧠</div>
            <div className="grok-thinking-text">Thinking...</div>
            <div className="grok-thinking-indicator">
              <div className="grok-thinking-dot"></div>
              <div className="grok-thinking-dot"></div>
              <div className="grok-thinking-dot"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrokThinkingSteps; 