export class ArrayHelpers {
  public static isArray(element: any): boolean {
    const isArray = Array.isArray(element);
    return isArray;
  }

  public static swapArrayElements<T>(array: T[], index1: number, index2: number): T[] {
    if (index1 < 0 || index1 >= array.length || index2 < 0 || index2 >= array.length) {
      throw new Error('Index out of bounds');
    }

    const temp    = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;

    return array;
  }

  public static getArraySwappedIndices<T>(originalArray: T[], newArray: T[]) {
    for (let i = 0; i < originalArray.length; i++) {
      if (originalArray[i] !== newArray[i]) {
        const movedItem     = newArray[i];
        const originalIndex = originalArray.indexOf(movedItem);
        const newIndex      = newArray.indexOf(movedItem);
        return { original: originalIndex, new: newIndex };
      }
    }

    return undefined;
  }

  public static duplicateArrayElement<T>(array: T[], index: number) {
    if (index < 0 || index >= array.length) {
      throw new Error('Index out of bounds');
    }

    const elementToDuplicate = array[index];
    array.splice(index + 1, 0, { ...elementToDuplicate });
  }

  public static insertElement<T>(array: T[], index: number, element: T) {
    if (index < 0 || index > array.length) {
      throw new Error('Index out of bounds');
    }

    array.splice(index, 0, element);
  }

  public static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j                    = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
}
