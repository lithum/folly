#!/bin/bash

# Artist Portfolio Website Build Script
# This script helps with common tasks for maintaining the static website

echo "🎨 Artist Portfolio Website Build Script"
echo "========================================"

# Function to display help
show_help() {
    echo "Usage: ./build.sh [OPTION]"
    echo ""
    echo "Options:"
    echo "  help        Show this help message"
    echo "  validate    Validate HTML and check for common issues"
    echo "  optimize    Optimize images and minify CSS/JS"
    echo "  deploy      Prepare files for deployment"
    echo "  serve       Start a local development server"
    echo "  clean       Clean temporary files"
    echo ""
}

# Function to validate HTML
validate_html() {
    echo "🔍 Validating HTML..."
    
    # Check if HTML file exists
    if [ ! -f "index.html" ]; then
        echo "❌ Error: index.html not found!"
        exit 1
    fi
    
    # Basic validation checks
    echo "✅ HTML file found"
    
    # Check for required images
    echo "🖼️  Checking image references..."
    missing_images=()
    
    # Extract image sources from HTML
    images=($(grep -o 'src="[^"]*"' index.html | sed 's/src="//g' | sed 's/"//g'))
    
    for img in "${images[@]}"; do
        if [[ $img == images/* ]] && [ ! -f "$img" ]; then
            missing_images+=("$img")
        fi
    done
    
    if [ ${#missing_images[@]} -eq 0 ]; then
        echo "✅ All referenced images found"
    else
        echo "⚠️  Missing images:"
        for img in "${missing_images[@]}"; do
            echo "   - $img"
        done
    fi
    
    echo "✅ HTML validation complete"
}

# Function to optimize files
optimize_files() {
    echo "⚡ Optimizing files..."
    
    # Create optimized directory
    mkdir -p optimized
    
    # Copy HTML file
    cp index.html optimized/
    
    # Minify CSS if available
    if command -v csso &> /dev/null; then
        echo "🎨 Minifying CSS..."
        csso styles.css -o optimized/styles.min.css
        # Update HTML to use minified CSS
        sed -i.bak 's/styles.css/styles.min.css/g' optimized/index.html
    else
        echo "⚠️  csso not found, copying CSS as-is"
        cp styles.css optimized/
    fi
    
    # Minify JavaScript if available
    if command -v uglifyjs &> /dev/null; then
        echo "📜 Minifying JavaScript..."
        uglifyjs script.js -o optimized/script.min.js
        # Update HTML to use minified JS
        sed -i.bak 's/script.js/script.min.js/g' optimized/index.html
    else
        echo "⚠️  uglifyjs not found, copying JS as-is"
        cp script.js optimized/
    fi
    
    # Copy images if they exist
    if [ -d "images" ]; then
        cp -r images optimized/
        echo "🖼️  Images copied to optimized folder"
    fi
    
    echo "✅ Optimization complete! Files are in the 'optimized' folder"
}

# Function to prepare for deployment
prepare_deployment() {
    echo "🚀 Preparing for deployment..."
    
    # Create deployment directory
    mkdir -p deploy
    
    # Copy all necessary files
    cp index.html deploy/
    cp styles.css deploy/
    cp script.js deploy/
    cp README.md deploy/
    
    # Copy images if they exist
    if [ -d "images" ]; then
        cp -r images deploy/
    else
        echo "⚠️  Images folder not found. Creating placeholder structure..."
        mkdir -p deploy/images
        echo "Add your images to the deploy/images/ folder" > deploy/images/README.txt
    fi
    
    # Create .htaccess for Apache servers
    cat > deploy/.htaccess << 'EOF'
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
EOF
    
    echo "✅ Deployment files ready in 'deploy' folder"
    echo "📁 Upload the contents of the 'deploy' folder to your web server"
}

# Function to start local server
start_server() {
    echo "🌐 Starting local development server..."
    
    # Check for Python 3
    if command -v python3 &> /dev/null; then
        echo "🐍 Using Python 3 server"
        echo "📍 Server running at: http://localhost:8000"
        echo "🛑 Press Ctrl+C to stop"
        python3 -m http.server 8000
    # Check for Python 2
    elif command -v python &> /dev/null; then
        echo "🐍 Using Python 2 server"
        echo "📍 Server running at: http://localhost:8000"
        echo "🛑 Press Ctrl+C to stop"
        python -m SimpleHTTPServer 8000
    # Check for Node.js
    elif command -v npx &> /dev/null; then
        echo "📦 Using Node.js server"
        echo "📍 Server running at: http://localhost:8000"
        echo "🛑 Press Ctrl+C to stop"
        npx http-server -p 8000
    else
        echo "❌ No suitable server found!"
        echo "Please install Python or Node.js to use the local server"
        echo "Alternatively, open index.html directly in your browser"
    fi
}

# Function to clean temporary files
clean_files() {
    echo "🧹 Cleaning temporary files..."
    
    # Remove build directories
    rm -rf optimized
    rm -rf deploy
    
    # Remove backup files
    rm -f *.bak
    
    echo "✅ Cleanup complete"
}

# Main script logic
case "${1:-help}" in
    "help")
        show_help
        ;;
    "validate")
        validate_html
        ;;
    "optimize")
        optimize_files
        ;;
    "deploy")
        prepare_deployment
        ;;
    "serve")
        start_server
        ;;
    "clean")
        clean_files
        ;;
    *)
        echo "❌ Unknown option: $1"
        echo ""
        show_help
        exit 1
        ;;
esac

