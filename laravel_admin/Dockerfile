FROM php:7.4-fpm

ENV APP_DIR=/app/laravel_admin
WORKDIR $APP_DIR

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u 1000 -d /home/lombaa lombaa
RUN mkdir -p /home/lombaa/.composer && \
    chown -R lombaa:lombaa /home/lombaa

USER lombaa