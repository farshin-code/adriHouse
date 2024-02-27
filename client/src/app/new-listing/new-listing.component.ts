import { Component } from '@angular/core';
import { NewListingService } from '../services/new-listing.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrl: './new-listing.component.css'
})
export class NewListingComponent {

  constructor(private newListingService: NewListingService, private authService: AuthService) {}
  toast: boolean = false;
  options = Array.from({ length: 20 }, (_, i) => i + 1);
  postedFor: string = 'sell'; 
  file: File = new File([], '');

  onSubmit(form: any) {
    const formData = new FormData();   
    formData.append('file', this.file);
     this.newListingService.postNewListingImage(formData).subscribe(  {
       next: (resFromFileService) => {
        const dataToSend = {...form.value, imgPath: resFromFileService, postedBy: this.authService.currentUser() }
       this.newListingService.postNewListing(dataToSend).subscribe(

        {
          next: (res) => {
            form.reset();
            this.postedFor = 'sell';
          },
          error: (err) => {
            console.log(err)
            this.toast = true

            //because of error i send a signal to file server to delete the image:
            this.newListingService.deleteFileFromServer(resFromFileService).subscribe(
              {
                next: (res) => {
                  console.log(res)
                },
                error: (err) => {
                  this.toast = true
                  console.log("error in delete file from server",err)
                }

              }
            )
          }
        }
       )  
       },
       error: (err) => {
         console.log(err)
         this.toast = true
       }
       
     
     })
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

}
