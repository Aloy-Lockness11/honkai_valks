import { sql } from '@vercel/postgres';

export default async function handler(req:any, res:any) {
    try {
        const data = await sql`SELECT * FROM Valkyries`;
        res.status(200).json(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Failed to fetch Valkyries data.' });
    }
}
