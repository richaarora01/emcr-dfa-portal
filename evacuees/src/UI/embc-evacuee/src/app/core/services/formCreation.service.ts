import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { PersonDetailsForm, PersonDetails, ContactDetailsForm, ContactDetails } from '../model/createProfile.model';
import { CustomValidationService } from './customValidation.service';

@Injectable({ providedIn: 'root' })
export class FormCreationService {

    private personalDetailsForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(
        this.formBuilder.group(new PersonDetailsForm(new PersonDetails(), this.customValidator)));

    private personalDetailsForm$: Observable<FormGroup> = this.personalDetailsForm.asObservable();

    private contactDetailsForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(
        this.formBuilder.group(new ContactDetailsForm(new ContactDetails(), this.customValidator)));

    private contactDetailsForm$: Observable<FormGroup> = this.contactDetailsForm.asObservable();

    constructor(private formBuilder: FormBuilder, private customValidator: CustomValidationService) { }

    getPeronalDetailsForm(): Observable<FormGroup> {
        return this.personalDetailsForm$;
    }

    setPersonDetailsForm(personForm: FormGroup): void {
        this.personalDetailsForm.next(personForm);
    }

    getContactDetailsForm(): Observable<FormGroup> {
        return this.contactDetailsForm$;
    }

    setContactDetailsForm(contactForm: FormGroup): void {
        this.contactDetailsForm.next(contactForm);
    }

}
