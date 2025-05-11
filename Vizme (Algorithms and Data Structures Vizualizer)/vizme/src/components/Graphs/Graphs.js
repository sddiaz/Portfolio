import React, { useState, useEffect, useRef } from 'react';

// Graph representation implementations
const GraphRepresentationTypes = {
  ADJACENCY_LIST: 'Adjacency List',
  ADJACENCY_MATRIX: 'Adjacency Matrix',
  OBJECT_POINTER: 'Objects and Pointers'
};

const AlgorithmTypes = {
  BFS: 'Breadth-First Search',
  DFS: 'Depth-First Search',
  DIJKSTRA: "Dijkstra's Algorithm"
};

// Custom hook for canvas rendering
const useCanvas = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      setContext(ctx);
    }
  }, [canvasRef]);
  
  return { canvasRef, context };
};

// Graph visualizer component
const Graphs = () => {
  const { canvasRef, context } = useCanvas();
  const [graph, setGraph] = useState({
    nodes: [],
    edges: []
  });
  const [algorithm, setAlgorithm] = useState(AlgorithmTypes.BFS);
  const [representation, setRepresentation] = useState(GraphRepresentationTypes.ADJACENCY_LIST);
  const [isRunning, setIsRunning] = useState(false);
  const [algorithmStep, setAlgorithmStep] = useState(0);
  const [algorithmSteps, setAlgorithmSteps] = useState([]);
  const [selectedStartNode, setSelectedStartNode] = useState(null);
  const [selectedEndNode, setSelectedEndNode] = useState(null);
  const [mode, setMode] = useState('edit'); // 'edit' or 'run'
  const [showRepresentationDetails, setShowRepresentationDetails] = useState(false);
  
  // Predefined example graphs
  const exampleGraphs = {
    simple: {
      nodes: [
        { id: 'A', x: 100, y: 100 },
        { id: 'B', x: 200, y: 50 },
        { id: 'C', x: 300, y: 100 },
        { id: 'D', x: 200, y: 200 },
        { id: 'E', x: 400, y: 150 }
      ],
      edges: [
        { from: 'A', to: 'B', weight: 1 },
        { from: 'B', to: 'C', weight: 1 },
        { from: 'C', to: 'E', weight: 1 },
        { from: 'A', to: 'D', weight: 1 },
        { from: 'D', to: 'C', weight: 1 }
      ]
    },
    weighted: {
      nodes: [
        { id: 'A', x: 100, y: 100 },
        { id: 'B', x: 250, y: 50 },
        { id: 'C', x: 400, y: 100 },
        { id: 'D', x: 250, y: 200 },
        { id: 'E', x: 400, y: 250 }
      ],
      edges: [
        { from: 'A', to: 'B', weight: 4 },
        { from: 'A', to: 'D', weight: 2 },
        { from: 'B', to: 'C', weight: 3 },
        { from: 'C', to: 'E', weight: 1 },
        { from: 'D', to: 'B', weight: 1 },
        { from: 'D', to: 'C', weight: 5 },
        { from: 'D', to: 'E', weight: 7 }
      ]
    }
  };

  // Initialize with a simple graph
  useEffect(() => {
    loadGraph('simple');
  }, []);

  // Load a predefined graph
  const loadGraph = (type) => {
    setGraph(exampleGraphs[type]);
    setAlgorithmStep(0);
    setAlgorithmSteps([]);
    setSelectedStartNode(null);
    setSelectedEndNode(null);
    setMode('edit');
  };

  // Draw the graph
  useEffect(() => {
    if (!context) return;
    
    const canvas = canvasRef.current;
    const { width, height } = canvas.getBoundingClientRect();
    
    // Set canvas resolution
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas
    context.clearRect(0, 0, width, height);
    
    // Draw edges
    graph.edges.forEach(edge => {
      const fromNode = graph.nodes.find(n => n.id === edge.from);
      const toNode = graph.nodes.find(n => n.id === edge.to);
      
      if (fromNode && toNode) {
        context.beginPath();
        context.moveTo(fromNode.x, fromNode.y);
        context.lineTo(toNode.x, toNode.y);
        
        // Check if this edge is part of the algorithm path
        let isVisited = false;
        let isPath = false;
        
        if (algorithmSteps.length > 0 && algorithmStep < algorithmSteps.length) {
          const step = algorithmSteps[algorithmStep];
          isVisited = step.visitedEdges && step.visitedEdges.some(e => 
            (e.from === edge.from && e.to === edge.to) || 
            (e.from === edge.to && e.to === edge.from)
          );
          
          isPath = step.pathEdges && step.pathEdges.some(e => 
            (e.from === edge.from && e.to === edge.to) || 
            (e.from === edge.to && e.to === edge.from)
          );
        }
        
        if (isPath) {
          context.strokeStyle = '#ff5e5e';
          context.lineWidth = 3;
        } else if (isVisited) {
          context.strokeStyle = '#5cb85c';
          context.lineWidth = 2.5;
        } else {
          context.strokeStyle = '#adb5bd';
          context.lineWidth = 2;
        }
        
        context.stroke();
        
        // Draw weight
        if (edge.weight !== 1) {
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          
          context.fillStyle = '#343a40';
          context.font = '14px Arial';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          
          // Draw background for better readability
          const textMetrics = context.measureText(edge.weight.toString());
          context.fillStyle = 'rgba(255, 255, 255, 0.8)';
          context.fillRect(
            midX - textMetrics.width / 2 - 3,
            midY - 10,
            textMetrics.width + 6,
            20
          );
          
          context.fillStyle = '#343a40';
          context.fillText(edge.weight.toString(), midX, midY);
        }
      }
    });
    
    // Draw nodes
    graph.nodes.forEach(node => {
      context.beginPath();
      
      // Check node state for algorithm visualization
      let nodeColor = '#4a6fa5';
      
      if (algorithmSteps.length > 0 && algorithmStep < algorithmSteps.length) {
        const step = algorithmSteps[algorithmStep];
        
        if (step.currentNode === node.id) {
          nodeColor = '#f0a500'; // Current node being processed
        } else if (step.pathNodes && step.pathNodes.includes(node.id)) {
          nodeColor = '#ff5e5e'; // Path node
        } else if (step.visitedNodes && step.visitedNodes.includes(node.id)) {
          nodeColor = '#5cb85c'; // Visited node
        }
      }
      
      // Highlight start and end nodes if selected
      if (selectedStartNode === node.id) {
        context.strokeStyle = '#28a745';
        context.lineWidth = 3;
        context.arc(node.x, node.y, 22, 0, Math.PI * 2);
        context.stroke();
      }
      
      if (selectedEndNode === node.id) {
        context.strokeStyle = '#dc3545';
        context.lineWidth = 3;
        context.arc(node.x, node.y, 22, 0, Math.PI * 2);
        context.stroke();
      }
      
      // Draw node
      context.fillStyle = nodeColor;
      context.arc(node.x, node.y, 20, 0, Math.PI * 2);
      context.fill();
      
      // Draw node label
      context.fillStyle = '#fff';
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(node.id, node.x, node.y);
    });
    
  }, [context, graph, algorithmStep, algorithmSteps, selectedStartNode, selectedEndNode]);

  // Run the selected algorithm
  const runAlgorithm = () => {
    if (!selectedStartNode) {
      alert('Please select a start node');
      return;
    }
    
    setMode('run');
    setAlgorithmStep(0);
    
    // Generate algorithm steps based on the selected algorithm
    let steps = [];
    
    switch (algorithm) {
      case AlgorithmTypes.BFS:
        steps = runBFS(selectedStartNode, selectedEndNode);
        break;
      case AlgorithmTypes.DFS:
        steps = runDFS(selectedStartNode, selectedEndNode);
        break;
      case AlgorithmTypes.DIJKSTRA:
        steps = runDijkstra(selectedStartNode, selectedEndNode);
        break;
      default:
        break;
    }
    
    setAlgorithmSteps(steps);
    setIsRunning(true);
  };

  // Breadth-First Search Algorithm
  const runBFS = (start, end) => {
    const steps = [];
    const queue = [start];
    const visited = new Set([start]);
    const previous = {};
    
    let visitedNodes = [start];
    let visitedEdges = [];
    
    steps.push({
      currentNode: start,
      queue: [...queue],
      visitedNodes: [...visitedNodes],
      visitedEdges: [...visitedEdges],
      description: `Starting BFS from node ${start}.`
    });
    
    while (queue.length > 0) {
      const current = queue.shift();
      
      // If we found the end node, we're done
      if (current === end) {
        let path = [];
        let curr = end;
        
        while (curr !== start) {
          path.unshift(curr);
          curr = previous[curr];
        }
        
        path.unshift(start);
        
        const pathEdges = [];
        for (let i = 0; i < path.length - 1; i++) {
          pathEdges.push({
            from: path[i],
            to: path[i + 1]
          });
        }
        
        steps.push({
          currentNode: end,
          queue: [...queue],
          visitedNodes: [...visitedNodes],
          visitedEdges: [...visitedEdges],
          pathNodes: [...path],
          pathEdges: [...pathEdges],
          description: `Found a path from ${start} to ${end}!`
        });
        
        break;
      }
      
      // Get all neighbors
      const neighbors = graph.edges
        .filter(edge => edge.from === current || edge.to === current)
        .map(edge => edge.from === current ? edge.to : edge.from);
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
          previous[neighbor] = current;
          
          visitedNodes.push(neighbor);
          visitedEdges.push({
            from: current,
            to: neighbor
          });
          
          steps.push({
            currentNode: neighbor,
            queue: [...queue],
            visitedNodes: [...visitedNodes],
            visitedEdges: [...visitedEdges],
            description: `Visiting node ${neighbor} from ${current}.`
          });
        }
      }
      
      // If there are still nodes to visit, update current node
      if (queue.length > 0) {
        steps.push({
          currentNode: queue[0],
          queue: [...queue],
          visitedNodes: [...visitedNodes],
          visitedEdges: [...visitedEdges],
          description: `Moving to next node in queue: ${queue[0]}.`
        });
      }
    }
    
    // If no path was found
    if (end && !steps.some(step => step.pathNodes)) {
      steps.push({
        queue: [],
        visitedNodes: [...visitedNodes],
        visitedEdges: [...visitedEdges],
        description: `No path found from ${start} to ${end}.`
      });
    }
    
    return steps;
  };

  // Depth-First Search Algorithm
  const runDFS = (start, end) => {
    const steps = [];
    const stack = [start];
    const visited = new Set([start]);
    const previous = {};
    
    let visitedNodes = [start];
    let visitedEdges = [];
    
    steps.push({
      currentNode: start,
      stack: [...stack],
      visitedNodes: [...visitedNodes],
      visitedEdges: [...visitedEdges],
      description: `Starting DFS from node ${start}.`
    });
    
    while (stack.length > 0) {
      const current = stack.pop();
      
      // If we found the end node, we're done
      if (current === end) {
        let path = [];
        let curr = end;
        
        while (curr !== start) {
          path.unshift(curr);
          curr = previous[curr];
        }
        
        path.unshift(start);
        
        const pathEdges = [];
        for (let i = 0; i < path.length - 1; i++) {
          pathEdges.push({
            from: path[i],
            to: path[i + 1]
          });
        }
        
        steps.push({
          currentNode: end,
          stack: [...stack],
          visitedNodes: [...visitedNodes],
          visitedEdges: [...visitedEdges],
          pathNodes: [...path],
          pathEdges: [...pathEdges],
          description: `Found a path from ${start} to ${end}!`
        });
        
        break;
      }
      
      // Get all neighbors
      const neighbors = graph.edges
        .filter(edge => edge.from === current || edge.to === current)
        .map(edge => edge.from === current ? edge.to : edge.from)
        .filter(neighbor => !visited.has(neighbor));
      
      if (neighbors.length === 0) {
        steps.push({
          currentNode: stack.length > 0 ? stack[stack.length - 1] : null,
          stack: [...stack],
          visitedNodes: [...visitedNodes],
          visitedEdges: [...visitedEdges],
          description: `No unvisited neighbors for ${current}. Backtracking.`
        });
        continue;
      }
      
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neighbor = neighbors[i];
        stack.push(neighbor);
        visited.add(neighbor);
        previous[neighbor] = current;
        
        visitedNodes.push(neighbor);
        visitedEdges.push({
          from: current,
          to: neighbor
        });
        
        if (i === neighbors.length - 1) {
          steps.push({
            currentNode: neighbor,
            stack: [...stack],
            visitedNodes: [...visitedNodes],
            visitedEdges: [...visitedEdges],
            description: `Visiting node ${neighbor} from ${current}.`
          });
        }
      }
    }
    
    // If no path was found
    if (end && !steps.some(step => step.pathNodes)) {
      steps.push({
        stack: [],
        visitedNodes: [...visitedNodes],
        visitedEdges: [...visitedEdges],
        description: `No path found from ${start} to ${end}.`
      });
    }
    
    return steps;
  };

  // Dijkstra's Algorithm
  const runDijkstra = (start, end) => {
    const steps = [];
    const distances = {};
    const previous = {};
    const unvisited = new Set();
    
    // Initialize distances
    graph.nodes.forEach(node => {
      distances[node.id] = Infinity;
      previous[node.id] = null;
      unvisited.add(node.id);
    });
    
    distances[start] = 0;
    
    let visitedNodes = [];
    let visitedEdges = [];
    
    steps.push({
      currentNode: start,
      unvisited: [...unvisited],
      distances: { ...distances },
      previous: { ...previous },
      visitedNodes: [...visitedNodes],
      visitedEdges: [...visitedEdges],
      description: `Starting Dijkstra's algorithm from node ${start}.`
    });
    
    while (unvisited.size > 0) {
      // Find the unvisited node with the smallest distance
      let current = null;
      let smallestDistance = Infinity;
      
      for (const nodeId of unvisited) {
        if (distances[nodeId] < smallestDistance) {
          smallestDistance = distances[nodeId];
          current = nodeId;
        }
      }
      
      // If the smallest distance is infinity, there are no more reachable nodes
      if (smallestDistance === Infinity) {
        steps.push({
          unvisited: [...unvisited],
          distances: { ...distances },
          previous: { ...previous },
          visitedNodes: [...visitedNodes],
          visitedEdges: [...visitedEdges],
          description: `No more reachable nodes.`
        });
        break;
      }
      
      visitedNodes.push(current);
      unvisited.delete(current);
      
      steps.push({
        currentNode: current,
        unvisited: [...unvisited],
        distances: { ...distances },
        previous: { ...previous },
        visitedNodes: [...visitedNodes],
        visitedEdges: [...visitedEdges],
        description: `Visiting node ${current} with distance ${distances[current]}.`
      });
      
      // If we found the end node, we're done
      if (current === end) {
        let path = [];
        let curr = end;
        
        while (curr !== start) {
          path.unshift(curr);
          curr = previous[curr];
        }
        
        path.unshift(start);
        
        const pathEdges = [];
        for (let i = 0; i < path.length - 1; i++) {
          pathEdges.push({
            from: path[i],
            to: path[i + 1]
          });
        }
        
        steps.push({
          currentNode: end,
          unvisited: [...unvisited],
          distances: { ...distances },
          previous: { ...previous },
          visitedNodes: [...visitedNodes],
          visitedEdges: [...visitedEdges],
          pathNodes: [...path],
          pathEdges: [...pathEdges],
          description: `Found shortest path from ${start} to ${end} with distance ${distances[end]}!`
        });
        
        break;
      }
      
      // Get all neighbors
      const neighbors = graph.edges
        .filter(edge => edge.from === current || edge.to === current)
        .map(edge => {
          const neighbor = edge.from === current ? edge.to : edge.from;
          return {
            id: neighbor,
            weight: edge.weight
          };
        })
        .filter(neighbor => unvisited.has(neighbor.id));
      
      for (const neighbor of neighbors) {
        const distance = distances[current] + neighbor.weight;
        
        if (distance < distances[neighbor.id]) {
          distances[neighbor.id] = distance;
          previous[neighbor.id] = current;
          
          visitedEdges.push({
            from: current,
            to: neighbor.id
          });
          
          steps.push({
            currentNode: neighbor.id,
            unvisited: [...unvisited],
            distances: { ...distances },
            previous: { ...previous },
            visitedNodes: [...visitedNodes],
            visitedEdges: [...visitedEdges],
            description: `Updated distance to ${neighbor.id} to ${distance} via ${current}.`
          });
        }
      }
    }
    
    return steps;
  };

  // Convert graph to selected representation type for display
  const getGraphRepresentation = () => {
    let code = '';
    
    switch (representation) {
      case GraphRepresentationTypes.ADJACENCY_LIST:
        code = `// Adjacency List Representation

const graph = {
${graph.nodes.map(node => {
  const neighbors = graph.edges
    .filter(edge => edge.from === node.id || edge.to === node.id)
    .map(edge => {
      const neighbor = edge.from === node.id ? edge.to : edge.from;
      return { id: neighbor, weight: edge.weight };
    });
  
  return `  "${node.id}": [${neighbors.map(n => `{node: "${n.id}", weight: ${n.weight}}`).join(', ')}]`;
}).join(',\n')}
};`;
        break;
      
      case GraphRepresentationTypes.ADJACENCY_MATRIX:
        const nodeIds = graph.nodes.map(node => node.id);
        const matrix = [];
        
        for (let i = 0; i < nodeIds.length; i++) {
          matrix[i] = Array(nodeIds.length).fill(0);
        }
        
        graph.edges.forEach(edge => {
          const fromIndex = nodeIds.indexOf(edge.from);
          const toIndex = nodeIds.indexOf(edge.to);
          
          matrix[fromIndex][toIndex] = edge.weight;
          matrix[toIndex][fromIndex] = edge.weight; // For undirected graph
        });
        
        code = `// Adjacency Matrix Representation

const nodes = [${nodeIds.map(id => `"${id}"`).join(', ')}];
const matrix = [
${matrix.map(row => `  [${row.join(', ')}]`).join(',\n')}
];

// matrix[i][j] represents the weight of the edge between nodes[i] and nodes[j]
// 0 means no edge exists`;
        break;
      
      case GraphRepresentationTypes.OBJECT_POINTER:
        code = `// Objects and Pointers Representation

class Node {
  constructor(id) {
    this.id = id;
    this.neighbors = []; // Array of {node, weight} objects
  }
  
  addNeighbor(node, weight) {
    this.neighbors.push({ node, weight });
  }
}

const nodes = {};

// Create nodes
${graph.nodes.map(node => `nodes["${node.id}"] = new Node("${node.id}");`).join('\n')}

// Add edges
${graph.edges.map(edge => `nodes["${edge.from}"].addNeighbor(nodes["${edge.to}"], ${edge.weight});
nodes["${edge.to}"].addNeighbor(nodes["${edge.from}"], ${edge.weight});`).join('\n')}`;
        break;
      
      default:
        break;
    }
    
    return code;
  };

  // Reset the algorithm visualization
  const resetAlgorithm = () => {
    setAlgorithmStep(0);
    setAlgorithmSteps([]);
    setMode('edit');
    setIsRunning(false);
  };

  // Get explanation for the current algorithm step
  const getCurrentStepExplanation = () => {
    if (!algorithmSteps.length || algorithmStep >= algorithmSteps.length) {
      return 'Click "Run Algorithm" to start the visualization.';
    }
    
    return algorithmSteps[algorithmStep].description;
  };

  // UI components
  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Interactive Graph Algorithm Visualizer</h1>
      </header>
      
      <div className="flex flex-col md:flex-row p-4 gap-4">
        {/* Graph controls */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Controls</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Graph Example
            </label>
            <div className="flex gap-2">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => loadGraph('simple')}
              >
                Simple Graph
              </button>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => loadGraph('weighted')}
              >
                Weighted Graph
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Algorithm
            </label>
            <select 
              className="block w-full bg-gray-50 border border-gray-300 rounded-md p-2"
              value={algorithm}
              onChange={e => setAlgorithm(e.target.value)}
              disabled={mode === 'run'}
            >
              {Object.values(AlgorithmTypes).map(alg => (
                <option key={alg} value={alg}>{alg}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Node
            </label>
            <select 
              className="block w-full bg-gray-50 border border-gray-300 rounded-md p-2"
              value={selectedStartNode || ''}
              onChange={e => setSelectedStartNode(e.target.value)}
              disabled={mode === 'run'}
            >
              <option value="">Select a start node</option>
              {graph.nodes.map(node => (
                <option key={node.id} value={node.id}>{node.id}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Node (Optional)
            </label>
            <select 
              className="block w-full bg-gray-50 border border-gray-300 rounded-md p-2"
              value={selectedEndNode || ''}
              onChange={e => setSelectedEndNode(e.target.value)}
              disabled={mode === 'run'}
            >
              <option value="">Select an end node (optional)</option>
              {graph.nodes.filter(node => node.id !== selectedStartNode).map(node => (
                <option key={node.id} value={node.id}>{node.id}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Graph Representation
            </label>
            <select 
              className="block w-full bg-gray-50 border border-gray-300 rounded-md p-2"
              value={representation}
              onChange={e => setRepresentation(e.target.value)}
            >
              {Object.values(GraphRepresentationTypes).map(rep => (
                <option key={rep} value={rep}>{rep}</option>
              ))}
            </select>
            <button 
              className="mt-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm"
              onClick={() => setShowRepresentationDetails(!showRepresentationDetails)}
            >
              {showRepresentationDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          
          <div className="flex gap-2">
            {mode === 'edit' ? (
              <button 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium"
                onClick={runAlgorithm}
                disabled={!selectedStartNode}
              >
                Run Algorithm
              </button>
            ) : (
              <button 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
                onClick={resetAlgorithm}
              >
                Reset
              </button>
            )}
          </div>
        </div>
        
        {/* Main canvas area */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Graph Visualization</h2>
            <div className="relative bg-gray-100 rounded-lg" style={{ height: '400px' }}>
              <canvas 
                ref={canvasRef} 
                className="w-full h-full"
              />
            </div>
            
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <h3 className="font-medium mb-2">Legend:</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
                  <span>Normal Node</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span>Visited Node</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Current Node</span>
                </div>
                <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Current Node</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                  <span>Path Node</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-gray-400 mr-2"></div>
                  <span>Normal Edge</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-green-500 mr-2"></div>
                  <span>Visited Edge</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-red-500 mr-2"></div>
                  <span>Path Edge</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Algorithm step controls */}
          {mode === 'run' && (
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-2">Algorithm Execution</h2>
              <p className="mb-3">{getCurrentStepExplanation()}</p>
              
              <div className="flex items-center gap-2">
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                  onClick={() => setAlgorithmStep(Math.max(0, algorithmStep - 1))}
                  disabled={algorithmStep === 0}
                >
                  Previous Step
                </button>
                <div className="flex-1 text-center">
                  Step {algorithmStep + 1} of {algorithmSteps.length}
                </div>
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                  onClick={() => setAlgorithmStep(Math.min(algorithmSteps.length - 1, algorithmStep + 1))}
                  disabled={algorithmStep === algorithmSteps.length - 1}
                >
                  Next Step
                </button>
              </div>
              
              {/* Display extra information based on algorithm */}
              {algorithmSteps.length > 0 && algorithmStep < algorithmSteps.length && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  {algorithm === AlgorithmTypes.BFS && algorithmSteps[algorithmStep].queue && (
                    <div className="mb-2">
                      <span className="font-medium">Queue: </span>
                      {algorithmSteps[algorithmStep].queue.join(' → ') || 'Empty'}
                    </div>
                  )}
                  
                  {algorithm === AlgorithmTypes.DFS && algorithmSteps[algorithmStep].stack && (
                    <div className="mb-2">
                      <span className="font-medium">Stack: </span>
                      {algorithmSteps[algorithmStep].stack.join(' → ') || 'Empty'}
                    </div>
                  )}
                  
                  {algorithm === AlgorithmTypes.DIJKSTRA && algorithmSteps[algorithmStep].distances && (
                    <div className="mb-2">
                      <span className="font-medium">Distances: </span>
                      {Object.entries(algorithmSteps[algorithmStep].distances).map(([node, distance]) => (
                        <span key={node} className="mr-2">
                          {node}: {distance === Infinity ? '∞' : distance}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Graph representation details */}
          {showRepresentationDetails && (
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-2">
                {representation} Representation
              </h2>
              <pre className="p-3 bg-gray-100 rounded overflow-auto text-sm" style={{ maxHeight: '200px' }}>
                {getGraphRepresentation()}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      <footer className="bg-gray-200 p-3 text-center text-gray-600 text-sm">
        <p>Interactive Graph Algorithm Visualizer - A tool for understanding graph algorithms and data structures</p>
      </footer>
    </div>
  );
};

export default Graphs;