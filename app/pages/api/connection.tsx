import { sql } from '@vercel/postgres';

export async function fetchAllValkyries() {
    try {
        const data = await sql`SELECT * FROM Valkyries`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Valkyries data.');
    }
}
