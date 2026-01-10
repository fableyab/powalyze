# Scripts PowerShell pour créer les icônes
# Nécessite ImageMagick: https://imagemagick.org/script/download.php

# Convertir SVG vers PNG 512x512
magick convert -background none -resize 512x512 public/icon-512.svg public/icon-512.png

# Convertir SVG vers PNG 192x192
magick convert -background none -resize 192x192 public/icon-512.svg public/icon-192.png

# iOS App Icon (1024x1024)
magick convert -background none -resize 1024x1024 public/icon-512.svg ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png

# Android Adaptive Icons
magick convert -background none -resize 432x432 public/icon-512.svg android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
magick convert -background none -resize 324x324 public/icon-512.svg android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
magick convert -background none -resize 216x216 public/icon-512.svg android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
magick convert -background none -resize 162x162 public/icon-512.svg android/app/src/main/res/mipmap-hdpi/ic_launcher.png
magick convert -background none -resize 108x108 public/icon-512.svg android/app/src/main/res/mipmap-mdpi/ic_launcher.png

Write-Host "✅ Icônes créées avec succès!" -ForegroundColor Green
