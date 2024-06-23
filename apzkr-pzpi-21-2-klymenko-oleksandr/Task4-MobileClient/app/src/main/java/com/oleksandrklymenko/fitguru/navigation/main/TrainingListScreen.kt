package com.oleksandrklymenko.fitguru.navigation.main

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.pulltorefresh.PullToRefreshContainer
import androidx.compose.material3.pulltorefresh.rememberPullToRefreshState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.oleksandrklymenko.fitguru.R
import com.oleksandrklymenko.fitguru.models.Training
import com.oleksandrklymenko.fitguru.navigation.LocalNavController
import com.oleksandrklymenko.fitguru.viewmodels.LocalTrainingViewModel

@Composable
fun TrainingCard(training: Training) {
    val navController = LocalNavController.current
    val trainingViewModel = LocalTrainingViewModel.current

    val active = training.endDate == null

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        elevation = CardDefaults.cardElevation(8.dp),
        onClick = {
            trainingViewModel.selectTraining(training)
            navController.navigate(MainRoutes.TrainingDetails)
        },
        colors = CardDefaults.cardColors(
            containerColor = if (active) Color.Yellow else MaterialTheme.colorScheme.surfaceContainer
        )
    ) {
        Column(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth()
        ) {
            Text(text = "${stringResource(R.string.start_date)}: ${training.formattedStartDate}")
            if (training.formattedEndDate != null) {
                Text(text = "${stringResource(R.string.end_date)}: ${training.formattedEndDate}")
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = training.gym.name,
                modifier = Modifier.align(Alignment.End)
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TrainingListScreen() {
    val trainingViewModel = LocalTrainingViewModel.current
    val trainings by trainingViewModel.trainings.collectAsState()
    val loadingTrainings by trainingViewModel.loadingTrainings.collectAsState()

    val pullToRefreshState = rememberPullToRefreshState()

    LaunchedEffect(pullToRefreshState.isRefreshing) {
        if (pullToRefreshState.isRefreshing) {
            trainingViewModel.fetchTrainings()
            pullToRefreshState.endRefresh()
        }
    }

    if (loadingTrainings) {
        CircularProgressIndicator()
    } else {
        Box(modifier = Modifier.nestedScroll(pullToRefreshState.nestedScrollConnection)) {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize(),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                items(trainings) { training ->
                    TrainingCard(training = training)
                }
            }
            PullToRefreshContainer(
                modifier = Modifier.align(Alignment.TopCenter),
                state = pullToRefreshState,
            )
        }
    }
}