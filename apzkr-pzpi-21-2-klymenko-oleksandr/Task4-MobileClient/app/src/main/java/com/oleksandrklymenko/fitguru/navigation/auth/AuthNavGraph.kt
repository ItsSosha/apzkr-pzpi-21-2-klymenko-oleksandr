package com.oleksandrklymenko.fitguru.navigation.auth

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.oleksandrklymenko.fitguru.navigation.LocalNavController

@Composable
fun AuthNavGraph() {
    val navController = LocalNavController.current
    NavHost(navController, startDestination = AuthRoutes.SignIn) {
        composable(AuthRoutes.SignIn) {
            SignInScreen()
        }
        composable(AuthRoutes.SignUp) {
            SignUpScreen()
        }
    }
}