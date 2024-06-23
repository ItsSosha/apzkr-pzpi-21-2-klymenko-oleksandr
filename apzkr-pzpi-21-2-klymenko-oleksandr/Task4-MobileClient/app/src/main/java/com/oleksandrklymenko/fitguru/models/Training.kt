package com.oleksandrklymenko.fitguru.models

import com.oleksandrklymenko.fitguru.utils.DateTimeUtils
import kotlinx.serialization.Serializable

@Serializable
data class Training(
    val id: String,
    val measurements: List<Measurement>? = emptyList(),
    val gym: Gym,
    val startDate: String,
    val endDate: String?,
    val recommendations: String?
) {
    val formattedStartDate: String
        get() = DateTimeUtils.formatDateTime(DateTimeUtils.parseIsoDate(startDate))

    val formattedEndDate: String?
        get() = endDate?.let { DateTimeUtils.formatDateTime(DateTimeUtils.parseIsoDate(it)) }
}