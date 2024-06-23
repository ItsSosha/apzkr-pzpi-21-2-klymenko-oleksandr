package com.oleksandrklymenko.fitguru.models

import com.oleksandrklymenko.fitguru.utils.env
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.statement.HttpResponse

interface GymApi {
    val client: HttpClient

    suspend fun getGyms(): List<Gym>
}

class GymApiImpl(override val client: HttpClient): GymApi {
    private val baseUrl: String = env.get("API_BASE_URL")

    override suspend fun getGyms(): List<Gym> {
        val response: HttpResponse = client.get("$baseUrl/gyms")
        return response.body()
    }
}