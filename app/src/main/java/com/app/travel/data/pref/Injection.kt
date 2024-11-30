package com.app.travel.data.pref

import android.content.Context
import com.app.travel.data.retrofit.ApiConfig

object Injection {
    fun provideRepository(context: Context) : UserRepository {
        val apiService = ApiConfig.getApiService()
        return UserRepository.getInstance(apiService)
    }
}