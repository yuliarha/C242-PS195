package com.app.travel.data.retrofit

import com.app.travel.data.response.LoginResponse
import com.app.travel.data.response.RegisterResponse
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface ApiService {
    @FormUrlEncoded
    @POST("register")
    suspend fun register (
        @Field("username") name: String,
        @Field("email") email: String,
        @Field("password") password: String,
        @Field("confirmPassword") confirmPassword: String,
        @Field("userLocation") userLocation: String
    ) : RegisterResponse

    @FormUrlEncoded
    @POST("login")
    suspend fun login (
        @Field("email") name: String,
        @Field("password") password: String
    ) : LoginResponse
}