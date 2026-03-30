Add-Type -AssemblyName System.Drawing
 = 'public/carousel/12.jpeg'
Write-Host " Before:\ (Get-Item ).Length
 = [System.Drawing.Image]::FromFile()
 = 1600
 = 
if (.Width -gt ) {
 = / .Width
 = [int]
 = [int]([double].Height * )
 = New-Object System.Drawing.Bitmap , 
 = [System.Drawing.Graphics]::FromImage()
 .InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
 .DrawImage(, 0, 0, , )
 .Dispose()
 = 
}
 = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { .MimeType -eq 'image/jpeg' }
 = New-Object System.Drawing.Imaging.EncoderParameters 1
.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 70L)
 = \.tmp\
.Save(, , )
.Dispose()
if ( -ne ) { .Dispose() }
Move-Item -Force 
Write-Host \After:\ (Get-Item ).Length
