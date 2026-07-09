import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface Tutor {
  id: number;
  name: string;
  subject: string;
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

let tutors: Tutor[] = [];

export async function GET() {
  if (supabase) {
    const { data, error } = await supabase.from('tutors').select('*');
    return new Response(JSON.stringify(data), { status: 200 });
  } else {
    return new Response(JSON.stringify(tutors), { status: 200 });
  }
}

export async function POST({ request }: { request: NextApiRequest }) {
  const { name, subject } = await request.json();
  const newTutor: Tutor = {
    id: tutors.length + 1,
    name,
    subject,
  };

  if (supabase) {
    const { data, error } = await supabase.from('tutors').insert([newTutor]);
    return new Response(JSON.stringify(data[0]), { status: 201 });
  } else {
    tutors.push(newTutor);
    return new Response(JSON.stringify(newTutor), { status: 201 });
  }
}
