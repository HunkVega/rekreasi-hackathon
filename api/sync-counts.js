// Serverless endpoint for Vercel to upsert anonymous counts to Supabase
// Reads SUPABASE_URL and SUPABASE_KEY from environment variables set in Vercel dashboard.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) return res.status(500).json({error: 'Supabase not configured on server'});

  try{
    const counts = req.body && req.body.counts ? req.body.counts : req.body;
    const endpoint = SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/rec_counts?on_conflict=id';
    const body = [{ id: 'aggregated', counts }];
    const r = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(body)
    });
    if (!r.ok) {
      const text = await r.text().catch(()=>null);
      return res.status(502).json({error: 'Upstream failed', status: r.status, body: text});
    }
    const resp = await r.json().catch(()=>null);
    return res.status(200).json({ok:true, resp});
  }catch(err){
    return res.status(500).json({error: String(err)});
  }
}
