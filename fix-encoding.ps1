# Fix encoding issues in TypeScript files
# This script removes BOM characters and ensures UTF-8 encoding

$files = Get-ChildItem -Path "src" -Recurse -Filter "*.ts"

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)"
    
    try {
        # Read the file content
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Remove BOM if present
        if ($content -match '^\xEF\xBB\xBF') {
            $content = $content.Substring(3)
            Write-Host "  - Removed BOM"
        }
        
        # Remove any other invalid characters at the start
        $content = $content.TrimStart([char]0xFEFF, [char]0x200B, [char]0x200C, [char]0x200D, [char]0x2060)
        
        # Write back with UTF-8 encoding (no BOM)
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "  - Fixed encoding"
    }
    catch {
        Write-Host "  - Error processing file: $($_.Exception.Message)"
    }
}

Write-Host "Encoding fix complete!" 