package com.oleksandrklymenko.fitguru.viewmodels

import androidx.compose.runtime.staticCompositionLocalOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.oleksandrklymenko.fitguru.models.Article
import com.oleksandrklymenko.fitguru.models.ArticleApiImpl
import com.oleksandrklymenko.fitguru.models.Training
import com.oleksandrklymenko.fitguru.network.HttpClientProvider
import com.oleksandrklymenko.fitguru.utils.env
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class ArticleViewModel : ViewModel() {
    private val articleApi = ArticleApiImpl(HttpClientProvider.client)

    private val _articles = MutableStateFlow<List<Article>>(emptyList())
    val articles: StateFlow<List<Article>> = _articles.asStateFlow()

    private var _selectedArticle = MutableStateFlow<Article?>(null)
    val selectedArticle: StateFlow<Article?> = _selectedArticle.asStateFlow()

    private val _loadingArticles = MutableStateFlow(false)
    val loadingArticles = _loadingArticles.asStateFlow()

    private val _searchQuery = MutableStateFlow("")
    val searchQuery = _searchQuery.asStateFlow()

    private fun replaceArticleInList(article: Article) {
        val existingArticleId = _articles.value.indexOfFirst {
            it.id == article.id
        }

        if (existingArticleId > -1) {
            _articles.value = _articles.value.mapIndexed { i, existing ->  if (i == existingArticleId) article else existing }
        }
    }

    private fun searchArticles(query: String) {
        viewModelScope.launch {
            _loadingArticles.value = true
            val articles = articleApi.search(query).map {
                if (it.cover?.isNotEmpty() == true) {
                    it.cover = env.get("API_BASE_URL") + "/uploads/cover/${it.cover}"
                }
                it
            }
            _articles.value = articles
            _loadingArticles.value = false
        }
    }

    fun updateSearchQuery(query: String) {
        _searchQuery.value = query
        searchArticles(query)
    }

    fun selectArticle(article: Article) {
        _selectedArticle.value = article
    }

    fun getTraining(id: String) {
        viewModelScope.launch {
            val currentArticle = articleApi.getArticle(id)
            if (currentArticle.cover != null) {
                currentArticle.cover = env.get("API_BASE_URL") + "/uploads/cover/${currentArticle.cover}"
            }
            _selectedArticle.value = currentArticle
            replaceArticleInList(currentArticle)
        }
    }
}


val LocalArticleViewModel = staticCompositionLocalOf<ArticleViewModel> { error("No ArticleViewModel provided") }