export class CustomStorage<T> {
  constructor(private readonly key: string) {}

  public getItems(): T[] | null {
    try {
      const data = localStorage.getItem(this.key);
      if (data) {
        return JSON.parse(data) as T[];
      }
      return null;
    } catch {
      throw new Error("Failed to retrieve items from storage");
    }
  }

  public setItems(items: T[]): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(items));
    } catch {
      throw new Error("Failed to set items to storage");
    }
  }

  public clearItems(): void {
    try {
      localStorage.removeItem(this.key);
    } catch {
      throw new Error("Failed to clear items from storage");
    }
  }
}
