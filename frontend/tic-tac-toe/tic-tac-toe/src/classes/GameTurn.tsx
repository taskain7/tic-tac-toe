import Square from "./Square";

export default class GameTurn {
    constructor(readonly square: Square, readonly player: string) {
    }
}
