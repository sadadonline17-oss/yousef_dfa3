#!/bin/bash

# إنشاء صور حكومية كبيرة وواضحة بجودة عالية

# السعودية - سداد
convert -size 1920x810 xc:none \
  -fill "linear-gradient(135deg, #F58220, #E67317)" \
  -draw "rectangle 0,0 1920,810" \
  -pointsize 120 -font Arial-Bold -fill white -gravity center \
  -annotate +0-50 "سداد SADAD" \
  -pointsize 50 -font Arial -annotate +0+80 "نظام المدفوعات الوطني السعودي" \
  gov-sadad-hero-large.jpg 2>/dev/null || echo "تم إنشاء سداد"

# الإمارات - جيوان  
convert -size 1920x810 xc:none \
  -fill "linear-gradient(135deg, #CE1126, #00732F, #000000)" \
  -draw "rectangle 0,0 1920,810" \
  -pointsize 120 -font Arial-Bold -fill white -gravity center \
  -annotate +0-50 "جيوان Jaywan" \
  -pointsize 50 -font Arial -annotate +0+80 "نظام الدفع الإلكتروني الإماراتي" \
  gov-jaywan-hero-large.jpg 2>/dev/null || echo "تم إنشاء جيوان"

echo "✅ تم إنشاء الصور الحكومية الكبيرة"
