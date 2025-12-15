#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
إنشاء صور Hero كبيرة وواضحة للخدمات الحكومية
بدقة عالية وتصميم احترافي
"""

from PIL import Image, ImageDraw, ImageFont
import os

# مجلد الإخراج
OUTPUT_DIR = "public"

def create_gradient_image(width, height, colors):
    """إنشاء صورة بتدرج لوني"""
    image = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(image)
    
    # رسم التدرج
    for y in range(height):
        # حساب اللون بناءً على الموضع
        ratio = y / height
        if len(colors) == 2:
            r = int(colors[0][0] * (1 - ratio) + colors[1][0] * ratio)
            g = int(colors[0][1] * (1 - ratio) + colors[1][1] * ratio)
            b = int(colors[0][2] * (1 - ratio) + colors[1][2] * ratio)
        elif len(colors) == 3:
            if ratio < 0.5:
                r_ratio = ratio * 2
                r = int(colors[0][0] * (1 - r_ratio) + colors[1][0] * r_ratio)
                g = int(colors[0][1] * (1 - r_ratio) + colors[1][1] * r_ratio)
                b = int(colors[0][2] * (1 - r_ratio) + colors[1][2] * r_ratio)
            else:
                r_ratio = (ratio - 0.5) * 2
                r = int(colors[1][0] * (1 - r_ratio) + colors[2][0] * r_ratio)
                g = int(colors[1][1] * (1 - r_ratio) + colors[2][1] * r_ratio)
                b = int(colors[1][2] * (1 - r_ratio) + colors[2][2] * r_ratio)
        
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return image

def hex_to_rgb(hex_color):
    """تحويل hex إلى RGB"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def add_text_with_shadow(draw, text, position, font, fill='white', shadow_offset=5):
    """إضافة نص مع ظل"""
    x, y = position
    # ظل
    draw.text((x + shadow_offset, y + shadow_offset), text, font=font, fill=(0, 0, 0, 128))
    # النص الأساسي
    draw.text((x, y), text, font=font, fill=fill)

def create_gov_hero(name_ar, name_en, desc_ar, colors, filename):
    """إنشاء صورة hero لخدمة حكومية"""
    width, height = 1920, 810
    
    # تحويل الألوان
    rgb_colors = [hex_to_rgb(c) for c in colors]
    
    # إنشاء الصورة بالتدرج
    image = create_gradient_image(width, height, rgb_colors)
    draw = ImageDraw.Draw(image, 'RGBA')
    
    # إضافة دوائر زخرفية شفافة
    overlay = Image.new('RGBA', (width, height), (255, 255, 255, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    
    # دائرة كبيرة في الوسط
    center_x, center_y = width // 2, height // 2
    overlay_draw.ellipse([center_x - 250, center_y - 250, center_x + 250, center_y + 250], 
                         fill=(255, 255, 255, 20))
    overlay_draw.ellipse([center_x - 180, center_y - 180, center_x + 180, center_y + 180], 
                         fill=(255, 255, 255, 30))
    overlay_draw.ellipse([center_x - 120, center_y - 120, center_x + 120, center_y + 120], 
                         fill=(255, 255, 255, 40))
    
    # دمج الطبقات
    image = Image.alpha_composite(image.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(image)
    
    # محاولة استخدام خطوط مختلفة
    try:
        # استخدام خط كبير للنص العربي
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 100)
        font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 45)
    except:
        # Fallback إلى الخط الافتراضي
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
    
    # حساب موضع النص
    # النص الرئيسي (العربي + الإنجليزي)
    main_text = f"{name_ar}"
    bbox = draw.textbbox((0, 0), main_text, font=font_large)
    text_width = bbox[2] - bbox[0]
    text_x = (width - text_width) // 2
    text_y = center_y - 80
    
    # رسم النص الرئيسي
    add_text_with_shadow(draw, main_text, (text_x, text_y), font_large, fill='white', shadow_offset=6)
    
    # النص الثانوي (الوصف)
    desc_bbox = draw.textbbox((0, 0), desc_ar, font=font_medium)
    desc_width = desc_bbox[2] - desc_bbox[0]
    desc_x = (width - desc_width) // 2
    desc_y = center_y + 60
    
    add_text_with_shadow(draw, desc_ar, (desc_x, desc_y), font_medium, fill='white', shadow_offset=4)
    
    # اسم إنجليزي صغير
    if name_en:
        en_bbox = draw.textbbox((0, 0), name_en, font=font_medium)
        en_width = en_bbox[2] - en_bbox[0]
        en_x = (width - en_width) // 2
        en_y = text_y + 110
        add_text_with_shadow(draw, name_en, (en_x, en_y), font_medium, fill='rgba(255,255,255,0.9)', shadow_offset=3)
    
    # حفظ الصورة
    output_path = os.path.join(OUTPUT_DIR, filename)
    image.save(output_path, 'JPEG', quality=95)
    print(f"✅ تم إنشاء: {filename}")

def main():
    """إنشاء جميع صور Hero الحكومية"""
    
    # السعودية - سداد
    create_gov_hero(
        name_ar="سداد",
        name_en="SADAD",
        desc_ar="نظام المدفوعات الوطني السعودي",
        colors=['#F58220', '#E67317'],
        filename='gov-sadad-hero-large.jpg'
    )
    
    # الإمارات - جيوان
    create_gov_hero(
        name_ar="جيوان",
        name_en="Jaywan",
        desc_ar="نظام الدفع الإلكتروني الإماراتي",
        colors=['#CE1126', '#00732F', '#000000'],
        filename='gov-jaywan-hero-large.jpg'
    )
    
    # الكويت - كي نت
    create_gov_hero(
        name_ar="كي نت",
        name_en="KNET",
        desc_ar="شبكة الكويت الوطنية للمدفوعات",
        colors=['#0066CC', '#FFCC00'],
        filename='gov-knet-hero-large.jpg'
    )
    
    # البحرين - بنفت
    create_gov_hero(
        name_ar="بنفت",
        name_en="BENEFIT",
        desc_ar="الشبكة الإلكترونية البحرينية",
        colors=['#CE1126', '#D32027'],
        filename='gov-benefit-hero-large.jpg'
    )
    
    # عُمان - مال
    create_gov_hero(
        name_ar="مال",
        name_en="Maal",
        desc_ar="البطاقة الوطنية العُمانية",
        colors=['#D0032C', '#009A44'],
        filename='gov-maal-hero-large.jpg'
    )
    
    # قطر - بوابة الدفع
    create_gov_hero(
        name_ar="بوابة الدفع",
        name_en="Payment Gateway",
        desc_ar="النظام القطري للمدفوعات الحكومية",
        colors=['#8D1B3D', '#6B1529'],
        filename='gov-qatar-hero-large.jpg'
    )
    
    print("\n🎉 تم إنشاء جميع صور Hero الحكومية بنجاح!")
    print(f"📁 الملفات في: {OUTPUT_DIR}/")

if __name__ == "__main__":
    main()
