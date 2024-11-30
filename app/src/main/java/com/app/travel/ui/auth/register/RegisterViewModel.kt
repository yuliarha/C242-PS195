package com.app.travel.ui.auth.register

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.app.travel.data.pref.UserRepository
import com.app.travel.data.response.ErrorResponse
import com.google.gson.Gson
import kotlinx.coroutines.launch
import retrofit2.HttpException

class RegisterViewModel(private val repository: UserRepository) : ViewModel(){
    private val _registerResult = MutableLiveData<String>()
    val registerResult: LiveData<String> get() =_registerResult

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> get() = _isLoading

    fun register(username: String, email: String, password: String) {
        _isLoading.value = true
        viewModelScope.launch {
            try {
                val message = repository.register(username, email, password).message
            } catch (e: HttpException) {
                val jsonInString = e.response()?.errorBody()?.string()
                val errorBody = Gson().fromJson(jsonInString, ErrorResponse::class.java)
                val errorMessage = errorBody.message
            }

        }
    }
}