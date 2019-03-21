// code adapted from https://github.com/valor-software/ng2-file-upload/issues/461
import { Directive, ElementRef, Input, Renderer, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'img[imgPreview]'
})

/**
 * ImagePreviewDirective works alongside n2-file-upload to allow an image to be previewed after it is selected for file upload.
 */
export class ImagePreviewDirective {

  // The image to preview.
  @Input() image: any;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  /**
   * Activated when a change is detected.
   * 
   * @param changes The change made to the document.
   */
  ngOnChanges(changes: SimpleChanges) {

    let reader = new FileReader();
    let el = this.el;

    reader.onloadend = function (e) {
      el.nativeElement.src = reader.result;
    };

    // Must insure image is loaded.
    if (this.image) {
      return reader.readAsDataURL(this.image);
    }

  }

}
