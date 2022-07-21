import { Saveable } from './data/Saveable.js'

export abstract class GameObject extends Saveable {
  private readonly flags = new Set<string>()

  public addFlags (...flags: string[]): void {
    flags.forEach(flag => this.flags.add(flag))
  }

  public removeFlags (...flags: string[]): void {
    flags.forEach(flag => this.flags.delete(flag))
  }

  public hasFlags (...flags: string[]): boolean {
    return flags.every(flag => this.flags.has(flag))
  }
}
