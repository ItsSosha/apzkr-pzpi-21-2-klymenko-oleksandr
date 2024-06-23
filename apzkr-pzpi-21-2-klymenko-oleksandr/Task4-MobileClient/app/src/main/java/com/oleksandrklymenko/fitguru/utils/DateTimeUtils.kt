package com.oleksandrklymenko.fitguru.utils

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

object DateTimeUtils {
    fun parseIsoDate(isoString: String): LocalDateTime {
        return LocalDateTime.parse(isoString, DateTimeFormatter.ISO_DATE_TIME)
    }

    fun formatDateTime(dateTime: LocalDateTime): String {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        return dateTime.format(formatter)
    }
}
