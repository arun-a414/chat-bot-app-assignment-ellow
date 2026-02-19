export class MessageQueue {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing = false;

  enqueue(task: () => Promise<void>) {
    this.queue.push(task);
    this.process();
  }

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
