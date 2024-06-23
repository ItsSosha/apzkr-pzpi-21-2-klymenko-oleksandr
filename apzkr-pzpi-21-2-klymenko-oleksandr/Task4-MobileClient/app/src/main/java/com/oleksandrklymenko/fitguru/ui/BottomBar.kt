package com.oleksandrklymenko.fitguru.ui

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Article
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.SportsGymnastics
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import com.oleksandrklymenko.fitguru.R
import com.oleksandrklymenko.fitguru.navigation.LocalNavController

sealed class NavigationItem(var route: String, val icon: ImageVector?, var title_resource: Int) {
    object Trainings : NavigationItem("trainings", Icons.Filled.SportsGymnastics, R.string.trainings)
    object Gyms : NavigationItem("gyms", Icons.Filled.Home, R.string.gyms)
    object Articles : NavigationItem("articles", Icons.AutoMirrored.Filled.Article, R.string.articles)
}

@Composable
fun BottomBar() {
    val navController = LocalNavController.current

    val items = listOf(
        NavigationItem.Trainings,
        NavigationItem.Gyms,
        NavigationItem.Articles,
    )
    var selectedItem by remember { mutableStateOf(0) }
    var currentRoute by remember { mutableStateOf(NavigationItem.Trainings.route) }

    items.forEachIndexed { index, navigationItem ->
        if (navigationItem.route == currentRoute) {
            selectedItem = index
        }
    }

    NavigationBar {
        items.forEachIndexed { index, item ->
            NavigationBarItem(
                alwaysShowLabel = true,
                icon = { Icon(item.icon!!, contentDescription = item.route               ) },
                label = { Text(stringResource(item.title_resource)) },
                selected = selectedItem == index,
                onClick = {
                    selectedItem = index
                    currentRoute = item.route
                    navController.navigate(item.route) {
                        navController.graph.startDestinationRoute?.let { route ->
                            popUpTo(0) {
                                saveState = true
                            }
                        }
                        launchSingleTop = true
                        restoreState = true
                    }
                }
            )
        }
    }
}