import { Component, OnInit } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  doc,
  docData,
} from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from '../core/user-profile.model';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../core/auth.service';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private userDoc: DocumentReference | undefined;
  user$: Observable<any> | undefined;
  uid: string | null;

  loading: boolean = false;
  error: string | null = null;

  downloadURL: Promise<string> | null;
  uploadProgress: number = 0;

  constructor(
    private auth: AuthService,
    private afStore: Firestore,
    private route: ActivatedRoute,
    private afStorage: Storage
  ) {
    this.uid = this.route.snapshot.paramMap.get('id');
    const imgRef = ref(this.afStorage, `users/${this.uid}/profile-image`);
    this.downloadURL = getDownloadURL(imgRef);
  }

  ngOnInit(): void {
    this.userDoc = doc(this.afStore, `users/${this.uid}`);
    this.user$ = docData(this.userDoc);
  }

  fileChange(event: any) {
    this.downloadURL = null;
    this.error = null;

    // get the file
    const file = event.target.files[0];

    // create the file reference
    const filePath = `users/${this.uid}/profile-image`;
    const fileRef = ref(this.afStorage, filePath);

    // upload and store the task
    const task = uploadBytesResumable(fileRef, file);
    task.catch((error) => (this.error = error.message));

    task.on('state_changed', {
      // observer percentage changes
      next: (snapshot) => {
        this.uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      error: (error) => {
        this.error = error.message;
      },
      // get notified when the download URL is available
      complete: () => {
        this.downloadURL = getDownloadURL(fileRef);
      },
    });
  }

  async onSubmit(ngForm: NgForm) {
    this.loading = true;
    const { email, name, address, city, state, zip, ip, phone, specialty } =
      ngForm.form.getRawValue();
    const userProfile: UserProfile = {
      uid: this.uid ?? '',
      email,
      name,
      address,
      city,
      state,
      zip,
      ip,
      phone,
      specialty,
    };
    try {
      await this.auth.updateUserDocument(userProfile);
    } catch (error: any) {
      console.log(error.message);
      this.error = error.message;
    }
    this.loading = false;
  }
}
