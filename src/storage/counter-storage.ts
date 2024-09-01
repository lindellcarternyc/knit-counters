import { CustomStorage } from "./custom-storage";

const STORAGE_KEY = "KNIT_COUNTER_KEY";

class CounterStorage {
  private static instance: CounterStorage;
  private storage: CustomStorage<number[]>;

  private constructor() {
    this.storage = new CustomStorage<number[]>(STORAGE_KEY);
  }

  public static getInstance(): CounterStorage {
    return this.instance ?? (this.instance = new CounterStorage());
  }

  public getItems(): number[][] | null {
    try {
      const items = this.storage.getItems();
      return items;
    } catch (err) {
      this.logError(err);
      return null;
    }
  }
}
