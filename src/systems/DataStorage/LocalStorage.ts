import IDataStorage from "./IDataStorage";

class LocalStorage implements IDataStorage {
  get<T>(key: string): T | null {
    const localStorageItem = localStorage.getItem(key);

    if (localStorageItem) {
      const localStorageItemAsJson = JSON.parse(localStorageItem);

      return localStorageItemAsJson as T;
    }
    else {
      console.warn("LocalStorage cannot find item with key: " + key);
    }

    return null;
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export default LocalStorage;
