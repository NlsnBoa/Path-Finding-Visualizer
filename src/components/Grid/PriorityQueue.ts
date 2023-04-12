

class PriorityQueueItem<T> {
  constructor(public value: T, public priority: number) {}
}

export class PriorityQueue<T> {
    private items: PriorityQueueItem<T>[] = [];
  
    enqueue(value: T, priority: number): void {
      const newItem = new PriorityQueueItem(value, priority);
      let added = false;
  
      for (let i = 0; i < this.items.length; i++) {
        if (priority < this.items[i].priority) {
          this.items.splice(i, 0, newItem);
          added = true;
          break;
        }
      }
  
      if (!added) {
        this.items.push(newItem);
      }
    }
  
    dequeue(): T | undefined {
      if (this.isEmpty()) {
        return undefined;
      }
      return this.items.shift()?.value;
    }
  
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  
    size(): number {
      return this.items.length;
    }
  }