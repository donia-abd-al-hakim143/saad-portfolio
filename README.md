# Saad Mahmoud Portfolio

موقع محفظة أعمال سعد محمود - مصور ومنتج أفلام

## 🚀 النشر على Netlify

### الخطوات:

1. **أضف الملفات المطلوبة:**
   - ضع جميع ملفات الأصول في مجلد `public/`:
     - `logo.jpg` - شعار الشركة
     - `saad.jpg` - صورة سعد محمود
     - `wedding.mp4`, `branding.mp4`, `ramdan2026.mp4`, إلخ - الفيديوهات

2. **انشر على Netlify:**
   - ارفع المشروع إلى GitHub
   - اربط المستودع بـ Netlify
   - Netlify سيتعرف تلقائياً على إعدادات `netlify.toml`

3. **إعدادات البناء:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

### استكشاف الأخطاء:

إذا ظهرت صفحة بيضاء:
- تأكد من وجود جميع ملفات الأصول في `public/`
- تحقق من أن المسارات في الكود تبدأ بـ `/`
- تأكد من أن `netlify.toml` موجود في الجذر

## 🛠️ التطوير المحلي

```bash
npm install
npm run dev
```

## 📦 البناء للإنتاج

```bash
npm run build
```

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
