@echo off
chcp 65001 > nul
echo ============================================
echo  🖼️  OPTIMIZADOR DE IMÁGENES WEBP
echo ============================================
echo.

set RUTA_ORIGINAL=C:\Users\Rcrs\Documents\web\carta_amici\comidas-amici\assets\productos

echo 🔍 Analizando imágenes en: %RUTA_ORIGINAL%
echo.

REM Crear backup de imágenes originales
echo 📦 Creando copia de seguridad...
if not exist "%RUTA_ORIGINAL%\backup_original" mkdir "%RUTA_ORIGINAL%\backup_original"
xcopy "%RUTA_ORIGINAL%\*.webp" "%RUTA_ORIGINAL%\backup_original\" /Y

echo 🚀 Optimizando imágenes WebP...
echo.

REM Optimizar todas las imágenes WebP
cd /d "%RUTA_ORIGINAL%"
magick mogrify -quality 85 ^
  -define webp:method=6 ^
  -define webp:pass=6 ^
  -define webp:target-size=0 ^
  -define webp:auto-filter=true ^
  -define webp:preprocessing=2 ^
  -define webp:sns-strength=50 ^
  -define webp:filter-sharpness=0 ^
  -define webp:filter-strength=60 ^
  -define webp:segments=4 ^
  -strip ^
  *.webp

echo.
echo 📊 Mostrando resultados...
echo.

REM Mostrar tamaños antes/después
echo Archivo                 | Antes      | Después    | Reducción
echo ------------------------|------------|------------|-----------
for %%f in (*.webp) do (
  for /f "tokens=3" %%a in ('dir /-c "backup_original\%%f" ^| find "%%f"') do set tamaño_antes=%%a
  for /f "tokens=3" %%b in ('dir /-c "%%f" ^| find "%%f"') do set tamaño_despues=%%b
  
  set /a antes=!tamaño_antes!
  set /a despues=!tamaño_despues!
  set /a reduccion=100-(despues*100/antes)
  
  echo %%~nxf | %__APPDIR__%more.com +26 | set /P =| 
  echo !tamaño_antes! KB | !tamaño_despues! KB | !reduccion!%%
)

echo.
echo ✅ ¡Optimización completada!
echo 📁 Backup guardado en: backup_original\
echo.
pause