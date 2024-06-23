package com.oleksandrklymenko.fitguru.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import dev.jeziellago.compose.markdowntext.MarkdownText

@Composable
fun Markdown(text: String) {
    MarkdownText(
        modifier = Modifier.padding(8.dp),
        markdown = text,
        style = TextStyle(
            fontSize = 18.sp,
            lineHeight = 10.sp,
            textAlign = TextAlign.Justify,
        )
    )
}