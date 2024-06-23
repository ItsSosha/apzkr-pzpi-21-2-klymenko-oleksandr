package com.oleksandrklymenko.fitguru

import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.oleksandrklymenko.fitguru.navigation.LocalNavController
import com.oleksandrklymenko.fitguru.navigation.auth.AuthNavGraph
import com.oleksandrklymenko.fitguru.navigation.main.MainNavGraph
import com.oleksandrklymenko.fitguru.ui.BottomBar
import com.oleksandrklymenko.fitguru.ui.TopBar
import com.oleksandrklymenko.fitguru.ui.theme.MyApplicationTheme
import com.oleksandrklymenko.fitguru.viewmodels.AuthState
import com.oleksandrklymenko.fitguru.viewmodels.AuthViewModel
import com.oleksandrklymenko.fitguru.viewmodels.LocalAuthViewModel

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                App()
            }
        }
    }
}

@Composable
fun App() {
    val navController = rememberNavController()
    val authViewModel: AuthViewModel = viewModel()

    val authState by authViewModel.authState.collectAsState()

    CompositionLocalProvider(LocalAuthViewModel provides authViewModel, LocalNavController provides navController) {
        Scaffold(
            topBar = { TopBar() },
            bottomBar = {
                if (authState is AuthState.Authenticated) {
                    BottomBar()
                }
            }
        ) { innerPadding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding),
                contentAlignment = Alignment.Center
            ) {
                when (authState) {
                    is AuthState.Authenticated -> MainNavGraph()
                    is AuthState.Unauthenticated, is AuthState.Error -> AuthNavGraph()
                    else -> {
                        CircularProgressIndicator()
                    }
                }
            }
        }
    }
}