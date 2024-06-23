package com.oleksandrklymenko.fitguru.models

import kotlinx.serialization.Serializable

@Serializable
data class Gym(
    val id: String,
    val name: String,
    val address: String
)