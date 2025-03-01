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

    removeClaim(claimId: number) {
        this.claims = this.claims.filter((claim) => claim.claimId !== claimId);
    }

    setSelectedFileName(fileName: string) {
        this.selectedFileName = fileName;
    }
}


class AuthStore {
    isAuthenticated = false;

    constructor() {
        makeAutoObservable(this);
        this.checkAuth();
    }

    checkAuth() {
        const storedAuth = localStorage.getItem("isAuthenticated");
        this.isAuthenticated = storedAuth === "true";
    }

    login() {
        this.isAuthenticated = true;
        localStorage.setItem("isAuthenticated", "true");
    }

    logout() {
        this.isAuthenticated = false;
        localStorage.removeItem("isAuthenticated");
    }
}


const authStore = new AuthStore();

const claimsStore = new ClaimsStore();

export { claimsStore, authStore };
