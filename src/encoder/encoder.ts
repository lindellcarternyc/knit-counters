export abstract class Encoder<T> {
  abstract encode(input: T): string;
  abstract decode(encoded: string): T;
}

class NumberEncoder extends Encoder<number> {
  encode(input: number): string {
    return input.toString();
  }

  decode(encoded: string): number {
    const value = parseFloat(encoded);
    if (isNaN(value)) {
      throw new Error(`Invalid number: ${encoded}`);
    }
    return value;
  }
}

class StringEncoder extends Encoder<string> {
  encode(input: string): string {
    return input;
  }

  decode(encoded: string): string {
    return encoded;
  }
}

class BooleanEncoder extends Encoder<boolean> {
  encode(input: boolean): string {
    return input.toString();
  }

  decode(encoded: string): boolean {
    const value = encoded.toLowerCase();
    if (value === "true") {
      return true;
    } else if (value === "false") {
      return false;
    } else {
      throw new Error(`Invalid boolean value: ${encoded}`);
    }
  }
}

export class ArrayEncoder<T> extends Encoder<T[]> {
  private encoder: Encoder<T>;

  constructor(encoder: Encoder<T>) {
    super();
    this.encoder = encoder;
  }

  encode(input: T[]): string {
    return `[${input.map((item) => this.encoder.encode(item)).join(",")}]`;
  }

  decode(encoded: string): T[] {
    if (this.encoder instanceof ArrayEncoder) {
      const items = encoded
        .slice(1, -1)
        .replace(/(\],\[)/g, "] [")
        .split(" ")
        .map((item) => this.encoder.decode(item));
      return items;
    }
    const parts = encoded.slice(1, -1).split(",");
    return parts.map((part) => this.encoder.decode(part));
  }
}

export const encoder = {
  number: () => new NumberEncoder(),
  string: () => new StringEncoder(),
  bool: () => new BooleanEncoder(),
  array: <T>(element: Encoder<T>) => new ArrayEncoder(element),
} as const;
