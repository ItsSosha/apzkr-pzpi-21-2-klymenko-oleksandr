package com.oleksandrklymenko.fitguru.navigation.auth

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TextField
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import com.oleksandrklymenko.fitguru.R
import com.oleksandrklymenko.fitguru.viewmodels.LocalAuthViewModel
import com.oleksandrklymenko.fitguru.navigation.LocalNavController
import com.oleksandrklymenko.fitguru.viewmodels.AuthState

@Composable
fun SignInScreen() {
    val navController = LocalNavController.current
    val authViewModel = LocalAuthViewModel.current
    val authState by authViewModel.authState.collectAsState()

    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center
    ) {
        if (authState is AuthState.Error) {
            Text(text = "AUTH ERROR")
            Spacer(modifier = Modifier.height(8.dp))
        }

        TextField(
            value = email,
            onValueChange = { email = it },
            label = { Text(stringResource(R.string.email)) },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(8.dp))
        TextField(
            value = password,
            onValueChange = { password = it },
            label = { Text(stringResource(R.string.password)) },
            modifier = Modifier.fillMaxWidth(),
            visualTransformation = PasswordVisualTransformation()
        )
        Spacer(modifier = Modifier.height(8.dp))
        Button(
            onClick = { authViewModel.signIn(email, password) },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(stringResource(R.string.sign_in))
        }
        Spacer(modifier = Modifier.height(8.dp))
        TextButton(onClick = {
            navController.navigate(AuthRoutes.SignUp) {
                popUpTo(AuthRoutes.SignIn) {
                    inclusive = true
                }
            }
        }) {
            Text(stringResource(R.string.no_account))
        }

        if (authState is AuthState.Loading) {
            CircularProgressIndicator()
        }
    }
}
