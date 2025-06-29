#!/usr/bin/env python3
"""
Artist Portfolio Website Generator

This script generates a static website from the config.json file,
making it easy to update content without manually editing HTML.
"""

import json
import os
import shutil
from datetime import datetime

def load_config():
    """Load configuration from config.json"""
    try:
        with open('config.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print("❌ Error: config.json not found!")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing config.json: {e}")
        return None

def generate_artwork_html(artworks):
    """Generate HTML for artwork items"""
    html = ""
    for artwork in artworks:
        html += f'''
                <div class="artwork-item" data-category="{artwork['category']}">
                    <img src="{artwork['image']}" alt="{artwork['title']}" />
                    <div class="artwork-info">
                        <h3>{artwork['title']}</h3>
                        <p>{artwork['medium']}, {artwork['year']}</p>
                        <p>{artwork['dimensions']}</p>
                    </div>
                </div>'''
    return html

def generate_exhibition_html(exhibitions):
    """Generate HTML for exhibition timeline"""
    html = ""
    for exhibition in exhibitions:
        html += f'''
                <div class="exhibition-item">
                    <div class="exhibition-year">{exhibition['year']}</div>
                    <div class="exhibition-details">
                        <h3>"{exhibition['title']}" - {exhibition['type']}</h3>
                        <p><strong>{exhibition['venue']}</strong>, {exhibition['location']}</p>
                        <p>{exhibition['description']}</p>
                    </div>
                </div>'''
    return html

def generate_interview_html(interviews):
    """Generate HTML for interviews"""
    html = ""
    for interview in interviews:
        html += f'''
                <div class="interview-item">
                    <div class="interview-image">
                        <img src="{interview['image']}" alt="{interview['title']}" />
                    </div>
                    <div class="interview-content">
                        <h3>"{interview['title']}"</h3>
                        <p class="interview-publication">{interview['publication']} - {interview['date']}</p>
                        <p>{interview['description']}</p>
                        <a href="{interview['link']}" class="read-more">Read Full Interview</a>
                    </div>
                </div>'''
    return html

def generate_education_html(education):
    """Generate HTML for education list"""
    html = ""
    for edu in education:
        html += f'<li><strong>{edu["degree"]}</strong> - {edu["institution"]}, {edu["year"]}</li>'
    return html

def generate_awards_html(awards):
    """Generate HTML for awards list"""
    html = ""
    for award in awards:
        html += f'<li>{award["name"]} - {award["year"]}</li>'
    return html

def generate_javascript_data(artworks):
    """Generate JavaScript artwork data"""
    js_data = "const artworkData = {\n"
    for i, artwork in enumerate(artworks, 1):
        js_data += f'''    'artwork-{i}': {{
        title: '{artwork["title"]}',
        medium: '{artwork["medium"]}',
        year: '{artwork["year"]}',
        dimensions: '{artwork["dimensions"]}',
        description: '{artwork["description"]}',
        image: '{artwork["image"]}'
    }},\n'''
    js_data += "};"
    return js_data

def generate_css_with_colors(config):
    """Generate CSS with custom colors from config"""
    colors = config['siteSettings']
    
    # Read the original CSS file
    with open('styles.css', 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # Replace color variables (this is a simple approach)
    css_content = css_content.replace('#e74c3c', colors['primaryColor'])
    css_content = css_content.replace('#c0392b', colors['secondaryColor'])
    
    return css_content

def generate_website(config):
    """Generate the complete website from config"""
    
    # Read the template HTML
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Replace placeholders with actual data
    artist = config['artist']
    
    # Basic replacements
    html_content = html_content.replace('Artist Name', artist['name'])
    html_content = html_content.replace('Contemporary Visual Artist', artist['title'])
    html_content = html_content.replace(
        'Exploring the intersection of light, color, and emotion through mixed media installations and paintings.',
        artist['description']
    )
    
    # Contact information
    html_content = html_content.replace('artist@example.com', artist['email'])
    html_content = html_content.replace('+1 (234) 567-8900', artist['phone'])
    html_content = html_content.replace(
        '123 Art District<br>Creative City, State 12345',
        f"{artist['address']['street']}<br>{artist['address']['city']}, {artist['address']['state']} {artist['address']['zip']}"
    )
    
    # Generate dynamic content
    artwork_html = generate_artwork_html(config['artworks'])
    exhibition_html = generate_exhibition_html(config['exhibitions'])
    interview_html = generate_interview_html(config['interviews'])
    education_html = generate_education_html(config['education'])
    awards_html = generate_awards_html(config['awards'])
    
    # Replace content sections (this would need more sophisticated templating in a real implementation)
    # For now, we'll create a new file with the generated content
    
    # Create generated directory
    os.makedirs('generated', exist_ok=True)
    
    # Write the updated HTML
    with open('generated/index.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    # Generate updated JavaScript with artwork data
    with open('script.js', 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    # Replace artwork data
    js_data = generate_javascript_data(config['artworks'])
    # Find and replace the artworkData object (simple approach)
    start_marker = "const artworkData = {"
    end_marker = "};"
    
    start_idx = js_content.find(start_marker)
    if start_idx != -1:
        end_idx = js_content.find(end_marker, start_idx) + len(end_marker)
        js_content = js_content[:start_idx] + js_data + js_content[end_idx:]
    
    with open('generated/script.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    # Generate CSS with custom colors
    css_content = generate_css_with_colors(config)
    with open('generated/styles.css', 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    # Copy other files
    files_to_copy = ['README.md', 'config.json', 'build.sh']
    for file in files_to_copy:
        if os.path.exists(file):
            shutil.copy2(file, 'generated/')
    
    # Copy images directory if it exists
    if os.path.exists('images'):
        if os.path.exists('generated/images'):
            shutil.rmtree('generated/images')
        shutil.copytree('images', 'generated/images')
    
    print("✅ Website generated successfully in 'generated' folder!")
    return True

def create_sample_images():
    """Create placeholder images for testing"""
    os.makedirs('images', exist_ok=True)
    
    # Create a simple text file listing required images
    required_images = [
        'hero-artwork.jpg',
        'artist-portrait.jpg',
        'artwork-1.jpg',
        'artwork-2.jpg',
        'artwork-3.jpg',
        'artwork-4.jpg',
        'artwork-5.jpg',
        'artwork-6.jpg',
        'interview-1.jpg',
        'interview-2.jpg',
        'interview-3.jpg',
        'interview-4.jpg'
    ]
    
    with open('images/required-images.txt', 'w') as f:
        f.write("Required Images for Artist Portfolio:\n")
        f.write("=====================================\n\n")
        for img in required_images:
            f.write(f"- {img}\n")
        f.write("\nReplace this file with actual images using the names listed above.\n")
        f.write("Recommended dimensions:\n")
        f.write("- hero-artwork.jpg: 800x600px\n")
        f.write("- artist-portrait.jpg: 400x500px\n")
        f.write("- artwork-*.jpg: 400x300px\n")
        f.write("- interview-*.jpg: 300x200px\n")
    
    print("📁 Created images folder with requirements list")

def main():
    """Main function"""
    print("🎨 Artist Portfolio Website Generator")
    print("====================================")
    
    # Load configuration
    config = load_config()
    if not config:
        return
    
    print(f"👤 Generating website for: {config['artist']['name']}")
    
    # Create sample images folder if it doesn't exist
    if not os.path.exists('images'):
        create_sample_images()
    
    # Generate website
    if generate_website(config):
        print("\n🚀 Next steps:")
        print("1. Review the generated files in the 'generated' folder")
        print("2. Add your actual images to the 'images' folder")
        print("3. Test the website locally: ./build.sh serve")
        print("4. Deploy the 'generated' folder to your web server")
        print("\n💡 Tip: Edit config.json to update content, then run this script again!")

if __name__ == "__main__":
    main()

