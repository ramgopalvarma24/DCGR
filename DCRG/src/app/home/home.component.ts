import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ReportDataService } from '../services/report-data.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { FormData } from '../Interfaces/formData.interface';
import { FileUploaderService } from '../services/file-uploader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formData: FormData = {
    customer: '',
    address: '',
    make: '',
    model: '',
    prob_head: '',
    size: '',
    s_1: '',
    s_2: '',
    s_3: '',
    probe: '',
    temp: '',
    humidity: '',
    c_num: '',
    c_on: '',
    next_date: '',
    page: ''
  };


  //Initiating the service by calling through constructor
  constructor(private reportDataSrvice : ReportDataService, private fileUploadeservice: FileUploaderService) { }

  ngOnInit(): void {

  }

  //declaration of file to store the pdf files
  xLinearFile: File | undefined;
  yLinearFile: File | undefined;
  zLinearFile: File | undefined;



  //method triggering
  onXLinearFileSelected(event: any) {
    this.xLinearFile = event.target.files[0];
  }

  onYLinearFileSelected(event: any) {
    this.yLinearFile = event.target.files[0];
  }

  onZLinearFileSelected(event: any) {
    this.zLinearFile = event.target.files[0];
  }
  
  //Defining form method onsubmit
  uploadFiles() {
    if (!this.xLinearFile || !this.yLinearFile || !this.zLinearFile) {
      console.log('Please select all files.');
      return;
    }

    //const fileFormData = new FormData();
    const fileFormData = new FormData();
    fileFormData.append('xLinearFile', this.xLinearFile);
    fileFormData.append('yLinearFile', this.yLinearFile);
    fileFormData.append('zLinearFile', this.zLinearFile);

    this.fileUploadeservice.uploadFiles(fileFormData).subscribe(
      response => {
        console.log('Files Uploaded successfully', response);
      },
      error =>{
        console.log('Error uploading files:', error);
      }
    );
    
  }


  //earlier code
  /* UploadFiles(){
  if (this.selectedFile.length == 0){
    console.log('No files selected');
    return;
  }
  for (const file of this.selectedFile){
    this.fileUploadeservice.uploadFile(file).subscribe(
      response =>{
        console.log('File uploaded successfully : ',response);
      },
      error => {
        console.log('Error uloading files',error);
      }
    )
  }
  } */
  

  //decalring the method for services to subscibe the data from API
  onSubmit(formData:FormData){
    console.log('form data: ',formData);
    this.reportDataSrvice.PassReportData(formData).subscribe(
      response => {
        console.log(response)
      },
      error =>{
        console.log('Error: ', error)
      }
    )
  }

}
