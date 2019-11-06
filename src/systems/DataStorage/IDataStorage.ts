/**
 * * Create an interface for saving and loading data that will be implemented by specific
 * * APIs such as local storage, other APIs could then be Firebase but our code would only
 * * use the API agnostic interface.
 */

interface IDataStorage {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
}

export default IDataStorage;
