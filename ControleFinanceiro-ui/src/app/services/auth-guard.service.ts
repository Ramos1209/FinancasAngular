import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private jwtHelper:JwtHelperService,private router: Router) { }

  canActivate(): boolean {
   const token = localStorage.getItem('TokenUser');

   if(token && !this.jwtHelper.isTokenExpired(token)){
    return true;
   }
    this.router.navigate(['usuarios/login'])
    return false;
  }

    VerificarAdministrador(): boolean {
   
     const token: any = localStorage.getItem('TokenUser');
   
      const tokenUsuario: any = decode(token)
      console.log('tokenUsuario',tokenUsuario)
   
      if (tokenUsuario.role === 'Administrador') {
        return true;
      } else {
        return false;
      }
    }
    

  
  }

