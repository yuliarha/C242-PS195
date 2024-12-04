package com.app.travel.data.repo

import com.app.travel.data.pref.UserModel
import com.app.travel.data.pref.UserPreference
import com.app.travel.data.response.LoginResponse
import com.app.travel.data.response.RegisterResponse
import com.app.travel.data.retrofit.ApiService
import kotlinx.coroutines.flow.Flow

class UserRepository private constructor(
    private val userPreference: UserPreference,
    private val apiService: ApiService
){
    suspend fun register(username: String, email: String, password: String, confirmPassword: String, userLocation: String) : RegisterResponse {
        return apiService.register(username, email, password, confirmPassword, userLocation)
    }

    suspend fun login(email: String, password: String) : LoginResponse {
        return apiService.login(email, password)
    }

    suspend fun saveSession(user: UserModel) {
        userPreference.saveSession(user)
    }

    fun getSession(): Flow<UserModel> {
        return userPreference.getSession()
    }

    suspend fun logout() {
        userPreference.logout()
    }

    companion object {
        @Volatile
        private var instance: UserRepository? = null
        fun getInstance(
            userPreference: UserPreference,
            apiService: ApiService
        ): UserRepository =
            instance ?: synchronized(this) {
                instance ?: UserRepository(userPreference, apiService)
            }.also { instance = it }
    }
}