import { GameObject } from './core/GameObject.js'
import { INamed } from './core/interfaces/INamed.js'

export class Place extends GameObject implements INamed {
  private name: string
  getName (): string { return this.name }
  setName (name: string): void { this.name = name }
}
