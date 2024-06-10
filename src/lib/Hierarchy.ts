export type HierarchyNode = readonly [name: string, value: HierarchyValue];

export type HierarchyValue =
  | { type: 'post' }
  | { type: 'category'; sub?: HierarchyNode[] };

export interface Hierarchy {
  nodes: HierarchyNode[];
  path: string[];
}
