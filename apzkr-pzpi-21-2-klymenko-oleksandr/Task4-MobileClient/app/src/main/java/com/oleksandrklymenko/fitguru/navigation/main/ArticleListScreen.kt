package com.oleksandrklymenko.fitguru.navigation.main

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import coil.compose.rememberImagePainter
import com.oleksandrklymenko.fitguru.R
import com.oleksandrklymenko.fitguru.models.Article
import com.oleksandrklymenko.fitguru.navigation.LocalNavController
import com.oleksandrklymenko.fitguru.viewmodels.LocalArticleViewModel

@Composable
fun ArticleItem(article: Article) {
    val articleViewModel = LocalArticleViewModel.current
    val navController = LocalNavController.current
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        elevation = CardDefaults.cardElevation(4.dp),
        onClick = {
            articleViewModel.selectArticle(article)
            navController.navigate(MainRoutes.ArticleDetails)
        },
    ) {
        Column(
            modifier = Modifier
                .padding(16.dp)
        ) {
            Text(
                text = article.title,
                style = MaterialTheme.typography.headlineSmall,
                color = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.height(8.dp))
            if (article.cover?.isNotEmpty() == true) {
                Image(
                    painter = rememberImagePainter(article.cover),
                    contentDescription = article.title,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(180.dp)
                        .clip(RoundedCornerShape(8.dp))
                )
                Spacer(modifier = Modifier.height(8.dp))
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "${stringResource(R.string.tags)}: ${article.tags.joinToString(", ")}",
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
            )
            Spacer(modifier = Modifier.height(8.dp))
            article.author?.let {
                Text(
                    text = "${stringResource(R.string.author)}: ${it.name} ${it.surname}",
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
                )
            }
        }
    }
}


@Composable
fun ArticleListScreen() {
    val articleViewModel = LocalArticleViewModel.current
    val articles by articleViewModel.articles.collectAsState()
    val loadingArticles by articleViewModel.loadingArticles.collectAsState()
    val searchQuery by articleViewModel.searchQuery.collectAsState()

    Column(
        modifier = Modifier.fillMaxSize(),
    ) {
        TextField(
            value = searchQuery,
            onValueChange = {
                if (it.isNotEmpty()) {
                    articleViewModel.updateSearchQuery(it)
                }
            },
            label = { Text(stringResource(R.string.search)) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
        )
        Column(
            verticalArrangement = if (loadingArticles) Arrangement.Center else Arrangement.Top,
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxSize(),
        ) {
            if (loadingArticles) {
                CircularProgressIndicator()
            } else {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize(),
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    items(articles) { article ->
                        ArticleItem(article = article)
                    }
                }
            }
        }
    }
}
