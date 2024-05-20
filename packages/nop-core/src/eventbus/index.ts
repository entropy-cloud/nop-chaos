export type EventBusListener = (name: string, data: any) => void;

export type CancelHandle = () => void;

export type EventBus = {
  onEvent(name: string, data: any): void;
  addListener(listener: EventBusListener): CancelHandle;
  removeListener(listener: EventBusListener): void;
};

export function createEventBus(keepAllEvents: boolean) {
  const listeners: EventBusListener[] = [];

  const events: any = []

  function onEvent(name: string, data: any) {
    if(keepAllEvents){
        events.push({name,data})
    }
    for (const listener of listeners) {
      listener(name, data);
    }
  }

  function addListener(listener: EventBusListener) {
    for(let event of events){
        listener(event.name,event.data)
    }
    listeners.push(listener);
    return () => removeListener(listener);
  }

  function removeListener(listener: EventBusListener) {
    const index = listeners.indexOf(listener);
    if (index >= 0) listeners.splice(index, 1);
  }

  return {
    onEvent,
    addListener,
    removeListener
  };
}
