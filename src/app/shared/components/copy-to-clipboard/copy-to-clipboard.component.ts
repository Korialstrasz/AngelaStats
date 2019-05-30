import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as ClipboardJS from 'clipboard';
import {MatButton} from '@angular/material';

@Component({
  selector: 'aws-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss']
})
export class CopyToClipboardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() type = '';
  @Input() searchTerm = '';
  @ViewChild('copyToClipboard', {static: true}) btn: MatButton;
  clipboard: ClipboardJS;
  private nativeElement: any;

  constructor() {
  }

  ngOnInit() {
    this.nativeElement = this.btn._elementRef.nativeElement;
    this.clipboard = new ClipboardJS(this.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.nativeElement.getAttributeNode('data-clipboard-text').value =
      `http://angelastats-99708.firebaseapp.com/?${encodeURIComponent(this.type)}=${encodeURIComponent(this.searchTerm)}`;
  }

  ngOnDestroy(): void {
    this.clipboard.destroy();
  }

}
