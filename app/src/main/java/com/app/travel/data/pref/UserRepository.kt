package com.app.travel.data.pref

import com.app.travel.data.response.RegisterResponse
import com.app.travel.data.retrofit.ApiService

class UserRepository private constructor(
    private val apiService: ApiService
){
    suspend fun register(username: String, email: String, password: String) : RegisterResponse {
        return apiService.register(username, email, password)
    }

    companion object {
        @Volatile
        private var instance: UserRepository? = null

        fun getInstance(
            apiService: ApiService
        ): UserRepository =
            instance ?: synchronized(this) {
                instance ?: UserRepository(apiService)
            }.also { instance = it }
    }
}