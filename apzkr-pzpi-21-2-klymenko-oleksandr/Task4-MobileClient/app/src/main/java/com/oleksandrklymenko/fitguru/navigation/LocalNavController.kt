package com.oleksandrklymenko.fitguru.navigation

import androidx.compose.runtime.staticCompositionLocalOf
import androidx.navigation.NavController
import androidx.navigation.NavHostController

val LocalNavController = staticCompositionLocalOf<NavHostController>{ error("No NavHostController provided") }