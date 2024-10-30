import EventEmitter from 'events';

const emitter = new EventEmitter();

emitter.setMaxListeners(0);//ko gioi han listener

export const emitterUtils = emitter;