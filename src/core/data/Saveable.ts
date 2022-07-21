export abstract class Saveable {
  /**
   * Save the current object to a plain JS object to be serialised into JSON.
   */
  public saveObject (): object {
    const result: any = {}
    for (const key in this) {
      /// TODO: handle object values
      result[key] = this[key]
    }
    return result
  }

  /**
   * Load the saved data from a plain JS object into the current object.
   * @param o data object
   */
  public loadObject (o: object): void {
    for (const key in this) {
      if (key in o) this[key] = (o as any)[key]
    }
  }

  /**
   * Duplicate this object.
   * @returns the cloned object
   */
  public clone (): Saveable {
    const result = new (this.constructor as new (...args: any[]) => Saveable)()
    result.loadObject(this.saveObject())
    return result
  }
}
