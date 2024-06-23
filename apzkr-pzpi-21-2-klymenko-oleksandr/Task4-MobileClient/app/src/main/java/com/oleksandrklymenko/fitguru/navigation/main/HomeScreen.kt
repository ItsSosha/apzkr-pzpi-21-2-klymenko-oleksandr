package com.oleksandrklymenko.fitguru.navigation.main

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.google.firebase.auth.FirebaseAuth
import com.oleksandrklymenko.fitguru.R
import com.oleksandrklymenko.fitguru.navigation.LocalNavController

@Composable
fun HomeScreen() {
    val navController = LocalNavController.current

    Text(text = "Go to trainings", modifier = Modifier.clickable { navController.navigate(MainRoutes.Trainings) })
}