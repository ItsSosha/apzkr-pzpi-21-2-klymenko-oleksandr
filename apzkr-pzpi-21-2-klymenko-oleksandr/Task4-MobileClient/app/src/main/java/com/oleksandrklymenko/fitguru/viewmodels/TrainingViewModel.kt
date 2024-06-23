package com.oleksandrklymenko.fitguru.viewmodels

import androidx.compose.runtime.staticCompositionLocalOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.oleksandrklymenko.fitguru.models.Training
import com.oleksandrklymenko.fitguru.models.TrainingApiImpl
import com.oleksandrklymenko.fitguru.network.HttpClientProvider
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class TrainingViewModel : ViewModel() {
    private val trainingApi = TrainingApiImpl(HttpClientProvider.client)

    private val _trainings = MutableStateFlow<List<Training>>(emptyList())
    val trainings: StateFlow<List<Training>> = _trainings.asStateFlow()

    private val _loadingTrainings = MutableStateFlow(false)
    val loadingTrainings = _loadingTrainings.asStateFlow()

    fun fetchTrainings() {
        _loadingTrainings.value = true
        viewModelScope.launch {
            val trainings = trainingApi.getTrainings()
            _trainings.value = trainings
            _loadingTrainings.value = false
        }
    }

    init {
        fetchTrainings()
    }

    private var _selectedTraining = MutableStateFlow<Training?>(null)
    val selectedTraining: StateFlow<Training?> = _selectedTraining.asStateFlow()

    private fun replaceTrainingInList(training: Training) {
        val existingTrainingId = _trainings.value.indexOfFirst {
            it.id == training.id
        }

        if (existingTrainingId > -1) {
            _trainings.value = _trainings.value.mapIndexed { i, existing ->  if (i == existingTrainingId) training else existing }
        }
    }

    fun selectTraining(training: Training) {
        _selectedTraining.value = training
    }

    fun getTraining(id: String) {
        viewModelScope.launch {
            val currentTraining = trainingApi.getTraining(id)
            _selectedTraining.value = currentTraining
            replaceTrainingInList(currentTraining)
        }
    }

    fun finishTraining() {
        viewModelScope.launch {
            val finishedTraining = trainingApi.finishTraining()
            _selectedTraining.value = finishedTraining
            replaceTrainingInList(finishedTraining)
        }
    }

    fun generateRecommendations() {
        viewModelScope.launch {
            val training = selectedTraining.value
            if (training != null) {
                val trainingWithRecommendations = trainingApi.generateRecommendations(training.id)
                _selectedTraining.value = trainingWithRecommendations
            }
        }
    }
}

val LocalTrainingViewModel = staticCompositionLocalOf<TrainingViewModel> { error("No TrainingViewModel provided") }