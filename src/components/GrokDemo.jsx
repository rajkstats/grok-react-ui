import React, { useState, useEffect } from 'react';
import GrokThinkingSteps from './GrokThinkingSteps';
import DeepSearch from './DeepSearch';
import './GrokDemo.css';

const GrokDemo = () => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState([]);
  const [searchSources, setSearchSources] = useState([]);
  const [searchSummary, setSearchSummary] = useState('');
  const [activeTab, setActiveTab] = useState('think'); // 'think' or 'search'
  
  // Demo data for thinking steps
  const demoThinkingSteps = [
    {
      type: 'thinking',
      content: 'I need to understand what the user is asking about. They want to know about frontend libraries for visualizing agent thinking steps and progress indicators. Let me break this down into key components I should search for.'
    },
    {
      type: 'thinking',
      content: 'The key components are: (1) frontend libraries, (2) React components, (3) agent thinking visualization, (4) progress indicators. I should look for libraries that specifically handle these use cases.'
    },
    {
      type: 'search',
      content: 'Searching for "React libraries for agent thinking steps visualization"',
      sources: [
        { title: 'React Flow - Node-based UI library', url: 'https://reactflow.dev' },
        { title: 'Stream Chat React - AI state indicators', url: 'https://getstream.io/chat/docs/sdk/react/components/ai/' }
      ]
    },
    {
      type: 'observation',
      content: 'I found several libraries that could be useful. React Flow appears to be widely used for node-based visualizations, which could represent thinking steps. Stream Chat React has specific AI state indicators for showing thinking states.'
    },
    {
      type: 'search',
      content: 'Searching for "FlowiseAI agent visualization components"',
      sources: [
        { title: 'FlowiseAI - Drag & drop UI for LLM workflows', url: 'https://github.com/FlowiseAI/Flowise' },
        { title: 'Agentflows documentation', url: 'https://docs.flowiseai.com/using-flowise/agentflows' }
      ]
    },
    {
      type: 'observation',
      content: 'FlowiseAI provides components specifically designed for agent workflows. It includes visualization for sequential agents and multi-agents, which could be adapted for showing thinking steps.'
    },
    {
      type: 'conclusion',
      content: 'Based on my research, the best options for visualizing agent thinking steps are:\n\n1. **React Flow** - A versatile library for node-based UIs that can visualize workflows and thinking steps\n\n2. **Stream Chat React** - Offers AI state indicators and streaming message components\n\n3. **FlowiseAI** - Specifically designed for LLM workflows with agent visualization\n\nEach has different strengths depending on the specific requirements.'
    }
  ];
  
  // Demo data for search sources
  const demoSearchSources = [
    {
      title: 'React Flow - JavaScript library for rendering interactive node-based UIs',
      url: 'https://reactflow.dev',
      domain: 'reactflow.dev',
      snippet: 'React Flow is a highly customizable React component for building node-based editors and interactive diagrams. It\'s used by many AI-focused applications for visualizing workflows and agent processes.'
    },
    {
      title: 'Stream Chat React - AI Components Documentation',
      url: 'https://getstream.io/chat/docs/sdk/react/components/ai/',
      domain: 'getstream.io',
      snippet: 'Stream Chat React SDK includes specialized AI components for visualizing agent thinking with the AIStateIndicator component that shows different states like "Thinking...", "Checking external resources...", etc.'
    },
    {
      title: 'FlowiseAI - Drag & drop UI for building LLM workflows',
      url: 'https://github.com/FlowiseAI/Flowise',
      domain: 'github.com',
      snippet: 'FlowiseAI is an open-source platform for creating AI workflows with a drag & drop interface. It includes "Agentflows" for building agentic systems and visualizing the agent\'s thinking process.'
    },
    {
      title: 'Building ReAct Agents from Scratch: A Hands-On Guide',
      url: 'https://medium.com/google-cloud/building-react-agents-from-scratch-a-hands-on-guide-using-gemini-ffe4621d90ae',
      domain: 'medium.com',
      snippet: 'This article explains how to implement the Think-Act-Observe loop for ReAct agents, which could be adapted for visualization in a frontend interface.'
    }
  ];
  
  const demoSearchSummary = 'For visualizing agent thinking steps and progress indicators in React applications, several libraries stand out. React Flow offers a comprehensive solution for node-based visualizations that can represent thinking processes. Stream Chat React provides specialized AI components including AIStateIndicator for showing different thinking states. FlowiseAI is specifically designed for LLM workflows with built-in agent visualization capabilities. Each library has different strengths depending on your specific requirements, with React Flow being the most versatile, Stream Chat being focused on chat interfaces, and FlowiseAI being specialized for LLM applications.';
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setThinkingSteps([]);
    setSearchSources([]);
    setSearchSummary('');
    
    // Simulate loading thinking steps
    if (activeTab === 'think') {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < demoThinkingSteps.length) {
          setThinkingSteps(prev => [...prev, demoThinkingSteps[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsProcessing(false);
        }
      }, 1500);
    } 
    // Simulate loading search results
    else if (activeTab === 'search') {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < demoSearchSources.length) {
          setSearchSources(prev => [...prev, demoSearchSources[currentIndex]]);
          currentIndex++;
        } else {
          setTimeout(() => {
            setSearchSummary(demoSearchSummary);
            setIsProcessing(false);
          }, 1000);
          clearInterval(interval);
        }
      }, 1000);
    }
  };
  
  const handleThinkComplete = () => {
    console.log('Thinking process complete');
  };
  
  const handleSearchComplete = () => {
    console.log('Search process complete');
  };
  
  return (
    <div className="grok-demo-container">
      <div className="grok-demo-header">
        <h1>Grok-like UI Demo</h1>
        <p>Demonstration of Grok-inspired UI components for agent thinking steps and DeepSearch</p>
      </div>
      
      <div className="grok-demo-tabs">
        <button 
          className={`grok-demo-tab ${activeTab === 'think' ? 'active' : ''}`}
          onClick={() => setActiveTab('think')}
        >
          <span className="grok-demo-tab-icon">🧠</span>
          Think Mode
        </button>
        <button 
          className={`grok-demo-tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <span className="grok-demo-tab-icon">🔍</span>
          DeepSearch
        </button>
      </div>
      
      <div className="grok-demo-input-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={activeTab === 'think' 
              ? "Enter a question to see thinking steps..." 
              : "Enter a search query for DeepSearch..."
            }
            disabled={isProcessing}
          />
          <button 
            type="submit" 
            disabled={!query.trim() || isProcessing}
          >
            {activeTab === 'think' ? 'Think' : 'Search'}
          </button>
        </form>
      </div>
      
      <div className="grok-demo-content">
        {activeTab === 'think' && (
          <GrokThinkingSteps
            steps={thinkingSteps}
            isThinking={isProcessing}
            query={query}
            onThinkComplete={handleThinkComplete}
          />
        )}
        
        {activeTab === 'search' && (
          <DeepSearch
            query={query}
            sources={searchSources}
            isSearching={isProcessing}
            summary={searchSummary}
            onSearchComplete={handleSearchComplete}
          />
        )}
      </div>
    </div>
  );
};

export default GrokDemo; 