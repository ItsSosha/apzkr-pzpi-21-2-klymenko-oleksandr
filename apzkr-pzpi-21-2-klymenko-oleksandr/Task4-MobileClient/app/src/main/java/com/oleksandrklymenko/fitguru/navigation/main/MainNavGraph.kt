package com.oleksandrklymenko.fitguru.navigation.main

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.oleksandrklymenko.fitguru.navigation.LocalNavController
import com.oleksandrklymenko.fitguru.viewmodels.ArticleViewModel
import com.oleksandrklymenko.fitguru.viewmodels.GymViewModel
import com.oleksandrklymenko.fitguru.viewmodels.LocalArticleViewModel
import com.oleksandrklymenko.fitguru.viewmodels.LocalGymViewModel
import com.oleksandrklymenko.fitguru.viewmodels.LocalTrainingViewModel
import com.oleksandrklymenko.fitguru.viewmodels.TrainingViewModel

@Composable
fun MainNavGraph() {
    val navController = LocalNavController.current

    val trainingViewModel: TrainingViewModel = viewModel()
    val gymViewModel: GymViewModel = viewModel()
    val articleViewModel: ArticleViewModel = viewModel()
    CompositionLocalProvider(
        LocalTrainingViewModel provides trainingViewModel,
        LocalGymViewModel provides gymViewModel,
        LocalArticleViewModel provides articleViewModel
    ) {
        NavHost(navController, startDestination = MainRoutes.Trainings) {
            composable("gyms") {
                GymListScreen()
            }
            composable(MainRoutes.Trainings) {
                TrainingListScreen()
            }
            composable(MainRoutes.TrainingDetails) {
                TrainingDetailScreen()
            }
            composable(MainRoutes.Articles) {
                ArticleListScreen()
            }
            composable(MainRoutes.ArticleDetails) {
                ArticleDetailsScreen()
            }
        }
    }
}