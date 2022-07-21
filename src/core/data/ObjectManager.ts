/**
 * Manages objects by assigning them an ID that can be used as a reference
 *  during serialisation. An object's ID won't change during the time it's
 *  assigned to the object manager, so you can be assured that references
 *  always point to the correct object.
 */
export class ObjectManager {
  private readonly instances: any[] = []
  private readonly freeIDs: number[] = []

  /**
   * Create an object and give it an ID right away.
   * @param Object the constructor
   * @param args the arguments to call the constructor with
   * @returns the object, after it's been assigned an ID
   */
  public create<
    U extends any[], T extends new(...args: U) => any
  > (Object: T, ...args: U): InstanceType<T> {
    const object = new Object(...args)
    this.assignID(object)
    return object
  }

  /**
   * Assign an object to receive an ID, assigning earlier IDs first if they
   *  have been freed up in the meantime.
   * @param object the object to give an ID
   * @return the assigned ID
   */
  private assignID (object: any): number {
    if (this.freeIDs.length === 0) {
      this.instances.push(object)
      return this.instances.length - 1
    } else {
      const index = this.freeIDs.pop() as number
      this.instances[index] = object
      return index
    }
  }

  /**
   * Assign an object to receive an ID if it does not already have one.
   * @param object the object to give an ID
   * @return the object's uniqued ID
   */
  public add (object: any): number {
    const index = this.instances.indexOf(object)
    if (index === -1) return this.assignID(object)
    return index
  }

  /**
   * Tell the object manager to no longer keep track of an object.
   * @param object the object to forget
   */
  public remove (object: any): void {
    const index = this.instances.indexOf(object)
    if (index !== -1) {
      this.instances[index] = undefined
      this.freeIDs.push(index)
    }
  }

  /**
   * Find the ID the object has in this manager. If it has none, it's assigned
   *  an ID at this time.
   * @param object the object to look up
   * @returns the unique ID
   */
  public getID (object: any): number {
    return this.add(object)
  }
}
