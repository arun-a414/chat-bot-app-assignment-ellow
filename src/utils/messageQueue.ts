/**
 * MessageQueue ensures that asynchronous tasks
 * (like streaming bot responses) execute sequentially.
 *
 * This prevents overlapping responses and race conditions.
 */
export class MessageQueue {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing = false;

  /**
   * Adds a new async task to the queue.
   */
  enqueue(task: () => Promise<void>) {
    this.queue.push(task);
    this.process();
  }

  /**
   * Processes tasks one by one.
   * Ensures only one task runs at a time.
   */
  private async process() {
    if (this.isProcessing) return;

    this.isProcessing = true;

    while (this.queue.length) {
      const task = this.queue.shift();
      if (task) await task();
    }

    this.isProcessing = false;
  }
}
