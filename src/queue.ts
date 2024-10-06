import type { RequestQueueItem } from "./types";

export const createQueue = () => {
  const items: RequestQueueItem[] = [];

  return {
    enqueue: (item: RequestQueueItem) => {
      items.push(item);
    },
    dequeue: (): RequestQueueItem | undefined => {
      return items.shift();
    },
    isEmpty: (): boolean => items.length === 0,
  };
};
