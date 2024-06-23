package com.oleksandrklymenko.fitguru.ui

import androidx.appcompat.app.AppCompatDelegate
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.outlined.Language
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.core.os.LocaleListCompat
import androidx.navigation.compose.currentBackStackEntryAsState
import com.google.firebase.auth.FirebaseAuth
import com.oleksandrklymenko.fitguru.R
import com.oleksandrklymenko.fitguru.navigation.LocalNavController
import com.oleksandrklymenko.fitguru.viewmodels.AuthState
import com.oleksandrklymenko.fitguru.viewmodels.LocalAuthViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TopBar(){
    val navController = LocalNavController.current

    val backStackEntry by navController.currentBackStackEntryAsState()
    val canPop = backStackEntry != null && navController.previousBackStackEntry != null && backStackEntry?.destination?.route != navController.previousBackStackEntry?.destination?.route


    val onChangeLang: () -> Unit = {
        var locales = AppCompatDelegate.getApplicationLocales()
        if (locales.toLanguageTags() == "en") {
            locales = LocaleListCompat.forLanguageTags("uk")
        } else {
            locales = LocaleListCompat.forLanguageTags("en")
        }

        AppCompatDelegate.setApplicationLocales(locales)
    }

    val auth = FirebaseAuth.getInstance()
    val authState by LocalAuthViewModel.current.authState.collectAsState()

    TopAppBar(
        title = { Text("Fit guru", maxLines=1, overflow=TextOverflow.Ellipsis) },
        navigationIcon = {
            if (canPop) {
                IconButton(onClick = { navController.popBackStack() }) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = "Back"
                    )
                }
            }
        },
        actions={
            if (authState is AuthState.Authenticated) {
                Button(
                    onClick = { auth.signOut() },
                    colors = ButtonDefaults.buttonColors(containerColor = Color.Red)
                ) {
                    Text(text = stringResource(R.string.sign_out))
                }
            }
            Spacer(modifier = Modifier.width(20.dp))
            IconButton(onClick = { onChangeLang() }) {
                Icon(
                    Icons.Outlined.Language,
                    null
                )
            }
        },
    )
}