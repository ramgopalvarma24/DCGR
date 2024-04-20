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
    page: '',
    id_cd: '',
    sp_ac: '',
    prob_err: ''
  };

  cert_response: any;
  IsCertSuccess: boolean | undefined;
  UploadresponseMessage: string | undefined ;
  isUploadSuccess: boolean | undefined;
  cert_link: any;


  //Initiating the service by calling through constructor
  constructor(private reportDataSrvice : ReportDataService, private fileUploadeservice: FileUploaderService) { }

  ngOnInit(): void {

  }

  //declaration of file to store the pdf files
  x_linear: File | undefined;
  y_linear: File | undefined;
  z_linear: File | undefined;



  //method triggering
  onXLinearFileSelected(event: any) {
    this.x_linear = event.target.files[0];
  }

  onYLinearFileSelected(event: any) {
    this.y_linear = event.target.files[0];
  }

  onZLinearFileSelected(event: any) {
    this.z_linear = event.target.files[0];
  }
  
  //Defining form method onsubmit
  uploadFiles() {
    if (!this.x_linear || !this.y_linear || !this.z_linear) {
      console.log('Please select all files.');
      return;
    }

    //const fileFormData = new FormData();
    const fileFormData = new FormData();
    fileFormData.append('x_linear', this.x_linear);
    fileFormData.append('y_linear', this.y_linear);
    fileFormData.append('z_linear', this.z_linear);

    this.fileUploadeservice.uploadFiles(fileFormData).subscribe(
      file_response => {
        
        console.log('Files Uploaded successfully- > ', file_response.msg);
        this.UploadresponseMessage =  file_response.msg;
        this.isUploadSuccess = true;
      },
      error =>{
        this.isUploadSuccess = false;
        console.log('Error uploading files: _>', error);
        this.isUploadSuccess = false;
        this.UploadresponseMessage = "An error occurred while Uploading files";
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
        this.cert_response = response.msg;
        console.log("Request sent: ",this.cert_response);
        //console.log("check message: ",cert_response.msg);
        console.log("file Path: ",response.doc_file);
        this.cert_link = response.doc_file
        this.IsCertSuccess = true;
      },
      error =>{
        console.log('Error: ', error);
        this.IsCertSuccess = false;
        this.cert_response = 'An error occurred while Generating Certificate';

      }
    )
  }

}
