package com.oleksandrklymenko.fitguru.models

import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: String,
    val name: String,
    val surname: String
)