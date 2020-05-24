import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';
import { Code } from './../../models/Editor';
import { EditorService } from 'src/app/services/editor/editor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editorOptions = { theme: 'vs-light', language: 'javascript' };
  code: Code = {
    id: '',
    title: '',
    code: '',
    createdAt: '',
    lastChangedAt: '',
  };

  constructor(
    private editorService: EditorService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.editorService.getSelectedCode(id).subscribe(code => {
      this.code = code;
    })
  }

  onSubmit() {
    const updatedCode = {
      ...this.code,
      lastChangedAt: new Date()
    };
    console.log('onSubmit', updatedCode);
    this.editorService.updateCode(updatedCode);
  }

  onDelete(code: Code) {
    console.log('deleted', code);
    this.editorService.deleteCode(code.id);
    this.router.navigate(['/']);
  }


}
