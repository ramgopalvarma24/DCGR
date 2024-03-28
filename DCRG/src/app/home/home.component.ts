import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedFile: File | null = null;
  
  submitForm(){
  let Cert_Data: string[] = []; 
  console.log(Cert_Data);
  //console.log(this.name)

  if (this.selectedFile){
    console.log('Added successfully');
  }
  }
  onFileSelected(event: any){
    this.selectedFile = event.target.files[0]
  }

}
