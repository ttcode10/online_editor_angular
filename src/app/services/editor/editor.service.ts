import { Injectable } from '@angular/core';
import { Code } from './../../models/Editor';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  newCode: Code;
  codes: Code[];
  id: string;

  constructor() {
    this.codes = []
  }

  addCode(codeToAdd: Code) {
    const existingCode = this.codes.find(code => codeToAdd.id === code.id);
    if(!existingCode) {
      this.codes.unshift(codeToAdd);
    }
  }

  updateCode(codeToUpdate: Code) {
    const index = this.codes.findIndex(code => code.id === codeToUpdate.id);
    if(index !== -1) {
      this.codes.splice(index, 1, codeToUpdate);
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('codes', JSON.stringify(this.codes));
  }

  // getFromLocalStorage(): Observable<Code[]> {
  //   return of(JSON.parse(localStorage.getItem('codes')));
  // }

  // getCodes(): Observable<Code[]> {
  //   this.getFromLocalStorage().subscribe(storageCodes => {
  //     if(!storageCodes) {
  //       return of(this.codes);
  //     } return of(storageCodes);
  //   });
  // }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('codes'));
  }

  getCodes(): Observable<Code[]> {
    const localCode = this.getFromLocalStorage();
    if(!localCode) {
      return of(this.codes);
    } return of(localCode);
  }


  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  createNewCode(title: string): Observable<string> {
    const newCode = {
      id: this.generateId(),
      title: title,
      code: '',
      createdAt: new Date(),
      lastChangedAt: ''
    }
    this.codes.unshift(newCode);
    this.saveToLocalStorage();
    return of(newCode.id);
  }

  getSelectedCode(id: string): Observable<Code> {
    const existingCode = this.codes.find(code => id === code.id)
    return of(existingCode);
  }

  deleteCode(id: string) {
    const codeToDeleteIndex = this.codes.findIndex(code => code.id === id);
    this.codes.splice(codeToDeleteIndex, 1);
    this.saveToLocalStorage();
  }

}

