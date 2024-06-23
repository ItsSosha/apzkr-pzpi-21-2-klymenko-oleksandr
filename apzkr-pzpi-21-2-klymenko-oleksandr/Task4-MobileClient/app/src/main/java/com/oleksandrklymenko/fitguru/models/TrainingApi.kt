package com.oleksandrklymenko.fitguru.models

import com.oleksandrklymenko.fitguru.utils.env
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.statement.HttpResponse
import io.ktor.http.isSuccess

interface TrainingApi {
    val client: HttpClient

    suspend fun getTrainings(): List<Training>
    suspend fun startTraining()
    suspend fun getTraining(id: String): Training
    suspend fun finishTraining(): Training
    suspend fun generateRecommendations(id: String): Training
}

class TrainingApiImpl(override val client: HttpClient): TrainingApi {
    private val baseUrl: String = env.get("API_BASE_URL")

    override suspend fun getTrainings(): List<Training> {
        val response: HttpResponse = client.get("$baseUrl/trainings")
        return response.body()
    }

    override suspend fun startTraining() {
        try {
            val response: HttpResponse = client.post("$baseUrl/trainings/start")

            if (response.status.isSuccess()) {
                return response.body()
            } else {
                throw Exception("There is already training in progress")
            }
        } catch (e: Exception) {
            throw Exception("Error occurred while staring training", e)
        }
    }

    override suspend fun getTraining(id: String): Training {
        try {
            val response: HttpResponse = client.get("$baseUrl/trainings/$id")

            if (response.status.isSuccess()) {
                return response.body()
            } else {
                throw Exception("There is no training with ID $id")
            }
        } catch (e: Exception) {
            throw Exception("Error occurred while getting training", e)
        }
    }

    override suspend fun finishTraining(): Training {
        try {
            val response: HttpResponse = client.post("$baseUrl/trainings/end")

            if (response.status.isSuccess()) {
                return response.body()
            } else {
                throw Exception("There is no active training to finish")
            }
        } catch (e: Exception) {
            throw Exception("Error occurred while finishing training", e)
        }
    }

    override suspend fun generateRecommendations(id: String): Training {
        try {
            val response: HttpResponse = client.post("$baseUrl/trainings/$id/generate-recommendations")

            if (response.status.isSuccess()) {
                return response.body()
            } else {
                throw Exception("There are already recommendations for the provided training")
            }
        } catch (e: Exception) {
            throw Exception("Error occurred while generating recommendations", e)
        }
    }
}