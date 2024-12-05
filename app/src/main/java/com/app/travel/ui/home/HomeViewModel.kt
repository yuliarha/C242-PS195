package com.app.travel.ui.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.app.travel.data.response.RecommendationResponse
import com.app.travel.data.retrofit.ApiConfig
import kotlinx.coroutines.launch

class HomeViewModel : ViewModel() {

    private val _recommendations = MutableLiveData<List<RecommendationResponse?>>()
    val recommendations: LiveData<List<RecommendationResponse?>> = _recommendations

    fun fetchRecommendations(lokasi: String) {
        viewModelScope.launch {
            try {
                val response = ApiConfig.getRecommendationService().getRecommendations(lokasi)
                _recommendations.postValue(response)
            } catch (e: Exception) {
                // Handle error
                e.printStackTrace()
            }
        }
    }
}