import { makeAutoObservable } from "mobx";
import { ClaimsType } from "../schemas/claimsSchema"; 

class ClaimsStore {
  claims: ClaimsType[] = [];
  selectedFileName: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setClaims(data: ClaimsType[]) {
    this.claims = data;
  }

  setSelectedFileName(fileName: string) {
    this.selectedFileName = fileName;
  }

}
const claimsStore = new ClaimsStore();



export { claimsStore }; 