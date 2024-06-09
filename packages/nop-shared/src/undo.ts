export type UndoManager<T> = {
  saveState(state: T): void;

  getCurrentState(): T | null;

  reset(state:T|null): void;

  beginBatch(): void;
  endBatch(): void;

  redo(): void;
  undo(): void;

  canUndo(): boolean;
  canRedo(): boolean;

  bindStore(set: (value: T) => void): {
    redo: () => void;
    undo: () => void;
  };
};

/**
 * 使用智谱清言生成，但是需要手工修改
 */
export function createUndoManager<T>(
  maxHistory: number = 1000
): UndoManager<T> {
  let currentState: T | null = null;
  let pendingState: T | null = null;
  let batchOperation = false;

  const undoStack: T[] = [];
  const redoStack: T[] = [];

  const reset = (state:T|null) => {
    currentState = state;
    pendingState = null;
    batchOperation = false;
    undoStack.length = 0;
    redoStack.length = 0;
  };

  const saveState = (state: T) => {
    pendingState = state;
    if (!batchOperation) {
      pushUndo()

      currentState = state;
      pendingState = null;
      redoStack.length = 0; // 清空redo堆栈
    }
  };

  function pushUndo() {
    if (currentState) {
      undoStack.push(currentState);
      if (undoStack.length > maxHistory) undoStack.shift();
    }
  }

  const getCurrentState = () => currentState;

  const beginBatch = () => {
    batchOperation = true;
  };

  const endBatch = () => {
    batchOperation = false;
    if (pendingState !== null) {
      pushUndo()
      currentState = pendingState;
      pendingState = null;
      redoStack.length = 0;
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      pushUndo()
      const nextState = redoStack.pop() as T;
      currentState = nextState;
      //console.log('Redo:', nextState);
    }
  };

  const undo = () => {
    if (undoStack.length > 0) {
      if (currentState) redoStack.push(currentState); // 将当前状态加入redo堆栈
      const prevState = undoStack.pop() as T;
      currentState = prevState;
      //console.log('Undo:', prevState);
    }
  };

  const canUndo = () => undoStack.length > 0;
  const canRedo = () => redoStack.length > 0;

  function bindStore(set: (value: T) => void) {
    return {
      undo() {
        undo();
        const state = getCurrentState();
        if (state) {
          set(state);
        }
      },

      redo() {
        redo();
        const state = getCurrentState();
        if (state) {
          set(state);
        }
      }
    };
  }

  return {
    saveState,
    getCurrentState,
    reset,
    beginBatch,
    endBatch,
    redo,
    undo,
    canRedo,
    canUndo,
    bindStore
  };
}
