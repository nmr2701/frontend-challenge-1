import { makeAutoObservable } from "mobx";
import { ClaimsData } from "../schemas/claimsSchema"; 

class ClaimsStore {
  claims: ClaimsData[] = [];
  selectedFileName: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setClaims(data: ClaimsData[]) {
    this.claims = data;
  }

  setSelectedFileName(fileName: string) {
    this.selectedFileName = fileName;
  }



}
const claimsStore = new ClaimsStore();



export { claimsStore }; 