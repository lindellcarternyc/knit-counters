import { encoder } from "./encoder";

describe("encoder", () => {
  describe("primitives", () => {
    it("encodes and decodes numbers", () => {
      const nEncoder = encoder.number();
      const number = 100;

      expect(nEncoder.encode(number)).toBe("100");
      expect(nEncoder.decode("100")).toBe(number);
    });

    it("encodes and decodes strings", () => {
      const sEncoder = encoder.string();
      const string = "Hello, World!";

      expect(sEncoder.encode(string)).toBe(string);
      expect(sEncoder.decode(string)).toBe(string);
    });

    it("encodes and decodes booleans", () => {
      const bEncoder = encoder.bool();
      const boolean = true;

      expect(bEncoder.encode(boolean)).toBe("true");
      expect(bEncoder.decode("true")).toBe(true);

      const falseValue = "false";
      expect(bEncoder.decode(falseValue)).toBe(false);
      expect(() => bEncoder.decode("invalid")).toThrow(
        "Invalid boolean value: invalid"
      );
    });
  });

  describe("arrays", () => {
    it("encodes and decodes an array of primitives", () => {
      const arrayEncoder = encoder.array(encoder.number());

      const numbers = [1, 2, 3];
      expect(arrayEncoder.encode(numbers)).toBe("[1,2,3]");
      expect(arrayEncoder.decode("[1,2,3]")).toEqual(numbers);
    });

    it("encodes and decodes nested arrays", () => {
      const nestedArrayEncoder = encoder.array(encoder.array(encoder.number()));

      const nestedNumbers = [
        [1, 2],
        [3, 4],
      ];
      expect(nestedArrayEncoder.encode(nestedNumbers)).toBe("[[1,2],[3,4]]");
      expect(nestedArrayEncoder.decode("[[1,2],[3,4]]")).toEqual(nestedNumbers);
    });
  });
});
