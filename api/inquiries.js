import supabase from './db-client.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { name, email, company, budget, message } = req.body || {};
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({ error: 'Please provide your name.' });
      }
      if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }
      if (!message || typeof message !== 'string' || message.trim().length < 10) {
        return res.status(400).json({ error: 'Please tell us a little more about your project (10+ characters).' });
      }
      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          name: name.trim(),
          email: email.trim(),
          company: (company || '').toString().trim() || null,
          budget: (budget || '').toString().trim() || null,
          message: message.trim(),
          status: 'new',
        })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json({ ok: true, id: data.id });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error (inquiries):', err);
    res.status(500).json({ error: err.message });
  }
}
