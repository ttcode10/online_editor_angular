import { Component, OnInit } from '@angular/core';
import { Code } from '../../models/Editor';
import { EditorService } from 'src/app/services/editor/editor.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogData } from '../../models/Dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  codes: Code[];
  title: string;
  id: string;

  constructor(
    private editorService: EditorService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editorService.getCodes().subscribe(codes => {
      if(codes.length !== 0) {
        this.codes = codes;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title: this.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.editorService.createNewCode(result).subscribe(id => {
        this.router.navigate(['/editor', id])
      });
    });
  }

  redirectToDetail(code: Code) {
    this.router.navigate(['/editor', code.id])
  }

  deleteCode(code: Code) {
    this.editorService.deleteCode(code.id);
  }

}
