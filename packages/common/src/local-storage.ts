export class LocalStorage {
  public static setValue<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public static loadValue<T>(key: string, defaultValue: T): T {
    const storedValue = sessionStorage.getItem(key);

    if (!storedValue || storedValue === 'undefined') {
      return defaultValue;
    }

    try {
      return JSON.parse(storedValue);
    } catch {
      return defaultValue;
    }
  }
}
