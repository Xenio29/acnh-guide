import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase.config';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

async function handleResponse(res: Response) {
  const text = await res.text();
  let body: any = text;
  try { body = JSON.parse(text); } catch {}
  if (!res.ok) {
    console.error('Supabase REST error', res.status, res.statusText, body);
    throw new Error(`Supabase error ${res.status}: ${JSON.stringify(body)}`);
  }
  return body;
}

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class SupabaseService {
  static getOrCreateDeviceFootprint(): string {
    const key = 'acnh_device_id';
    let id = localStorage.getItem(key);
    if (!id) {
      id = uuidv4();
      try {
        localStorage.setItem(key, id);
      } catch {
        // ignore if storage unavailable
      }
    }
    return id;
  }

  static async getAccountByDevice(deviceFootprint: string): Promise<any[]> {
    const url = `${SUPABASE_URL}/rest/v1/accounts?device-footprint=eq.${encodeURIComponent(deviceFootprint)}`;
    const res = await fetch(url, { headers });
    const body = await handleResponse(res);
    return Array.isArray(body) ? body : [];
  }

  static async getDataById(id: number): Promise<any[] | null> {
    const url = `${SUPABASE_URL}/rest/v1/data?id=eq.${id}`;
    const res = await fetch(url, { headers });
    const body = await handleResponse(res);
    return Array.isArray(body) ? body : null;
  }

  static async createAccount(payload: any): Promise<any | null> {
    const url = `${SUPABASE_URL}/rest/v1/accounts`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { ...headers, Prefer: 'return=representation' },
      body: JSON.stringify(payload),
    });
    const body = await handleResponse(res);
    return Array.isArray(body) ? body[0] : body;
  }

  static async createData(payload: any): Promise<any | null> {
    const url = `${SUPABASE_URL}/rest/v1/data`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { ...headers, Prefer: 'return=representation' },
      body: JSON.stringify(payload),
    });
    const body = await handleResponse(res);
    return Array.isArray(body) ? body[0] : body;
  }

  static async updateData(id: number, payload: any): Promise<any | null> {
    const url = `${SUPABASE_URL}/rest/v1/data?id=eq.${id}`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { ...headers, Prefer: 'return=representation' },
      body: JSON.stringify(payload),
    });
    const body = await handleResponse(res);
    return Array.isArray(body) ? body[0] : body;
  }

  static async updateAccount(id: number, payload: any): Promise<any | null> {
    const url = `${SUPABASE_URL}/rest/v1/accounts?id=eq.${id}`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { ...headers, Prefer: 'return=representation' },
      body: JSON.stringify(payload),
    });
    const body = await handleResponse(res);
    return Array.isArray(body) ? body[0] : body;
  }
}
