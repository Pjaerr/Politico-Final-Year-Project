import IDataStorage from "./IDataStorage";

class MockDataStorage implements IDataStorage {
  private storage: Map<string, any>;

  constructor() {
    this.storage = new Map<string, any>();
  }

  get<T>(key: string): T | null {
    return this.storage.get(key);
  }

  set<T>(key: string, value: T): void {
    this.storage.set(key, value);
  }
}

describe("Create a mock implementation of IDataStorage", () => {
  it("should allow us to set/get data", () => {
    const mockDataStorage = new MockDataStorage();

    mockDataStorage.set("data", 15);

    expect(mockDataStorage.get("data")).toEqual(15);
  });
});
