export type UndoManager<T> = {
  saveState(state: T): void;

  getCurrentState(): T | null;

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
 * 使用智谱清言生成
 */
export function createUndoManager<T>(
  maxHistory: number = 1000
): UndoManager<T> {
  let currentState: T | null = null;
  let pendingState: T | null = null;
  let batchOperation = false;

  const undoStack: T[] = [];
  const redoStack: T[] = [];

  const saveState = (state: T) => {
    pendingState = state;
    if (!batchOperation) {
      undoStack.push(state);
      if (undoStack.length > maxHistory) undoStack.shift();
      redoStack.length = 0; // 清空redo堆栈
    }
  };

  const getCurrentState = () => currentState;

  const beginBatch = () => {
    batchOperation = true;
  };

  const endBatch = () => {
    batchOperation = false;
    if (pendingState !== null) {
      currentState = pendingState;
      pendingState = null;
      redoStack.push(currentState); // 将当前状态加入redo堆栈
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop() as T;
      currentState = nextState;
      undoStack.push(currentState); // 将当前状态加入undo堆栈
      if(undoStack.length > maxHistory)
        undoStack.shift()
    
      //console.log('Redo:', nextState);
    }
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const prevState = undoStack.pop() as T;
      currentState = prevState;
      redoStack.push(currentState); // 将当前状态加入redo堆栈
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
    beginBatch,
    endBatch,
    redo,
    undo,
    canRedo,
    canUndo,
    bindStore
  };
}
