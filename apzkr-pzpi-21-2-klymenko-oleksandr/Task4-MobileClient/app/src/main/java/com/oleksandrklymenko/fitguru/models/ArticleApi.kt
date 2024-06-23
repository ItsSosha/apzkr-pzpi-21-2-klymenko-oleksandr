package com.oleksandrklymenko.fitguru.models

import com.oleksandrklymenko.fitguru.utils.env
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.statement.HttpResponse
import io.ktor.http.isSuccess
import io.ktor.http.path


interface ArticleApi {
    val client: HttpClient

    suspend fun search(query: String): List<Article>
    suspend fun getArticle(id: String): Article
}

class ArticleApiImpl(override val client: HttpClient): ArticleApi {
    private val baseUrl: String = env.get("API_BASE_URL")

    override suspend fun search(query: String): List<Article> {
        try {
            val response: HttpResponse = client.get("$baseUrl/articles?query=$query")

            if (response.status.isSuccess()) {
                return response.body()
            } else {
                throw Exception("Invalid query")
            }
        } catch (e: Exception) {
            throw Exception("Error occurred while searching articles", e)
        }
    }

    override suspend fun getArticle(id: String): Article {
        try {
            val response: HttpResponse = client.get("$baseUrl/articles/$id")

            if (response.status.isSuccess()) {
                return response.body()
            } else {
                throw Exception("There is no article with ID $id")
            }
        } catch (e: Exception) {
            throw Exception("Error occurred while getting article", e)
        }
    }
}