import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public user!: SocialUser;
  public authorized: boolean = false;
  
  constructor( private authService: SocialAuthService, private api:ApiServiceService ) {}
  
  public socialSignIn(socialPlatform : string) {  

    let socialPlatformProvider:string="";

    if(socialPlatform == "facebook")
    {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    else if(socialPlatform == "google")
    {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.authService.signIn(socialPlatformProvider)
    .then(
      (userData) => 
      {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData        
        if (userData != null) 
        {
          this.authorized = true;
          this.user = userData;               
        }       
      }
    );
  }

  public signUp(user:any){
    this.api.postSignUpForm(user.email,user.password).subscribe(
      res=>{
        alert("SignUp Successful");
      },
      error=>{
        alert("SignUp Unsuccessful");
      }
    )
  }

  public signOut()
  {
    this.authService.signOut();
    this.authorized = false;
  }

  ngOnInit(): void {
  }

}
