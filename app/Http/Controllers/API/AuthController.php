<?php

namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{     

    public function login(Request $request)
    {
        dd('test');
        $validateddata= $this->validate($request,[ 
            "email"=>'required|string|:max:191:unique:users',
            "password"=>'required:string:min:6'
        ]);
        if(!Auth::attempt($login)){
            return response(['message'=>'invalid credentials']);  
        }    
        $accessToken = Auth::user()->createToken('authToken')->accessToken;
        return response(['user'=>Auth::user(), 'access_token'=>$accessToken]);  
    } 
    public function register(Request $request)
    {
        $validateddata= $this->validate($request,[
            "name"=>'required|string|:max:191',
            "email"=>'required|string|:max:191:unique:users',
            "password"=>'required:string:min:6'
        ]);

        $user = User::create($validateddata);
        $accesstoken = $user->createtoken('authToken')->access_token;
        return response(['user'=>$user, 'access_token'=>$accesstoken]);  
    }  
}

