import React from 'react';
import { CourseNode } from '../../data/courseData';
import { ChapterRow } from './ChapterRow';

interface TreeNodeProps {
  node: CourseNode;
  level?: number;
  expandedSections: Set<string>;
  onToggle: (sectionId: string) => void;
  isFirstChild?: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  level = 0, 
  expandedSections, 
  onToggle,
  isFirstChild = false
}) => {
  const isExpanded = expandedSections.has(node.id);

  return (
    <ChapterRow
      title={node.title}
      lessons={node.lessons}
      exercises={node.exercises}
      completion={node.completion}
      level={level}
      hasChildren={node.hasChildren}
      isExpanded={isExpanded}
      isFirstChild={isFirstChild}
      onToggle={node.hasChildren ? () => onToggle(node.id) : undefined}
    >
      {isExpanded && node.children && (
        <>
          {node.children.map((child, index) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expandedSections={expandedSections}
              onToggle={onToggle}
              isFirstChild={index === 0}
            />
          ))}
        </>
      )}
    </ChapterRow>
  );
}; 