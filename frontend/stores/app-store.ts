import { makeAutoObservable } from 'mobx';

export class AppStore {
  constructor() {
    makeAutoObservable(this);
  }
}
export const appStore = new AppStore();
