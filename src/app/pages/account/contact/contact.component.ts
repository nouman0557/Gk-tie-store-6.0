import {Component, OnInit} from '@angular/core';
import {ContactDataService} from 'src/app/services/contact/contactDataService.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    contactMessage;
    public contactForm: FormGroup;

    constructor(
        private ContactDataService: ContactDataService,
        private fb: FormBuilder,
        private toastrService: ToastrService
    ) {
    }

    lat = 51.678418;
    lng = 7.809007;

    ngOnInit() {
        this.ContactDataService.getContactMessage().subscribe(res => {
            console.log(res.body);
            this.contactMessage = res.body;
        })
        this.contactForm = this.fb.group({
            Name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
            Email: ['', [Validators.required, Validators.email]],
            Website: [''],
            message: ['', Validators.required],
            Subject: ['']
        })
    }

    //Phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    SendContactEmail() {
        let date = JSON.parse(JSON.stringify(this.contactForm.value))
        this.ContactDataService.contactDataSend(date).subscribe(res => {
            console.log(res);
            this.toastrService.success('Thank You for Contacting Us.');
            this.contactForm.reset();
        })
    }
}
