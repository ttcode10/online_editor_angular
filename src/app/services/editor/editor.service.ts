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
    this.codes = [
      {
        id: 'code1',
        title: 'Title-1',
        code: 'sdfdsfgw',
        createdAt: new Date('2019-04-25, 09:34:32'),
        lastChangedAt: new Date('2019-04-25, 09:34:32')
      },
      {
        id: 'code2',
        title: 'Title-2',
        code: '234sdfdsfgw',
        createdAt: new Date('2019-04-25, 09:34:32'),
        lastChangedAt: new Date('2019-04-25, 09:34:32')
      },
      {
        id: 'code3',
        title: 'Title-3',
        code: 'sdfdsfgw',
        createdAt: new Date('2019-04-25, 09:34:32'),
        lastChangedAt: new Date('2019-04-25, 09:34:32')
      },
      {
        id: 'code4',
        title: 'Title-4',
        code: '234sdfdsfgw',
        createdAt: new Date('2019-04-25, 09:34:32'),
        lastChangedAt: new Date('2019-04-25, 09:34:32')
      },
      {
        id: 'code5',
        title: 'Title-5',
        code: 'sdfdsfgw',
        createdAt: new Date('2019-04-25, 09:34:32'),
        lastChangedAt: new Date('2019-04-25, 09:34:32')
      },
      {
        id: 'code6',
        title: 'Title-6',
        code: '234sdfdsfgw',
        createdAt: new Date('2019-04-25, 09:34:32'),
        lastChangedAt: new Date('2019-04-25, 09:34:32')
      },
      {
        id: 'code7',
        title: 'Title-7',
        code: 'sdfdsfgw',
        createdAt: new Date('2019-04-25, 09:34:32'),
        lastChangedAt: new Date('2019-04-25, 09:34:32')
      },
      {
        id: 'code8',
        title: 'Title-8',
        code: '234sdfdsfgw',
        createdAt: new Date('2019-04-25, 09:34:32'),
        lastChangedAt: new Date('2019-04-25, 09:34:32')
      },
      {
        id: 'code9',
        title: 'Title-9',
        code: 'sdfdsfgw',
        createdAt: new Date('2019-04-25, 09:34:32'),
        lastChangedAt: new Date('2019-04-25, 09:34:32')
      },
      {
        id: 'code10',
        title: 'Title-10',
        code: '234sdfdsfgw',
        createdAt: new Date('2019-04-25, 09:34:32'),
        lastChangedAt: new Date('2019-04-25, 09:34:32')
      }
    ]
  }

  addCode(codeToAdd: Code) {
    const existingCode = this.codes.find(code => codeToAdd.id === code.id);
    console.log('service-addCode', existingCode);
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
    return this.codes.filter(code => code.id !== id );
  }

}

