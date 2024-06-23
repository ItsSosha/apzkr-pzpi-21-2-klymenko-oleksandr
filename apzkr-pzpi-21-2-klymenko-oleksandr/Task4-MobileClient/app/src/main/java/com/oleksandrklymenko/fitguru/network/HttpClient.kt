package com.oleksandrklymenko.fitguru.network

import com.google.firebase.auth.FirebaseAuth
import io.ktor.client.*
import io.ktor.client.engine.cio.CIO
import io.ktor.client.engine.okhttp.OkHttp
import io.ktor.client.plugins.HttpSend
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json
import io.ktor.client.plugins.logging.*
import io.ktor.client.plugins.plugin
import io.ktor.client.request.header
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.tasks.await

suspend fun getFirebaseIdToken(): String? {
    val user = FirebaseAuth.getInstance().currentUser
    return user?.getIdToken(false)?.await()?.token
}


object HttpClientProvider {
    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                prettyPrint = true
                isLenient = true

            })
        }
        install(Logging) {
            level = LogLevel.ALL
            logger = Logger.DEFAULT
        }
    }.let {
        it.plugin(HttpSend).intercept { request ->
            val token = runBlocking { getFirebaseIdToken() }
            request.header("Authorization", token)
            execute(request)
        }
        it
    }
}