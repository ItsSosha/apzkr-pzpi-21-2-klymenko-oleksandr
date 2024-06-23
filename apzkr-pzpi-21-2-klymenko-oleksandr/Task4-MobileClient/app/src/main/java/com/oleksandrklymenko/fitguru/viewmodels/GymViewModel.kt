package com.oleksandrklymenko.fitguru.viewmodels

import androidx.compose.runtime.staticCompositionLocalOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.oleksandrklymenko.fitguru.models.Gym
import com.oleksandrklymenko.fitguru.models.GymApiImpl
import com.oleksandrklymenko.fitguru.network.HttpClientProvider
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class GymViewModel : ViewModel() {
    private val gymApi = GymApiImpl(HttpClientProvider.client)

    private val _gyms = MutableStateFlow<List<Gym>>(emptyList())
    val gyms: StateFlow<List<Gym>> = _gyms.asStateFlow()


    private val _loadingGyms = MutableStateFlow(false)
    val loadingGyms = _loadingGyms.asStateFlow()

    fun fetchGyms() {
        _loadingGyms.value = true
        viewModelScope.launch {
            val gyms = gymApi.getGyms()
            _gyms.value = gyms
            _loadingGyms.value = false
        }
    }

    init {
        fetchGyms()
    }
}


val LocalGymViewModel = staticCompositionLocalOf<GymViewModel> { error("No GymViewModel provided") }