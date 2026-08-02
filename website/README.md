# Beleef de Recreatiebranche — Prototype

Deze map bevat een statische prototype-website gebouwd voor de HISWA-RECRON hackathon.

Quick start (lokal):

1. Open een eenvoudige HTTP-server in de map `website` (voorbeeld met Python):

```bash
# Python 3
python -m http.server 8000

# bezoek: http://localhost:8000/
```

Ontwerp highlights:
- Kiosk-mode: korte ronde (~45s), reset instant, geen login
- Shareable link: dezelfde URL werkt voor scholen
- Offline-first: service worker cache
- Privacy: geen persoonlijke data, alleen anonieme tellers

Aanpassen inhoud:
- Pas rollen aan in `app.js` variabele `roles`.
- Vervang `vacancyLink` in `app.js` met het echte HISWA-RECRON vacaturesysteem.

Optionele Supabase sync (aanwijzingen)
- Deze prototype ondersteunt optionele, anonieme aggregaat-sync naar Supabase via de REST API. Dit is optioneel — als er geen Supabase-config aanwezig is, werkt de site volledig offline met `localStorage`.
- Schema (voorbeeld) — voer dit in je Supabase SQL editor uit om een eenvoudige `rec_counts` tabel te maken:

```sql
create table public.rec_counts (
	id text primary key,
	counts jsonb,
	updated_at timestamptz default now()
);
```

- Upsert voorbeeld (client-side) gebruikt de REST endpoint `POST /rest/v1/rec_counts?on_conflict=id` met headers `apikey` and `Authorization: Bearer <anon key>`.
- Hoe te configureren in prototype: klik `Configure Supabase` en plak je `SUPABASE_URL` (zoals `https://xyz.supabase.co`) en je `ANON_KEY`. De prototype zal proberen te upserten en melde fouten in de console.

Server-side (Vercel) recommended
- Untuk host di Vercel, saya menambahkan serverless endpoint `api/sync-counts.js` yang menerima POST `{ counts }` dan melakukan upsert ke Supabase menggunakan env vars `SUPABASE_URL` dan `SUPABASE_KEY`.
- Setup langkah:
	1. Di dashboard Vercel project → Settings → Environment Variables tambahkan:
		 - `SUPABASE_URL` = `https://...supabase.co`
		 - `SUPABASE_KEY` = (your service/anon key)
	2. Deploy ke Vercel (push ke repo). Endpoint akan tersedia di `/api/sync-counts`.
	3. Prototype di browser sekarang memanggil `/api/sync-counts` saat counts berubah.

Veiligheid en RLS:
- Jangan pernah commit kunci pada repo. Gunakan Environment Variables di Vercel.
- Untuk produksi: gunakan Row Level Security (RLS) di Supabase dan berikan hanya hak yang diperlukan untuk endpoint ini. Pertimbangkan membuat fungsi (RPC) yang menyaring input sebelum menyimpan.


Deployment:
- Deze prototype map kan gedeployed worden op Netlify, GitHub Pages, of een eenvoudige static host.
