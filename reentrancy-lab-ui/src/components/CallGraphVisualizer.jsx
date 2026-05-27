import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AlertTriangle, CheckCircle, Zap } from 'lucide-react';

// Call Graph Visualizer - "Wireshark for EVM"
// Shows the recursive call stack during reentrancy attacks

const CallGraphVisualizer = ({ attackType = 'classic', isAttacking = false }) => {

  // Define call graphs for different attack types
  const attackScenarios = {
    classic: {
      title: 'Classic Reentrancy Attack Flow',
      nodes: [
        { id: '1', type: 'input', data: { label: '👤 User' }, position: { x: 250, y: 0 }, style: { background: '#3b82f6', color: 'white' } },
        { id: '2', data: { label: '🏦 Vault.withdraw()' }, position: { x: 250, y: 100 }, style: { background: '#10b981', color: 'white' } },
        { id: '3', data: { label: '💰 Send ETH' }, position: { x: 250, y: 200 }, style: { background: '#f59e0b', color: 'white' } },
        { id: '4', data: { label: '🎭 Attacker.receive()' }, position: { x: 250, y: 300 }, style: { background: '#ef4444', color: 'white' } },
        { id: '5', data: { label: '🔄 Vault.withdraw() [REENTER]' }, position: { x: 250, y: 400 }, style: { background: '#dc2626', color: 'white', border: '3px solid #991b1b' } },
        { id: '6', data: { label: '💰 Send ETH [AGAIN]' }, position: { x: 250, y: 500 }, style: { background: '#f59e0b', color: 'white' } },
        { id: '7', data: { label: '🔄 Attacker.receive() [LOOP]' }, position: { x: 250, y: 600 }, style: { background: '#dc2626', color: 'white' } },
        { id: '8', type: 'output', data: { label: '🚨 Vault Drained' }, position: { x: 250, y: 700 }, style: { background: '#7f1d1d', color: 'white' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6' } },
        { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#10b981' } },
        { id: 'e3-4', source: '3', target: '4', animated: true, label: 'External Call', style: { stroke: '#f59e0b' } },
        { id: 'e4-5', source: '4', target: '5', animated: true, label: '⚠️ Re-enter!', style: { stroke: '#ef4444', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' } },
        { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#dc2626' } },
        { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#dc2626' } },
        { id: 'e7-5', source: '7', target: '5', animated: true, label: 'Recursive Loop', style: { stroke: '#991b1b', strokeDasharray: '5,5' } },
        { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#7f1d1d' } },
      ],
    },
    crossFunction: {
      title: 'Cross-Function Reentrancy',
      nodes: [
        { id: '1', type: 'input', data: { label: '👤 User' }, position: { x: 250, y: 0 }, style: { background: '#3b82f6', color: 'white' } },
        { id: '2', data: { label: '🏦 Vault.claimReward()' }, position: { x: 250, y: 100 }, style: { background: '#10b981', color: 'white' } },
        { id: '3', data: { label: '💰 Send Reward' }, position: { x: 250, y: 200 }, style: { background: '#f59e0b', color: 'white' } },
        { id: '4', data: { label: '🎭 Attacker.receive()' }, position: { x: 250, y: 300 }, style: { background: '#ef4444', color: 'white' } },
        { id: '5', data: { label: '🔓 Vault.withdraw() [Different Function!]' }, position: { x: 250, y: 400 }, style: { background: '#dc2626', color: 'white', border: '3px solid #991b1b' } },
        { id: '6', data: { label: '✅ Guard Check Passes' }, position: { x: 250, y: 500 }, style: { background: '#16a34a', color: 'white' } },
        { id: '7', data: { label: '💰 Withdraw Funds' }, position: { x: 250, y: 600 }, style: { background: '#f59e0b', color: 'white' } },
        { id: '8', type: 'output', data: { label: '🚨 Exploited via Cross-Function' }, position: { x: 250, y: 700 }, style: { background: '#7f1d1d', color: 'white' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },
        { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Callback' },
        { id: 'e4-5', source: '4', target: '5', animated: true, label: '⚠️ Different Function!', style: { stroke: '#ef4444', strokeWidth: 3 } },
        { id: 'e5-6', source: '5', target: '6', animated: true },
        { id: 'e6-7', source: '6', target: '7', animated: true },
        { id: 'e7-8', source: '7', target: '8', animated: true },
      ],
    },
    readOnly: {
      title: 'Read-Only Reentrancy',
      nodes: [
        { id: '1', type: 'input', data: { label: '👤 User' }, position: { x: 250, y: 0 }, style: { background: '#3b82f6', color: 'white' } },
        { id: '2', data: { label: '🏦 Pool.withdraw()' }, position: { x: 250, y: 100 }, style: { background: '#10b981', color: 'white' } },
        { id: '3', data: { label: '🔒 Lock State' }, position: { x: 250, y: 200 }, style: { background: '#8b5cf6', color: 'white' } },
        { id: '4', data: { label: '💰 Send ETH' }, position: { x: 250, y: 300 }, style: { background: '#f59e0b', color: 'white' } },
        { id: '5', data: { label: '🎭 Attacker.receive()' }, position: { x: 250, y: 400 }, style: { background: '#ef4444', color: 'white' } },
        { id: '6', data: { label: '👁️ Read Pool.getCollateralRatio()' }, position: { x: 50, y: 500 }, style: { background: '#06b6d4', color: 'white' } },
        { id: '7', data: { label: '📊 Returns STALE Data!' }, position: { x: 50, y: 600 }, style: { background: '#dc2626', color: 'white', border: '3px solid #991b1b' } },
        { id: '8', data: { label: '🎯 Exploit Dependent Protocol' }, position: { x: 50, y: 700 }, style: { background: '#7f1d1d', color: 'white' } },
        { id: '9', data: { label: '🔓 Unlock State' }, position: { x: 450, y: 500 }, style: { background: '#8b5cf6', color: 'white' } },
        { id: '10', type: 'output', data: { label: '✅ Withdraw Complete' }, position: { x: 450, y: 600 }, style: { background: '#10b981', color: 'white' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },
        { id: 'e3-4', source: '3', target: '4', animated: true },
        { id: 'e4-5', source: '4', target: '5', animated: true },
        { id: 'e5-6', source: '5', target: '6', animated: true, label: 'View Call', style: { stroke: '#06b6d4' } },
        { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#dc2626', strokeWidth: 3 } },
        { id: 'e7-8', source: '7', target: '8', animated: true },
        { id: 'e5-9', source: '5', target: '9', animated: true, label: 'Return', style: { stroke: '#8b5cf6' } },
        { id: 'e9-10', source: '9', target: '10', animated: true },
      ],
    },
  };

  const scenario = attackScenarios[attackType] || attackScenarios.classic;
  const [nodes, , onNodesChange] = useNodesState(scenario.nodes);
  const [edges, , onEdgesChange] = useEdgesState(scenario.edges);

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap size={28} />
              Call Graph Visualizer
            </h3>
            <p className="text-blue-100 mt-1">{scenario.title}</p>
          </div>
          <div className="flex items-center gap-2">
            {isAttacking ? (
              <div className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg">
                <AlertTriangle className="text-white animate-pulse" size={20} />
                <span className="text-white font-semibold">Attack in Progress</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-lg">
                <CheckCircle className="text-white" size={20} />
                <span className="text-white font-semibold">Ready</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span className="text-gray-700">User Action</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <span className="text-gray-700">Contract Call</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded border-2 border-red-900"></div>
            <span className="text-gray-700">Reentrancy Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-gray-700">ETH Transfer</span>
          </div>
        </div>
      </div>

      {/* ReactFlow Graph */}
      <div style={{ height: '600px' }} className="bg-gradient-to-br from-gray-50 to-blue-50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              if (node.style?.background) return node.style.background;
              return '#3b82f6';
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      {/* Info Panel */}
      <div className="bg-gray-50 p-6 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Attack Vector</div>
            <div className="text-lg font-bold text-gray-900">
              {attackType === 'classic' && 'Recursive Withdrawal'}
              {attackType === 'crossFunction' && 'Cross-Function Bypass'}
              {attackType === 'readOnly' && 'Stale State Reading'}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Vulnerability</div>
            <div className="text-lg font-bold text-red-600">
              {attackType === 'classic' && 'State Update After External Call'}
              {attackType === 'crossFunction' && 'Isolated Function Guards'}
              {attackType === 'readOnly' && 'View Function During Execution'}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Defense</div>
            <div className="text-lg font-bold text-green-600">
              {attackType === 'classic' && 'CEI Pattern + Guard'}
              {attackType === 'crossFunction' && 'Global Reentrancy Lock'}
              {attackType === 'readOnly' && 'State Snapshots'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallGraphVisualizer;
