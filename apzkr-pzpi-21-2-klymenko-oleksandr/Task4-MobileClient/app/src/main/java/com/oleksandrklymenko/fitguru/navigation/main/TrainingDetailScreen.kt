package com.oleksandrklymenko.fitguru.navigation.main

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.pulltorefresh.PullToRefreshContainer
import androidx.compose.material3.pulltorefresh.rememberPullToRefreshState
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import co.yml.charts.axis.AxisData
import co.yml.charts.common.model.Point
import co.yml.charts.ui.linechart.LineChart
import co.yml.charts.ui.linechart.model.GridLines
import co.yml.charts.ui.linechart.model.IntersectionPoint
import co.yml.charts.ui.linechart.model.Line
import co.yml.charts.ui.linechart.model.LineChartData
import co.yml.charts.ui.linechart.model.LinePlotData
import co.yml.charts.ui.linechart.model.LineStyle
import co.yml.charts.ui.linechart.model.SelectionHighlightPoint
import co.yml.charts.ui.linechart.model.SelectionHighlightPopUp
import co.yml.charts.ui.linechart.model.ShadowUnderLine
import com.oleksandrklymenko.fitguru.models.Measurement
import com.oleksandrklymenko.fitguru.R
import com.oleksandrklymenko.fitguru.ui.Markdown
import com.oleksandrklymenko.fitguru.viewmodels.LocalTrainingViewModel
import kotlin.math.pow

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TrainingDetailScreen() {
    val trainingViewModel = LocalTrainingViewModel.current
    val training by trainingViewModel.selectedTraining.collectAsState()
    val scrollState = rememberScrollState()

    val pullToRefreshState = rememberPullToRefreshState()

    LaunchedEffect(pullToRefreshState.isRefreshing) {
        training?.id?.let {
            trainingViewModel.getTraining(it)
            pullToRefreshState.endRefresh()
        }
    }

    val active = training?.endDate == null

    Box(modifier = Modifier.nestedScroll(pullToRefreshState.nestedScrollConnection)) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
        ) {
            training?.let {
                Text(text = "${stringResource(R.string.start_date)}: ${it.formattedStartDate}")
                if (it.formattedEndDate != null) {
                    Text(text = "${stringResource(R.string.end_date)}: ${it.formattedEndDate}")
                }
                Spacer(modifier = Modifier.height(16.dp))
                Text(text = "${stringResource(R.string.gym)}: ${it.gym.name}")
                Spacer(modifier = Modifier.height(16.dp))

                if (it.measurements?.isNotEmpty() == true) {
                    Text(
                        text = stringResource(R.string.measurements),
                        style = MaterialTheme.typography.headlineSmall,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth()
                    )
                    TrainingMeasurementChart(
                        measurements = it.measurements,
                        mapFun = {idx, item -> Point(idx.toFloat(), item.temperature)},
                        roundLabelTo = 2
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    TrainingMeasurementChart(
                        measurements = it.measurements,
                        mapFun = {idx, item -> Point(idx.toFloat(), item.heartRate.toFloat())},
                        roundLabelTo = 1
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))

                if (it.recommendations != null) {
                    Text(
                        text = stringResource(R.string.recommendations),
                        style = MaterialTheme.typography.headlineSmall,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth()
                    )
                    Markdown(it.recommendations)
                } else {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.Center
                    ) {
                        if (active) {
                            Button(
                                onClick = { trainingViewModel.finishTraining() },
                            ) {
                                Text(stringResource(R.string.finish_training))
                            }
                        } else {
                            Button(
                                onClick = { trainingViewModel.generateRecommendations() },
                            ) {
                                Text(stringResource(R.string.get_recommendations))
                            }
                        }
                    }
                }
            }
        }
        PullToRefreshContainer(
            modifier = Modifier.align(Alignment.TopCenter),
            state = pullToRefreshState,
        )
    }
}

@Composable
fun <T> TrainingMeasurementChart(
    measurements: List<T>,
    mapFun: (Int, T) -> Point,
    roundLabelTo: Int?,
    color: Color = Color.Magenta)
{
    val pointsData = measurements.mapIndexed(mapFun)
    val steps = 5
    val xAxisData = AxisData.Builder()
        .axisStepSize(30.dp)
        .steps(pointsData.size - 1)
        .labelData { i -> i.toString() }
        .labelAndAxisLinePadding(15.dp)
        .build()
    val yAxisData = AxisData.Builder()
        .steps(steps)
        .labelAndAxisLinePadding(20.dp)
        .labelData { i ->
            val yMin = pointsData.minOf { it.y }
            val yMax = pointsData.maxOf { it.y }
            println("$yMax $yMin")
            var yScale = (yMax - yMin) / steps
            if (roundLabelTo != null) {
                yScale = Math.round(yScale * 100f.pow(roundLabelTo)) / 100f.pow(roundLabelTo)
            }
            println(yScale)
            ((i * yScale) + yMin).toString()
        }.build()
    val data = LineChartData(
        linePlotData = LinePlotData(
            lines = listOf(
                Line(
                    dataPoints = pointsData,
                    LineStyle(color = color),
                    IntersectionPoint(),
                    SelectionHighlightPoint(),
                    shadowUnderLine = ShadowUnderLine(
                        brush = Brush.verticalGradient(
                            listOf(
                                Color.Cyan,
                                Color.Blue
                            )
                        ), alpha = 0.5f
                    ),
                    SelectionHighlightPopUp()
                ),
            )
        ),
        xAxisData = xAxisData,
        yAxisData = yAxisData,
        gridLines = GridLines()
    )

    LineChart(
        modifier = Modifier
            .fillMaxWidth()
            .height(300.dp),
        lineChartData = data
    )
}

@Preview(showBackground = true)
@Composable
fun PreviewTwoLineChart() {
    val measurements = emptyList<Measurement>()
    Column {
        TrainingMeasurementChart(
            measurements = measurements,
            mapFun = {idx, item -> Point(idx.toFloat(), item.temperature)},
            roundLabelTo = 2
        )
        TrainingMeasurementChart(
            measurements = measurements,
            mapFun = {idx, item -> Point(idx.toFloat(), item.heartRate.toFloat())},
            roundLabelTo = 1
        )
    }
}