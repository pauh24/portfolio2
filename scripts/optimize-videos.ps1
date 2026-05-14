param(
  [string]$InputDir = "public/videos",
  [string]$OutputDir = "public/videos_optimized",
  [int]$TargetHeight = 720,
  [int]$Fps = 30,
  [int]$VideoBitrateK = 1600,
  [string]$Preset = "slow",
  [int]$StartSeconds = 0,
  [int]$TrimSeconds = 0
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  throw "ffmpeg no está disponible en PATH. Instálalo y reinicia la terminal."
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

$inputs = Get-ChildItem -File -Path $InputDir -Filter *.mp4
if ($inputs.Count -eq 0) {
  throw "No se encontraron .mp4 en $InputDir"
}

foreach ($file in $inputs) {
  $inPath = $file.FullName
  $outPath = Join-Path $OutputDir $file.Name

  $seekArgs = @()
  if ($StartSeconds -gt 0) { $seekArgs += @("-ss", "$StartSeconds") }

  $trimArgs = @()
  if ($TrimSeconds -gt 0) { $trimArgs += @("-t", "$TrimSeconds") }

  & ffmpeg -y `
    @seekArgs `
    -i $inPath `
    @trimArgs `
    -an `
    -vf ("scale=-2:{0},fps={1}" -f $TargetHeight, $Fps) `
    -c:v libx264 `
    -pix_fmt yuv420p `
    -profile:v high `
    -preset $Preset `
    -b:v ("{0}k" -f $VideoBitrateK) `
    -maxrate ("{0}k" -f $VideoBitrateK) `
    -bufsize ("{0}k" -f ($VideoBitrateK * 2)) `
    -movflags +faststart `
    $outPath
}

Get-ChildItem -File -Path $OutputDir -Filter *.mp4 |
  Select-Object Name, @{ n = "MB"; e = { [math]::Round($_.Length / 1MB, 2) } } |
  Sort-Object MB -Descending |
  Format-Table -AutoSize
