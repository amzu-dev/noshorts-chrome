#!/usr/bin/env python3
"""
Simple script to create placeholder icons for the extension.
Run with: python3 create_icons.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size):
    # Create a red background (YouTube theme)
    img = Image.new('RGB', (size, size), color='#FF0000')
    draw = ImageDraw.Draw(img)

    # Draw a white "No" symbol (circle with diagonal line)
    # Circle
    circle_margin = size // 6
    draw.ellipse(
        [circle_margin, circle_margin, size - circle_margin, size - circle_margin],
        outline='white',
        width=max(2, size // 16)
    )

    # Diagonal line
    line_margin = size // 4
    draw.line(
        [line_margin, line_margin, size - line_margin, size - line_margin],
        fill='white',
        width=max(2, size // 16)
    )

    # Save the icon
    filename = f'icon{size}.png'
    img.save(filename, 'PNG')
    print(f'Created {filename}')

if __name__ == '__main__':
    try:
        # Change to icons directory
        os.chdir(os.path.dirname(__file__))

        # Create icons in standard sizes
        for size in [16, 48, 128]:
            create_icon(size)

        print('\nIcons created successfully!')
        print('You can customize these icons or replace them with your own.')
    except ImportError:
        print('Error: PIL (Pillow) is not installed.')
        print('Install it with: pip3 install Pillow')
        print('\nAlternatively, create your own 16x16, 48x48, and 128x128 PNG icons.')
