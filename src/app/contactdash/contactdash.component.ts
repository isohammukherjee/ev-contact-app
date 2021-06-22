import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ContactDashModel } from './contactdash.model';

@Component({
  selector: 'app-contactdash',
  templateUrl: './contactdash.component.html',
  styleUrls: ['./contactdash.component.css']
})
export class ContactdashComponent implements OnInit {

  showAdd!: boolean;
  showUpdate!: boolean;
  formValue !: FormGroup;
  contactModelObj : ContactDashModel = new ContactDashModel();
  contactAll: any;

  constructor(private formBuilder : FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailId: [''],
      phoneNumber: [''],
      statusVal: ['']
    });

    this.getAllContacts();

  }

  clickAddContact() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postContactDetails() {
    this.contactModelObj.id = this.formValue.value.id;
    this.contactModelObj.firstName = this.formValue.value.firstName;
    this.contactModelObj.lastName = this.formValue.value.lastName;
    this.contactModelObj.emailId = this.formValue.value.emailId;
    this.contactModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.contactModelObj.statusVal = this.formValue.value.statusVal;

    this.api.postContact(this.contactModelObj).subscribe(res => {
      console.log("res =>", res);
      alert("Contact Added Successfully!");
      this.formValue.reset();
      this.getAllContacts();
    }, err => {
      alert("Something Went Wrong While Adding Contact!!!!");
    });

  }

  getAllContacts(){
    this.api.getContact().subscribe(res => {
      console.log("fetched res =>", res);
      this.contactAll = res;
    });
  }

  deleteContacts(data:any) {
    this.api.deleteContact(data.id).subscribe(res => {
      alert("Contact Deleted Successfully!");
      this.getAllContacts();
    });
  }

  onEdit(data: any) {
    
    this.showAdd = false;
    this.showUpdate = true;
    this.contactModelObj.id = data.id;
    this.formValue.controls['firstName'].setValue(data.firstName);
    this.formValue.controls['lastName'].setValue(data.lastName);
    this.formValue.controls['emailId'].setValue(data.emailId);
    this.formValue.controls['phoneNumber'].setValue(data.phoneNumber);
    this.formValue.controls['statusVal'].setValue(data.statusVal);
  }

  updateContactDetails() {
    this.contactModelObj.firstName = this.formValue.value.firstName;
    this.contactModelObj.lastName = this.formValue.value.lastName;
    this.contactModelObj.emailId = this.formValue.value.emailId;
    this.contactModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.contactModelObj.statusVal = this.formValue.value.statusVal;

    this.api.updateContact(this.contactModelObj, this.contactModelObj.id).subscribe(res => {
      alert("Contact Updated Successfully!");
      //this.formValue.reset();
      this.getAllContacts();
    });

  }

}
