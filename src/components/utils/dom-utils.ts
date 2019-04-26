import { padStart } from './string-utils';

export {
  getFirstNode,
  getNodeIndex,
};

interface INodeSearchOrdering {
  node: HTMLElement
  orderKey: string,
}

/**
 * Get the index of the given node in its parent tree
 * @param node	the node to find the index of
 */
function getNodeIndex(node: HTMLElement): number {
  return (Array.prototype.findIndex.call(node.parentElement.childNodes, (child: HTMLElement) => {
    return child === node;
  }) as number) + 1;
}

/**
 * Get the closest node from the root amongst given node list
 * @param root		the root element to search within
 * @param nodes		the nodes of which to find the first occurance within root
 */

function getFirstNode(root: HTMLElement, nodes: HTMLElement[] = []): HTMLElement {
  const sortedNodes = nodes
  .filter((node) => {
    return root === node || root.contains(node);
  })
  .map((node) => {
    const keys = [];
    let parent = node;

    while (parent !== root && parent.parentElement !== null) {
      keys.unshift(padStart(getNodeIndex(parent).toString(), 4, '0'));
      parent = parent.parentElement;
    }

    return {
      node,
      orderKey: keys.join(''),
    };
  }).sort((a: INodeSearchOrdering, b: INodeSearchOrdering) => {
    return a.orderKey > b.orderKey ? 1 : a.orderKey < b.orderKey ? -1 : 0;
  });

  if (sortedNodes.length) {
    return sortedNodes[0].node;
  }

  return null;
}
