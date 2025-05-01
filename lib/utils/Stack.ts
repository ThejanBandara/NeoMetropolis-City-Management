interface StackADT {
    push(item: any): void;
    pop(): any;
    peek(): any;
    isEmpty(): boolean;
    clear(): void;
    size(): number;
    getAll(): any[];
}

export class Stack<T> implements StackADT {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    clear(): void {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    getAll(): any[] {
        return [...this.items]
    }
}
    