import { Directive, ElementRef, Input, Renderer, OnChanges, SimpleChanges } from '@angular/core';

/**
 * ImagePreview Directive works alongside n2-file-upload to allow an image to be previewed after it is selected for file upload.
 * Adapted from {@link  https://github.com/valor-software/ng2-file-upload/issues/461|github}.
 *
 * @export
 * @class ImagePreviewDirective
 */
@Directive({
  selector: 'img[imgPreview]'
})

export class ImagePreviewDirective {

  // The image to preview.
  @Input() image: any;

  /**
   *Creates an instance of ImagePreviewDirective.
   * @param {ElementRef} el
   * @param {Renderer} renderer
   * @memberof ImagePreviewDirective
   */
  constructor(private el: ElementRef, private renderer: Renderer) { }

  /**
   * Activated when a change is detected.
   *
   * @param {SimpleChanges} changes
   * @returns
   * @memberof ImagePreviewDirective
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
