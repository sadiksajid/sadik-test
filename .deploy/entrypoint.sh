#!/bin/sh
echo "🎬 entrypoint.sh: [$(whoami)] [PHP $(php -r 'echo phpversion();')]"
# chmod 777 -R $LARAVEL_PATH/bootstrap
# chmod 777 -R $LARAVEL_PATH/storage

# find $LARAVEL_PATH/bootstrap -type d -exec chmod 755 {} \;
# find $LARAVEL_PATH/bootstrap -type f -exec chmod 755 {} \;

# find $LARAVEL_PATH/storage -type d -exec chmod 755 {} \;
# find $LARAVEL_PATH/storage -type f -exec chmod 755 {} \;
# mkdir storage/app/Public
# mv public/Public/* storage/app/Public
# rm -rf public/Public

composer dump-autoload --no-interaction --no-dev --optimize

echo "🎬 artisan commands"

# 💡 Group into a custom command e.g. php artisan app:on-deploy
php artisan migrate --no-interaction --force
# php artisan websocket:serve
echo "🎬 start supervisord"

# 💡 Group into a custom command e.g. php artisan app:on-deploy
# php artisan migrate --no-interaction --force

php artisan optimize:clear

rm -rf public/livewire-tmp
rm -rf public/storage

php artisan storage:link

php artisan queue:work --daemon &
supervisord -c $LARAVEL_PATH/.deploy/config/supervisor.conf
