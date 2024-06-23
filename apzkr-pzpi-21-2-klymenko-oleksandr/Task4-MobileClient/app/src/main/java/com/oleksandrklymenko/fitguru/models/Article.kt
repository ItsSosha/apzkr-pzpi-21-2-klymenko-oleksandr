package com.oleksandrklymenko.fitguru.models

import kotlinx.serialization.Serializable

@Serializable
data class Article(
    val id: String,
    val title: String,
    val content: String,
    var cover: String?,
    val tags: List<String>,
    val author: User?
)