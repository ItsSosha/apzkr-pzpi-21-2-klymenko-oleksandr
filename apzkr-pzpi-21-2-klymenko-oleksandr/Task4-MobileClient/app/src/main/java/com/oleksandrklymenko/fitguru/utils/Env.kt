package com.oleksandrklymenko.fitguru.utils

import io.github.cdimascio.dotenv.dotenv

val env = dotenv {
    directory = "./assets"
    ignoreIfMissing = false
    filename = "env"
}