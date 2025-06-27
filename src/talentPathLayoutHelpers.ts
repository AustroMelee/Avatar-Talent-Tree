// Shared helpers for talent path layout (minor node, diamond, and extra node logic)
import type { TalentNode, TalentConnection, NodeType } from './types';

export type LayoutConfig = {
  CENTER_X: number;
  CENTER_Y: number;
  ANGLE_START: number;
  ANGLE_SPREAD: number;
  BRANCHES: number;
  BASE_RADIUS: number;
  RADIUS_STEP: number;
  MIN_DIST: number;
};

export function createMinorNode(
  nodes: TalentNode[],
  connections: TalentConnection[],
  nodeMap: Record<string, TalentNode>,
  minorNodeCounter: { value: number },
  parentId: string,
  angle: number,
  depth: number,
  branch: number,
  parentNode: TalentNode,
  theme: any,
  config: LayoutConfig,
  nextNode?: TalentNode
): TalentNode {
  const r = config.BASE_RADIUS + config.RADIUS_STEP * depth;
  const x = Math.round(config.CENTER_X + r * Math.cos(angle));
  const y = Math.round(config.CENTER_Y + r * Math.sin(angle));
  // Generate unique name
  const adj = theme.adjectives[minorNodeCounter.value % theme.adjectives.length];
  const noun = theme.nouns[(minorNodeCounter.value + Math.floor(minorNodeCounter.value / theme.adjectives.length)) % theme.nouns.length];
  const name = `${adj} ${noun}`;
  // Generate contextual description
  const verb = theme.verbs[minorNodeCounter.value % theme.verbs.length];
  const parentEffect = parentNode.name.toLowerCase().replace(/s$/, '');
  let description = `Slightly ${verb} your ${parentEffect}`;
  if (nextNode) {
    const nextEffect = nextNode.name.toLowerCase();
    description += `, preparing you for more advanced techniques like ${nextEffect}.`;
  } else {
    description += ' to improve your fundamental control.';
  }
  const philosophy = theme.philosophies[minorNodeCounter.value % theme.philosophies.length];
  minorNodeCounter.value++;
  const node: TalentNode = {
    id: `minor_${parentId}_${minorNodeCounter.value}`,
    name,
    description,
    flavor: philosophy,
    type: 'Minor',
    path: parentNode.path,
    constellation: 'air',
    position: { x, y },
    prerequisites: [parentId],
    visual: { color: '#B0E0E6', size: 30, icon: 'minor' },
    effects: [],
    isVisible: true,
    isAllocatable: false,
    isAllocated: false,
    isLocked: true,
    isPermanentlyLocked: false,
    pkCost: 1 + (Math.floor(depth) % 2),
  };
  nodes.push(node);
  nodeMap[node.id] = node;
  connections.push({ from: parentId, to: node.id, isActive: false, isLocked: false });
  return node;
}

export function addDiamondPattern(
  nodes: TalentNode[],
  connections: TalentConnection[],
  nodeMap: Record<string, TalentNode>,
  majorNodes: any[],
  minorNodeCounter: { value: number },
  THEMES: any[],
  config: LayoutConfig
) {
  const majorNodeList = nodes.filter(n => n.type !== 'Minor');
  majorNodeList.forEach(majorNode => {
    // Find all direct children of this major node
    const directChildren = connections
      .filter(c => c.from === majorNode.id)
      .map(c => nodeMap[c.to])
      .filter(n => n && n.type !== 'Minor');
    if (directChildren.length === 1) {
      const childNode = directChildren[0];
      const majorNodeData = majorNodes.find(m => m.id === majorNode.id)!;
      const parentAngle = Math.atan2(majorNode.position.y - config.CENTER_Y, majorNode.position.x - config.CENTER_X);
      const parentDepth = majorNodeData.depth;
      const branchIndex = majorNodeData.branch;
      for (let i = 0; i < 2; i++) {
        const forkAngle = parentAngle + (i === 0 ? -1 : 1) * (Math.PI / 15);
        const minor = createMinorNode(nodes, connections, nodeMap, minorNodeCounter, majorNode.id, forkAngle, parentDepth + 0.5, branchIndex, majorNode, THEMES[branchIndex], config, childNode);
        connections.push({ from: minor.id, to: childNode.id, isActive: false, isLocked: false });
      }
    }
  });
}

export function addExtraMinorNodes(
  nodes: TalentNode[],
  connections: TalentConnection[],
  nodeMap: Record<string, TalentNode>,
  majorNodes: any[],
  minorNodeCounter: { value: number },
  THEMES: any[],
  config: LayoutConfig
) {
  const allMajorNodes = nodes.filter(n => n.type !== 'Minor');
  allMajorNodes.forEach(majorNode => {
    if (majorNode.type !== 'Capstone' && majorNode.type !== 'GnosticRite') {
      const majorNodeData = majorNodes.find(m => m.id === majorNode.id);
      if (majorNodeData) {
        const parentAngle = Math.atan2(majorNode.position.y - config.CENTER_Y, majorNode.position.x - config.CENTER_X);
        const parentDepth = majorNodeData.depth;
        const branchIndex = majorNodeData.branch;
        const existingConnections = connections.filter(c => c.from === majorNode.id).length;
        const numExtra = Math.max(0, 2 - existingConnections);
        for (let i = 0; i < numExtra; i++) {
          const extraAngle = parentAngle + (i - 0.5) * (Math.PI / 12);
          createMinorNode(nodes, connections, nodeMap, minorNodeCounter, majorNode.id, extraAngle, parentDepth + 0.3, branchIndex, majorNode, THEMES[branchIndex], config);
        }
      }
    }
  });
} 