import { FunctionCall } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name: string; // typescript환경설정
  email: string;
  username: string;
  password1: string;
  password2: string;

  constructor(
    private vaildateService: ValidateService,
    private flashMesssage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit(): any {
    //패스워드 일치 여부 검증
    if (this.password1 !== this.password2) {
      this.flashMesssage.show(
        '패스워드가 일치하지 않습니다. 다시 입력하세요.',
        {
          cssClass: 'alert-danger',
          timeout: 3000,
        }
      );
      return false;
    }

    //이메일 주소 유효성 검증
    if (!this.vaildateService.validateEmail(this.email)) {
      this.flashMesssage.show('유효한 이메일주소를 입력하세요.', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    //사용자 입력정보를 JSON 객체 생성
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password1,
    };

    if (!this.vaildateService.validateRegister(user)) {
      this.flashMesssage.show('모든 필드들을 입력하세요.', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.flashMesssage.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMesssage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/register']);
      }
    });
  }
}
