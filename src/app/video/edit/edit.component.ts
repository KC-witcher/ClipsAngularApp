import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Output() update = new EventEmitter();
  @Input() activeClip: IClip | null = null;

  inSubmission = false;
  showAlter = false;
  alertColor = 'blue';
  alertMsg = 'Please Wait, Updating Clip.';

  clipID = new FormControl('', {
    nonNullable: true,
  });

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID,
  });

  constructor(private modal: ModalService, private clipService: ClipService) {}

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy(): void {
    this.modal.unRegister('editClip');
  }

  ngOnChanges() {
    if (!this.activeClip) {
      return;
    }
    this.clipID.setValue(this.activeClip.docID!);
    this.title.setValue(this.activeClip.title);
    this.inSubmission = false;
    this.showAlter = false;
  }

  async submit() {
    if (!this.activeClip) {
      return;
    }

    this.showAlter = true;
    this.inSubmission = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please Wait, Updating Clip.';

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value);
    } catch (e) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something Went Wrong, Try Again Later.';
      return;
    }

    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success!';
  }
}
