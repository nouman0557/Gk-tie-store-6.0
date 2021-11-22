import { Component, OnInit } from '@angular/core';
import { TeamSlider, TestimonialSlider } from '../../shared/data/slider';
import { IndexDataServcies } from 'src/app/services/index/IndexDataService.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(
    private IndexDataServcies: IndexDataServcies,

  ) { }

  footer;
  ngOnInit(): void {
    this.IndexDataServcies.getFooterSection().subscribe(res => {
      console.log(res);
      this.footer = res.body;
  })
  }

  public TeamSliderConfig: any = TeamSlider;
  public TestimonialSliderConfig: any = TestimonialSlider;

  // Testimonial Carousel
  public testimonial = [{
    image: 'assets/images/team/1.jpeg',
    name: 'Allan Jones',
    designation: 'CEO',
    description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  }, {
    image: 'assets/images/team/2.jpeg',
    name: 'Chris Homer',
    designation: 'CTO',
    description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  }]

  // Team 
  public team = [{
    image: 'assets/images/team/1.jpg',
    name: 'Mark jkcno',
    designation: 'Designer'
  }, {
    image: 'assets/images/team/2.jpg',
    name: 'Adegoke Yusuff',
    designation: 'Content Writer'
  }, {
    image: 'assets/images/team/3.jpg',
    name: 'John Shipmen',
    designation: 'Lead Developer'
  }, {
    image: 'assets/images/team/4.jpg',
    name: 'Hileri Keol',
    designation: 'CEO & Founder at Company'
  }, {
    image: 'assets/images/team/3.jpg',
    name: 'John Shipmen',
    designation: 'Lead Developer'
 }]

}


// public testimonial = [{
//   image: 'assets/template/demos/01_team.png',
//   name: 'Jessica Motra',
//   designation: 'Web Designer',
//   description: 'Cras dapibus. Vivamus elementum semper  Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae',
// }, {
//   image: 'assets/template/demos/02_team.png',
//   name: 'Luke Backer',
//   designation: 'Web Designer',
//   description: 'Cras dapibus. Vivamus elementum semper  Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae',
// }, {
//   image: 'assets/template/demos/03_team.png',
//   name: 'John DEO',
//   designation: 'Web Designer',
//   description: 'Cras dapibus. Vivamus elementum semper  Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae',
// }, {
//   image: 'assets/template/demos/04_team.png',
//   name: 'Adam DEO',
//   designation: 'Web Designer',
//   description: 'Cras dapibus. Vivamus elementum semper  Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae',
// }]