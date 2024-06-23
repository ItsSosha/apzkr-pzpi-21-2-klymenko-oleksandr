package com.oleksandrklymenko.fitguru.models

import kotlinx.serialization.Serializable

@Serializable
data class Measurement(
    val id: String,
    val date: String,
    val temperature: Float,
    val heartRate: Int
)